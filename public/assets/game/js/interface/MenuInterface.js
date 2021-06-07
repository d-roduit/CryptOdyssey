const myself = document.getElementById('menu-interface');
const muteMusicBtn = document.getElementById('mute-music-btn');
const backToGameBtn = document.getElementById('back-to-game-btn');

// Music
const backgroundMusic = new Audio('assets/game/sounds/TownTheme.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.05;

const MenuInterface = {
    myself,
    settings: {
        music: {
            button: muteMusicBtn,
            isMuted() {
                return backgroundMusic.muted;
            },
            mute() {
                backgroundMusic.muted = true;
                this.button.textContent = 'OFF';
            },
            unmute() {
                backgroundMusic.muted = false;
                this.button.textContent = 'ON';
            },
            play() {
                backgroundMusic.play();
            },
        },
    },
    backToGameBtn,
    isOpen: false,
    show() {
        if (this.isOpen) return;
        myself.style.display = 'flex';
        this.isOpen = true;
    },
    hide() {
        if (!this.isOpen) return;
        myself.style.display = 'none';
        this.isOpen = false;
    },
};

export default MenuInterface;
