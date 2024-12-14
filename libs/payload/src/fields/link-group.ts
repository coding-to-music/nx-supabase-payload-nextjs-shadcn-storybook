import type { ArrayField, Field } from 'payload'

import type { LinkAppearances } from './link'

import { deepMerge } from '../utils/deep-merge'
import { link } from './link'

type Factory = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: Factory = ({ appearances, overrides = {} } = {}) => {
  const linkGroupField: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
      }),
    ],
  }

  return deepMerge(linkGroupField, overrides)
}
