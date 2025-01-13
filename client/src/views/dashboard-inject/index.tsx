import { auth } from '@/entities/company/api'
import { Code, Separator } from '@/shared/ui'
import { WidgetCode } from '@/widgets/widget-code'
import { redirect } from 'next/navigation'

const DashboardInjectScreen = async () => {
	const company = await auth()
	if (!company?.widget?.id) redirect('/signin')

	return (
		<>
			<p className='text-2xl mt-5 mb-3'>Встранивание виджета</p>
			<div className='flex flex-col gap-3'>
				<p>
					Добавьте div с id <b>queue-widget</b> туда, где вы хотите разместить
					виджет в разметке.
				</p>
				<Code title='HTML'>{`<div id="queue-widget"></div>`}</Code>
				<p>
					Вы можете указать свой id, но не забудьте его передать в качестве
					аргумента при вызове метода init в скрипте ниже.
				</p>
			</div>
			<Separator className='my-10' />
			<div className='flex flex-col gap-3'>
				<p>Добавьте этот скрипт на ваш сайт.</p>
				<WidgetCode widgetId={company.widget.id} />
			</div>
			<Separator className='my-10' />
			<div className='flex flex-col gap-3'>
				<p>
					Если вы указали свой id в разметке, то передайте его в вызов метода
					init.
				</p>
				<WidgetCode widgetId={company.widget.id} specId />
			</div>
		</>
	)
}

export default DashboardInjectScreen
