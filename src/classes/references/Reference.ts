// app/models/Reference.ts

import Container from "./Container"
import ReferenceOptions from "./ReferenceOptions"

export default abstract class Reference {
  private _type: string
  private _name: string
  private _description: string
  private parent: Reference | undefined

  constructor(options: ReferenceOptions) {
    this._type = options.type
    this._name = options.name
    this._description = options.description
    this.parent = options.parent
  }

  get type() {
      return this._type
  }

  set type(type: string) {
      this._type = type
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

  setParent(parent: Container) {
    this.parent = parent
  }

  getParent() {
    return this.parent
  }
}
