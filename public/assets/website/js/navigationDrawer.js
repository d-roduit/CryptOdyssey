const hamburgerButton = document.getElementById('hamburger-button');
const navigation = document.querySelector('nav');

const drawer = {
    isOpened: false,
    open() {
        navigation.classList.add('opened-drawer');
        this.isOpened = true;
    },
    close() {
        navigation.classList.remove('opened-drawer');
        this.isOpened = false;
    },
    toggle() {
        if (this.isOpened) {
            this.close();
        } else {
            this.open();
        }
    },
};

hamburgerButton.addEventListener('click', () => {
    drawer.toggle();
});

window.addEventListener('resize', () => {
    if (drawer.isOpened && window.outerWidth >= 768) {
        drawer.close();
    }
});
