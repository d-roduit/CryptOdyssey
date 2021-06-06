import countriesInfo from '../countriesInfo.js';
import * as LocationManager from '../LocationManager.js';

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

    updatePlayerCountry(countryCode) {
        const countryInfo = countriesInfo[countryCode];

        this.playerCountry.setAttribute('data-value', countryCode);
        this.playerCountry.innerHTML = '';

        const flagImage = document.createElement('img');
        flagImage.src = countryInfo.flag;
        flagImage.classList.add('country-flag');

        const countryNameTextNode = document.createTextNode(countryInfo.name);

        this.playerCountry.appendChild(flagImage);
        this.playerCountry.appendChild(countryNameTextNode);
    }

    initializeOptions() {
        const countryEntries = Object.entries(countriesInfo);

        const defaultCountryCode = 'DEFAULT';

        this.updatePlayerCountry(defaultCountryCode);

        // Create options
        countryEntries.forEach(([countryCode, countryInfo]) => {
            const option = document.createElement('li');
            option.classList.add('option');
            option.setAttribute('data-value', countryCode);

            const flagImage = document.createElement('img');
            flagImage.src = countryInfo.flag;
            flagImage.classList.add('country-flag');

            const countryNameTextNode = document.createTextNode(countryInfo.name);

            option.appendChild(flagImage);
            option.appendChild(countryNameTextNode);

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
                        this.updatePlayerCountry(countryCode);
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

const updatePlayerCountry = (countryCode, textContent) => {
    playerCountrySelect.updatePlayerCountry(countryCode, textContent);
};

const myself = document.getElementById('player-info-screen');
const playerNameInput = document.getElementById('player-name');
const playerNameErrorField = document.getElementById('player-name-error-field');
const playerCountry = document.getElementById('player-country');
const playerCountryLabel = document.getElementById('player-country-label');
const playerCountryErrorField = document.getElementById('player-country-error-field');
const autodetectCountryButton = document.getElementById('autodetect-country');
const playGameButton = document.getElementById('play-game');

autodetectCountryButton.addEventListener('click', () => {
    const tempPlayerCountryLabelContent = playerCountryLabel.textContent;
    const spinnerIcon = '<i style="font-size:15px;" class="fas fa-spinner fa-pulse"></i>';

    playerCountryLabel.innerHTML = `${tempPlayerCountryLabelContent} ${spinnerIcon}`;

    LocationManager.getUserCountryCode().then((countryCode) => {
        const countryInfo = LocationManager.getCountryInfo(countryCode);
        updatePlayerCountry(countryCode, `${countryInfo.flag} ${countryInfo.name}`);
        playerCountryLabel.textContent = tempPlayerCountryLabelContent;
    }).catch((err) => {
        console.log(`Error: ${err}`);
        playerCountryLabel.textContent = tempPlayerCountryLabelContent;
    });
});

const show = () => {
    myself.style.display = 'flex';
};

const hide = () => {
    myself.style.display = 'none';
};

export default {
    updatePlayerCountry,
    myself,
    playerNameInput,
    playerNameErrorField,
    playerCountry,
    playerCountryErrorField,
    autodetectCountryButton,
    playGameButton,
    show,
    hide,
};
