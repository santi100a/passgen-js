#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const random_cjs_js_1 = require("./lib/random-cjs.js");
const coloring_cjs_js_1 = require("./lib/coloring-cjs.js");
const commander_1 = require("commander");
const figlet_1 = require("figlet");
const FS = __importStar(require("node:fs"));
const CLI_NAME = 'Random Password Generator';
console.clear();
console.log((0, coloring_cjs_js_1.coloring)((0, coloring_cjs_js_1.coloring)((0, figlet_1.textSync)(CLI_NAME, 'Standard'), 'bold'), 'cyan'));
(async function () {
    const inquirer = require('inquirer');
    const CONF_PATH = './pgconfig.json';
    async function readJSON(file, encoding) {
        try {
            return [JSON.parse(await FS.promises.readFile(file, encoding || 'utf8')), null];
        }
        catch (error) {
            return [null, error];
        }
    }
    const [conf, error] = await readJSON(CONF_PATH);
    if (error) {
        console.error((0, coloring_cjs_js_1.coloring)((0, coloring_cjs_js_1.coloring)('✗ An error has ocurred while reading the settings file. ' + error, 'red'), 'bold'));
        process.exit(1);
    }
    const CLI_COMMAND = 'passgen';
    const NUMS = '1234567890';
    const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWER = 'abcdefghijklmnopqrstuvwxyz';
    const SYMBOLS = '°!"#$%&/()=?¡¨*[];:_\\\"\'|!¿';
    const program = new commander_1.Command(CLI_COMMAND);
    const CHARS = conf.chars ||
        NUMS + UPPER + LOWER + SYMBOLS;
    const LENGTH = conf.passwordLength || 10;
    const VERSION = 'v1.0.4';
    program
        .version(VERSION)
        .description('A CLI to generate a random password.')
        .option('-i, --infinite', 'Enter infinite mode.')
        .option('-v, --verbose', 'Enter verbose mode.')
        .option('-a, --about', 'Show about message.')
        .option('-p, --prompt', 'Override flags and prompt the user directly.')
        .option('-c, --create', 'Create a basic settings file.')
        .parse(process.argv);
    const options = program.opts();
    if (options.create) {
        async function create() {
            try {
                await FS.promises.writeFile(CONF_PATH, JSON.stringify({
                    $schema: 'https://santi-apis.vercel.app/utils/json-schema'
                }), 'utf8');
                return null;
            }
            catch (e) {
                return error;
            }
        }
        const err = await create();
        if (!err)
            console.log((0, coloring_cjs_js_1.coloring)(`✓ Successfully created ${CONF_PATH}`, 'green'));
        else
            console.log((0, coloring_cjs_js_1.coloring)('✗ An error has ocurred while reading the settings file. ' + err, 'red'));
    }
    if (!FS.existsSync(CONF_PATH)) {
        const { prom } = await inquirer.prompt({
            name: 'prom',
            message: `File ${CONF_PATH} doesn't exist. Prompt for options?`
        });
        if (prom)
            await prompt();
    }
    if (options.prompt)
        await prompt();
    async function prompt() {
        const { infinite } = await inquirer.prompt({
            name: 'infinite',
            type: 'confirm',
            message: 'Enter infinite mode?',
        });
        const { verbose } = await inquirer.prompt({
            name: 'verbose',
            type: 'confirm',
            message: 'Enter verbose mode?',
        });
        const { len: lenString } = await inquirer.prompt({
            name: 'len',
            type: 'text',
            message: 'Enter password length:',
        });
        const len = Number(lenString);
        const { chars } = await inquirer.prompt({
            name: 'chars',
            type: 'text',
            message: 'Type all characters you want to use for the password (press ENTER ⤷ to use default):',
        });
        if (verbose)
            console.log('Verbose mode %s', (0, coloring_cjs_js_1.coloring)('enabled.', 'green'));
        if (infinite) {
            let i = 1;
            while (true) {
                if (0)
                    break;
                const password = generatePassword(len || 10, chars ||
                    NUMS + UPPER + LOWER + SYMBOLS);
                console.log('Password #%d: %s', i, password);
                i++;
            }
        }
        console.log('Password length: %d.', len);
        console.log('Password: %s.', generatePassword(len || 10, chars ||
            NUMS + UPPER + LOWER + SYMBOLS));
        process.exit(0);
    }
    const VERBOSE_MODE = conf.verboseMode || options.verbose;
    const VERBOSE_PROMPT = (0, coloring_cjs_js_1.coloring)((0, coloring_cjs_js_1.coloring)('[VERBOSE]', 'cyan'), 'bold');
    if (VERBOSE_MODE)
        console.log(`Verbose mode flag or setting specified. 
    ${(0, coloring_cjs_js_1.coloring)('Enabling', 'green')} verbose mode.`);
    if (VERBOSE_MODE && !(FS.existsSync(CONF_PATH)))
        console.log(`${VERBOSE_PROMPT} Settings file doesn't exist.
    ${VERBOSE_PROMPT} Falling back to command-line flags.
                `);
    if (VERBOSE_MODE && FS.existsSync(CONF_PATH))
        console.log(`${VERBOSE_PROMPT} Settings file ${CONF_PATH} detected.
    ${VERBOSE_PROMPT} Now, the settings specified in this file will be used.
    ${VERBOSE_PROMPT} We recommend that you use the schema at https://santi-apis.vercel.app/utils/json-schema for 
    ${VERBOSE_PROMPT} this file.
        `);
    function generatePassword(length, chars) {
        const passArray = [];
        Array(length).fill(null).forEach(() => {
            passArray.push((0, random_cjs_js_1.randomFromArray)(chars.split('')));
        });
        return passArray.join('');
    }
    if (options.infinite || conf.infiniteLoop) {
        if (VERBOSE_MODE)
            console.log(`${VERBOSE_PROMPT} Infinite mode enabled.
${VERBOSE_PROMPT} Now, until you press Ctrl-C, thousands of random passwords will be created.
        `);
        console.log(`
    Password length: ${LENGTH}.
        `);
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
        `);
        process.exit(0);
    }
    const password = generatePassword(LENGTH, CHARS);
    console.log(`
Password length: ${LENGTH}.
Password: ${password}.
    `);
})();
