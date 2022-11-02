#! /usr/bin/env node

import { randomFromArray } from './lib/random-cjs.js';
import { coloring, Coloring } from './lib/coloring-cjs.js';
import { Command } from 'commander';
import { textSync } from 'figlet';
import * as FS from 'node:fs';

const CLI_NAME = 'Random Password Generator';

console.clear();
console.log(coloring(
        coloring(textSync(CLI_NAME, 'Standard'), 'bold'), 'cyan'
        ));
(async function() {
    const CONF_PATH = './pgconfig.json';

    type Key = string | number | symbol;

    async function readJSON(file: FS.PathLike, encoding?: BufferEncoding): Promise<[
    Record<Key, any>    
    , null] | [null, Error]>
    {
        try {
            return [JSON.parse(await FS.promises.readFile(file, encoding || 'utf8')), null];
        } catch (error) {
            return [null, error as Error];
        }
    }
    const [ conf, error ] = await readJSON(CONF_PATH);
    if (error) {
        const colorInstance = new Coloring();
        console.error(colorInstance.red('✗ An error has ocurred while reading the settings file. ' + error).bold('').resolve());
        process.exit(1);
    }

    const CLI_COMMAND = 'passgen';
    const NUMS = '1234567890';
    const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWER = 'abcdefghijklmnopqrstuvwxyz';
    const SYMBOLS = '°!"#$%&/()=?¡¨*[];:_\\\"\'|!¿';
    const program = new Command(CLI_COMMAND);
    const CHARS = conf.chars || 
    NUMS + UPPER + LOWER + SYMBOLS;
    const LENGTH = conf.passwordLength || 8;
    const VERSION = 'v1.0.3';

    
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

    function generatePassword(length: number, chars: string) {
        const passArray: string[] = [];
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
    if (VERBOSE_MODE && FS.existsSync(CONF_PATH)) 
        console.log(`${VERBOSE_PROMPT} Settings file ${CONF_PATH} detected.
    ${VERBOSE_PROMPT} Now, the settings specified in this file will be used.
    ${VERBOSE_PROMPT} We recommend that you use the schema at https://santi-apis.vercel.app/utils/json-schema for 
    ${VERBOSE_PROMPT} this file.
    `);
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
    const password = generatePassword(LENGTH, CHARS);
    console.log(`
    Password length: ${LENGTH}.
    Password: ${password}.
    `)
})();