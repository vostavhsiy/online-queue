import { auth } from '@/entities/company/api'
import {
	getEmail,
	getEmailUnmakeMarkup,
	getEmailUnmakeTemplate,
} from '@/entities/email/api'
import { UnmakeTemplateEditor } from '@/widgets/unmake-template-editor'
import { redirect } from 'next/navigation'

const DashboardEmailsUnmakeScreen = async () => {
	const company = await auth()
	if (typeof company === 'string' || !company?.emailHtml) redirect('/dashboard')

	const email = await getEmail(company.emailHtml.id)
	if (!email) redirect('/dashboard')
	const emailHtml = await getEmailUnmakeTemplate(email.id)
	if (!emailHtml) redirect('/dashboard')
	const emailMarkup = await getEmailUnmakeMarkup(email.id)
	if (!emailMarkup) redirect('/dashboard')

	return (
		<div>
			<UnmakeTemplateEditor
				emailHtml={emailHtml}
				emailMarkup={emailMarkup}
				emailId={email.id}
				companyName={company.name}
			/>
		</div>
	)
}

export default DashboardEmailsUnmakeScreen
