import React from 'react'
import { ILocale } from '../types/content'

interface LocalProps {
  locale: ILocale
}

const Local: React.SFC<LocalProps> = ({ locale }) => {
  return (
    <div>
      <h2>{locale.title}</h2>
    </div>
  )
}

export default Local
