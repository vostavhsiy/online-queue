'use client'

import {
	CalendarRange,
	ChevronRight,
	Code,
	Mail,
	MailCheck,
	MailX,
	Rows3,
	Settings,
	Square,
} from 'lucide-react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarRail,
} from '@/shared/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Menu items.
const items = [
	{
		title: 'Расписание',
		url: '/dashboard',
		icon: CalendarRange,
	},
	{
		title: 'Мероприятия',
		url: '/dashboard/events',
		icon: Rows3,
	},
	{
		title: 'Виджет',
		url: '/dashboard/widget',
		icon: Square,
	},
	{
		title: 'Встраивание',
		url: '/dashboard/inject',
		icon: Code,
	},
	{
		title: 'Письма',
		icon: Mail,
		links: [
			{
				title: 'Запись на прием',
				url: '/dashboard/emails/make',
				icon: MailCheck,
			},
			{
				title: 'Удаление записи',
				url: '/dashboard/emails/unmake',
				icon: MailX,
			},
		],
	},
	{
		title: 'Настройки',
		url: '/dashboard/settings',
		icon: Settings,
	},
]

export const DashboardSidebar = () => {
	const pathname = usePathname()

	return (
		<Sidebar variant='floating' collapsible='icon'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Меню</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => {
								if (item.links) {
									return (
										<Collapsible
											defaultOpen
											key={item.title}
											className='group/collapsible'
										>
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton>
														<item.icon />
														<span>{item.title}</span>{' '}
														<ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
													</SidebarMenuButton>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<SidebarMenuSub>
														{item.links.map(link => {
															let isActive = false
															if (link.url === '/dashboard') {
																isActive = pathname === link.url
															} else {
																isActive = pathname.includes(link.url)
															}
															return (
																<SidebarMenuSubItem key={link.url + link.title}>
																	<SidebarMenuButton
																		variant={isActive ? 'outline' : 'default'}
																		asChild
																	>
																		<Link href={link.url}>
																			<link.icon />
																			<span>{link.title}</span>
																		</Link>
																	</SidebarMenuButton>
																</SidebarMenuSubItem>
															)
														})}
													</SidebarMenuSub>
												</CollapsibleContent>
											</SidebarMenuItem>
										</Collapsible>
									)
								}
								let isActive = false
								if (item.url === '/dashboard') {
									isActive = pathname === item.url
								} else {
									isActive = pathname.includes(item.url)
								}
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											variant={isActive ? 'outline' : 'default'}
											asChild
										>
											<Link href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
