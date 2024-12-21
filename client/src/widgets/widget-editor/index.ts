'use client'

import dynamic from 'next/dynamic'

const WidgetEditor = dynamic(() => import('./ui'), {
	ssr: false,
})

export { WidgetEditor }
