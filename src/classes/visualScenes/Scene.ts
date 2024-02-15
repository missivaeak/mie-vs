// app/models/Scene.ts

import { Reference } from "./Reference"
import { ReferenceOptions } from "./ReferenceOptions"
import { Region } from "./Region"

export class Scene extends Reference {
    private _regions: Array<Region>
    private _image: string

    constructor(options: ReferenceOptions, image: string) {
        super(options)
        this._image = image
        this._regions = []
    }

    get image(): string {
        return this._image
    }

    set image(image: string) {
        this._image = image
    }

    get regions(): Array<Region> {
        return this._regions
    }

    addRegion(region: Region) {
        this._regions.push(region)
    }

    removeRegion(region: Region) {
        for (const index of this._regions.keys()) {
            if (this._regions[index] === region) {
                this._regions.splice(index, 1)
                return
            }
        }
    }

    removeRegionByIndex(index: number) {
        const region = this._regions.splice(index, 1)[0]

        return region
    }
}
