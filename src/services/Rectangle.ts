// app/models/Rectangle.ts

import { ShapeInterface } from "./ShapeInterface"

export class Rectangle implements ShapeInterface {
    _properties: {width: number, height: number}

    constructor(options: {width: number, height: number}) {
        this._properties = {
            width: options.width,
            height: options.height
        }
    }

    get properties(): {width: number, height: number} { 
        return this._properties
    }

    set properties(properties: {width: number, height: number}) {
        this._properties = properties
    }

    checkClick(coords: {x: number, y: number}): Boolean {
        if (coords.x < 0 || coords.y < 0) {
            return false
        }

        const width = this.properties.width
        const height = this.properties.height

        if (coords.x > width || coords.y > height) {
            return false
        }

        return true
    }
}
