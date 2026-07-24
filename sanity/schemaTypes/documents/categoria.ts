import {defineField, defineType} from 'sanity'

export const categoria = defineType({
  name: 'categoria',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'nombre', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color de header',
      description: 'Código hexadecimal (ej. #F5FD92). Se usa como fondo del hero en las guías de esta categoría.',
      type: 'string',
      validation: (Rule) => Rule.regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, {
        name: 'hex',
        invert: false,
      }).error('Debe ser un color hexadecimal válido, ej. #F5FD92'),
    }),
  ],
  preview: {
    select: {title: 'nombre', subtitle: 'descripcion'},
  },
})
