#! /usr/bin/env node
// @ts-check
import { random } from './lib/random.js';
import { coloring } from './lib/coloring.js';
import * as FS from 'fs';

console.clear();
try {
    const settingsFilePath = './settings.json';
    const settings = FS.existsSync(settingsFilePath) ? 
    JSON.parse(FS.readFileSync(settingsFilePath, 'utf-8')) :
    {};
    const chars = settings.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789¿?{}[]()<>!@#$%^&*_+-=:;|~`\'\\/.,';
    const
    includesVersion =  process.argv.includes('-v') || 
    process.argv.includes('--version'),
    includesAbout = process.argv.includes('-a') || 
    process.argv.includes('--about'),
    includesHelp = process.argv.includes('-h') || 
    process.argv.includes('--help'),
    settingsExist = FS.existsSync('./settings.json'),
    includesVerbose = process.argv.includes('--verbose'),
    includesInfinite = process.argv.includes('-i') || 
    process.argv.includes('--infinite');

    const version = FS.existsSync('./package.json') ? 
    JSON.parse(FS.readFileSync('./package.json', 'utf-8')).version : '1.0.0';
    (function setTerminalTitle(title) {
        process.stdout.write(
            String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
        );
    })("Random Password Generator v" + version);

    let passwordLength = 8, password = '';

    if (includesVersion) {
        console.log(version); process.exit();
    }
    console.clear();
    console.log('\t\tRandom Password Generator');
    console.log('\t\t=========================\n');
    if (includesAbout) {
        console.log(`
        Random Password Generator v${version}. ${(version[0] + version[1]).includes('0.') ? 'Internal Build. For testing purposes only' : 'Public Build'}.
        Copyright (C) 2022 S Industries, Inc. All rights reserved.
        ( Well, not actually. I'm just Santi! Check out the project on GitHub! )
        https://github.com/santi100a/passgen-js/
        `);
        process.exit();
    }

    if (includesHelp) {
        console.clear();
        console.log(`
        Random Password Generator v${version}. ${(version[0] + version[1]).includes('0.') ? 'Internal Build. For testing purposes only' : 'Public Build'}.
        
        Usage: 
            node . [options]
        Options:
            -h, --help: Show this help message.
            -a, --about: Show about message.
            --verbose: Enable verbose mode.
            -i, --infinite: Enable infinite mode.
            -v, --version: Show version.
        `);
        process.exit();
    }

    if (!settingsExist && includesVerbose) console.log(
       coloring('Settings file does not exist. Not using settings file. ', 'yellow')
    );

    if (
        includesVerbose || 
        settings.verboseMode
    ) 
        console.log('Either the settings file contains "verboseMode": true or you specified the --verbose flag. Verbose mode ' + coloring('enabled.', 'green'));
    if (settings.passwordLength) {
        passwordLength = settings.passwordLength;
    }
    if (
        settings.infiniteLoop || 
        includesInfinite
    ) {
        if (
            includesVerbose
        )
        if (settings.infiniteLoop || 
            includesInfinite)
        console.log('Either the settings file contains "infiniteLoop": true or you specified the -i or --infinite flags. Infinite loop ' + coloring('enabled.', 'green'));
        let currentPasswordIndex = 0;
        while (true) {
            password = '';
            for (let i = 0; i < passwordLength; i++) {
                password += chars[random(chars.length)];
            }
            currentPasswordIndex++;
            console.log(`Password #${currentPasswordIndex}:`, password);
            
        }
    } else {
        password = '';
        for (let i = 0; i < passwordLength; i++) {
            password += chars[random(chars.length)]; //! It produces undefined sometimes
        }
        console.log('Amount of possible characters:', chars.length);
        console.log('Password length:', passwordLength);
        console.log('Password:', password);
    }
} catch (error) {
    console.clear();
    if (error instanceof SyntaxError) {
        console.log(coloring('Syntax error somewhere in the settings file. Please make sure the settings.json file does not contain any syntax errors (like comments, for instance).', 'red'));
    } 
    throw error;
}