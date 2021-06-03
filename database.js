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

        console.log(`doc returned: ${JSON.stringify(doc)}`);

        res.json(doc);
    });
};

const savePlayer = (req, res) => {
    console.log('savePlayer');
    const playerObject = req.body;

    db.insert(playerObject, (err, newDoc) => {
        if (!err) {
            console.log(`${newDoc} inserted !`);
            return;
        }
        console.log(`Err: ${err}`);
    });

    res.status(200).end();
};

const updatePlayer = (req, res) => {
    console.log('savePlayer');
    const playerObject = req.body;

    db.update({ playername: req.params.playername }, playerObject, {}, (err, numReplaced) => {
        if (err) {
            console.log(`${JSON.stringify(playerObject)} could not be updated. ${numReplaced} docs updated.`);
            res.status(500).end();
            return;
        }

        console.log(`${JSON.stringify(playerObject)} updated ! ${numReplaced} docs updated.`);
    });

    res.status(200).end();
};

module.exports = {
    getPlayer,
    savePlayer,
    updatePlayer,
};
