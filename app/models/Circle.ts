// app/models/Circle.ts

import { ShapeInterface } from "./ShapeInterface";

export class Circle implements ShapeInterface {
    _properties: {radius: number}

    constructor(options: {radius: number}) {
        this._properties = {
            radius: options.radius
        }
    }

    get properties(): {radius: number} { 
        return this._properties;
    }

    set properties(properties: {radius: number}) {
        this._properties = properties;
    }

    checkClick(coords: {x: number, y: number}): Boolean {
        return true;
    }
}
