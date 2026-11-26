class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientRunning = false;

  constructor() {
    try {
      this.muted = localStorage.getItem('last-seen-muted') === 'true';
    } catch {
      this.muted = false;
    }
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  isMuted(): boolean {
    return this.muted;
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    try {
      localStorage.setItem('last-seen-muted', String(this.muted));
    } catch {
      // ignore storage errors
    }
    if (this.muted) {
      this.stopAmbient();
    } else {
      this.playTap();
    }
    return this.muted;
  }

  startAmbient() {
    const ctx = this.getContext();
    if (!ctx || this.ambientRunning) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 1.2);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, ctx.currentTime);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, ctx.currentTime);

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(164.81, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    this.ambientGain = masterGain;
    this.ambientOsc1 = osc1;
    this.ambientOsc2 = osc2;
    this.ambientRunning = true;
  }

  stopAmbient() {
    if (!this.ambientRunning || !this.ctx) return;
    try {
      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);
      }
      this.ambientOsc1?.stop(this.ctx.currentTime + 0.3);
      this.ambientOsc2?.stop(this.ctx.currentTime + 0.3);
    } catch {
      // ignore
    }
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.ambientGain = null;
    this.ambientRunning = false;
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

  playTap() {
    this.playTone(620, 0.065, 'triangle', 0.16);
  }

  playPinKey() {
    this.playTone(760, 0.075, 'sine', 0.18);
  }

  playPinError() {
    this.playTone(210, 0.15, 'sawtooth', 0.18, 0);
    this.playTone(165, 0.2, 'sawtooth', 0.18, 0.11);
  }

  playPinUnlock() {
    this.playTone(523.25, 0.12, 'sine', 0.22, 0);
    this.playTone(659.25, 0.14, 'sine', 0.22, 0.09);
    this.playTone(783.99, 0.24, 'triangle', 0.24, 0.18);
  }

  playClueFound() {
    this.playTone(587.33, 0.12, 'triangle', 0.22, 0);
    this.playTone(880, 0.26, 'sine', 0.24, 0.09);
  }

  playVoiceNoteCue() {
    this.playTone(392, 0.18, 'sine', 0.16, 0);
    this.playTone(329.63, 0.22, 'triangle', 0.14, 0.18);
    this.playTone(261.63, 0.3, 'sine', 0.12, 0.4);
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
