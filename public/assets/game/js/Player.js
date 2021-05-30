class Player {
    constructor() {
        this.playername = '';
        this.wallet = {
            coins: 0,
            crypto: {
                bitcoin: 0,
                ethereum: 0,
                swissborg: 0,
                tether: 0,
                cardano: 0,
            },
        };
        this.countryCode = '';
        this.lastTurnedWheel = 0;
    }
}

export default Player;
