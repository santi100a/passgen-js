import random from './lib/random.js';
import coloring from './lib/coloring.js';
import ReadLineSync from 'readline-sync';
import FS from 'fs';

const settingsFilePath = './settings.jsonc';
const settings = FS.existsSync(settingsFilePath) ? 
JSON.parse(FS.readFileSync(settingsFilePath, 'utf-8')) :
{};
const chars = settings.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789¿?{}[]()<>!@#$%^&*_+-=:;|~`\'\\/.,';

const version = FS.existsSync('./package.json') ? 
JSON.parse(FS.readFileSync('./package.json', 'utf-8')).version : '1.0.0';

var passwordLength = 8, password = '';

console.clear();
console.log('\t\tRandom Password Generator');
console.log('\t\t=========================\n');
if (
    process.argv.includes('-a') || 
    process.argv.includes('--about')
) {
    console.log(`
    Random Password Generator v${version}. ${(version[0] + version[1]).includes("0.") ? 'Internal Build. For testing purposes only' : 'Public Build'}.
    Copyright (C) 2022 S Industries, Inc. All rights reserved.
    ( Well, not actually. I'm just Santi! Check out the project on GitHub! )
    https://github.com/santi100a/passgen-js/
    `);
    process.exit();
}

if (
    process.argv.includes('-h') || 
    process.argv.includes('--help')
) {
    console.log(`
    Random Password Generator v${version}. ${(version[0] + version[1]).includes("0.") ? 'Internal Build. For testing purposes only' : 'Public Build'}.
    
    Usage: 
        npx santi-passgen [options]
    `);
    process.exit();
}

if (
    process.argv.includes('-v') || 
    process.argv.includes('--verbose') || 
    settings.verboseMode
) 
    console.log('Either the settings file contains "verboseMode": true or you specified -v or --verbose flags. Verbose mode ' + coloring('enabled.', 'green'));
if (settings.passwordLength) {
    passwordLength = settings.passwordLength;
}
if (
    settings.infiniteLoop || 
    process.argv.includes('-i') || 
    process.argv.includes('--infinite')
) {
    if (
        process.argv.includes('-v') || 
        process.argv.includes('--verbose')
    )
    if (settings.infiniteLoop || 
        process.argv.includes('-i') || 
        process.argv.includes('--infinite'))
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
        password += chars[random(chars.length)];
    }
    console.log('Amount of possible characters:', chars.length);
    console.log('Password length:', passwordLength);
    console.log('Password:', password);
}