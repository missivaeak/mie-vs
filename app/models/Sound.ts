// app/models/Sound.ts

import { Reference } from "../models/Reference";
import { ReferenceOptions } from "./ReferenceOptions";

export class Sound extends Reference {
    private _audio: string

    constructor(options: ReferenceOptions, audio: string) {
        super(options);
        this._audio = audio;
    }

    get audio() {
        return this._audio;
    }

    set audio(audio: string) {
        this._audio = audio;
    }
}
