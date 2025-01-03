import { CompanyApi } from '@/entities/company/api'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import VkProvider from 'next-auth/providers/vk'

const authOptions: AuthOptions = {
	providers: [
		VkProvider({
			clientId: '52839337',
			clientSecret: 'qThJnSCHioYr2zORNyZY',
			async profile(profile, tokens) {
				const data = profile?.response[0]
				try {
					if (!data || !tokens?.email) throw new Error('No data!')
					const res = await CompanyApi.signInWithOAuth({
						email: tokens.email as string,
						name: data.first_name + ' ' + data.last_name,
					})
					return res
				} catch (error) {
					console.log(error)
					return profile?.response[0]
				}
			},
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				try {
					if (!credentials) throw new Error('No data!')
					const res = await CompanyApi.signIn(credentials)
					return res
				} catch (error) {
					console.log(error)
					return null
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				//@ts-ignore
				token.accessToken = user.accessToken
				token.user = user
			}
			return token
		},
		async session({ session, token }) {
			//@ts-ignore
			session.accessToken = token.accessToken
			//@ts-ignore
			session.user = token.user
			return session
		},
	},
	pages: {
		signIn: '/signin',
	},	
}

export default authOptions
