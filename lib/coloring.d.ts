declare type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 
'magenta' | 'cyan' | 'white'
;
/**
 * 
 * @param string The string to paint in color! 
 * @param color The color to paint the string in.
 */
declare function coloring(string: string, color: Color): string;
export default coloring;
export { coloring, Color };