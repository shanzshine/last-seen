class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

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
    if (!this.muted) {
      this.playTap();
    }
    return this.muted;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.08,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

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
  }

  playTap() {
    this.playTone(540, 0.055, 'triangle', 0.05);
  }

  playPinKey() {
    this.playTone(720, 0.06, 'sine', 0.055);
  }

  playPinError() {
    this.playTone(190, 0.14, 'sawtooth', 0.07, 0);
    this.playTone(155, 0.18, 'sawtooth', 0.07, 0.11);
  }

  playPinUnlock() {
    this.playTone(523.25, 0.12, 'sine', 0.08, 0);
    this.playTone(659.25, 0.14, 'sine', 0.08, 0.09);
    this.playTone(783.99, 0.22, 'triangle', 0.09, 0.18);
  }

  playClueFound() {
    this.playTone(587.33, 0.12, 'triangle', 0.08, 0);
    this.playTone(880, 0.24, 'sine', 0.09, 0.09);
  }

  playCaseSolved(success: boolean) {
    if (success) {
      this.playTone(440, 0.18, 'triangle', 0.08, 0);
      this.playTone(554.37, 0.18, 'triangle', 0.08, 0.12);
      this.playTone(659.25, 0.35, 'sine', 0.1, 0.24);
    } else {
      this.playTone(349.23, 0.2, 'triangle', 0.07, 0);
      this.playTone(311.13, 0.3, 'sine', 0.07, 0.16);
    }
  }
}

export const sound = new SoundEngine();

