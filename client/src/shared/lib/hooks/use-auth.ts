'use client'

import { CompanyApi } from '@/entities/company/api'
import { CompanyWithEvents } from '@/entities/company/model'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useAuth = () => {
	const { data: session, status: sessionStatus } = useSession()

	const [company, setCompany] = useState<Omit<CompanyWithEvents, 'password'>>()
	const [status, setStatus] = useState<'fullfield' | 'pending' | 'error'>(
		'pending'
	)

	useEffect(() => {
		const token = session?.accessToken
		token &&
			CompanyApi.authFromClient(token)
				.then(res => {
					setCompany(res)
					setStatus('fullfield')
				})
				.catch(err => setStatus('error'))
	}, [sessionStatus])

	return { company, status }
}
