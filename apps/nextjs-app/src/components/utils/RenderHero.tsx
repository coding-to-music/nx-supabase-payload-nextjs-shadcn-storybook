import React from 'react'

import type { Page } from '@my-project/payload'

import { HighImpactHero } from '@/components/heros/HighImpactHero'
import { LowImpactHero } from '@/components/heros/LowImpactHero'
import { MediumImpactHero } from '@/components/heros/MediumImpactHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
