import Player from './Player.js';

class PlayerDB {
    static async get(playername) {
        return new Promise((resolve, reject) => {
            if (typeof playername !== 'string' || playername.length < 1) {
                reject(new Error('playername is not a string or has length 0'));
                return;
            }

            fetch(`/player/${playername}`)
                .then((response) => {
                    if (!response.ok) {
                        reject(new Error(`Error while GET-ing "/player/${playername}". HTTP response status: ${response.status}`));
                        return;
                    }

                    response.json()
                        .then((playerObject) => {
                            const player = Player.fromObject(playerObject);

                            // At this point, player can be either null, { ... } (= data from DB)
                            resolve(player);
                        })
                        .catch((err) => reject(err));
                })
                .catch((err) => reject(err));
        });
    }

    static async save(player) {
        return new Promise((resolve, reject) => {
            fetch('/player/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: player.toJSON(),
            })
                .then((response) => {
                    if (!response.ok) {
                        reject(new Error(`Error while POST-ing "/player/". HTTP response status: ${response.status}`));
                        return;
                    }

                    resolve();
                })
                .catch((err) => reject(err));
        });
    }

    static async update(player) {
        return new Promise((resolve, reject) => {
            fetch(`/player/${player.playername}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: player.toJSON(),
            })
                .then((response) => {
                    if (!response.ok) {
                        reject(new Error(`Error while PUT-ing "/player/${player.playername}". HTTP response status: ${response.status}`));
                        return;
                    }

                    resolve();
                })
                .catch((err) => reject(err));
        });
    }
}

export default PlayerDB;
