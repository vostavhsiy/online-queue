import { auth } from '@/entities/company/api'
import { getWidget } from '@/entities/widget/api/actions'
import { WidgetEditor } from '@/widgets/widget-editor'
import { redirect } from 'next/navigation'

const DashboardWidgetScreen = async () => {
	const company = await auth()
	if (!company?.widget) redirect('/dashboard')

	const widgetHtml = await getWidget(company.widget.id)
	if (!widgetHtml) redirect('/dashboard')

	return (
		<div>
			<p className='text-3xl mb-4'>Настройки виджета</p>
			<ul className='flex flex-col gap-3 mb-8 list-disc ml-4'>
				<li>
					Блок <strong>Календарь</strong> (
					<span className='italic'>
						div с id="online-queue-calendar" в разметке
					</span>
					) - каледарь с отмеченными мероприятиями в виджете. Можете перемещать
					его или вкладывать в другие блоки, но{' '}
					<strong>не стоит удалять или редактировать этот блок!</strong>
				</li>
				<li>
					Блок <strong>формы</strong> также следует редактировать с
					осторожностью. Самое главное -{' '}
					<strong>
						не изменять атрибуты name, id, required и hidden у полей формы!{' '}
					</strong>
				</li>
				<li>
					Блок <strong>выбора мероприятия</strong> лучше не изменять. Самое
					главное - <strong>не трогать элементы summary и ul (список)! </strong>
				</li>
			</ul>
			<WidgetEditor widgetId={company.widget.id} widgetHtml={widgetHtml} />
		</div>
	)
}

export default DashboardWidgetScreen
