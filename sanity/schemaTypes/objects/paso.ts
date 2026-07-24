import {defineField, defineType} from 'sanity'

export const paso = defineType({
  name: 'paso',
  title: 'Paso numerado',
  type: 'object',
  fields: [
    defineField({
      name: 'numero',
      title: 'Número',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'titulo',
      title: 'Título del paso',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'texto',
      title: 'Texto',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'titulo', subtitle: 'numero'},
    prepare({title, subtitle}) {
      return {title: `${subtitle}. ${title}`}
    },
  },
})
