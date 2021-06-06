class Player {
    constructor(playername) {
        this.playername = playername;
        this.wallet = {
            coin: 500,
            crypto: {
                bitcoin: 0,
                ethereum: 0,
                swissborg: 0,
                tether: 0,
                cardano: 0,
            },
        };
        this.countryCode = 'DEFAULT';
        this.hasCompletedTutorial = false;
        this.lastTurnedWheel = 0;
    }

    toObject() {
        return {
            playername: this.playername,
            wallet: this.wallet,
            countryCode: this.countryCode,
            lastTurnedWheel: this.lastTurnedWheel,
            hasCompletedTutorial: this.hasCompletedTutorial,
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
            player.hasCompletedTutorial = playerObject.hasCompletedTutorial;
        }

        return player;
    }
}

export default Player;
