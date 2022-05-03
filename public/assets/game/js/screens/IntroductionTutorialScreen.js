const myself = document.getElementById('introduction-tutorial-screen');
const playernameSpan = document.getElementById('introduction-tutorial-screen-playername');
const goToMarketTutorialScreenBtn = document.getElementById('go-to-market-tutorial-screen');

const show = () => {
    myself.style.display = 'flex';
};

const hide = () => {
    myself.style.display = 'none';
};

export default {
    myself,
    playernameSpan,
    goToMarketTutorialScreenBtn,
    show,
    hide,
};
