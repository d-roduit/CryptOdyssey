import countriesInfo from './countriesInfo.js';
import * as PresentationScreen from './screens/PresentationScreen.js';
import PlayerInfoScreen from './screens/PlayerInfoScreen.js';
import * as IntroductionTutorialScreen from './screens/IntroductionTutorialScreen.js';
import * as MarketTutorialScreen from './screens/MarketTutorialScreen.js';
import * as MineTutorialScreen from './screens/MineTutorialScreen.js';
import * as EndTutorialScreen from './screens/EndTutorialScreen.js';
import * as GameAnimation from './gameAnimation.js';
import PlayerDB from './PlayerDB.js';
import Player from './Player.js';
import CookieManager from './CookieManager.js';
import CryptoPricesInterface from './interface/CryptoPricesInterface.js';
import CryptoUpdatesManager from './CryptoUpdatesManager.js';
import MenuInterface from './interface/MenuInterface.js';
import MarketInterface from './interface/MarketInterface.js';
import WalletInterface from './interface/WalletInterface.js';
import { character } from './character.js';

const nbDecimal = 3;

let player = null;

let cryptoPrices = {
    bitcoin: 0,
    ethereum: 0,
    swissborg: 0,
    tether: 0,
    cardano: 0,
};

const playerCoinValues = {
    bitcoin: 0,
    ethereum: 0,
    swissborg: 0,
    tether: 0,
    cardano: 0,
    update(playerParam, cryptoPricesParam) {
        this.bitcoin = parseFloat(
            (playerParam.wallet.crypto.bitcoin * cryptoPricesParam.bitcoin).toFixed(nbDecimal),
        );
        this.ethereum = parseFloat(
            (playerParam.wallet.crypto.ethereum * cryptoPricesParam.ethereum).toFixed(nbDecimal),
        );
        this.swissborg = parseFloat(
            (playerParam.wallet.crypto.swissborg * cryptoPricesParam.swissborg).toFixed(nbDecimal),
        );
        this.tether = parseFloat(
            (playerParam.wallet.crypto.tether * cryptoPricesParam.tether).toFixed(nbDecimal),
        );
        this.cardano = parseFloat(
            (playerParam.wallet.crypto.cardano * cryptoPricesParam.cardano).toFixed(nbDecimal),
        );
    },
};

const calculateExchange = () => {
    const amountToExchangeString = MarketInterface.market.exchangeAmountInput.value;

    if (amountToExchangeString === '') {
        MarketInterface.market.exchangeAmountResultElement.textContent = '--';
        return;
    }

    const amountToExchange = parseFloat(parseFloat(amountToExchangeString).toFixed(nbDecimal));

    const fromCurrencyString = MarketInterface.market.fromCurrencyElement.children[0]?.getAttribute('data-currency');
    const toCurrencyString = MarketInterface.market.toCurrencyElement.children[0]?.getAttribute('data-currency');

    if (fromCurrencyString && toCurrencyString) {
        const fromCurrencyCoinValue = cryptoPrices[fromCurrencyString] ?? 1;
        const toCurrencyCoinValue = cryptoPrices[toCurrencyString] ?? 1;

        const amountToCredit = parseFloat(
            (
                (amountToExchange * fromCurrencyCoinValue) / toCurrencyCoinValue
            ).toFixed(nbDecimal),
        );

        MarketInterface.market.exchangeAmountResultElement.textContent = amountToCredit;
    }
};

// Start updating the crypto prices
CryptoUpdatesManager.addUpdateListener((data) => {
    cryptoPrices = data;

    CryptoPricesInterface.update(cryptoPrices);

    if (player != null) {
        playerCoinValues.update(player, cryptoPrices);

        WalletInterface.update(player, playerCoinValues);

        MarketInterface.wallet.update(player, playerCoinValues);

        if (MarketInterface.isOpen) {
            calculateExchange();
        }
    }
});

const initializeGameListeners = () => {
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
        case 'Shift':
            if (!WalletInterface.isOpen && !MarketInterface.isOpen && !MenuInterface.isOpen) {
                CryptoPricesInterface.hide();
                WalletInterface.show();
                GameAnimation.pause();
            }
            break;
        case 'e':
            if (!MenuInterface.isOpen) {
                if (character.isInMarketZone) {
                    CryptoPricesInterface.hide();
                    MarketInterface.show();
                    GameAnimation.pause();
                }
            }
            break;
        case 'Escape':
            if (MarketInterface.isOpen) {
                MarketInterface.hide();
                CryptoPricesInterface.show();
                GameAnimation.play();
                return;
            }

            if (MenuInterface.isOpen) {
                MenuInterface.hide();
                CryptoPricesInterface.show();
                GameAnimation.play();
                return;
            }

            CryptoPricesInterface.hide();
            MenuInterface.show();
            GameAnimation.pause();
            break;
        default:
            break;
        }
    });

    window.addEventListener('keyup', (event) => {
        switch (event.key) {
        case 'Shift':
            if (WalletInterface.isOpen) {
                WalletInterface.hide();
                CryptoPricesInterface.show();
                GameAnimation.play();
            }
            break;
        default:
            break;
        }
    });

    MenuInterface.settings.music.button.addEventListener('click', () => {
        if (MenuInterface.settings.music.isMuted()) {
            MenuInterface.settings.music.unmute();
            player.settings.hasMutedMusic = false;
        } else {
            MenuInterface.settings.music.mute();
            player.settings.hasMutedMusic = true;
        }

        PlayerDB.update(player);
    });

    MenuInterface.backToGameBtn.addEventListener('click', () => {
        MenuInterface.hide();
        CryptoPricesInterface.show();
        GameAnimation.play();
    });

    MarketInterface.market.marketCloseBtn.addEventListener('click', () => {
        MarketInterface.hide();
        CryptoPricesInterface.show();
        GameAnimation.play();
    });

    MarketInterface.market.exchangeAmountInput.addEventListener('input', () => calculateExchange());

    MarketInterface.market.exchangeBtn.addEventListener('click', () => {
        const amountToExchangeString = MarketInterface.market.exchangeAmountInput.value;

        if (amountToExchangeString === '') {
            return;
        }

        const fromCurrencyString = MarketInterface.market.fromCurrencyElement.children[0]?.getAttribute('data-currency');
        const toCurrencyString = MarketInterface.market.toCurrencyElement.children[0]?.getAttribute('data-currency');

        if (!fromCurrencyString || !toCurrencyString) {
            return;
        }

        const amountToExchange = parseFloat(parseFloat(amountToExchangeString).toFixed(nbDecimal));

        const amountToCreditString = (
            MarketInterface.market.exchangeAmountResultElement.textContent.trim()
        );

        const numberRegex = new RegExp(`^[0-9]+([.][0-9]{0,${nbDecimal}})?$`);
        const isAmountToCreditStringValid = numberRegex.test(amountToCreditString);

        if (!isAmountToCreditStringValid) {
            return;
        }

        const amountToCredit = parseFloat(parseFloat(amountToCreditString).toFixed(nbDecimal));

        // Represent the amount of "fromCurrency" that the player has in its wallet
        const fromCurrencyPlayerAmount = (
            player.wallet[fromCurrencyString] ?? player.wallet.crypto[fromCurrencyString]
        );

        // Represent the amount of "toCurrency" that the player has in its wallet
        const toCurrencyPlayerAmount = (
            player.wallet?.[toCurrencyString] ?? player.wallet.crypto?.[toCurrencyString]
        );

        // If the player has in its wallet the currencies for the exchange
        if (typeof fromCurrencyPlayerAmount === 'undefined' || typeof toCurrencyPlayerAmount === 'undefined') {
            return;
        }

        if (amountToExchange > fromCurrencyPlayerAmount) {
            return;
        }

        // Substract from fromCurrency
        if (fromCurrencyString === 'coin') {
            const calculationAnswer = player.wallet[fromCurrencyString] - amountToExchange;
            player.wallet[fromCurrencyString] = parseFloat(
                parseFloat(calculationAnswer).toFixed(nbDecimal),
            );
        } else {
            const calculationAnswer = player.wallet.crypto[fromCurrencyString] - amountToExchange;
            player.wallet.crypto[fromCurrencyString] = parseFloat(
                parseFloat(calculationAnswer).toFixed(nbDecimal),
            );
        }

        // Add to toCurrency
        if (toCurrencyString === 'coin') {
            const calculationAnswer = player.wallet[toCurrencyString] + amountToCredit;
            player.wallet[toCurrencyString] = parseFloat(
                parseFloat(calculationAnswer).toFixed(nbDecimal),
            );
        } else {
            const calculationAnswer = player.wallet.crypto[toCurrencyString] + amountToCredit;
            player.wallet.crypto[toCurrencyString] = parseFloat(
                parseFloat(calculationAnswer).toFixed(nbDecimal),
            );
        }

        PlayerDB.update(player);

        playerCoinValues.update(player, cryptoPrices);

        MarketInterface.market.reset();
        MarketInterface.wallet.update(player, playerCoinValues);
        WalletInterface.update(player, playerCoinValues);
    });
};

/*----------------------------------
    PRE-GAME
----------------------------------*/

// Show the first screen (presentation screen)
PresentationScreen.show();

PresentationScreen.startGameButton.addEventListener('click', () => {
    if (typeof (EventSource) === 'undefined') {
        alert('The game requires the use of EventSource to properly work, but your browser do no support it. Please update your browser or use another one.');
        return;
    }

    PresentationScreen.hide();

    const playernameFromCookie = CookieManager.getCookie(CookieManager.cookies.playername);
    const countryCodeFromCookie = CookieManager.getCookie(CookieManager.cookies.countryCode);

    if (playernameFromCookie !== '') {
        PlayerInfoScreen.playerNameInput.value = playernameFromCookie;
    }

    if (countryCodeFromCookie !== '') {
        PlayerInfoScreen.updatePlayerCountry(countryCodeFromCookie);
    }

    PlayerInfoScreen.show();
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
    if (typeof countriesInfo[playerCountryCode] === 'undefined') {
        errorMessages.playerCountryCode.push('Please choose a country among those proposed.');
    }

    let hasErrors = false;

    if (errorMessages.playername.length > 0) {
        PlayerInfoScreen.playerNameErrorField.textContent = errorMessages.playername[0];
        hasErrors = true;
    } else {
        PlayerInfoScreen.playerNameErrorField.textContent = '';
    }

    if (errorMessages.playerCountryCode.length > 0) {
        PlayerInfoScreen.playerCountryErrorField.textContent = errorMessages.playerCountryCode[0];
        hasErrors = true;
    } else {
        PlayerInfoScreen.playerCountryErrorField.textContent = '';
    }

    if (hasErrors) {
        return;
    }

    PlayerDB.get(playername)
        .then((playerFromDB) => { // playerFromDB can be either null or an instance of Player class.
            // If player does not exist in DB
            if (playerFromDB === null) {
                // Create the player
                player = new Player(playername);
                player.countryCode = playerCountryCode;
                PlayerDB.save(player);
            } else {
                player = playerFromDB;
                player.countryCode = playerCountryCode;
                PlayerDB.update(player);
            }

            CookieManager.setCookie(CookieManager.cookies.playername, player.playername, 365);
            CookieManager.setCookie(CookieManager.cookies.countryCode, player.countryCode, 365);

            playerCoinValues.update(player, cryptoPrices);

            WalletInterface.update(player, playerCoinValues);
            MarketInterface.wallet.update(player, playerCoinValues);

            PlayerInfoScreen.hide();

            if (player.settings.hasMutedMusic) {
                MenuInterface.settings.music.mute();
            }

            MenuInterface.settings.music.play();

            if (!player.hasCompletedTutorial) {
                IntroductionTutorialScreen.playernameSpan.textContent = player.playername;
                IntroductionTutorialScreen.show();
                return;
            }

            CryptoPricesInterface.show();

            initializeGameListeners();

            GameAnimation.startAnimating(18);
        })
        .catch((err) => console.log(err));
});

/*----------------------------------
    TUTORIAL
----------------------------------*/

IntroductionTutorialScreen.goToMarketTutorialScreenBtn.addEventListener('click', () => {
    MarketTutorialScreen.show();
    IntroductionTutorialScreen.hide();
});

MarketTutorialScreen.goToMineTutorialScreenBtn.addEventListener('click', () => {
    MineTutorialScreen.show();
    MarketTutorialScreen.hide();
});

MineTutorialScreen.goToEndTutorialScreenBtn.addEventListener('click', () => {
    EndTutorialScreen.show();
    MineTutorialScreen.hide();
});

EndTutorialScreen.goToGameBtn.addEventListener('click', () => {
    EndTutorialScreen.hide();

    player.hasCompletedTutorial = true;
    PlayerDB.update(player);

    CryptoPricesInterface.show();

    initializeGameListeners();

    GameAnimation.startAnimating(18);
});

/*----------------------------------
    IN-GAME
----------------------------------*/
