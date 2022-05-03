/* eslint-disable no-await-in-loop */
import fetch from 'node-fetch';

let clients = [];
let isSendingCryptoUpdates = false;

const retrieveCryptoPrices = async () => {
    const cryptoToFetch = [
        'bitcoin',
        'ethereum',
        'swissborg',
        'tether',
        'cardano',
    ];

    const fiatCurrenciesToMatch = [
        'usd',
    ];

    const cryptoURI = encodeURIComponent(cryptoToFetch.join());
    const vsCurrenciesURI = encodeURIComponent(fiatCurrenciesToMatch.join());

    const cryptoAPI = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoURI}&vs_currencies=${vsCurrenciesURI}`;

    const cryptoPrices = {
        bitcoin: 0,
        ethereum: 0,
        swissborg: 0,
        tether: 0,
        cardano: 0,
    };

    try {
        const response = await fetch(cryptoAPI);

        if (response.ok) {
            const data = await response.json();

            cryptoPrices.bitcoin = data.bitcoin.usd;
            cryptoPrices.ethereum = data.ethereum.usd;
            cryptoPrices.swissborg = data.swissborg.usd;
            cryptoPrices.tether = data.tether.usd;
            cryptoPrices.cardano = data.cardano.usd;
        }
    } catch (err) {
        console.log(err);
    }

    return cryptoPrices;
};

const timeout = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const sendCryptoUpdates = async (delay) => {
    while (clients.length > 0) {
        isSendingCryptoUpdates = true;

        // Retrieve crypto prices
        const cryptoPrices = await retrieveCryptoPrices();

        // Send data to every connected client
        clients.forEach((client) => client.response.write(`data: ${JSON.stringify(cryptoPrices)}\n\n`));

        await timeout(delay);
    }

    isSendingCryptoUpdates = false;
};

const register = (request, response) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    };

    response.writeHead(200, headers);

    const newClient = {
        id: Date.now(),
        response,
    };

    console.log(`Client ${newClient.id} : new client connected`);

    clients.push(newClient);

    request.on('close', () => {
        console.log(`Client ${newClient.id} : connection closed`);
        clients = clients.filter((client) => client.id !== newClient.id);
    });

    /*
    Before calling sendCryptoUpdates(), we check if it is not already sending updates to clients.
    This check allows not to run sendCryptoUpdates() indefinitely just to check if there is a
    client that is listening on crypto updates.
    The sendCryptoUpdates() function will be called and will loop only when at least one client
    is connected.
    */
    if (!isSendingCryptoUpdates) {
        const delay = 10000;
        sendCryptoUpdates(delay);
    }
};

export default { register };
