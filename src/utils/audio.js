/**
 * Cinematic Web Audio Soundscape
 * Procedural synthesis - Zero external audio file dependencies.
 * Creates an immersive Interstellar-style deep cosmic drone and sci-fi warp effects.
 */

class CosmicSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.droneGain = null;
    this.oscillators = [];
    this.filter = null;
    this.lfo = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Lowpass filter for deep space warmth
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Drone sub-gain
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.connect(this.filter);

      // Harmonic chords for deep cosmic ambiance: C1, G1, C2, E2, Bb2
      const frequencies = [32.7, 49.0, 65.41, 82.41, 116.54];
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Individual panner for spatial width
        if (this.ctx.createStereoPanner) {
          const panner = this.ctx.createStereoPanner();
          panner.pan.setValueAtTime((idx - 2) * 0.35, this.ctx.currentTime);
          osc.connect(panner);
          panner.connect(this.droneGain);
        } else {
          osc.connect(this.droneGain);
        }

        osc.start();
        this.oscillators.push(osc);
      });

      // LFO for breathing planetary filter modulation
      this.lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // Very slow 12s cycle
      lfoGain.gain.setValueAtTime(80, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      this.lfo.start();
    } catch {
      // AudioContext not allowed or unsupported
    }
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      this.isPlaying = false;
    } else {
      // Fade in
      this.droneGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 1.8);
      this.isPlaying = true;
      this.playWarp(0.15);
    }
    return this.isPlaying;
  }

  playWarp(intensity = 0.25) {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const bq = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(55, now + 1.1);

      bq.type = 'bandpass';
      bq.frequency.setValueAtTime(450, now);
      bq.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(intensity, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(bq);
      bq.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // Ignore
    }
  }
}

export const soundscape = new CosmicSoundscape();

