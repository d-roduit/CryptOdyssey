const bitcoinSpan = document.getElementById('bitcoinSpan');
const ethereumSpan = document.getElementById('ethereumSpan');
const swissborgSpan = document.getElementById('swissborgSpan');
const aaveSpan = document.getElementById('aaveSpan');
const enjincoinSpan = document.getElementById('enjincoinSpan');
const uniswapSpan = document.getElementById('uniswapSpan');

const udpateCryptoPrice = async () => {
    const cryptoAPI = 'https://api.coingecko.com/api/v3/simple/price?ids=enjincoin%2Caave%2Cuniswap%2Cswissborg%2Cethereum%2Cbitcoin&vs_currencies=usd';
    const response = await fetch(cryptoAPI);
    const data = await response.json();

    const cryptoPrices = {
        bitcoin: data.bitcoin.usd,
        ethereum: data.ethereum.usd,
        swissborg: data.swissborg.usd,
        aave: data.aave.usd,
        enjincoin: data.enjincoin.usd,
        uniswap: data.uniswap.usd,
    };

    bitcoinSpan.textContent = cryptoPrices.bitcoin;
    ethereumSpan.textContent = cryptoPrices.ethereum;
    swissborgSpan.textContent = cryptoPrices.swissborg;
    aaveSpan.textContent = cryptoPrices.aave;
    enjincoinSpan.textContent = cryptoPrices.enjincoin;
    uniswapSpan.textContent = cryptoPrices.uniswap;
};

const timeout = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

// TODO: Change that for Server-Side Event
const udpateCryptoPriceInContinue = async (delay) => {
    await Promise.all([udpateCryptoPrice(), timeout(delay)]);
    udpateCryptoPriceInContinue(delay);
};

const delay = 10000;
udpateCryptoPriceInContinue(delay);
