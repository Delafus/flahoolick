import { type SchemaTypeDefinition } from 'sanity'

import { articulo } from './documents/articulo'
import { categoria } from './documents/categoria'
import { cita } from './objects/cita'
import { destacado } from './objects/destacado'
import { imagenEnCuerpo } from './objects/imagenEnCuerpo'
import { paso } from './objects/paso'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoria, articulo, cita, destacado, paso, imagenEnCuerpo],
}
