import {defineField, defineType} from 'sanity'

export const cita = defineType({
  name: 'cita',
  title: 'Cita',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Texto de la cita',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autor',
      title: 'Autor de la cita',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'quote', subtitle: 'autor'},
  },
})
