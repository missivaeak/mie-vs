// app/models/ShapeInterface.ts

import { Reference } from "../models/Reference";
import { ReferenceOptions } from "./ReferenceOptions";
import { Scene } from "./Scene";

export interface ShapeInterface {
    checkClick(coords: {x: number, y: number}): Boolean
    _properties: Object
}
