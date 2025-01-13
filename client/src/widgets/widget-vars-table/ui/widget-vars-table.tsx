import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui'

const WidgetVarsTable = () => {
	return (
		<div>
			<p className='text-sm mb-2'>
				Вы можете использовать в разметке следующие переменные:
			</p>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Название переменной</TableHead>
						<TableHead>Значение переменной</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className='font-medium'>name</TableCell>
						<TableCell>имя клиента</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-medium'>companyName</TableCell>
						<TableCell>название вашей организации</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<p className='mt-2'>
				<span className='font-semibold'>Пример:</span> Уважаемый {'{{ name }}'}{' '}
				<span className='opacity-50'>Уважаемый Иван</span>
			</p>
		</div>
	)
}

export default WidgetVarsTable
