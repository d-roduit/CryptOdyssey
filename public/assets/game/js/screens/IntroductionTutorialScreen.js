export const myself = document.getElementById('introduction-tutorial-screen');
export const playernameSpan = document.getElementById('introduction-tutorial-screen-playername');
export const goToMarketTutorialScreenBtn = document.getElementById('go-to-market-tutorial-screen');

export const show = () => {
    myself.style.display = 'flex';
};

export const hide = () => {
    myself.style.display = 'none';
};
