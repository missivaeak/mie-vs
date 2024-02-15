// app/models/Place.ts

import { Folder } from "./Folder"
import { Reference } from "./Reference"
import { ReferenceOptions } from "./ReferenceOptions"
import { Scene } from "./Scene"

export class Place extends Reference {
    private _scenes: Array<Scene>
    private _image: string
    private _folders: Array<Folder>

    constructor(options: ReferenceOptions, image: string) {
        super(options)
        this._image = image
        this._scenes = []
        this._folders = []
    }

    get image(): string {
        return this._image
    }

    set image(image: string) {
        this._image = image
    }

    get scenes(): Array<Scene> {
        return this._scenes
    }

    addScene(scene: Scene) {
        this._scenes.push(scene)
    }

    removeScene(scene: Scene) {
        for (const index of this._scenes.keys()) {
            if (this._scenes[index] === scene) {
                this._scenes.splice(index, 1)
                return
            }
        }
    }

    removeSceneByIndex(index: number) {
        const scene = this._scenes.splice(index, 1)[0]

        return scene
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
