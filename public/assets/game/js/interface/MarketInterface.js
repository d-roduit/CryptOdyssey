const myself = document.getElementById('market-interface');

// Market
const marketCloseBtn = document.getElementById('market-close-btn');
const fromCurrencyElement = document.getElementById('from-currency');
const toCurrencyElement = document.getElementById('to-currency');
const exchangeAmountInput = document.getElementById('exchange-amount-input');
const exchangeAmountResultElement = document.getElementById('exchange-amount-result');
const exchangeBtn = document.getElementById('exchange-btn');

// Wallet
const walletTablesContainer = document.getElementById('wallet-tables-container');
const coinAmountElement = document.getElementById('coin-amount');
const bitcoinCoinValueElement = document.getElementById('bitcoin-coin-value');
const bitcoinAmountElement = document.getElementById('bitcoin-amount');
const ethereumCoinValueElement = document.getElementById('ethereum-coin-value');
const ethereumAmountElement = document.getElementById('ethereum-amount');
const swissborgCoinValueElement = document.getElementById('swissborg-coin-value');
const swissborgAmountElement = document.getElementById('swissborg-amount');
const tetherCoinValueElement = document.getElementById('tether-coin-value');
const tetherAmountElement = document.getElementById('tether-amount');
const cardanoCoinValueElement = document.getElementById('cardano-coin-value');
const cardanoAmountElement = document.getElementById('cardano-amount');

const dropZoneBackgroundImageClassName = 'dropzone-background-image';

const putCurrencyLogoBackIntoOriginalParent = (dropZone) => {
    if (dropZone.id === 'from-currency' || dropZone.id === 'to-currency') {
        if (dropZone.childElementCount > 0) {
            const child = dropZone.children[0];

            if (child.nodeName === 'IMG') {
                const isACurrencyLogo = child?.classList?.contains('currency-logo');
                const isDraggable = child?.getAttribute('draggable');

                if (isACurrencyLogo && isDraggable) {
                    const childId = child.id;
                    const childOriginalParent = document.getElementById(`${childId}-container`);

                    dropZone.removeChild(child);
                    dropZone.classList.add(dropZoneBackgroundImageClassName);
                    childOriginalParent.appendChild(child);
                }
            }
        }
    }
};

const MarketInterface = {
    myself,
    // Market related elements / functions
    market: {
        fromCurrencyElement,
        toCurrencyElement,
        exchangeAmountInput,
        exchangeAmountResultElement,
        exchangeBtn,
        reset() {
            putCurrencyLogoBackIntoOriginalParent(this.fromCurrencyElement);
            putCurrencyLogoBackIntoOriginalParent(this.toCurrencyElement);
            this.resetExchangeInput();
        },
        resetExchangeInput() {
            this.exchangeAmountInput.value = '';
            this.exchangeAmountResultElement.textContent = '--';
        },
    },
    // Wallet related elements / functions
    wallet: {
        coinAmountElement,
        bitcoinCoinValueElement,
        bitcoinAmountElement,
        ethereumCoinValueElement,
        ethereumAmountElement,
        swissborgCoinValueElement,
        swissborgAmountElement,
        tetherCoinValueElement,
        tetherAmountElement,
        cardanoCoinValueElement,
        cardanoAmountElement,
        update(player, playerCoinValues) {
            this.coinAmountElement.textContent = player.wallet.coin;
            this.bitcoinCoinValueElement.textContent = playerCoinValues.bitcoin;
            this.bitcoinAmountElement.textContent = player.wallet.crypto.bitcoin;
            this.ethereumCoinValueElement.textContent = playerCoinValues.ethereum;
            this.ethereumAmountElement.textContent = player.wallet.crypto.ethereum;
            this.swissborgCoinValueElement.textContent = playerCoinValues.swissborg;
            this.swissborgAmountElement.textContent = player.wallet.crypto.swissborg;
            this.tetherCoinValueElement.textContent = playerCoinValues.tether;
            this.tetherAmountElement.textContent = player.wallet.crypto.tether;
            this.cardanoCoinValueElement.textContent = playerCoinValues.cardano;
            this.cardanoAmountElement.textContent = player.wallet.crypto.cardano;
        },
    },
    isOpen: false,
    show() {
        this.market.reset();
        myself.style.display = 'flex';
        this.isOpen = true;
    },
    hide() {
        myself.style.display = 'none';
        this.isOpen = false;
    },
};

const dragStart = (event) => {
    const draggedElement = event.target;

    if (draggedElement.nodeName === 'IMG') {
        const isACurrencyLogo = draggedElement?.classList?.contains('currency-logo');
        const isDraggable = draggedElement?.getAttribute('draggable'); // Can be : true / false / null (no attribute present)

        if (!isACurrencyLogo || !isDraggable) {
            event.preventDefault();
            return;
        }

        event.dataTransfer.setData('text', draggedElement.id);
    }
};

const dragOver = (event) => {
    event.preventDefault();
};

/**
 * This method is used to put the drop zone background image back
 * when a currency icon is moved from one drop zone to another.
 */
const dragEnd = (event) => {
    const dropZone = event.currentTarget;

    let comingFromElement = null;

    if (dropZone.id === 'from-currency') {
        comingFromElement = toCurrencyElement;
    } else if (dropZone.id === 'to-currency') {
        comingFromElement = fromCurrencyElement;
    }

    if (comingFromElement.childElementCount === 0) {
        comingFromElement.classList.add(dropZoneBackgroundImageClassName);
    }
};

const drop = (event) => {
    event.preventDefault();

    const dropZone = event.currentTarget;

    const currencyLogoId = event.dataTransfer.getData('text');

    const draggedElement = document.getElementById(currencyLogoId);

    const hasDropZoneChild = dropZone.childElementCount > 0;

    if (hasDropZoneChild) {
        putCurrencyLogoBackIntoOriginalParent(dropZone);
    }

    dropZone.classList.remove(dropZoneBackgroundImageClassName);
    dropZone.appendChild(draggedElement);
    MarketInterface.market.resetExchangeInput();
};

const click = (event) => {
    const dropZone = event.currentTarget;
    const clickedElement = event.target;

    const clickedElementIsImg = clickedElement.nodeName === 'IMG';

    if (clickedElementIsImg) {
        putCurrencyLogoBackIntoOriginalParent(dropZone);
        dropZone.classList.add(dropZoneBackgroundImageClassName);
        MarketInterface.market.resetExchangeInput();
    }
};

const closeBtnHandler = () => MarketInterface.hide();

const exchangeAmountInputHandler = (event) => {
    const nbDecimal = 3;

    const exchangeAmountString = exchangeAmountInput.value;

    switch (event.key) {
    case 'Backspace':
    case 'Delete':
    case 'ArrowLeft':
    case 'ArrowRight':
        return;
    default:
        break;
    }

    if (event.ctrlKey) {
        switch (event.key) {
        case 'a':
        case 'A':
        case 'c':
        case 'C':
            break;
        default:
            event.preventDefault();
            break;
        }
        return;
    }

    switch (event.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
        if (event.key === '.') {
            if (exchangeAmountString.length === 0 || exchangeAmountString.includes('.')) {
                event.preventDefault();
            }
        }
        break;
    default:
        event.preventDefault();
        return;
    }

    if (exchangeAmountString.length > 0) {
        const numberFormatRegex = new RegExp(`^[0-9]*([.][0-9]{0,${nbDecimal - 1}})?$`);
        const isAmountToExchangeStringValid = numberFormatRegex.test(exchangeAmountString);

        if (!isAmountToExchangeStringValid) {
            event.preventDefault();
        }
    }
};

// Initialize all the listeners for the Drag'n'Drop
walletTablesContainer.addEventListener('dragstart', dragStart);

fromCurrencyElement.addEventListener('dragstart', dragStart);
fromCurrencyElement.addEventListener('dragover', dragOver);
fromCurrencyElement.addEventListener('dragend', dragEnd);
fromCurrencyElement.addEventListener('drop', drop);
fromCurrencyElement.addEventListener('click', click);

toCurrencyElement.addEventListener('dragstart', dragStart);
toCurrencyElement.addEventListener('dragover', dragOver);
toCurrencyElement.addEventListener('dragend', dragEnd);
toCurrencyElement.addEventListener('drop', drop);
toCurrencyElement.addEventListener('click', click);

// Initialize all the listeners for the Market interface
marketCloseBtn.addEventListener('click', closeBtnHandler);
exchangeAmountInput.addEventListener('keydown', exchangeAmountInputHandler);

export default MarketInterface;
