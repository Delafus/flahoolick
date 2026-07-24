import {defineArrayMember, defineField, defineType} from 'sanity'

const TIPOS = [
  {title: 'Artículo', value: 'articulo'},
  {title: 'Guía', value: 'guia'},
  {title: 'Tutorial', value: 'tutorial'},
]

export const articulo = defineType({
  name: 'articulo',
  title: 'Artículo',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'titulo', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {list: TIPOS, layout: 'radio'},
      initialValue: 'articulo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'categoria'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autor',
      title: 'Autor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha de publicación',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'extracto',
      title: 'Extracto',
      description: 'Se usa como bajada del artículo y como meta description.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'imagenDestacada',
      title: 'Imagen destacada',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lectura',
      title: 'Minutos de lectura',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'destacada',
      title: 'Destacada en portada',
      type: 'boolean',
      initialValue: false,
      description: 'Solo un artículo puede estar destacado a la vez.',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true
          const {document, getClient} = context
          if (!document?._id) return true
          const client = getClient({apiVersion: '2026-07-24'})
          const id = document._id.replace(/^drafts\./, '')
          const otros = await client.fetch(
            `count(*[_type == "articulo" && destacada == true && !(_id in [$id, "drafts." + $id])])`,
            {id},
          )
          return otros === 0 || 'Ya hay otro artículo marcado como destacado. Desmárcalo primero.'
        }),
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      description: 'Solo se usa para ordenar las guías (01, 02, 03...).',
      type: 'number',
      hidden: ({document}) => document?.tipo !== 'guia',
      validation: (Rule) => Rule.integer().positive(),
    }),
    defineField({
      name: 'cuerpo',
      title: 'Cuerpo',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Subtítulo', value: 'h2'},
          ],
          lists: [{title: 'Lista', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Negrita', value: 'strong'},
              {title: 'Cursiva', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({type: 'cita'}),
        defineArrayMember({type: 'destacado'}),
        defineArrayMember({type: 'paso'}),
        defineArrayMember({type: 'imagenEnCuerpo'}),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'categoria.nombre',
      media: 'imagenDestacada',
    },
  },
})
