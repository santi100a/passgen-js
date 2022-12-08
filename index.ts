#! /usr/bin/env node

const CLI_NAME = 'Random Password Generator';

interface Config {
    chars?: string;
    infiniteLoop?: boolean;
    passwordLength?: number;
    verboseMode?: boolean;
// -----------------------
    passwordCount?: number;
    numbersOnly?: boolean;
    upperOnly?: boolean;
    lowerOnly?: boolean;
    symbolsOnly?: boolean;
    extSymbols?: boolean;
}
(async function() {
    const { randomFromArray } = await import('@santi100/random-lib');
    const { coloring } = await import('@santi100/coloring-lib');
    const { Command } = await import('commander');
    const { default: { textSync } } = await import('figlet');
    const FS = await import('node:fs');
    const { default: inquirer } = await import('inquirer');
    const CONF_PATH = './pgconfig.json';
    type Key = string | number | symbol;

    console.clear();
    console.log(coloring(
            coloring(textSync(CLI_NAME, 'Standard'), 'bold'), 'cyan'
            ));
    async function readJSON(file: import('node:fs').PathLike, encoding?: BufferEncoding): Promise<[
    Record<Key, any>    
    , null] | [null, Error]>
    {
        try {
            return [JSON.parse(await FS.promises.readFile(file, encoding || 'utf8')), null];
        } catch (error) {
            return [null, error as Error];
        }
    }
    const [ config, error ] = await readJSON(CONF_PATH);
    const conf = config as Config || {};
    if (error) {
        if (FS.existsSync(CONF_PATH)) {
            console.error(
                coloring(
                    coloring('✗ An error has ocurred while reading the settings file. ' + error, 'red'),
                    'bold')
                    );
                    process.exit(1);
                }
            }
            const CLI_COMMAND = 'passgen';
            const VERSION = 'v1.0.7';
    const program = new Command(CLI_COMMAND)
        .version(VERSION)
        .description('A CLI to generate a random password.')
        .option('-i, --infinite', 'Enter infinite mode.')
        .option('-v, --verbose', 'Enter verbose mode.')
        .option('-a, --about', 'Show about message.')
        .option('-p, --prompt', 'Override flags and prompt the user directly.')
        .option('-P, --password-count <passwords>', 'The amount of passwords to generate.')
        .option('-e, --ext-symbols', 'Use extra symbol set.')

        .option('-u, --upper-only', 'Use uppercase letters only.')
        .option('-l, --lower-only', 'Use lowercase letters only.')
        .option('-n, --numbers-only', 'Use numbers only.')
        .option('-s, --symbols-only', 'Use symbols only.')
        
        .option('-c, --create', 'Scaffold a basic settings file.')
        .parse(process.argv);
        
        const options = program.opts();
        function getCharset({ numbersOnly, upperOnly, lowerOnly, symbolsOnly, extSymbols }: Record<Key, boolean>): string {
            if (numbersOnly) return NUMS;
            if (upperOnly) return UPPER;
            if (lowerOnly) return LOWER;
            if (symbolsOnly) return SYMBOLS;
    
            return NUMS.concat(UPPER, LOWER, SYMBOLS, extSymbols ? EXT_SYMBOLS : '');
        }
 const
        numbersOnly = conf.numbersOnly || options.numbersOnly,
        upperOnly = conf.upperOnly || options.upperOnly,
        lowerOnly = conf.lowerOnly || options.lowerOnly,
        symbolsOnly = conf.symbolsOnly || options.symbolsOnly,
        extSymbols = conf.extSymbols || options.extSymbols;
   
    const LENGTH = conf.passwordLength || 10;

    const NUMS = '1234567890';
    const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWER = 'abcdefghijklmnopqrstuvwxyz';
    const SYMBOLS = '!"#$%&_\'!';
    const EXT_SYMBOLS = '°¿¡¨\\|/=?*;():[]';
    
    const CHARS = conf.chars || 
 getCharset({
        numbersOnly, upperOnly, lowerOnly, symbolsOnly, extSymbols
    });


        const passwordCount = parseInt(options.passwordCount) || conf.passwordCount;

        if (options.create) {
            async function create() {
                try {
                    await FS.promises.writeFile(CONF_PATH, JSON.stringify({
                        $schema: 'https://santi-apis.vercel.app/utils/json-schema'
                    }, null, 4), 'utf8');
                    return null;
                } catch (e) {
                    return error;
                }
            }
        if (!FS.existsSync(CONF_PATH)) {
            const err = await create();
            if (!err) 
                console.log(coloring(`✓ Successfully created ${CONF_PATH}.`, 'green'))
            else {
                console.log(coloring('✗ An error has ocurred while creating the settings file. ' + err, 'red'));
                process.exit(1);
            }
            process.exit(0);
        } else {
            console.log(coloring('🛈 The settings file exists already.', 'cyan'));
            process.exit(0);
        }
    }
        if (!FS.existsSync(CONF_PATH)) {
            const { prom } = await inquirer.prompt({
                name: 'prom',
                type: 'confirm',
                message: `File ${CONF_PATH} doesn't exist. Prompt for options?`
            });
            if (prom) await prompt();
        }
        if (options.prompt) await prompt();
        
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
                type: 'input',
                message: 'Enter password length:',
            });
            const len = Number(lenString);
            const { chars } = await inquirer.prompt({
                name: 'chars',
                type: 'input',
                message: 'Type all characters you want to use for the password (press ENTER ⤷ to use default):',
            });
            if (verbose) console.log('Verbose mode %s', coloring('enabled.', 'green'));
            if (infinite) {
                let i = 1;
                while (true) {
                    if (0) break;
                    const password = generatePassword(len || 10, chars || 
                        NUMS + UPPER + LOWER + SYMBOLS
                        );
                    console.log('Password #%d: %s', i, password);
                    i++;
                }
            }
            console.log('Password length: %d.', len);
            console.log('Password: %s.', generatePassword(len || 10, chars || 
                NUMS + UPPER + LOWER + SYMBOLS))
            process.exit(0);
        }
        const VERBOSE_MODE = conf.verboseMode || options.verbose;
        const VERBOSE_PROMPT = coloring(coloring('[VERBOSE]', 'cyan'), 'bold')
        
        if (VERBOSE_MODE) console.log(`Verbose mode flag or setting specified. 
${coloring('Enabling', 'green')} verbose mode.`);

if (options.extSymbols || conf.extSymbols) {
    if (VERBOSE_MODE)
        console.log(`
${VERBOSE_PROMPT} Adding extra symbols set to the characters to be used for the password.
        `)
    console.log(
        'Password length: %d. \nPassword: %s.', 
        LENGTH,
        generatePassword(LENGTH, CHARS));
    process.exit();
}
if (passwordCount || conf.passwordCount) {
    const max = passwordCount || conf.passwordCount as number;
    for (let i = 0; i < max; i++) {
        console.log('Password #%d: %s', i + 1, generatePassword(LENGTH, CHARS));
    }

    process.exit();
}
    
        if (VERBOSE_MODE && !(FS.existsSync(CONF_PATH))) 
            console.log(`${VERBOSE_PROMPT} Settings file doesn't exist.
${VERBOSE_PROMPT} Falling back to command-line flags.
                `);
        if (VERBOSE_MODE && FS.existsSync(CONF_PATH)) 
            console.log(`
${VERBOSE_PROMPT} Settings file ${CONF_PATH} detected.
${VERBOSE_PROMPT} Now, the settings specified in this file will be used.
${VERBOSE_PROMPT} We recommend that you use the schema at https://santi-apis.vercel.app/utils/json-schema for 
${VERBOSE_PROMPT} this file.
        `);
    function generatePassword(length: number, chars: string) {
        const passArray: string[] = [];
        Array(length).fill(null).forEach(() => {
            passArray.push(randomFromArray(chars.split('')));
        })
        return passArray.join('')
    }
    if (options.infinite || conf.infiniteLoop) {
        if (VERBOSE_MODE) console.log(`
${VERBOSE_PROMPT} Infinite mode enabled.
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