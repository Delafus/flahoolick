import {defineField, defineType} from 'sanity'

export const imagenEnCuerpo = defineType({
  name: 'imagenEnCuerpo',
  title: 'Imagen',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pie',
      title: 'Pie de foto',
      type: 'string',
    }),
    defineField({
      name: 'ratio',
      title: 'Proporción',
      type: 'string',
      options: {
        list: [
          {title: '16:9', value: '16/9'},
          {title: '4:3', value: '4/3'},
          {title: '21:9', value: '21/9'},
          {title: '3:2', value: '3/2'},
          {title: '1:1', value: '1/1'},
        ],
      },
      initialValue: '16/9',
    }),
  ],
  preview: {
    select: {title: 'alt', media: 'image'},
  },
})
