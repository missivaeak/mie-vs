// app/models/Sound.ts

import { Reference } from "./Reference"
import { ReferenceOptions } from "./ReferenceOptions"

export class Sound extends Reference {
    private _format: string
    private _source: string

    constructor(options: ReferenceOptions, source: string, format="") {
        super(options)
        this._source = source
        this._format = format
    }

    get source() {
        return this._source
    }

    set source(source: string) {
        this._source = source
    }
}
