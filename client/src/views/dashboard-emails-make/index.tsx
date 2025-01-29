import { auth } from '@/entities/company/api'
import {
	getEmail,
	getEmailMakeMarkup,
	getEmailMakeTemplate,
} from '@/entities/email/api'
import { MakeTemplateEditor } from '@/widgets/make-template-editor'
import { redirect } from 'next/navigation'

const DashboardEmailsMakeScreen = async () => {
	const company = await auth()
	if (typeof company === "string" || !company?.emailHtml) redirect('/dashboard')

	const email = await getEmail(company.emailHtml.id)
	if (!email) redirect('/dashboard')
	const emailHtml = await getEmailMakeTemplate(email.id)
	if (!emailHtml) redirect('/dashboard')
	const emailMarkup = await getEmailMakeMarkup(email.id)
	if (!emailMarkup) redirect('/dashboard')

	return (
		<div>
			<MakeTemplateEditor
				emailHtml={emailHtml}
				emailMarkup={emailMarkup}
				emailId={email.id}
				companyName={company.name}
			/>
		</div>
	)
}

export default DashboardEmailsMakeScreen
