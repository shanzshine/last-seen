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

  private ambientMasterGain: GainNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientNodes: AudioNode[] = [];
  private ambientStoppables: Array<{ stop: (when?: number) => void }> = [];
  private ambientPulseTimer: number | null = null;
  private ambientPulseStep = 0;

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
    this.ambientMode = mode;

    if (this.muted) return;

    const ctx = this.ensureContext();
    if (!ctx) return;

    if (this.ambientRunning) {
      this.updateAmbientMood(mode);
      return;
    }

    if (ctx.state === 'running') {
      this.buildAmbientGraph();
    } else {
      ctx
        .resume()
        .then(() => {
          if (ctx.state === 'running' && this.ambientDesired && !this.muted && !this.ambientRunning) {
            this.buildAmbientGraph();
          }
        })
        .catch(() => {});
    }
  }

  private updateAmbientMood(mode: AmbientMode) {
    if (!this.ctx || !this.ambientMasterGain || !this.ambientFilter) return;
    const now = this.ctx.currentTime;
    const targetGain = mode === 'case' ? 0.2 : 0.14;
    const targetCutoff = mode === 'case' ? 780 : 600;
    this.ambientMasterGain.gain.setTargetAtTime(targetGain, now, 0.6);
    this.ambientFilter.frequency.setTargetAtTime(targetCutoff, now, 0.8);
  }

  private buildAmbientGraph() {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running' || this.ambientRunning || this.muted) return;

    const now = ctx.currentTime;
    const targetGain = this.ambientMode === 'case' ? 0.2 : 0.14;
    const baseCutoff = this.ambientMode === 'case' ? 780 : 600;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(targetGain, now + 1.8);
    masterGain.connect(ctx.destination);

    // Sweeping lowpass for warm dark thriller pad
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(baseCutoff, now);
    padFilter.Q.setValueAtTime(1.1, now);
    padFilter.connect(masterGain);

    // Slow LFO modulating filter cutoff for breathing atmosphere
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.07, now);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(220, now);
    lfo.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    lfo.start(now);

    // Dark D-minor forensic pad voices (audible on both laptop & phone speakers)
    const voices: Array<{ freq: number; type: OscillatorType; gain: number; detune: number }> = [
      { freq: 146.83, type: 'triangle', gain: 0.22, detune: -3 }, // D3
      { freq: 220.0, type: 'sine', gain: 0.24, detune: 3 },      // A3
      { freq: 261.63, type: 'sine', gain: 0.16, detune: -4 },    // C4
      { freq: 349.23, type: 'sine', gain: 0.1, detune: 4 },      // F4
    ];

    const stoppables: Array<{ stop: (when?: number) => void }> = [lfo];
    const nodes: AudioNode[] = [masterGain, padFilter, lfo, lfoGain];

    for (const v of voices) {
      const osc = ctx.createOscillator();
      osc.type = v.type;
      osc.frequency.setValueAtTime(v.freq, now);
      osc.detune.setValueAtTime(v.detune, now);

      const vGain = ctx.createGain();
      vGain.gain.setValueAtTime(v.gain, now);

      osc.connect(vGain);
      vGain.connect(padFilter);
      osc.start(now);

      stoppables.push(osc);
      nodes.push(osc, vGain);
    }

    // Soft late-night room air texture
    try {
      const noiseLen = ctx.sampleRate * 3;
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < noiseLen; i++) {
        const white = Math.random() * 2 - 1;
        // Brown-ish filtered noise for smooth room tone
        lastOut = (lastOut + 0.04 * white) / 1.04;
        data[i] = lastOut * 2.4;
      }

      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuf;
      noiseSrc.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(460, now);
      noiseFilter.Q.setValueAtTime(0.7, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, now);

      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSrc.start(now);

      stoppables.push(noiseSrc);
      nodes.push(noiseSrc, noiseFilter, noiseGain);
    } catch {
      // ignore noise buffer issues
    }

    this.ambientMasterGain = masterGain;
    this.ambientFilter = padFilter;
    this.ambientNodes = nodes;
    this.ambientStoppables = stoppables;
    this.ambientRunning = true;
    this.ambientPulseStep = 0;

    // Sparse, eerie D-minor forensic motif notes with soft echo
    const motif = [293.66, 349.23, 440.0, 329.63, 293.66, 261.63, 349.23, 220.0];
    const playMotifNote = () => {
      if (!this.ambientRunning || !this.ctx || !this.ambientMasterGain || this.muted) return;
      if (this.ctx.state !== 'running') return;

      const freq = motif[this.ambientPulseStep % motif.length];
      this.ambientPulseStep += 1;

      const triggerEcho = (delaySec: number, level: number) => {
        if (!this.ctx || !this.ambientMasterGain) return;
        const startAt = this.ctx.currentTime + delaySec;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startAt);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1250, startAt);

        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(level, startAt + 0.045);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 2.1);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientMasterGain);

        osc.start(startAt);
        osc.stop(startAt + 2.15);
      };

      const baseLevel = this.ambientMode === 'case' ? 0.17 : 0.12;
      triggerEcho(0.02, baseLevel);
      triggerEcho(0.48, baseLevel * 0.36);
    };

    // Play the first motif note shortly after fade-in, then every 2.8s
    playMotifNote();
    this.ambientPulseTimer = window.setInterval(playMotifNote, 2800);
  }

  private stopAmbientNodes() {
    if (this.ambientPulseTimer !== null) {
      window.clearInterval(this.ambientPulseTimer);
      this.ambientPulseTimer = null;
    }

    if (!this.ambientRunning || !this.ctx) {
      this.ambientRunning = false;
      return;
    }

    const ctx = this.ctx;
    const masterGain = this.ambientMasterGain;
    const stoppables = this.ambientStoppables;
    const nodes = this.ambientNodes;

    try {
      if (masterGain) {
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value, 0.0001), ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      }
      const stopAt = ctx.currentTime + 0.3;
      stoppables.forEach((s) => {
        try {
          s.stop(stopAt);
        } catch {
          // ignore
        }
      });
      window.setTimeout(() => {
        nodes.forEach((n) => {
          try {
            n.disconnect();
          } catch {
            // ignore
          }
        });
      }, 360);
    } catch {
      // ignore
    }

    this.ambientMasterGain = null;
    this.ambientFilter = null;
    this.ambientNodes = [];
    this.ambientStoppables = [];
    this.ambientRunning = false;
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
