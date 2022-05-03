/**
 * -------------------
 * Usage of Gulp tasks
 * -------------------
 *
 * In order for these gulp tasks to work properly, you need to have
 * the npx (npm package runner) tool installed.
 * Npx comes bundled with NPM starting from version 5.2+.
 *
 * The other required npm packages, namely "gulp" and "sass", are normally installed
 * with the "npm install" command.
 *
 * Author: Daniel Roduit
 * Date: 29.04.2021
 */

import { exec } from 'child_process';
import nodemon from 'nodemon';

const cssRoutes = {
    game: {
        src: 'public/assets/game/styles/src/',
        dist: 'public/assets/game/styles/dist/',
    },
    website: {
        src: 'public/assets/website/styles/src/',
        dist: 'public/assets/website/styles/dist/',
    },
};

async function startAutoReloadServer() {
    nodemon({});
}

async function compileAndWatchSass() {
    exec(`npx sass ${cssRoutes.game.src}:${cssRoutes.game.dist} ${cssRoutes.website.src}:${cssRoutes.website.dist} --watch --style=compressed --source-map`);
}

async function compileSass() {
    exec(`npx sass ${cssRoutes.game.src}:${cssRoutes.game.dist} ${cssRoutes.website.src}:${cssRoutes.website.dist} --style=compressed --source-map`);
}

async function compileAndWatchSassAndStartAutoReloadServer() {
    compileAndWatchSass();
    startAutoReloadServer();
}

/**
 * This function is only used to create the DB files during the build phase
 * of Heroku, to bypass the later ephemeral filesystem where you cannot create files anymore.
 */
// async function createDBFiles() {
//     const dbFilesToCreate = [
//         'players.db',
//     ];

//     dbFilesToCreate.forEach((dbFile) => {
//         fs.appendFile(dbFile, '', (err) => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             console.log(`${dbFile} saved.`);
//         });
//     });
// }

export default {
    devBuild: compileAndWatchSassAndStartAutoReloadServer,
    prodBuild: compileSass,
};
