// Audio Manager
class AudioManager {
    constructor() {
        this.sounds = {
            correct: new Audio('sounds/correct.mp3'),
            wrong: new Audio('sounds/wrong.wav'),
            hint: new Audio('sounds/hint.wav'),
            levelUp: new Audio('sounds/level-up.wav'),
            click: new Audio('sounds/click.wav'),
            characterSelect: new Audio('sounds/character-select.mp3'),
            pop: new Audio('sounds/pop.wav')
        };

        // Set default volumes
        this.sounds.correct.volume = 0.5;
        this.sounds.wrong.volume = 0.3;
        this.sounds.hint.volume = 0.4;
        this.sounds.levelUp.volume = 0.6;
        this.sounds.click.volume = 0.2;
        this.sounds.characterSelect.volume = 0.4;
        this.sounds.pop.volume = 0.3;

        // Initialize mute state
        this.isMuted = false;
    }

    playSound(soundName) {
        if (this.isMuted || !this.sounds[soundName]) return;
        
        // Stop the sound if it's already playing
        this.sounds[soundName].currentTime = 0;
        
        // Play the sound
        this.sounds[soundName].play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    // Preload all sounds
    preloadSounds() {
        Object.values(this.sounds).forEach(sound => {
            sound.load();
        });
    }
}

// Create global audio manager instance
const audioManager = new AudioManager(); 