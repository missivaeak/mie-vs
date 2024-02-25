// app/models/Container.ts

import { Reference } from "./Reference"
import { ReferenceOptions } from "./ReferenceOptions"
import { Scene } from "./Scene"
import { Image } from "../Image"

export class Container extends Reference {
    protected _scenes: Array<Scene>
    protected _image: Image
    protected _containers: Array<Container>

    constructor(options: ReferenceOptions, image: Image) {
        super(options)
        this._image = image
        this._scenes = []
        this._containers = []
    }

    get image(): Image {
        return this._image
    }

    set image(image: Image) {
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

    get containers(): Array<Container> {
        return this._containers
    }

    addContainer(container: Container) {
        this._containers.push(container)
    }

    removeContainer(container: Container) {
        for (const index of this._containers.keys()) {
            if (this._containers[index] === container) {
                this._containers.splice(index, 1)
                return
            }
        }
    }

    removeContainerByIndex(index: number) {
        const container = this._containers.splice(index, 1)[0]

        return container
    }
}
