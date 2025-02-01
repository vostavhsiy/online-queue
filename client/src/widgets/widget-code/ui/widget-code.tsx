import { Code } from '@/shared/ui'
import { FC } from 'react'

interface Props {
	widgetId: string
	specId?: boolean
}

export const WidgetCode: FC<Props> = ({ widgetId, specId }) => {
	return (
		<Code title='JavaScript'>
			{`<script src="${process.env.INJECT_API_URL}/index.js"></script>
			<script type='text/javascript'>
				renderQueueWidget(${
					specId ? '< ваш id в разметке >' : "'queue-widget'"
				}, '${widgetId}')
			</script>`}
		</Code>
	)
}
