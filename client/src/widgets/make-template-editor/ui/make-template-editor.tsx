import { EmailEditor } from '@/features/email-editor'
import { FC } from 'react'

interface Props {
	emailHtml: string
	emailMarkup: string
	emailId: string
	companyName: string
}

const MakeTemplateEditor: FC<Props> = props => {
	return <EmailEditor {...props} />
}

export default MakeTemplateEditor
