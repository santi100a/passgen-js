declare type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue'  | 'magenta' | 'cyan' | 'white' | 'bold';

/**
 * 
 * @param string The string to paint in color! 
 * @param color The color to paint the string in.
 */
declare function coloring(string: string, color: Color): string;
declare namespace Coloring {
    export const black: () => string;
    export const red: () => string;
    export const green: () => string;
    export const yellow: () => string;
    export const blue: () => string;
    export const magenta: () => string;
    export const cyan: () => string;
    export const white: () => string;
    export const bold: () => string;
}
export default coloring;
export { coloring, Color, Coloring };