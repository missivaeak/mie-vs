// app/models/StartingPoint.ts

import { Reference } from "./Reference"
import { ReferenceOptions } from "./ReferenceOptions"
import { Container } from "./Container"
import { Image } from "./Image"

export class StartingPoint extends Reference {
    private _containers: Array<Container>
    private _image: Image

    constructor(options: ReferenceOptions, image: Image) {
        super(options)
        this._containers = []
        this._image = image
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

    get image(): Image {
        return this._image
    }

    set image(image: Image) {
        this._image = image
    }
}
