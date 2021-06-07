/*
 * We disable the "no-use-before-define" rule because
 * setupEventSource() and reconnect() are mutually recursive.
 */
/* eslint-disable no-use-before-define */

let reconnectFrequencySeconds = 1;
let eventSource;

const callbackPool = [];

const getReconnectFrequency = () => reconnectFrequencySeconds * 1000;

const setupEventSource = () => {
    if (typeof (EventSource) !== 'undefined') {
        eventSource = new EventSource('/sse/registerCryptoUpdates');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);

            callbackPool.forEach((callback) => {
                callback(data);
            });
        };

        eventSource.onopen = () => {
            reconnectFrequencySeconds = 1;
        };

        eventSource.onerror = () => {
            console.log(`An error occurred while attempting to connect. Trying to reconnect in ${reconnectFrequencySeconds} seconds...`);
            eventSource.close();
            reconnect();
        };
    } else {
        console.log('Sorry, your browser does not support server-sent events...');
    }
};

const reconnect = () => {
    setTimeout(() => {
        setupEventSource();

        reconnectFrequencySeconds *= 2;

        if (reconnectFrequencySeconds >= 64) {
            reconnectFrequencySeconds = 64;
        }
    }, getReconnectFrequency());
};

const addUpdateListener = (callback) => {
    callbackPool.push(callback);
};

setupEventSource();

window.addEventListener('beforeunload', () => {
    if (eventSource != null) {
        eventSource.close();
    }
});

export default {
    addUpdateListener,
};
