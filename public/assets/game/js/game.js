import * as PresentationScreen from './PresentationScreen.js';
import * as PlayerInfoScreen from './PlayerInfoScreen.js';
import * as LocationManager from './LocationManager.js';
import Player from './Player.js';
import * as GameAnimation from './gameAnimation.js';

// const player = new Player();

// Show the first screen (presentation screen)
PresentationScreen.show();

PresentationScreen.startGameButton.addEventListener('click', () => {
    PresentationScreen.hide();
    PlayerInfoScreen.show();
});

PlayerInfoScreen.autodetectCountryButton.addEventListener('click', () => {
    const playerCountryLabel = document.getElementById('player-country-label');
    const tempPlayerCountryLabelContent = playerCountryLabel.textContent;
    const spinnerIcon = '<i style="font-size:15px;" class="fas fa-spinner fa-pulse"></i>';

    playerCountryLabel.innerHTML = `${tempPlayerCountryLabelContent} ${spinnerIcon}`;

    LocationManager.getUserCountryCode().then((countryCode) => {
        const countryInfo = LocationManager.getCountryInfo(countryCode);
        PlayerInfoScreen.updatePlayerCountry(countryCode, `${countryInfo.flag} ${countryInfo.name}`);
        console.log(`Your country code is : ${countryCode} ${countryInfo.flag}`);
        playerCountryLabel.textContent = tempPlayerCountryLabelContent;
    }).catch((err) => {
        console.log(`Error: ${err}`);
        playerCountryLabel.textContent = tempPlayerCountryLabelContent;
    });
});

PlayerInfoScreen.playGameButton.addEventListener('click', () => {
    PlayerInfoScreen.hide();
    GameAnimation.backgroundMusic.play();
    GameAnimation.startAnimating(18);
});

// const validatePlayerNameInput = () => {

// };

// PlayerInfoScreen.playerNameInput.addEventListener('keydown', checkPlayerName);

// const bitcoinSpan = document.getElementById('bitcoinSpan');
// const ethereumSpan = document.getElementById('ethereumSpan');
// const swissborgSpan = document.getElementById('swissborgSpan');
// const tetherSpan = document.getElementById('tetherSpan');
// const cardanoSpan = document.getElementById('cardanoSpan');

// if (typeof (EventSource) !== 'undefined') {
//     const source = new EventSource('http://localhost:3000/sse/registerCryptoUpdates');
//     source.onmessage = (event) => {
//         const data = JSON.parse(event.data);

//         bitcoinSpan.textContent = data.bitcoin;
//         ethereumSpan.textContent = data.ethereum;
//         swissborgSpan.textContent = data.swissborg;
//         tetherSpan.textContent = data.tether;
//         cardanoSpan.textContent = data.cardano;
//     };
// } else {
//     console.log('Sorry, your browser does not support server-sent events...');
// }
