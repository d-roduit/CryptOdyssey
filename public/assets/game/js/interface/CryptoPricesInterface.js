const myself = document.getElementById('crypto-prices-interface');
const bitcoinPriceElement = document.getElementById('bitcoin-price');
const ethereumPriceElement = document.getElementById('ethereum-price');
const swissborgPriceElement = document.getElementById('swissborg-price');
const tetherPriceElement = document.getElementById('tether-price');
const cardanoPriceElement = document.getElementById('cardano-price');

const CryptoPricesInterface = {
    myself,
    bitcoinPriceElement,
    ethereumPriceElement,
    swissborgPriceElement,
    tetherPriceElement,
    cardanoPriceElement,
    isOpen: false,
    show() {
        if (this.isOpen) return;
        myself.style.display = 'block';
        this.isOpen = true;
    },
    hide() {
        if (!this.isOpen) return;
        myself.style.display = 'none';
        this.isOpen = false;
    },
    update(cryptoPrices) {
        this.bitcoinPriceElement.textContent = cryptoPrices.bitcoin;
        this.ethereumPriceElement.textContent = cryptoPrices.ethereum;
        this.swissborgPriceElement.textContent = cryptoPrices.swissborg;
        this.tetherPriceElement.textContent = cryptoPrices.tether;
        this.cardanoPriceElement.textContent = cryptoPrices.cardano;
    },
};

export default CryptoPricesInterface;
