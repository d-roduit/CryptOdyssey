const myself = document.getElementById('presentation-screen');
const startGameButton = document.getElementById('start-game');

const show = () => {
    myself.style.display = 'flex';
};

const hide = () => {
    myself.style.display = 'none';
};

export default {
    myself,
    startGameButton,
    show,
    hide,
};
