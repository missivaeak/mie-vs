// app/models/ShapeInterface.ts

import { Reference } from "./Reference"
import { ReferenceOptions } from "./ReferenceOptions"

export interface ShapeInterface {
    checkClick(coords: {x: number, y: number}): Boolean
    _properties: Object
}
