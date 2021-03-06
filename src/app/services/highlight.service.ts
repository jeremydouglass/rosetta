/***********

Service for Highlight for P5 and OF/C++ code
Code developed by Ignacio Buioli

***********/
import { Injectable } from '@angular/core';
import { Tools } from './tools';

@Injectable()
export class HighlightService {

  constructor(public t: Tools) { }

  public highlightC(code: string): string {
    let r_code = code;
    ///////////////
    r_code = r_code.replace(/\</g, '°<°');  // For HTML Tags
    r_code = r_code.replace(/\>/g, '°>°');
    r_code = r_code.replace(/\//g, '°/°');
    ///////////////
    // BRKs
    const brk = ['{', '}', '\\[', '\\]', '\\(', '\\)', '\\.', '\\+', '-', '\\*', '%', ',', ';', ':', '=', '!', '\\|', '°\\/°', '&', '°<°',
    '°>°'];
    for (let i = 0; i < brk.length; i++) {
      const re = new RegExp('(' + brk[i] + ')', 'g');
      r_code = r_code.replace(re, '<bk>$1</bk>');
    }
    r_code = r_code.replace(/°<°/g, '<');  // For Tags
    r_code = r_code.replace(/°>°/g, '>');
    r_code = r_code.replace(/°\/°/g, '/');

    // VARs
    const vars = ['public ', 'private ', 'bool ', 'int ', 'float ', 'char ', 'unsigned ', 'double ', 'long ',
    'void ', 'new ', 'class ', 'if ', 'else ', 'for ', 'while ', 'true', 'false'];
    for (let i = 0; i < vars.length; i++) {
      const re = new RegExp('\\b(' + vars[i] + ')\\b', 'g');
      r_code = r_code.replace(re, '<v>$1</v>');
    }

    // NUMs
    r_code = r_code.replace(/\b(\d+)\b/g, '<n>$1</n>')

    // COMs
    const com = ['cout', 'endl'];
    for (let i = 0; i < com.length; i++) {
      const re = new RegExp('\\b(' + com[i] + ')\\b', 'g');
      r_code = r_code.replace(re, '<cm>$1</cm>');
    }
    r_code = r_code.replace(/\#(.+)*$/gm, '<cm>#$1</cm>');

    // STRs & CHARs
    r_code = r_code.replace(/"([^"]+)"/g, '<st>"$1"</st>');
    r_code = r_code.replace(/\'([^']+)\'/g, '<c>"$1"</c>');

    /////////////////////////////////////////////////////////////

    return r_code;
  }

  public highlightP5(code: string): string {
    let r_code = code;

    // VARs
    const vars = ['boolean', 'int', 'float', 'char', 'byte', 'color', 'double', 'long', 'Array', 'ArrayList', 'FloatDict', 'FloatList',
    'HashMap', 'IntDict', 'IntList', 'JSONArray', 'JSONObject', 'String', 'StringDict', 'StringList', 'Table', 'TableRow', 'XML', 'PImage',
    'PFont', 'PGraphics', 'PVector', 'PShape', 'PShader'];
    for (let i = 0; i < vars.length; i++) {
      const re = new RegExp('\\b(' + vars[i] + ')\\b', 'g');
      r_code = r_code.replace(re, '<p5v>$1</p5v>');
    }

    // SYSs
    const sys = ['mouseX', 'mouseY', 'pmouseX', 'pmouseY', 'key', 'keyCode', 'frameCount', 'frameRate', 'width', 'height', 'displayWidth',
    'displayHeight', 'screen', 'pixelWidth', 'pixelHeight', 'focused'];
    for (let i = 0; i < sys.length; i++) {
      const re = new RegExp('\\b(' + sys[i] + ')\\b', 'g');
      r_code = r_code.replace(re, '<p5s>$1</p5s>');
    }

    // FUNs
    const fun = [
    'setup', 'draw', 'settings', 'print', 'printArray', 'println', 'size', 'fullScreen', 'exit', 'thread', 'rect',
    'ellipse', 'triangle', 'line', 'point', 'arc', 'quad', 'vertex', 'beginShape', 'endShape', 'bezierVertex', 'curveVertex',
    'quadraticVertex', 'beginContour', 'endContour', 'shape', 'shapeMode', 'clear', 'box', 'sphere', 'sphereDetail',
    'curve', 'bezier', 'applyMatrix', 'background', 'fill', 'noFill', 'stroke', 'noStroke', 'displayDensity', 'cursor', 'noCursor', 'loop',
    'noLoop', 'redraw', 'delay', 'pushMatrix', 'popMatrix', 'translate', 'rotate', 'scale', 'resetMatrix', 'rotateX', 'rotateY', 'rotateZ',
    'shearX', 'shearY', 'printMatrix', 'keyPressed', 'keyReleased', 'mouseMoved', 'mouseDragged', 'mousePressed', 'mouseReleased',
    'createShape', 'loadShape', 'createImage', 'loadShader', 'resetShader', 'shader', 'noise', 'noiseSeed', 'noiseDetail', 'image',
    'loadImage', 'random', 'text', 'loadFont', 'createFont', 'textLeading', 'textMode', 'textSize', 'textWidth', 'textFont', 'textAscent',
    'textDescent', 'pushStyle', 'popStyle', 'tint', 'noTint', 'randomGaussian', 'randomSeed', 'alpha', 'color', 'blue', 'red',
    'green', 'smooth', 'hue', 'saturation', 'brightness', 'lerpColor', 'colorMode', 'noSmooth', 'day', 'hour', 'millis', 'minute', 'month',
    'second', 'year', 'acos', 'asin', 'atan', 'atan2', 'cos', 'degrees', 'radians', 'tan', 'abs', 'ceil', 'constrain', 'dist', 'exp',
    'floor', 'log', 'mag', 'map', 'max', 'min', 'norm', 'pow', 'round', 'sq', 'sqrt', 'textAlign', 'lerp', 'sin', 'binary',
    'boolean', 'byte', 'char', 'float', 'hex', 'int', 'str', 'unbinary', 'unhex', 'frameRate', 'set', 'get', 'push', 'pop', 'circle',
    'square', 'push', 'pop'];
    for (let i = 0; i < fun.length; i++) {
      const re = new RegExp('\\b(' + fun[i] + '(\\b|\\s+))(\\()', 'g');
      r_code = r_code.replace(re, '<p5f>$1</p5f>$3');
    }

    // TYPs
    const typ = ['void', 'public', 'private', 'return', 'true', 'false', 'super', 'this', 'default', 'break', 'case', 'null', 'new',
    'implements', 'import', 'extends', 'final'];
    for (let i = 0; i < typ.length; i++) {
      const re = new RegExp('\\b(' + typ[i] + ')\\b', 'g');
      r_code = r_code.replace(re, '<p5t>$1</p5t>');
    }

    // CONs
    const con = ['P2D', 'P3D', 'FX2D', 'PDF', 'JAVA2D', 'OPENGL', 'SVG', 'HALF_PI', 'PI', 'QUARTER_PI', 'TAU', 'TWO_PI', 'if', 'else',
    'for', 'while', 'switch', 'try', 'RGB', 'ARGB', 'ALPHA', 'OPEN', 'CHORD', 'PIE', 'UP', 'DOWN', 'LEFT', 'RIGHT', 'ALT', 'CONTROL',
    'SHIFT', 'TAB', 'ENTER', 'RETURN', 'BACKSPACE', 'DELETE'];
    for (let i = 0; i < con.length; i++) {
      const re = new RegExp('\\b(' + con[i] + ')\\b', 'g');
      r_code = r_code.replace(re, '<p5k>$1</p5k>');
    }

    // STRs & CHARs
    r_code = r_code.replace(/"([^"]+)"/g, '<p5r>"$1"</p5r>');
    r_code = r_code.replace(/\'([^']+)\'/g, '<p5r>\'$1\'</p5r>');

    // For Comments
    const c_mc = this.t.repeted(r_code, '/*', false);
    for (let i = 0; i < c_mc; i++) {
      const m = this.t.extract(r_code, '/*', '*/');
      const value = '<p5c>/*' + m + '*/</p5c>';
      r_code = r_code.replace('/*' + m + '*/', value);
    }
    r_code = r_code.replace(/\/\/(.+)*$/gm, '<p5c>//$1</p5c>');

    /////////////////////////////////////////////////////////////

    return r_code;
  }
}
