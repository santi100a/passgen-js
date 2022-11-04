// @ts-check
/// <reference path="coloring.d.ts" />
import assert from 'node:assert';
const COLORS = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    bold: "\x1b[1m"
}
function coloring(string, color) {
    assert(typeof color === 'string' || Array.isArray(color));
    if (typeof color === 'string')
        return `${COLORS[color.toLowerCase()]}${string}\x1b[0m`;
    else {
        let str = '';
        color.forEach(element => {
            str = str.concat(COLORS[element.toLowerCase()])
        });
        str = str.concat('\x1b[0m');
        return str;
    }
}
class Coloring {
    __colors__ = ''
    black(text) {
        this.__colors__ = `${this.__colors__}${COLORS.black}${text}`;
        return this;
    }
    red(text) {
        this.__colors__ = `${this.__colors__}${COLORS.red}${text}`;
        return this;
    }
    green(text) {
        this.__colors__ = `${this.__colors__}${COLORS.green}${text}`;
        return this;
    }
    yellow(text) {
        this.__colors__ = `${this.__colors__}${COLORS.yellow}${text}`;
        return this;
    }
    blue(text) {
        this.__colors__ = `${this.__colors__}${COLORS.blue}${text}`;
        return this;
    }
    magenta(text) {
        this.__colors__ = `${this.__colors__}${COLORS.magenta}${text}`;
        return this;
    }
    cyan(text) {
        this.__colors__ = `${this.__colors__}${COLORS.cyan}${text}`;
        return this;
    }
    white(text) {
        this.__colors__ = `${this.__colors__}${COLORS.white}${text}`;
        return this;
    }
    bold(text) {
        this.__colors__ = `${this.__colors__}${COLORS.bold}${text}`;
        return this;
    }
    blink(text) {
        this.__colors__ = `${this.__colors__}${COLORS.blink}${text}`;
        return this;
    }
    conceal(text) {
        this.__colors__ = `${this.__colors__}${COLORS.conceal}${text}`;
        return this;
    }
    resolve() {
        return `${this.__colors__}\x1b[0m`;
    }
}
export { coloring, Coloring };