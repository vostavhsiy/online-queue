'use client'

import dynamic from 'next/dynamic'

const EmailEditor = dynamic(() => import('./ui/email-editor'), {
	ssr: false,
})

export { EmailEditor }
