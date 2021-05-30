import countriesInfo from './countriesInfo.js';

class PlayerCountrySelect {
    constructor() {
        this.myself = document.getElementById('player-country-select');
        this.playerCountry = document.getElementById('player-country');
        this.optionsContainer = document.getElementById('options-container');
        this.isOpened = false;
        this.isInitialized = false;
    }

    open() {
        this.optionsContainer.classList.add('opened-options-container');
        this.optionsContainer.scrollTop = 0;
        this.isOpened = true;
    }

    close() {
        this.optionsContainer.classList.remove('opened-options-container');
        this.isOpened = false;
    }

    updatePlayerCountry(countryCode, textContent) {
        this.playerCountry.setAttribute('data-value', countryCode);
        this.playerCountry.textContent = textContent;
    }

    initializeOptions() {
        const countryEntries = Object.entries(countriesInfo);

        const [firstCountryCode, firstCountryObject] = countryEntries[0];

        this.updatePlayerCountry(firstCountryCode, `${firstCountryObject.flag} ${firstCountryObject.name}`);

        // Create options
        countryEntries.forEach(([countryCode, countryObject]) => {
            const option = document.createElement('li');
            option.classList.add('option');
            option.setAttribute('data-value', countryCode);
            option.textContent = `${countryObject.flag} ${countryObject.name}`;

            this.optionsContainer.appendChild(option);
        });
    }

    initializeEventListener() {
        this.myself.addEventListener('click', (playerCountryClickEvent) => {
            if (!this.isOpened) {
                this.open();

                playerCountryClickEvent.stopPropagation();

                document.addEventListener('click', (documentClickEvent) => {
                    const isOptionClicked = this.optionsContainer.contains(documentClickEvent.target) && documentClickEvent.target.classList.contains('option');

                    if (isOptionClicked) {
                        const countryCode = documentClickEvent.target.getAttribute('data-value');
                        const { textContent } = documentClickEvent.target;
                        this.updatePlayerCountry(countryCode, textContent);
                    }

                    this.close();
                }, { once: true });
            }
        });
    }

    initialize() {
        if (!this.isInitialized) {
            this.initializeOptions();
            this.initializeEventListener();
            this.isInitialized = true;
        }
    }
}

// Fill player-country with countries and attach event listeners
const playerCountrySelect = new PlayerCountrySelect();
playerCountrySelect.initialize();

export const updatePlayerCountry = (countryCode, textContent) => {
    playerCountrySelect.updatePlayerCountry(countryCode, textContent);
};

export const myself = document.getElementById('player-info-screen');
export const playerNameInput = document.getElementById('player-name');
export const playerCountry = document.getElementById('player-country');
export const autodetectCountryButton = document.getElementById('autodetect-country');
export const playGameButton = document.getElementById('play-game');

export const show = () => {
    myself.style.display = 'flex';
};

export const hide = () => {
    myself.style.display = 'none';
};
