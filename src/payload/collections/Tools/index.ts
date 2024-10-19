import type { CollectionConfig } from 'payload/types'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'Tool',
  },
  access: {
    read: () => true, // Public access for reading
    create: ({ req: { user } }) => !!user, // Only logged-in users can create
    update: ({ req: { user } }) => !!user, // Only logged-in users can update
    delete: ({ req: { user } }) => !!user, // Only logged-in users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
