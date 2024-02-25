// app/models/ShapeInterface.ts

import Reference from "../references/Reference"
import ReferenceOptions from "../references/ReferenceOptions"

export default interface ShapeInterface {
    checkClick(coords: {x: number, y: number}): Boolean
    _properties: Object
}
