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
        const dx = Math.abs(coords.x);
        const dy = Math.abs(coords.y);
        const radius = this.properties.radius;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared <= radius * radius) {
            return true;
        }

        return false;
    }
}
