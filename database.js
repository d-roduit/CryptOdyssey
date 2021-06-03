const Datastore = require('nedb');

const db = new Datastore({ filename: './players.db', autoload: true });

// Player handling
const getPlayer = (req, res) => {
    console.log(`playername asked: ${req.params.playername}`);

    db.findOne({ playername: req.params.playername }, (err, doc) => {
        if (err) {
            res.status(500).end();
            return;
        }

        res.json(doc);
    });
};

const savePlayer = (req, res) => {
    const playerObject = req.body;

    db.insert(playerObject, (err, newDoc) => {
        if (err) {
            console.log(`Err: ${err}`);
            return;
        }
        console.log(`${newDoc} saved !`);
    });

    res.status(200).end();
};

const updatePlayer = (req, res) => {
    const playerObject = req.body;

    db.update({ playername: req.params.playername }, playerObject, {}, (err, numReplaced) => {
        if (err) {
            console.log(`${playerObject.playername} could not be updated. ${numReplaced} docs updated.`);
            res.status(500).end();
            return;
        }

        console.log(`${playerObject.playername} updated ! ${numReplaced} docs updated.`);
    });

    res.status(200).end();
};

module.exports = {
    getPlayer,
    savePlayer,
    updatePlayer,
};
