// @ts-check
function coloring(string, color) {
    color = color.toLowerCase();
    const colors = {
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
    return `${colors?.[color]}${string}\x1b[0m`;
}
class Coloring {
    static black = str => `\x1b[30m${str}\x1b[0m`;
    static red = str => `\x1b[31m${str}\x1b[0m`;
    static green = str => `\x1b[32m${str}\x1b[0m`;
    static yellow = str => `\x1b[33m${str}\x1b[0m`;
    static blue = str => `\x1b[34m${str}\x1b[0m`;
    static magenta = str => `\x1b[35m${str}\x1b[0m`;
    static cyan = str => `\x1b[36m${str}\x1b[0m`;
    static white = str => `\x1b[37m${str}\x1b[0m`;
    static bold = str => `\x1b[1m${str}\x1b[0m`;
}

module.exports = { coloring, Coloring };