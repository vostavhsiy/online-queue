import { Code } from '@/shared/ui'
import { FC } from 'react'

interface Props {
	widgetId: string
	specId?: boolean
}

export const WidgetCode: FC<Props> = ({ widgetId, specId }) => {
	return (
		<Code title='JavaScript'>
			{`<script src="${
				process.env.API_URL
			}/js/widget.js" type="text/javascript"></script>
			<script type='text/javascript'>new Widget('${widgetId}').init(${
				specId ? '< ваш id в разметке >' : ''
			})</script>`}
		</Code>
	)
}
