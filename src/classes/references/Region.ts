// app/models/Region.ts

import { Reference } from "./Reference"
import { ShapeInterface } from "../shapes/ShapeInterface"

export class Region {
    private _xPos: number
    private _yPos: number
    private _shape: ShapeInterface
    private _action: Reference

    constructor(coords: {x: number, y: number}, shape: ShapeInterface, action: Reference) {
        this._xPos = coords.x
        this._yPos = coords.y
        this._shape = shape
        this._action = action
    }

    get coords() {
        return {x: this._xPos, y: this._yPos}
    }

    set coords(coords: {x: number, y: number}) {
        this._xPos = coords.x
        this._yPos = coords.y
    }

    get shape() {
        return this._shape
    }

    set shape(shape: ShapeInterface) {
        this._shape = shape
    }

    get action() {
        return this._action
    }

    set action(action: Reference) {
        this._action = action
    }
}
