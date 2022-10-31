#! /usr/bin/env node
// @ts-check

const { randomFromArray } = require('./lib/random-cjs.js');
const { coloring } = require('./lib/coloring-cjs.js');
const { Command } = require('commander');
const { textSync } = require('figlet');
const FS = require('node:fs');
const CONF_PATH = './pgconfig.json';
const conf = JSON.parse(
    FS.existsSync(CONF_PATH) ? 
    FS.readFileSync(CONF_PATH, 'utf8') : 
    '{}'
)

const CLI_NAME = 'Random Password Generator';
const CLI_COMMAND = 'passgen';
const PACKAGE_JSON = './package.json';
const NUMS = '1234567890';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const SYMBOLS = '°!"#$%&/()=?¡¨*[];:_\\\"\'|!¿';
const program = new Command(CLI_COMMAND);
const CHARS = conf.chars || 
NUMS + UPPER + LOWER + SYMBOLS;
const LENGTH = conf.passwordLength || 8;
const VERSION = FS.existsSync(PACKAGE_JSON) ? 'v'.concat(
    JSON.parse(FS.readFileSync(PACKAGE_JSON, 'utf8')).version) : 'v1.0.0'
    
    console.clear();
console.log(coloring(textSync(CLI_NAME), 'green'));
program
    .version(VERSION)
    .description('A CLI to generate a random password.')
    .option('-i, --infinite', 'Enter infinite mode.')
    .option('-v, --verbose', 'Enter verbose mode.')
    .option('-a, --about', 'Show about message.')
    .parse(process.argv);

const options = program.opts();

const VERBOSE_MODE = conf.verboseMode || options.verbose;
const VERBOSE_PROMPT = coloring(coloring('[VERBOSE]', 'cyan'), 'bold')
/**
 * @param {number} length The length of the password.
 * @param {string} chars The characters to be on the password.
 */
function generatePassword(length, chars) {
    const passArray = [];
    Array(length).fill(null).forEach(() => {
        passArray.push(randomFromArray(chars.split('')));
    })
    return passArray.join('')
}
if (VERBOSE_MODE) console.log(`Verbose mode flag or setting specified. 
${coloring('Enabling', 'green')} verbose mode.`);

if (VERBOSE_MODE && !(FS.existsSync(CONF_PATH))) 
    console.log(`${VERBOSE_PROMPT} Settings file doesn't exist.
${VERBOSE_PROMPT} Falling back to command-line flags.
        `);
else 
if (FS.existsSync(CONF_PATH)) console.log(`${VERBOSE_PROMPT} Settings file ${CONF_PATH} detected.
${VERBOSE_PROMPT} Now, the settings specified in this file will be used.
${VERBOSE_PROMPT} We recommend that you use the schema at https://santi-apis.vercel.app/utils/json-schema for 
${VERBOSE_PROMPT} this file.
`);
const password = generatePassword(LENGTH, CHARS);
console.log(`
Password length: ${LENGTH}.
Password: ${password}.
`)
if (options.infinite || conf.infiniteLoop) {
    if (VERBOSE_MODE) console.log(`${VERBOSE_PROMPT} Infinite mode enabled.
${VERBOSE_PROMPT} Now, until you press Ctrl-C, thousands of random passwords will be created.
    `);
    console.log(`
Password length: ${LENGTH}.
    `)
    let i = 1;
    while (1 === (2 - 1)) {
        const password = generatePassword(LENGTH, CHARS);
        console.log('Password #%d: %s', i, password);
        i++;
    }
}
if (options.about) {
    console.log(`
    Random Password Generator ${VERSION}.
    Copyright (C) 2020-${(new Date).getUTCFullYear()} S Industries, Inc. All rights reserved.
    Actually no. I'm just Santi yet! Check out this project on GitHub!
    ( https://github.com/santi100a/passgen-js/ ).
    `)
    process.exit(0);
}