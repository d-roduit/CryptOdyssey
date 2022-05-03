const myself = document.getElementById('end-tutorial-screen');
const goToGameBtn = document.getElementById('go-to-game');

const show = () => {
    myself.style.display = 'flex';
};

const hide = () => {
    myself.style.display = 'none';
};

export default {
    myself,
    goToGameBtn,
    show,
    hide,
};
