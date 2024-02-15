// app/models/StartingPoint.ts

import { Reference } from "./Reference"
import { ReferenceOptions } from "./ReferenceOptions"
import { Place } from "./Place"
import { Folder } from "./Folder"

export class StartingPoint extends Reference {
    private _places: Array<Place>
    private _folders: Array<Folder>

    constructor(options: ReferenceOptions) {
        super(options)
        this._places = []
        this._folders = []
    }

    get places(): Array<Place> {
        return this._places
    }

    addPlace(place: Place) {
        this._places.push(place)
    }

    removePlace(place: Place) {
        for (const index of this._places.keys()) {
            if (this._places[index] === place) {
                this._places.splice(index, 1)
                return
            }
        }
    }

    removePlaceByIndex(index: number) {
        const place = this._places.splice(index, 1)[0]

        return place
    }

    get folders(): Array<Folder> {
        return this._folders
    }

    addFolder(folder: Folder) {
        this._folders.push(folder)
    }

    removeFolder(folder: Folder) {
        for (const index of this._folders.keys()) {
            if (this._folders[index] === folder) {
                this._folders.splice(index, 1)
                return
            }
        }
    }

    removeFolderByIndex(index: number) {
        const folder = this._folders.splice(index, 1)[0]

        return folder
    }
}
