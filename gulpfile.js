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

const { parallel } = require('gulp');
const { exec } = require('child_process');
const nodemon = require('nodemon');

async function startAutoReloadServer() {
    nodemon({});
}

async function compileSass() {
    const routes = {
        game: {
            src: 'public/assets/game/styles/src/',
            dist: 'public/assets/game/styles/dist/',
        },
        website: {
            src: 'public/assets/website/styles/src/',
            dist: 'public/assets/website/styles/dist/',
        },
    };

    exec(`npx sass ${routes.game.src}:${routes.game.dist} ${routes.website.src}:${routes.website.dist} --watch --style=compressed --source-map`);
}

exports.default = parallel(compileSass, startAutoReloadServer);
