type AmbientMode = 'home' | 'case';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private unlocked = false;
  private unlockedAt = 0;
  private unlockListeners = new Set<(unlocked: boolean) => void>();

  private ambientDesired = false;
  private ambientMode: AmbientMode = 'home';
  private ambientRunning = false;

  private bgAudio: HTMLAudioElement | null = null;
  private bgFadeTimer: number | null = null;
  private bgCurrentSrc: string | null = null;

  private gestureBound = false;

  constructor() {
    try {
      this.muted = localStorage.getItem('last-seen-muted') === 'true';
    } catch {
      this.muted = false;
    }
    this.bindGestureUnlock();
  }

  private bindGestureUnlock() {
    if (this.gestureBound || typeof window === 'undefined') return;
    this.gestureBound = true;

    const handleGesture = () => {
      if (this.muted) return;
      void this.unlock();
    };

    window.addEventListener('pointerdown', handleGesture, { capture: true, passive: true });
    window.addEventListener('touchstart', handleGesture, { capture: true, passive: true });
    window.addEventListener('keydown', handleGesture, { capture: true, passive: true });
  }

  private setUnlocked(next: boolean) {
    if (next && !this.unlocked) {
      this.unlockedAt = Date.now();
    }
    if (this.unlocked === next) return;
    this.unlocked = next;
    this.unlockListeners.forEach((cb) => cb(next));
  }

  isAudioUnlocked(): boolean {
    return this.unlocked;
  }

  onUnlockChange(listener: (unlocked: boolean) => void): () => void {
    this.unlockListeners.add(listener);
    listener(this.unlocked);
    return () => {
      this.unlockListeners.delete(listener);
    };
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.ctx.onstatechange = () => {
          const running = this.ctx?.state === 'running';
          this.setUnlocked(Boolean(running));
          if (running && this.ambientDesired && !this.muted && !this.ambientRunning) {
            this.buildAmbientGraph();
          }
        };
      }
    }
    if (this.ctx?.state === 'running') {
      this.setUnlocked(true);
    }
    return this.ctx;
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null;
    const ctx = this.ensureContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  async unlock(): Promise<boolean> {
    if (this.muted) return false;
    const ctx = this.ensureContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }

    const running = ctx.state === 'running';
    this.setUnlocked(running);
    if (running && this.ambientDesired && !this.ambientRunning) {
      this.buildAmbientGraph();
    }
    return running;
  }

  isMuted(): boolean {
    return this.muted;
  }

  toggleMute(): boolean {
    // If browser autoplay is still holding audio silent (or was just unlocked by this click),
    // treat the click on the audio button as "enable & unlock" instead of immediately muting.
    if (!this.muted && (!this.unlocked || Date.now() - this.unlockedAt < 350)) {
      void this.unlock().then((ok) => {
        if (ok) {
          this.playTap();
          if (this.ambientDesired) {
            this.startAmbient(this.ambientMode);
          }
        }
      });
      return this.muted;
    }

    this.muted = !this.muted;
    try {
      localStorage.setItem('last-seen-muted', String(this.muted));
    } catch {
      // ignore storage errors
    }

    if (this.muted) {
      this.stopAmbientNodes();
    } else {
      void this.unlock().then((ok) => {
        if (ok) {
          this.playTap();
          if (this.ambientDesired) {
            this.startAmbient(this.ambientMode);
          }
        }
      });
    }
    return this.muted;
  }

  startAmbient(mode: AmbientMode = 'case') {
    this.ambientDesired = true;
    const modeChanged = this.ambientMode !== mode;
    this.ambientMode = mode;

    if (this.muted) return;

    if (this.ambientRunning && !modeChanged && this.bgAudio && !this.bgAudio.paused) {
      return;
    }

    this.playBgTrack(mode);
  }

  private getTrackUrl(mode: AmbientMode): string {
    const base = import.meta.env.BASE_URL || '/';
    return mode === 'case' ? `${base}audio/horror-case.mp3` : `${base}audio/horror-home.mp3`;
  }

  private clearFadeTimer() {
    if (this.bgFadeTimer !== null) {
      window.clearInterval(this.bgFadeTimer);
      this.bgFadeTimer = null;
    }
  }

  private fadeBgVolume(audio: HTMLAudioElement, targetVol: number, onDone?: () => void) {
    this.clearFadeTimer();
    const startVol = audio.volume;
    const steps = 16;
    let step = 0;
    this.bgFadeTimer = window.setInterval(() => {
      step += 1;
      const ratio = step / steps;
      audio.volume = Math.max(0, Math.min(1, startVol + (targetVol - startVol) * ratio));
      if (step >= steps) {
        this.clearFadeTimer();
        onDone?.();
      }
    }, 45);
  }

  private playBgTrack(mode: AmbientMode) {
    if (typeof window === 'undefined' || this.muted || !this.ambientDesired) return;

    const src = this.getTrackUrl(mode);
    const targetVol = mode === 'case' ? 0.34 : 0.25;

    if (!this.bgAudio) {
      this.bgAudio = new Audio();
      this.bgAudio.loop = true;
      this.bgAudio.preload = 'auto';
    }

    if (this.bgCurrentSrc !== src) {
      this.bgAudio.pause();
      this.bgAudio.src = src;
      this.bgCurrentSrc = src;
      this.bgAudio.currentTime = 0;
      this.bgAudio.volume = 0.01;
    }

    this.bgAudio
      .play()
      .then(() => {
        this.ambientRunning = true;
        this.setUnlocked(true);
        if (this.bgAudio && !this.muted) {
          this.fadeBgVolume(this.bgAudio, targetVol);
        }
      })
      .catch(() => {
        // Autoplay blocked until user gesture; bindGestureUnlock will retry via unlock()
        this.ambientRunning = false;
      });
  }

  private buildAmbientGraph() {
    this.playBgTrack(this.ambientMode);
  }

  private stopAmbientNodes() {
    this.clearFadeTimer();
    this.ambientRunning = false;
    const audio = this.bgAudio;
    if (!audio) return;

    try {
      this.fadeBgVolume(audio, 0, () => {
        audio.pause();
      });
    } catch {
      audio.pause();
    }
  }

  stopAmbient() {
    this.ambientDesired = false;
    this.stopAmbientNodes();
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.18,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const schedule = () => {
      const startAt = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startAt);

      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startAt);
      osc.stop(startAt + duration + 0.02);
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(schedule).catch(() => {});
    } else {
      schedule();
    }
  }

  vibrate(pattern: number | number[] = 30) {
    if (this.muted || typeof navigator === 'undefined') return;
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // ignore unsupported devices
    }
  }

  playTap() {
    this.playTone(620, 0.065, 'triangle', 0.16);
  }

  playPinKey() {
    this.playTone(760, 0.075, 'sine', 0.18);
  }

  playPinError() {
    this.vibrate([45, 35, 65]);
    this.playTone(210, 0.15, 'sawtooth', 0.18, 0);
    this.playTone(165, 0.2, 'sawtooth', 0.18, 0.11);
  }

  playPinUnlock() {
    this.vibrate(25);
    this.playTone(523.25, 0.12, 'sine', 0.22, 0);
    this.playTone(659.25, 0.14, 'sine', 0.22, 0.09);
    this.playTone(783.99, 0.24, 'triangle', 0.24, 0.18);
  }

  playClueFound() {
    this.vibrate(18);
    this.playTone(587.33, 0.12, 'triangle', 0.22, 0);
    this.playTone(880, 0.26, 'sine', 0.24, 0.09);
  }

  playVoiceNoteCue() {
    this.playTone(392, 0.18, 'sine', 0.16, 0);
    this.playTone(329.63, 0.22, 'triangle', 0.14, 0.18);
    this.playTone(261.63, 0.3, 'sine', 0.12, 0.4);

    // Subtle tape/mic static hiss for realistic voice note playback
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const duration = 1.25;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1100, ctx.currentTime);
      bandpass.Q.setValueAtTime(0.8, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + duration);
    } catch {
      // ignore audio buffer errors
    }
  }

  playCaseSolved(success: boolean) {
    if (success) {
      this.playTone(440, 0.18, 'triangle', 0.22, 0);
      this.playTone(554.37, 0.18, 'triangle', 0.22, 0.12);
      this.playTone(659.25, 0.36, 'sine', 0.25, 0.24);
    } else {
      this.playTone(349.23, 0.2, 'triangle', 0.2, 0);
      this.playTone(311.13, 0.32, 'sine', 0.2, 0.16);
    }
  }
}

export const sound = new SoundEngine();
