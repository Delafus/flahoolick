import {defineField, defineType} from 'sanity'

export const destacado = defineType({
  name: 'destacado',
  title: 'Bloque destacado',
  type: 'object',
  fields: [
    defineField({
      name: 'texto',
      title: 'Texto',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'texto'},
  },
})
