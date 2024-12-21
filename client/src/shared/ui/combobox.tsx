import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'

import { cn } from '@/shared/lib'
import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/ui/'

const frameworks = [
	{
		value: 'next.js',
		label: 'Next.js',
	},
	{
		value: 'sveltekit',
		label: 'SvelteKit',
	},
	{
		value: 'nuxt.js',
		label: 'Nuxt.js',
	},
	{
		value: 'remix',
		label: 'Remix',
	},
	{
		value: 'astro',
		label: 'Astro',
	},
]

interface Props {
	values: Array<{ label: string; value: string }>
	open?: boolean
	setOpen?: Dispatch<SetStateAction<boolean>>
	value: string
	setValue: (value: string) => void
}

export const Combobox: FC<Props> = ({
	setValue,
	value,
	values,
	open,
	setOpen,
}) => {
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'
				>
					{value ? values.find(v => v.value === value)?.label : 'Select...'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search...' />
					<CommandList>
						<CommandEmpty>No thing found.</CommandEmpty>
						<CommandGroup>
							{values.map(v => (
								<CommandItem
									key={v.value}
									value={v.value}
									onSelect={currentValue => {
										setValue(currentValue === value ? '' : currentValue)
										setOpen && setOpen(false)
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === v.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{v.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
