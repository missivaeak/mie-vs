// app/models/Place.ts

import { Reference } from "../models/Reference";
import { ReferenceOptions } from "./ReferenceOptions";
import { Scene } from "./Scene";

export class Place extends Reference {
    private _scenes: Array<Scene>
    private _image: string

    constructor(options: ReferenceOptions, image: string) {
        super(options);
        this._image = image;
        this._scenes = [];
    }

    get image(): string {
        return this._image;
    }

    set image(image: string) {
        this._image = image;
    }

    get scenes(): Array<Scene> {
        return this._scenes;
    }

    addScene(scene: Scene) {
        this._scenes.push(scene);
    }

    removeScene(scene: Scene) {
        for (const index of this._scenes.keys()) {
            if (this._scenes[index] === scene) {
                this._scenes.splice(index, 1);
                return;
            }
        }
    }

    removeSceneByIndex(index: number) {
        const scene = this._scenes.splice(index, 1)[0];

        return scene;
    }
}
