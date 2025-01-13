import { EmailVarsTable } from '@/widgets/email-vars-table'
import React from 'react'

const DashboardEmailsLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<div>
			<p className='text-3xl mt-5 mb-4'>Настройки писем</p>
			<div className='mb-8'>{children}</div>
			<EmailVarsTable />
		</div>
	)
}

export default DashboardEmailsLayout
