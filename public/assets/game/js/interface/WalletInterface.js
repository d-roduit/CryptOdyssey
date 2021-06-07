const myself = document.getElementById('wallet-interface');
const coinAmountElement = document.getElementById('wallet-interface-coin-amount');
const bitcoinCoinValueElement = document.getElementById('wallet-interface-bitcoin-coin-value');
const bitcoinAmountElement = document.getElementById('wallet-interface-bitcoin-amount');
const ethereumCoinValueElement = document.getElementById('wallet-interface-ethereum-coin-value');
const ethereumAmountElement = document.getElementById('wallet-interface-ethereum-amount');
const swissborgCoinValueElement = document.getElementById('wallet-interface-swissborg-coin-value');
const swissborgAmountElement = document.getElementById('wallet-interface-swissborg-amount');
const tetherCoinValueElement = document.getElementById('wallet-interface-tether-coin-value');
const tetherAmountElement = document.getElementById('wallet-interface-tether-amount');
const cardanoCoinValueElement = document.getElementById('wallet-interface-cardano-coin-value');
const cardanoAmountElement = document.getElementById('wallet-interface-cardano-amount');

const WalletInterface = {
    myself,
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
    isOpen: false,
    show() {
        if (this.isOpen) return;
        myself.style.display = 'flex';
        this.isOpen = true;
    },
    hide() {
        if (!this.isOpen) return;
        myself.style.display = 'none';
        this.isOpen = false;
    },
};

export default WalletInterface;
