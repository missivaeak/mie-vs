// app/models/Image.ts

export class Image {
    private _format: string
    private _source: string
    private _databaseId: number

    constructor(source: string, databaseId: number, format="") {
        this._source = source
        this._databaseId = databaseId
        this._format = format
    }

    get source() {
        return this._source
    }

    set source(source: string) {
        this._source = source
    }

    get format() {
        return this._format
    }

    set format(format: string) {
        this._format = format
    }

    get databaseId() {
        return this._databaseId
    }
}
