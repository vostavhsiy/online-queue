import { auth } from '@/entities/company/api'
import { CompanySettingsForm } from '@/features/company-settings-form'
import { redirect } from 'next/navigation'

const DashboardSettingsScreen = async () => {
	const company = await auth()
	if (!company) redirect('/')

	return (
		<div>
			<p className='text-3xl mb-3'>Настройки</p>
			<CompanySettingsForm company={company} />
		</div>
	)
}

export default DashboardSettingsScreen
