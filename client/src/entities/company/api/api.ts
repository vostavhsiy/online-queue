import { getMainInstance, mainInstance } from '@/shared/api'
import { Company, CompanyWithEvents } from '../model'

export interface SignUpPayload
	extends Pick<Company, 'email' | 'name' | 'password'> {}
export interface SignUpResponse extends Omit<Company, 'password'> {}

export interface SignInPayload extends Pick<Company, 'email' | 'password'> {}
export interface SignInResponse extends Omit<Company, 'password'> {
	accessToken: string
}

export interface AuthResponse extends Omit<CompanyWithEvents, 'password'> {}

export interface CompanyUpdatePayload extends Partial<Omit<Company, 'id'>> {}
export interface CompanyUpdateResponse extends Omit<Company, 'password'> {}

export class CompanyApi {
	static async signUp(payload: SignUpPayload) {
		const { data } = await mainInstance.post<SignUpResponse>(
			'/auth/signup',
			payload
		)
		return data
	}

	static async signIn(payload: SignInPayload) {
		const { data } = await mainInstance.post<SignInResponse>(
			'/auth/login',
			payload
		)
		return data
	}

	static async signInWithOAuth(payload: Omit<SignUpPayload, 'password'>) {
		const { data } = await mainInstance.post<SignInResponse>(
			'/auth/login/oauth',
			payload
		)
		return data
	}

	static async auth() {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<AuthResponse>('/auth')
		return data
	}

	static async update(id: string, payload: CompanyUpdatePayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.patch<CompanyUpdateResponse>(
			`/companies/${id}`,
			payload
		)
		return data
	}
}
