// @types\next-auth.d.ts
import { Company } from '@/entities/company/model'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		accessToken: string
		user: Company & { accessToken: string } & DefaultSession['user']
	}
}
