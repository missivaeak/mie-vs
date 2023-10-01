// app/models/StartingPoint.ts

import { Reference } from "../models/Reference";
import { ReferenceOptions } from "./ReferenceOptions";
import { Place } from "./Place";

export class StartingPoint extends Reference {
    private _places: Array<Place>

    constructor(options: ReferenceOptions) {
        super(options)
        this._places = [];
    }

    get places(): Array<Place> {
        return this._places;
    }

    addPlace(place: Place) {
        this._places.push(place);
    }

    removePlace(place: Place) {
        for (const index of this._places.keys()) {
            if (this._places[index] === place) {
                this._places.splice(index, 1);
                return;
            }
        }
    }

    removePlaceByIndex(index: number) {
        const place = this._places.splice(index, 1)[0];

        return place;
    }
}
