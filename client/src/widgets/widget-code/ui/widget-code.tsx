import { Code } from '@/shared/ui'
import { FC } from 'react'

interface Props {
	widgetId: string,
	specId?: boolean
}

export const WidgetCode: FC<Props> = ({ widgetId, specId }) => {
	return (
		<Code title='JavaScript'>
			{`<script type='text/javascript'>new Widget('${widgetId}').init(${specId ? '< ваш id в разметке >' : ""})</script>`}
		</Code>
	)
}
