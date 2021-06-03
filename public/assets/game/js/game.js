import * as PresentationScreen from './PresentationScreen.js';
import * as PlayerInfoScreen from './PlayerInfoScreen.js';
import * as LocationManager from './LocationManager.js';
import * as GameAnimation from './gameAnimation.js';
import PlayerDB from './PlayerDB.js';
import Player from './Player.js';

let player = null;

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
    const playername = PlayerInfoScreen.playerNameInput.value;
    const playerCountryCode = PlayerInfoScreen.playerCountry.getAttribute('data-value');

    const errorMessages = {
        playername: [],
        playerCountryCode: [],
    };

    // Check if playername resepects the 3-20 length
    if (playername.length < 3 || playername.length > 20) {
        errorMessages.playername.push('Player name must be between 3 and 20 characters.');
    }

    // Check that playername does not contain any space
    if (playername.includes(' ')) {
        errorMessages.playername.push('Player name cannot contain spaces.');
    }

    // Check if playerCountryCode is a countryCode that we have in our list
    // if (countriesInfo[playerCountryCode] != UNDEFIED OR NULL)

    if (errorMessages.playername.length > 0) {
        // Afficher toujours le premier message d'erreur ici
        return;
    }

    PlayerDB.get(playername)
        .then((playerFromDB) => { // playerFromDB can be either null or an instance of Player class.
            // If player does not exist in DB
            if (playerFromDB === null) {
                // Create the player
                console.log(`Player ${playername} does not exist. Creating the player...`);
                player = new Player(playername);
                player.countryCode = playerCountryCode;
                console.log(`Saving player ${player.toJSON()} to DB...`);
                PlayerDB.save(player);
            } else {
                console.log(`Player ${playername} found in DB.`);
                player = playerFromDB;
                player.countryCode = playerCountryCode;
                console.log(`Updating player ${player.toJSON()} in DB...`);
                PlayerDB.update(player);
            }

            console.log(player.toJSON());

            PlayerInfoScreen.hide();
            GameAnimation.backgroundMusic.play();
            GameAnimation.startAnimating(18);
        })
        .catch((err) => console.log(err));

    // if (player != null) {
    //     PlayerInfoScreen.hide();
    // } else {
    //     player = new Player(playername);
    //     player.countryCode = playerCountryCode;

    //     PlayerDB.save(player)
    //         .then(() => {
    //             PlayerInfoScreen.hide();
    //         })
    //         .catch((err) => console.log(`Error: ${err.message}`));
    // }
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
