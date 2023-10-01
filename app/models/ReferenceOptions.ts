// app/models/ReferenceOptions.ts

import { Reference } from '../models/Reference';

export interface ReferenceOptions {
    type: string
    route: string
    name: string
    description: string
    parent?: Reference
    image?: string
    sound?: string
}
