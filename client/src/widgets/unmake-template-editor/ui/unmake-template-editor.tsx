import { EmailEditor } from '@/features/email-editor'
import { FC } from 'react'

interface Props {
	emailHtml: string
	emailMarkup: string
	emailId: string
	companyName: string
}

const UnmakeTemplateEditor: FC<Props> = props => {
	return <EmailEditor {...props} isUnmake={true} />
}

export default UnmakeTemplateEditor
