

import { ShapeInterface } from "./ShapeInterface";

export class Circle implements ShapeInterface {
    _properties: {width: number, height: number}

    constructor(options: {width: number, height: number}) {
        this._properties = {
            width: options.width,
            height: options.height
        };
    }

    get properties(): {width: number, height: number} { 
        return this._properties;
    }

    set properties(properties: {width: number, height: number}) {
        this._properties = properties;
    }

    checkClick(coords: {x: number, y: number}): Boolean {
        return true;
    }
}
