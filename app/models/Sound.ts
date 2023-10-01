// app/models/Sound.ts

import { Reference } from "../models/Reference";
import { ReferenceOptions } from "./ReferenceOptions";

export class Sound extends Reference {
    private _sound: string

    constructor(options: ReferenceOptions, sound: string) {
        super(options);
        this._sound = sound;
    }
}
