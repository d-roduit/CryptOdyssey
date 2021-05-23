const bitcoinSpan = document.getElementById('bitcoinSpan');
const ethereumSpan = document.getElementById('ethereumSpan');
const swissborgSpan = document.getElementById('swissborgSpan');
const tetherSpan = document.getElementById('tetherSpan');
const cardanoSpan = document.getElementById('cardanoSpan');

if (typeof (EventSource) !== 'undefined') {
    const source = new EventSource('http://localhost:3000/sse/registerCryptoUpdates');
    source.onmessage = (event) => {
        const data = JSON.parse(event.data);

        bitcoinSpan.textContent = data.bitcoin;
        ethereumSpan.textContent = data.ethereum;
        swissborgSpan.textContent = data.swissborg;
        tetherSpan.textContent = data.tether;
        cardanoSpan.textContent = data.cardano;
    };
} else {
    console.log('Sorry, your browser does not support server-sent events...');
}
