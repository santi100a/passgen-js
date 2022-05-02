declare type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue'  | 'magenta' | 'cyan' | 'white' | 'bold';
;
/**
 * 
 * @param string The string to paint in color! 
 * @param color The color to paint the string in.
 */
declare function coloring(string: string, color: Color): string;
declare abstract class Coloring {
    static black: () => string;
    static red: () => string;
    static green: () => string;
    static yellow: () => string;
    static blue: () => string;
    static magenta: () => string;
    static cyan: () => string;
    static white: () => string;
    static bold: () => string;
};
export default coloring;
export { coloring, Color, Coloring };