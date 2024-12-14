import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@my-project/payload'

import { RichText } from '~/components/utils/RichText'
import { CmsLink } from '~/components/utils/CmsLink'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" content={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CmsLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
