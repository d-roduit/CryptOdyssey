const myself = document.getElementById('mine-tutorial-screen');
const goToEndTutorialScreenBtn = document.getElementById('go-to-end-tutorial-screen');

const show = () => {
    myself.style.display = 'flex';
};

const hide = () => {
    myself.style.display = 'none';
};

export default {
    myself,
    goToEndTutorialScreenBtn,
    show,
    hide,
};
