const myself = document.getElementById('market-tutorial-screen');
const goToMineTutorialScreenBtn = document.getElementById('go-to-mine-tutorial-screen');

const show = () => {
    myself.style.display = 'flex';
};

const hide = () => {
    myself.style.display = 'none';
};

export default {
    myself,
    goToMineTutorialScreenBtn,
    show,
    hide,
};
