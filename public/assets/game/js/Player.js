class Player {
    constructor(playername) {
        this.playername = playername;
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
        this.countryCode = 'DEFAULT';
        this.lastTurnedWheel = 0;
    }

    toObject() {
        return {
            playername: this.playername,
            wallet: this.wallet,
            countryCode: this.countryCode,
            lastTurnedWheel: this.lastTurnedWheel,
        };
    }

    toJSON() {
        return JSON.stringify(this.toObject());
    }

    static fromObject(playerObject) {
        let player = null;

        if (playerObject !== null) {
            player = new Player(playerObject.playername);
            player.wallet = playerObject.wallet;
            player.countryCode = playerObject.countryCode;
            player.lastTurnedWheel = playerObject.lastTurnedWheel;
        }

        return player;
    }
}

export default Player;
