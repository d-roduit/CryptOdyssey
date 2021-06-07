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
        this.settings = {
            hasMutedMusic: false,
        };
        this.countryCode = 'DEFAULT';
        this.hasCompletedTutorial = false;
        this.lastTurnedWheel = 0;
    }

    toObject() {
        return {
            playername: this.playername,
            wallet: this.wallet,
            settings: this.settings,
            countryCode: this.countryCode,
            hasCompletedTutorial: this.hasCompletedTutorial,
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
            player.settings = playerObject.settings;
            player.countryCode = playerObject.countryCode;
            player.hasCompletedTutorial = playerObject.hasCompletedTutorial;
            player.lastTurnedWheel = playerObject.lastTurnedWheel;
        }

        return player;
    }
}

export default Player;
