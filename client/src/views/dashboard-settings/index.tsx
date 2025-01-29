import { auth } from '@/entities/company/api'
import { CompanySettingsForm } from '@/features/company-settings-form'
import { redirect } from 'next/navigation'

const DashboardSettingsScreen = async () => {
	const company = await auth()
	if (typeof company === 'string' || !company) redirect('/')

	return (
		<div>
			<p className='text-3xl mt-5 mb-3'>Настройки</p>
			<CompanySettingsForm company={company} />
		</div>
	)
}

export default DashboardSettingsScreen
