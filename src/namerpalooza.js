/**
 * NAMERPALOOZA — Client Application Engine
 * Pure Vanilla JavaScript & Web Audio API
 */

// --- 1. SOUND SYNTHESIS ENGINE (Web Audio API) ---
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Ticking sound for wheel and slot machine
  playTick(pitchMod = 1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 * pitchMod, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Win Sound: Fanfare (Trumpet Chord Arpeggio)
  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);

      const startTime = this.ctx.currentTime + idx * 0.12;
      const duration = 0.55;

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // Win Sound: Boom (Deep Explosion)
  playBoom() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.7);

    gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.75);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.75);
  }

  // Win Sound: Thunder (Whip drop + rumble)
  playThunder() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.65);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.65);
  }

  // Win Sound: Pop
  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Win Sound: Thunk
  playThunk() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // Win Sound: Swish
  playSwish() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // Win Sound: Bark
  playBark() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    [0, 0.14].forEach((delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const st = this.ctx.currentTime + delay;
      osc.frequency.setValueAtTime(380, st);
      osc.frequency.exponentialRampToValueAtTime(160, st + 0.1);

      gain.gain.setValueAtTime(0.3, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.1);
    });
  }

  playEliminationBuzz() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  // Realistic Duck Quack Synthesizer (Web Audio API)
  playRealisticQuack(customPitch = null, duration = 0.20, volume = 0.32, isDouble = false) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const triggerSingleNote = (startTime, notePitch, noteDur, noteVol) => {
        let startFreq;
        if (typeof notePitch === 'number') {
          startFreq = notePitch > 50 ? notePitch : (300 + Math.random() * 80) * notePitch;
        } else {
          startFreq = 300 + Math.random() * 80;
        }

        // Sawtooth wave oscillator
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';

        // Pitch drop curve replicating downward vocal duck drop
        const endFreq = Math.max(90, startFreq * 0.54);
        osc.frequency.setValueAtTime(startFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 1.05, startTime + 0.02);
        osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + noteDur);

        // Bandpass filter around 800Hz for nasal duck bill resonance
        const bandpass = this.ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(800, startTime);
        bandpass.Q.setValueAtTime(2.6, startTime);

        const lowpass = this.ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(2200, startTime);

        // Volume envelope
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(noteVol, startTime + 0.018);
        gain.gain.exponentialRampToValueAtTime(noteVol * 0.60, startTime + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDur);

        osc.connect(bandpass);
        bandpass.connect(lowpass);
        lowpass.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + noteDur + 0.02);
      };

      const now = this.ctx.currentTime;
      triggerSingleNote(now, customPitch, duration, volume);

      if (isDouble) {
        const secondOffset = duration * 0.95 + 0.05;
        const secondPitch = (typeof customPitch === 'number' && customPitch > 50)
          ? customPitch * 0.94
          : (300 + Math.random() * 80) * 0.94;
        triggerSingleNote(now + secondOffset, secondPitch, duration * 0.88, volume * 0.85);
      }
    } catch (e) {
      console.warn('Realistic quack synth error:', e);
    }
  }

  playQuack(pitch = null, isDouble = false) {
    this.playRealisticQuack(pitch, 0.20, 0.32, isDouble);
  }

  playWinnerSound(soundKey = 'fanfare') {
    switch (soundKey) {
      case 'boom': this.playBoom(); break;
      case 'thunder': this.playThunder(); break;
      case 'pop': this.playPop(); break;
      case 'thunk': this.playThunk(); break;
      case 'swish': this.playSwish(); break;
      case 'bark': this.playBark(); break;
      case 'fanfare':
      default:
        this.playFanfare();
        break;
    }
  }
}

const sounds = new SoundEngine();

// --- 2. CONFETTI PARTICLES ENGINE ---
class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  burst(count = 90) {
    this.resize();
    const colors = ['#FFC700', '#9D4EDD', '#00F0FF', '#FF007F', '#10B981', '#F59E0B', '#FFFFFF'];
    const w = this.canvas.width || 400;
    const h = this.canvas.height || 400;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: w / 2 + (Math.random() - 0.5) * 80,
        y: h / 2 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 12 - 4,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        life: 1,
        decay: Math.random() * 0.008 + 0.008,
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.rotSpeed;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
    }
  }

  clear() {
    this.particles = [];
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// --- 3. CORE APPLICATION STATE ---
const state = {
  currentTab: 'picker',
  contestants: ['Jasmine', 'Marcus', 'Tati', 'Deja', 'Andre', 'Kofi'],
  customSettings: {}, // name -> { color, sound }
  benchedContestants: [],
  mode: 'slot', // 'slot' | 'wheel' | 'scramble' | 'elimination'
  isDrawing: false,
  roundHistory: [],
  savedFavorites: [],
  selectedCategory: 'baby',
  wheelAngle: 0,
  confetti: null,
};

// Preset colors and sounds for customization
const COLOR_PRESETS = ['#FFC700', '#9D4EDD', '#00F0FF', '#10B981', '#FF007F', '#FF8C00'];
const SOUND_PRESETS = [
  { key: 'fanfare', label: 'Fanfare 🏆' },
  { key: 'boom', label: 'Boom 🎆' },
  { key: 'thunder', label: 'Thunder ⚡' },
  { key: 'pop', label: 'Pop 🎈' },
  { key: 'thunk', label: 'Thunk 🥷' },
  { key: 'swish', label: 'Swish 🏀' },
  { key: 'bark', label: 'Bark 🐾' },
];

// --- 4. NAME GENERATOR CURATED DATABASE ---
const GENERATOR_DATABASE = {
  baby: {
    cute: ['Milo', 'Luna', 'Archie', 'Poppy', 'Maisie', 'Otis', 'Daisy', 'Teddy', 'Flora', 'Pip'],
    tough: ['Axel', 'Valkyrie', 'Zane', 'Rocco', 'Hunter', 'Blade', 'Gunnar', 'Titan', 'Diesel', 'Jagger'],
    food: ['Brie', 'Clove', 'Basil', 'Maple', 'Rosemary', 'Saffron', 'Sage', 'Olive', 'Honey', 'Barley'],
    mythic: ['Orion', 'Freya', 'Atlas', 'Athena', 'Zephyr', 'Aurelia', 'Cassiopeia', 'Apollo', 'Selene', 'Vesta'],
    modern: ['Nova', 'Kai', 'Rowan', 'Arlo', 'River', 'Sloan', 'Zion', 'Wren', 'Finley', 'Bodhi'],
  },
  pet: {
    cute: ['Mochi', 'Peanut', 'Bubbles', 'Pip', 'Biscuit', 'Nugget', 'Waffles', 'Cookie', 'Coco', 'Buttons'],
    tough: ['Bandit', 'Thor', 'Fang', 'Ghost', 'Brutus', 'Shadow', 'Diesel', 'Rebel', 'Spike', 'Moose'],
    food: ['Taco', 'Miso', 'Boba', 'Nacho', 'Cannoli', 'Gnocchi', 'Bacon', 'Wasabi', 'Pickle', 'Sushi'],
    mythic: ['Odin', 'Loki', 'Phoenix', 'Hydra', 'Griffin', 'Pixie', 'Pegasus', 'Merlin', 'Echo', 'Draco'],
    modern: ['Pixel', 'Byte', 'Tesla', 'Cosmo', 'Ziggy', 'Juno', 'Echo', 'Astro', 'Neo', 'Radar'],
  },
  gamertag: {
    cute: ['SugarSniper', 'BobaBot', 'PixelKitty', 'MarshmallowGun', 'SoftShot', 'CloudHop', 'KawaiiKill', 'HoneyBeast'],
    tough: ['SkullReaper', 'VortexPhantom', 'IronViper', 'GrimBullet', 'ApexExecutioner', 'DarkHavoc', 'RageKnight'],
    food: ['SpicyDumpling', 'SirDonut', 'DeathWaffle', 'ChiliCrusher', 'CaffeineDemon', 'KillerCookie', 'CheesySniper'],
    mythic: ['AbyssalDragon', 'RuneWalker', 'CelestialWraith', 'FrostValkyrie', 'ShadowTitan', 'SolarEmperor'],
    modern: ['ZeroLatency', 'CyberPulse', 'GlitchSpectre', 'QuantumStrike', 'NullPointer', 'HyperDrive', 'RootAdmin'],
  },
  social: {
    cute: ['sweet.sunshine', 'peachy.vibes', 'pastel.cloudz', 'velvet.dreaming', 'honey.blooms', 'little.starlight'],
    tough: ['ironclad.daily', 'raw.grit', 'beastmode.hq', 'rebel.pulse', 'zero.chill', 'steel.edge'],
    food: ['caffeine.crumbs', 'daily.dough', 'matcha.aesthetic', 'sip.and.savor', 'sugar.crumb', 'bagel.theory'],
    mythic: ['solstice.mind', 'celestial.threads', 'ancient.echo', 'astral.realm', 'cosmic.orbit', 'mythos.craft'],
    modern: ['hyper.minimal', 'future.lens', 'logic.flow', 'tech.spectrum', 'neo.spatial', 'digital.nomad.x'],
  },
  full: {
    cute: ['Chloe Bloom', 'Oliver Finch', 'Daisy Meadows', 'Arthur Darling', 'Penelope Joy', 'Leo Sweet'],
    tough: ['Marcus Steele', 'Viktor Vance', 'Damian Cross', 'Roxanne Hunt', 'Cole Sterling', 'Helena Stone'],
    food: ['Ginger Baker', 'Clement Bell', 'Basil Thorne', 'Rosemary Cooke', 'Sage Miller', 'Pepper Potts'],
    mythic: ['Cassian Drake', 'Seraphina Vale', 'Lucien Thorne', 'Guinevere Frost', 'Aurelius Vance'],
    modern: ['Kai Sterling', 'Elena Vex', 'Zane Kincaid', 'Sloan Parker', 'Astrid Chen', 'Milo Vance'],
  },
  fantasy: {
    cute: ['Pippin Thistletop', 'Elfie Sparkle', 'Barnaby Bright', 'Willow Softstep', 'Nimble Fern', 'Glimmer'],
    tough: ['Gorgar Bloodaxe', 'Vaelin Darkbane', 'Kragor Ironfist', 'Shadowstalker Korv', 'Malakor Grim'],
    food: ['Tavernkeeper Stout', 'Pieslinger Bram', 'Brewmaster Barley', 'Honeycup Meadow', 'Ciderkin Pip'],
    mythic: ['Aerith Windwhisper', 'Thalor Starweaver', 'Morrigan Nightfall', 'Daelen Voidstrider', 'Lyra Silversong'],
    modern: ['CyberMage 2099', 'NeonSorcerer', 'NeuralHex', 'ChromeWarlock', 'QuantumAlchemist', 'ZeroCipher'],
  },
};

// --- 5. INITIALIZATION & DOM WIRING ---
document.addEventListener('DOMContentLoaded', () => {
  // Populate Textarea with default
  const textarea = document.getElementById('contestantsInput');
  if (textarea) {
    textarea.value = state.contestants.join('\n');
  }

  // Initialize confetti canvas
  const confettiCanvas = document.getElementById('confettiCanvas');
  if (confettiCanvas) {
    state.confetti = new ConfettiEngine(confettiCanvas);
    window.addEventListener('resize', () => state.confetti.resize());
  }

  // Update contestant badges & customize list
  updateContestantUI();

  // Render initial Spin Wheel canvas
  drawWheel();

  // Generate initial names in generator
  generateNames();

  // Key listeners for shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      pickAWinner();
    }
  });
});

// Tab Switcher
window.switchTab = function (tab) {
  state.currentTab = tab;
  const pickerBtn = document.getElementById('tabBtnPicker');
  const genBtn = document.getElementById('tabBtnGenerator');
  const pickerView = document.getElementById('viewPicker');
  const genView = document.getElementById('viewGenerator');

  if (tab === 'picker') {
    pickerBtn.className = 'px-3.5 sm:px-5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-brandYellow to-amber-400 text-slate-950 shadow-md';
    genBtn.className = 'px-3.5 sm:px-5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200 flex items-center gap-2';
    pickerView.classList.remove('hidden');
    genView.classList.add('hidden');
  } else {
    genBtn.className = 'px-3.5 sm:px-5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-brandPurple to-brandPurpleLight text-white shadow-md';
    pickerBtn.className = 'px-3.5 sm:px-5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200 flex items-center gap-2';
    genView.classList.remove('hidden');
    pickerView.classList.add('hidden');
  }
};

// Sound Toggle
window.toggleSound = function () {
  const isEnabled = sounds.toggle();
  const icon = document.getElementById('soundIcon');
  if (icon) {
    icon.textContent = isEnabled ? '🔊' : '🔇';
  }
  showToast(isEnabled ? 'Sound Enabled 🔊' : 'Sound Muted 🔇');
};

// Contestants Input Change Handler
window.handleContestantsChange = function () {
  const textarea = document.getElementById('contestantsInput');
  const lines = textarea.value
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  state.contestants = lines;
  updateContestantUI();
  if (state.mode === 'wheel') {
    drawWheel();
  }
};

function updateContestantUI() {
  const count = state.contestants.length;
  const countBadge = document.getElementById('contestantCountBadge');
  if (countBadge) {
    countBadge.textContent = `${count} name${count === 1 ? '' : 's'} loaded`;
  }

  // Populate Customization Accordion Rows
  const listEl = document.getElementById('customContestantsList');
  if (listEl) {
    if (state.contestants.length === 0) {
      listEl.innerHTML = '<div class="text-xs text-slate-500 italic py-2">Add names in the box above to customize colors and sounds.</div>';
      return;
    }

    listEl.innerHTML = state.contestants
      .map((name) => {
        const custom = state.customSettings[name] || { color: '#FFC700', sound: 'fanfare' };
        return `
        <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#100D1F] border border-[#231A3E]">
          <div class="flex items-center gap-2 min-w-0 flex-1">
            <span class="w-3 h-3 rounded-full shrink-0" style="background-color: ${custom.color};"></span>
            <span class="text-xs font-semibold text-slate-200 truncate">${escapeHtml(name)}</span>
          </div>
          
          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Color Selector -->
            <select onchange="updateNameColor('${escapeHtml(name)}', this.value)" class="bg-[#1C1635] text-[11px] text-slate-300 rounded px-1 py-0.5 border border-[#302354] focus:outline-none">
              ${COLOR_PRESETS.map(
                (c) => `<option value="${c}" ${c === custom.color ? 'selected' : ''}>${c === '#FFC700' ? '🟡 Gold' : c === '#9D4EDD' ? '🟣 Purple' : c === '#00F0FF' ? '🔵 Cyan' : c === '#10B981' ? '🟢 Green' : c === '#FF007F' ? '💖 Pink' : '🟠 Orange'}</option>`
              ).join('')}
            </select>

            <!-- Sound Selector -->
            <select onchange="updateNameSound('${escapeHtml(name)}', this.value)" class="bg-[#1C1635] text-[11px] text-slate-300 rounded px-1.5 py-0.5 border border-[#302354] focus:outline-none">
              ${SOUND_PRESETS.map(
                (s) => `<option value="${s.key}" ${s.key === custom.sound ? 'selected' : ''}>${s.label}</option>`
              ).join('')}
            </select>

            <!-- Sound Preview -->
            <button onclick="previewSound('${custom.sound}')" class="text-xs hover:scale-110 transition-transform p-0.5" title="Preview Sound">
              ▶
            </button>
          </div>
        </div>
      `;
      })
      .join('');
  }
}

window.updateNameColor = function (name, color) {
  if (!state.customSettings[name]) state.customSettings[name] = { color: '#FFC700', sound: 'fanfare' };
  state.customSettings[name].color = color;
  if (state.mode === 'wheel') drawWheel();
};

window.updateNameSound = function (name, sound) {
  if (!state.customSettings[name]) state.customSettings[name] = { color: '#FFC700', sound: 'fanfare' };
  state.customSettings[name].sound = sound;
};

window.previewSound = function (soundKey) {
  sounds.playWinnerSound(soundKey);
};

// Toolbar Helpers
window.shuffleContestants = function () {
  for (let i = state.contestants.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.contestants[i], state.contestants[j]] = [state.contestants[j], state.contestants[i]];
  }
  document.getElementById('contestantsInput').value = state.contestants.join('\n');
  updateContestantUI();
  if (state.mode === 'wheel') drawWheel();
  showToast('Contestants shuffled! 🔀');
};

window.sortContestantsAZ = function () {
  state.contestants.sort((a, b) => a.localeCompare(b));
  document.getElementById('contestantsInput').value = state.contestants.join('\n');
  updateContestantUI();
  if (state.mode === 'wheel') drawWheel();
  showToast('Contestants sorted A to Z 🔤');
};

window.dedupeContestants = function () {
  const original = state.contestants.length;
  state.contestants = [...new Set(state.contestants)];
  document.getElementById('contestantsInput').value = state.contestants.join('\n');
  updateContestantUI();
  if (state.mode === 'wheel') drawWheel();
  const removed = original - state.contestants.length;
  showToast(removed > 0 ? `Removed ${removed} duplicates! 🧹` : 'No duplicates found.');
};

window.resetDefaultContestants = function () {
  state.contestants = ['Jasmine', 'Marcus', 'Tati', 'Deja', 'Andre', 'Kofi'];
  document.getElementById('contestantsInput').value = state.contestants.join('\n');
  updateContestantUI();
  if (state.mode === 'wheel') drawWheel();
  showToast('Reset to sample names! ✨');
};

// Accordion Toggles
window.toggleAccordion = function (id) {
  const el = document.getElementById(id);
  const arrow = document.getElementById('accordionArrow');
  if (el) {
    const isHidden = el.classList.contains('hidden');
    if (isHidden) {
      el.classList.remove('hidden');
      if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
      el.classList.add('hidden');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  }
};

window.toggleFaq = function (idx) {
  const content = document.getElementById(`faqContent-${idx}`);
  const arrow = document.getElementById(`faqArrow-${idx}`);
  if (content) {
    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
      content.classList.remove('hidden');
      if (arrow) arrow.textContent = '▲';
    } else {
      content.classList.add('hidden');
      if (arrow) arrow.textContent = '▼';
    }
  }
};

// Mode Selector
window.setMode = function (newMode) {
  if (state.isDrawing) return;
  state.mode = newMode;

  const modes = ['slot', 'wheel', 'scramble', 'elimination'];
  modes.forEach((m) => {
    const btn = document.getElementById(`modeBtn-${m}`);
    if (btn) {
      const activeDot = btn.querySelector('.active-dot');
      if (m === newMode) {
        btn.className = 'mode-btn p-3 rounded-xl border border-brandYellow bg-brandYellow/10 text-left transition-all relative overflow-hidden group';
        btn.querySelector('.font-display').className = 'flex items-center gap-2 font-display font-bold text-sm text-brandYellow';
        if (activeDot) activeDot.classList.remove('hidden');
      } else {
        btn.className = 'mode-btn p-3 rounded-xl border border-[#2B224C] hover:border-slate-500 bg-[#141026] text-left transition-all relative overflow-hidden group';
        btn.querySelector('.font-display').className = 'flex items-center gap-2 font-display font-bold text-sm text-slate-200';
        if (activeDot) activeDot.classList.add('hidden');
      }
    }
  });

  resetStageViews();
  if (newMode === 'wheel') {
    document.getElementById('stageWheel').classList.remove('hidden');
    document.getElementById('stageIdle').classList.add('hidden');
    drawWheel();
  } else {
    document.getElementById('stageIdle').classList.remove('hidden');
  }
};

function resetStageViews() {
  document.getElementById('stageIdle').classList.add('hidden');
  document.getElementById('stageSlot').classList.add('hidden');
  document.getElementById('stageWheel').classList.add('hidden');
  document.getElementById('stageScramble').classList.add('hidden');
  document.getElementById('stageElimination').classList.add('hidden');
  document.getElementById('stageWinner').classList.add('hidden');
  if (state.confetti) state.confetti.clear();
}

window.promptProMode = function (modeName) {
  sounds.playTick(1.2);
  openUpgradeModal();
};

// --- 6. UNIFORM RANDOM SELECTION ALGORITHM ---
function selectUniformRandom(items) {
  if (!items || items.length === 0) return null;
  // Cryptographically secure uniform random integer in [0, items.length - 1]
  const cryptoObj = window.crypto || window.msCrypto;
  if (cryptoObj && cryptoObj.getRandomValues) {
    const array = new Uint32Array(1);
    cryptoObj.getRandomValues(array);
    const index = array[0] % items.length;
    return { winner: items[index], index };
  }
  const index = Math.floor(Math.random() * items.length);
  return { winner: items[index], index };
}

// --- 7. MAIN "PICK A WINNER" DISPATCHER ---
window.pickAWinner = function () {
  if (state.isDrawing) return;

  if (state.contestants.length === 0) {
    showToast('⚠️ Please enter at least 1 contestant name!');
    return;
  }

  state.isDrawing = true;
  document.getElementById('pickWinnerBtn').disabled = true;
  document.getElementById('pickWinnerBtn').classList.add('opacity-70', 'cursor-not-allowed');

  // Fair selection: 1/N probability
  const { winner, index } = selectUniformRandom(state.contestants);

  // Dispatch to animation mode
  switch (state.mode) {
    case 'slot':
      runSlotReelAnimation(winner);
      break;
    case 'wheel':
      runSpinWheelAnimation(winner, index);
      break;
    case 'scramble':
      runScrambleAnimation(winner);
      break;
    case 'elimination':
      runEliminationAnimation(winner);
      break;
    default:
      runSlotReelAnimation(winner);
      break;
  }
};

// ANIMATION 1: SLOT REEL
function runSlotReelAnimation(winner) {
  resetStageViews();
  const stageSlot = document.getElementById('stageSlot');
  const slotTrack = document.getElementById('slotTrack');
  stageSlot.classList.remove('hidden');

  // Build long sequence of names for the reel, finishing with the winner
  const sequence = [];
  const pool = [...state.contestants];
  for (let i = 0; i < 35; i++) {
    sequence.push(pool[i % pool.length]);
  }
  sequence.push(winner);

  // Render items inside reel track
  slotTrack.style.transition = 'none';
  slotTrack.style.transform = 'translateY(0px)';
  slotTrack.innerHTML = sequence
    .map(
      (name, i) => `
    <div class="reel-item h-16 w-full flex items-center justify-center font-display font-extrabold text-2xl sm:text-3xl text-slate-300 tracking-wider">
      ${escapeHtml(name)}
    </div>
  `
    )
    .join('');

  // Item height is roughly 80px (h-16 + gap)
  const itemHeight = 80;
  const targetOffset = -(sequence.length - 1) * itemHeight;

  // Sound ticking during spin
  let tickCount = 0;
  const tickInterval = setInterval(() => {
    sounds.playTick(0.8 + (tickCount % 5) * 0.1);
    tickCount++;
    if (tickCount > 28) clearInterval(tickInterval);
  }, 100);

  // Trigger smooth deceleration
  requestAnimationFrame(() => {
    slotTrack.style.transition = 'transform 3.2s cubic-bezier(0.12, 0.8, 0.15, 1)';
    slotTrack.style.transform = `translateY(${targetOffset}px)`;
  });

  setTimeout(() => {
    clearInterval(tickInterval);
    celebrateWinner(winner);
  }, 3400);
}

// ANIMATION 2: SPIN WHEEL
function drawWheel(currentAngle = state.wheelAngle) {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const center = size / 2;
  const radius = center - 16;
  const items = state.contestants;
  const count = items.length;

  ctx.clearRect(0, 0, size, size);

  if (count === 0) {
    ctx.fillStyle = '#231B45';
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  const arc = (Math.PI * 2) / count;
  const colors = ['#9D4EDD', '#FFC700', '#00F0FF', '#FF007F', '#10B981', '#F59E0B', '#7B2CBF', '#3B82F6'];

  for (let i = 0; i < count; i++) {
    const angle = currentAngle + i * arc;
    const name = items[i];
    const custom = state.customSettings[name];
    const sliceColor = (custom && custom.color) || colors[i % colors.length];

    // Wedge
    ctx.beginPath();
    ctx.fillStyle = sliceColor;
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, angle, angle + arc);
    ctx.lineTo(center, center);
    ctx.fill();

    // Wedge border
    ctx.strokeStyle = '#0F0C1B';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Text label
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = sliceColor === '#FFC700' || sliceColor === '#00F0FF' ? '#0F0C1B' : '#FFFFFF';
    ctx.font = 'bold 15px Outfit, sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 4;

    const truncated = name.length > 12 ? name.substring(0, 10) + '..' : name;
    ctx.fillText(truncated, radius - 24, 5);
    ctx.restore();
  }

  // Center Hub
  ctx.beginPath();
  ctx.fillStyle = '#0F0C1B';
  ctx.arc(center, center, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FFC700';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#FFC700';
  ctx.font = 'bold 16px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WIN', center, center);
}

function runSpinWheelAnimation(winner, targetIndex) {
  resetStageViews();
  const stageWheel = document.getElementById('stageWheel');
  stageWheel.classList.remove('hidden');

  const count = state.contestants.length;
  const arc = (Math.PI * 2) / count;

  // The needle is at -PI/2 (top center). We want slice targetIndex to land under the needle.
  // slice targetIndex spans from: angle + targetIndex * arc to angle + (targetIndex + 1) * arc.
  // Center of slice targetIndex is at: currentAngle + (targetIndex + 0.5) * arc.
  // We want currentAngle + (targetIndex + 0.5) * arc === -Math.PI / 2 (mod 2PI)
  const fullRotations = (5 + Math.floor(Math.random() * 3)) * (Math.PI * 2);
  const targetWedgeCenter = -Math.PI / 2 - (targetIndex + 0.5) * arc;
  const finalAngle = state.wheelAngle + fullRotations + (targetWedgeCenter - (state.wheelAngle % (Math.PI * 2)));

  const startAngle = state.wheelAngle;
  const duration = 3800; // ms
  const startTime = performance.now();
  let lastSlice = -1;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Cubic bezier ease-out
    const ease = 1 - Math.pow(1 - progress, 3.8);

    state.wheelAngle = startAngle + (finalAngle - startAngle) * ease;
    drawWheel(state.wheelAngle);

    // Click sound when passing a peg
    const currentSlice = Math.floor((state.wheelAngle / arc) % count);
    if (currentSlice !== lastSlice) {
      sounds.playTick(1 + (progress * 0.5));
      lastSlice = currentSlice;
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => {
        celebrateWinner(winner);
      }, 400);
    }
  }

  requestAnimationFrame(animate);
}

// ANIMATION 3: SCRAMBLE
function runScrambleAnimation(winner) {
  resetStageViews();
  const stageScramble = document.getElementById('stageScramble');
  const display = document.getElementById('scrambleDisplay');
  stageScramble.classList.remove('hidden');

  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?';
  const duration = 2800;
  const startTime = performance.now();

  let blipTick = 0;
  const interval = setInterval(() => {
    const now = performance.now();
    const progress = Math.min(1, (now - startTime) / duration);

    // Random characters length matches winner
    let text = '';
    const revealedLength = Math.floor(progress * winner.length);

    for (let i = 0; i < winner.length; i++) {
      if (i < revealedLength) {
        text += winner[i];
      } else {
        text += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
    }

    display.textContent = text;
    blipTick++;
    if (blipTick % 3 === 0) {
      sounds.playTick(0.9 + Math.random() * 0.6);
    }

    if (progress >= 1) {
      clearInterval(interval);
      display.textContent = winner;
      setTimeout(() => celebrateWinner(winner), 400);
    }
  }, 45);
}

// ANIMATION 4: ELIMINATION (KNOCKOUT ROYALE)
function runEliminationAnimation(winner) {
  resetStageViews();
  const stageElimination = document.getElementById('stageElimination');
  const grid = document.getElementById('eliminationGrid');
  const status = document.getElementById('eliminationStatus');
  stageElimination.classList.remove('hidden');

  // Populate grid with all contenders
  grid.innerHTML = state.contestants
    .map(
      (name) => `
    <div id="elim-${escapeHtml(name)}" class="p-2.5 rounded-xl bg-[#17122D] border border-[#2D2352] text-xs font-bold text-slate-200 text-center transition-all duration-300 flex items-center justify-center gap-1.5">
      <span>⚔️</span>
      <span class="truncate">${escapeHtml(name)}</span>
    </div>
  `
    )
    .join('');

  // Queue of names to eliminate until only the winner remains
  const toEliminate = state.contestants.filter((n) => n !== winner);
  // Shuffle elimination order
  for (let i = toEliminate.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [toEliminate[i], toEliminate[j]] = [toEliminate[j], toEliminate[i]];
  }

  status.textContent = `${state.contestants.length} contenders alive in the arena...`;

  let step = 0;
  const stepDelay = Math.max(350, Math.min(700, 3200 / (toEliminate.length || 1)));

  function eliminateNext() {
    if (step < toEliminate.length) {
      const victim = toEliminate[step];
      const el = document.getElementById(`elim-${victim}`);
      if (el) {
        el.className = 'p-2.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-500/70 text-xs font-bold text-center line-through opacity-50 scale-95 transition-all';
        el.innerHTML = `<span>💀</span><span class="truncate">${escapeHtml(victim)}</span>`;
      }
      sounds.playEliminationBuzz();
      step++;
      status.textContent = `${state.contestants.length - step} contenders remaining...`;
      setTimeout(eliminateNext, stepDelay);
    } else {
      // Sole survivor
      const survivorEl = document.getElementById(`elim-${winner}`);
      if (survivorEl) {
        survivorEl.className = 'p-2.5 rounded-xl bg-brandYellow border-2 border-white text-slate-950 text-xs font-black text-center scale-110 shadow-xl glow-yellow transition-all';
        survivorEl.innerHTML = `<span>👑</span><span class="truncate">${escapeHtml(winner)}</span>`;
      }
      status.textContent = `👑 SURVIVOR: ${winner}!`;
      setTimeout(() => celebrateWinner(winner), 700);
    }
  }

  setTimeout(eliminateNext, 600);
}

// --- 8. WINNER CELEBRATION ---
function celebrateWinner(winner) {
  state.isDrawing = false;
  document.getElementById('pickWinnerBtn').disabled = false;
  document.getElementById('pickWinnerBtn').classList.remove('opacity-70', 'cursor-not-allowed');

  resetStageViews();
  const stageWinner = document.getElementById('stageWinner');
  const winnerNameText = document.getElementById('winnerNameText');
  const winnerSubtitle = document.getElementById('winnerSubtitle');

  winnerNameText.textContent = winner;
  winnerSubtitle.textContent = `Chosen with fair uniform 1/${state.contestants.length} probability in ${getModeLabel(state.mode)} mode.`;
  stageWinner.classList.remove('hidden');

  // Trigger win sound
  const custom = state.customSettings[winner];
  const soundKey = (custom && custom.sound) || 'fanfare';
  sounds.playWinnerSound(soundKey);

  // Trigger confetti burst
  if (state.confetti) {
    state.confetti.burst(110);
  }

  // Record round history
  const roundItem = {
    winner,
    mode: getModeLabel(state.mode),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
  state.roundHistory.unshift(roundItem);
  renderHistory();

  // If "Winners sit out" is checked, bench the winner!
  const sitOutCheckbox = document.getElementById('winnersSitOutCheckbox');
  if (sitOutCheckbox && sitOutCheckbox.checked) {
    benchContestant(winner);
  }
}

function getModeLabel(m) {
  switch (m) {
    case 'slot': return 'Slot Reel 🎰';
    case 'wheel': return 'Spin Wheel 🎡';
    case 'scramble': return 'Scramble 🔀';
    case 'elimination': return 'Elimination ⚔️';
    default: return m;
  }
}

function benchContestant(winner) {
  state.contestants = state.contestants.filter((n) => n !== winner);
  state.benchedContestants.push(winner);

  document.getElementById('contestantsInput').value = state.contestants.join('\n');
  updateContestantUI();
  updateBenchedUI();
  if (state.mode === 'wheel') drawWheel();

  showToast(`🏁 ${winner} is benched for future rounds!`);
}

function updateBenchedUI() {
  const card = document.getElementById('benchedCard');
  const countBadge = document.getElementById('benchedCountBadge');
  const countSpan = document.getElementById('benchedCount');
  const listEl = document.getElementById('benchedList');

  const benched = state.benchedContestants;
  if (benched.length > 0) {
    card.classList.remove('hidden');
    countBadge.classList.remove('hidden');
    countBadge.textContent = `(${benched.length} benched)`;
    countSpan.textContent = benched.length;

    listEl.innerHTML = benched
      .map(
        (name) => `
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1B1435] border border-[#2D2254] text-xs text-slate-300">
        <span>🪑 ${escapeHtml(name)}</span>
        <button onclick="restoreBenched('${escapeHtml(name)}')" class="text-amber-400 hover:text-white text-xs font-bold" title="Return to active pool">✕</button>
      </div>
    `
      )
      .join('');
  } else {
    card.classList.add('hidden');
    countBadge.classList.add('hidden');
  }
}

window.restoreBenched = function (name) {
  state.benchedContestants = state.benchedContestants.filter((n) => n !== name);
  if (!state.contestants.includes(name)) {
    state.contestants.push(name);
  }
  document.getElementById('contestantsInput').value = state.contestants.join('\n');
  updateContestantUI();
  updateBenchedUI();
  if (state.mode === 'wheel') drawWheel();
  showToast(`Restored ${name} to active pool! ✨`);
};

window.restoreAllBenched = function () {
  state.benchedContestants.forEach((name) => {
    if (!state.contestants.includes(name)) {
      state.contestants.push(name);
    }
  });
  state.benchedContestants = [];
  document.getElementById('contestantsInput').value = state.contestants.join('\n');
  updateContestantUI();
  updateBenchedUI();
  if (state.mode === 'wheel') drawWheel();
  showToast('All benched contestants returned to pool! 🚀');
};

window.dismissWinnerModal = function () {
  resetStageViews();
  if (state.mode === 'wheel') {
    document.getElementById('stageWheel').classList.remove('hidden');
    drawWheel();
  } else {
    document.getElementById('stageIdle').classList.remove('hidden');
  }
};

window.copyWinnerText = function () {
  const winner = document.getElementById('winnerNameText').textContent;
  if (!winner) return;

  navigator.clipboard.writeText(winner).then(() => {
    document.getElementById('copyWinnerIcon').textContent = '✅';
    document.getElementById('copyWinnerLabel').textContent = 'Copied!';
    setTimeout(() => {
      document.getElementById('copyWinnerIcon').textContent = '📋';
      document.getElementById('copyWinnerLabel').textContent = 'Copy Name';
    }, 1500);
  });
};

function renderHistory() {
  const list = document.getElementById('historyList');
  if (!list) return;

  if (state.roundHistory.length === 0) {
    list.innerHTML = '<div class="text-center py-4 text-slate-600 italic">No winners drawn yet this session.</div>';
    return;
  }

  list.innerHTML = state.roundHistory
    .map(
      (item) => `
    <div class="flex items-center justify-between p-2 rounded-xl bg-[#110D20] border border-[#231A3E]">
      <div class="flex items-center gap-2">
        <span class="text-brandYellow font-bold">🏆</span>
        <span class="font-display font-bold text-white text-xs">${escapeHtml(item.winner)}</span>
      </div>
      <div class="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
        <span>${item.mode}</span>
        <span>${item.timestamp}</span>
      </div>
    </div>
  `
    )
    .join('');
}

window.clearHistory = function () {
  state.roundHistory = [];
  renderHistory();
  showToast('Round history cleared.');
};

// --- 9. TAB 2: NAME GENERATOR LOGIC ---
window.selectCategory = function (cat) {
  state.selectedCategory = cat;
  const cats = ['baby', 'pet', 'gamertag', 'social', 'full', 'fantasy'];
  cats.forEach((c) => {
    const btn = document.getElementById(`catBtn-${c}`);
    if (btn) {
      if (c === cat) {
        btn.className = 'cat-btn p-3 rounded-xl border border-brandYellow bg-brandYellow/10 text-brandYellow text-center font-bold text-xs transition-all';
      } else {
        btn.className = 'cat-btn p-3 rounded-xl border border-[#271E47] bg-[#141026] text-slate-300 hover:text-white text-center font-bold text-xs transition-all';
      }
    }
  });

  generateNames();
};

window.generateNames = function () {
  const cat = state.selectedCategory || 'baby';
  const subStyle = document.getElementById('subStyleFilter').value || 'all';
  const letter = document.getElementById('letterFilter').value || 'any';
  const batchSize = parseInt(document.getElementById('batchSizeSlider').value || '6', 10);

  const catData = GENERATOR_DATABASE[cat] || GENERATOR_DATABASE.baby;
  let pool = [];

  if (subStyle === 'all') {
    Object.values(catData).forEach((list) => {
      pool.push(...list);
    });
  } else {
    pool = [...(catData[subStyle] || catData.cute || [])];
  }

  // Filter by starts with letter
  if (letter !== 'any') {
    pool = pool.filter((name) => name.toUpperCase().startsWith(letter.toUpperCase()));
    // If pool exhausted with letter, generate synthetic variation
    if (pool.length === 0) {
      pool = [`${letter}aden`, `${letter}ora`, `${letter}yper`, `${letter}tar`, `${letter}ero`];
    }
  }

  // Shuffle and pick batchSize
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, batchSize);

  renderGeneratedCards(selected, cat);
};

function renderGeneratedCards(names, cat) {
  const grid = document.getElementById('generatedCardsGrid');
  if (!grid) return;

  grid.innerHTML = names
    .map((name) => {
      const isFav = state.savedFavorites.some((f) => f.name === name);
      return `
      <div class="bg-brandCard border border-brandCardBorder hover:border-brandPurple/50 rounded-2xl p-4 space-y-3 shadow-lg transition-all group">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono uppercase tracking-wider text-brandPurpleLight bg-brandPurple/20 px-2 py-0.5 rounded-full">
            ${cat}
          </span>
          <button onclick="toggleFavorite('${escapeHtml(name)}', '${cat}')" class="text-base hover:scale-125 transition-transform ${isFav ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}" title="Save Favorite">
            ${isFav ? '★' : '☆'}
          </button>
        </div>

        <div class="font-display font-extrabold text-lg text-white group-hover:text-brandYellow transition-colors">
          ${escapeHtml(name)}
        </div>

        <div class="flex items-center justify-between gap-2 pt-2 border-t border-[#231A3E]">
          <button onclick="copyGenerated('${escapeHtml(name)}', this)" class="px-2.5 py-1 rounded-lg bg-[#1D1735] hover:bg-[#2A214D] text-[11px] font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1">
            <span>📋</span>
            <span>Copy</span>
          </button>
          <button onclick="addSingleToPicker('${escapeHtml(name)}')" class="px-2.5 py-1 rounded-lg bg-brandYellow/10 hover:bg-brandYellow/20 text-brandYellow text-[11px] font-semibold transition-colors flex items-center gap-1">
            <span>➕</span>
            <span>Add to Picker</span>
          </button>
        </div>
      </div>
    `;
    })
    .join('');
}

window.copyGenerated = function (name, btn) {
  navigator.clipboard.writeText(name).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>✅</span><span>Copied!</span>';
    setTimeout(() => (btn.innerHTML = orig), 1200);
  });
};

window.addSingleToPicker = function (name) {
  if (!state.contestants.includes(name)) {
    state.contestants.push(name);
    document.getElementById('contestantsInput').value = state.contestants.join('\n');
    updateContestantUI();
    if (state.mode === 'wheel') drawWheel();
    showToast(`Added "${name}" to contestants! ✨`);
  } else {
    showToast(`"${name}" is already in the contestant list!`);
  }
};

window.addAllToPicker = function () {
  const cards = document.querySelectorAll('#generatedCardsGrid .font-display');
  let added = 0;
  cards.forEach((c) => {
    const name = c.textContent.trim();
    if (name && !state.contestants.includes(name)) {
      state.contestants.push(name);
      added++;
    }
  });

  if (added > 0) {
    document.getElementById('contestantsInput').value = state.contestants.join('\n');
    updateContestantUI();
    if (state.mode === 'wheel') drawWheel();
    showToast(`Added ${added} new names to contestants! 🚀`);
  } else {
    showToast('All generated names are already in the list.');
  }
};

// --- 10. SAVED FAVORITES SYSTEM ---
window.toggleFavorite = function (name, cat) {
  const index = state.savedFavorites.findIndex((f) => f.name === name);
  if (index >= 0) {
    state.savedFavorites.splice(index, 1);
    showToast(`Removed "${name}" from favorites.`);
  } else {
    state.savedFavorites.push({ name, cat });
    showToast(`Saved "${name}" to favorites! ⭐`);
  }
  updateFavoritesUI();
  // Re-render current cards to update stars
  const subStyle = document.getElementById('subStyleFilter').value || 'all';
  const letter = document.getElementById('letterFilter').value || 'any';
  const batchSize = parseInt(document.getElementById('batchSizeSlider').value || '6', 10);
  const catData = GENERATOR_DATABASE[cat] || GENERATOR_DATABASE.baby;
  let pool = catData[subStyle] || catData.cute || [];
  renderGeneratedCards(pool.slice(0, batchSize), cat);
};

function updateFavoritesUI() {
  const countSpan = document.getElementById('favCount');
  if (countSpan) countSpan.textContent = state.savedFavorites.length;

  const list = document.getElementById('favoritesList');
  if (!list) return;

  if (state.savedFavorites.length === 0) {
    list.innerHTML = '<div class="text-center py-8 text-xs text-slate-500 italic">No favorite names saved yet. Click the star on any generated name!</div>';
    return;
  }

  list.innerHTML = state.savedFavorites
    .map(
      (f) => `
    <div class="flex items-center justify-between p-2.5 rounded-xl bg-[#191330] border border-[#2B214C]">
      <div>
        <div class="font-display font-bold text-xs text-white">${escapeHtml(f.name)}</div>
        <div class="text-[10px] text-slate-400 uppercase font-mono">${f.cat}</div>
      </div>
      <div class="flex items-center gap-1.5">
        <button onclick="addSingleToPicker('${escapeHtml(f.name)}')" class="px-2 py-0.5 rounded bg-brandYellow/10 text-brandYellow text-[10px] font-semibold hover:bg-brandYellow/20">
          + Add
        </button>
        <button onclick="toggleFavorite('${escapeHtml(f.name)}', '${f.cat}')" class="text-slate-500 hover:text-rose-400 text-xs px-1">
          ✕
        </button>
      </div>
    </div>
  `
    )
    .join('');
}

window.toggleFavoritesDrawer = function () {
  const drawer = document.getElementById('favoritesDrawer');
  if (drawer) {
    drawer.classList.toggle('hidden');
  }
};

window.copyAllFavorites = function () {
  if (state.savedFavorites.length === 0) {
    showToast('No favorites to copy!');
    return;
  }
  const text = state.savedFavorites.map((f) => f.name).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${state.savedFavorites.length} favorite names! 📋`);
  });
};

// --- 11. 1,000 ROLL UNIFORM FAIRNESS SIMULATOR ---
window.runFairnessSimulation = function () {
  const items = state.contestants;
  if (!items || items.length === 0) {
    showToast('Add contestants to test distribution!');
    return;
  }

  const counts = {};
  items.forEach((n) => (counts[n] = 0));

  const TOTAL = 1000;
  for (let i = 0; i < TOTAL; i++) {
    const { winner } = selectUniformRandom(items);
    counts[winner] = (counts[winner] || 0) + 1;
  }

  const expectedPct = (100 / items.length).toFixed(1);
  const container = document.getElementById('simChartContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="text-xs text-slate-400 mb-2 font-mono flex items-center justify-between">
      <span>1,000 Total Random Trials</span>
      <span>Theoretical Exact: ~${expectedPct}% per contestant</span>
    </div>
    <div class="space-y-2">
      ${items
        .map((name) => {
          const count = counts[name] || 0;
          const pct = ((count / TOTAL) * 100).toFixed(1);
          return `
          <div class="space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="font-semibold text-slate-200">${escapeHtml(name)}</span>
              <span class="font-mono text-brandYellow text-[11px]">${count} rolls (${pct}%)</span>
            </div>
            <div class="h-2 w-full bg-[#110D20] rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-brandPurple to-brandYellow rounded-full transition-all duration-500" style="width: ${Math.min(100, (pct / expectedPct) * 50)}%;"></div>
            </div>
          </div>
        `;
        })
        .join('')}
    </div>
  `;

  sounds.playTick(1.3);
  showToast('1,000 roll simulation completed! 📊');
};

// --- 12. PRO MODAL & TOAST UTILITIES ---
window.openUpgradeModal = function () {
  const modal = document.getElementById('upgradeModal');
  if (modal) modal.classList.remove('hidden');
};

window.closeUpgradeModal = function () {
  const modal = document.getElementById('upgradeModal');
  if (modal) modal.classList.add('hidden');
};

window.activateProDemo = function () {
  closeUpgradeModal();
  showToast('✨ Pro Trial Activated! Enjoy unlimited modes!');
};

function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2400);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
