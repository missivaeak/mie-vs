// app/models/Reference.ts

import { ReferenceOptions } from "./ReferenceOptions"

export abstract class Reference {
    private _type: string
    private _route: string
    private _name: string
    private _description: string
    private _parent: Reference

    constructor(options: ReferenceOptions) {
        this._type = options.type
        this._route = options.route
        this._name = options.name
        this._description = options.description
        this._parent = this
        if (options.parent instanceof Reference) {
            this._parent = options.parent
        }
    }

    get type() {
        return this._type
    }

    set type(type: string) {
        this._type = type
    }

    get route() {
        return this._route
    }

    set route(route: string) {
        this._route = route
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get description() {
        return this._description
    }

    set description(description: string) {
        this._description = description
    }

    get parent() {
        return this._parent
    }

    set parent(parent: Reference) {
        this._parent = parent
    }
}
