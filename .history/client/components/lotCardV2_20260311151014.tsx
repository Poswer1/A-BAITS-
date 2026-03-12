import React from 'react'

interface LotCardV2Props {
    lot:any
}

export default function LotCardV2({lot}: LotCardV2Props) {

    const { t } = useTranslation()
        const params = useParams()
        const lang = params.lang as string
        const BASE_URL = process.env.NEXT_PUBLIC_URL

  return (
    <div>
      
    </div>
  )
}

