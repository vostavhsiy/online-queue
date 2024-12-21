import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui'

const EmailVarsTable = () => {
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
						<TableCell className='font-medium'>date</TableCell>
						<TableCell>дата записи</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-medium'>companyName</TableCell>
						<TableCell>название вашей организации</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-medium'>from</TableCell>
						<TableCell>время начала мероприятия</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-medium'>to</TableCell>
						<TableCell>время окончания мероприятия</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='font-medium'>eventName</TableCell>
						<TableCell>название услуги</TableCell>
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

export default EmailVarsTable
