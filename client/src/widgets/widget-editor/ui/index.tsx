'use client'

import { updateWidget } from '@/entities/widget/api'
import { Button, useSidebar } from '@/shared/ui'
import { Calendar } from '@fullcalendar/core'
import ruLocale from '@fullcalendar/core/locales/ru'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Editor } from '@tinymce/tinymce-react'
import { RotateCcw } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	widgetId: string
	widgetHtml: string
}

const WidgetEditor: FC<Props> = ({ widgetHtml, widgetId }) => {
	const editorRef = useRef<any>(null)

	const { state: sidebarState } = useSidebar()

	const [calendar, setCalendar] = useState<Calendar | null>(null)

	const [previewHtml, setPreviewHtml] = useState(widgetHtml)
	const previewRef = useRef<HTMLDivElement>(null)

	const [isShow, setIsShow] = useState(false)

	const formButton = useRef<HTMLButtonElement>(null)
	const [formMode, setFormMode] = useState(false)

	const resizeCalendar = () => {
		const wrapper = previewRef.current
		if (wrapper) {
			wrapper.style.opacity = '0'
		}
		setTimeout(() => {
			if (wrapper) {
				wrapper.style.opacity = '1'
			}
			calendar?.updateSize()
		}, 200)
	}

	useEffect(() => {
		resizeCalendar()
	}, [sidebarState])

	const preview = () => {
		const html = editorRef.current?.getContent()
		if (!html) return
		setFormMode(false)
		setPreviewHtml(html)
		editorRef.current?.resize()
	}

	const save = () => {
		const html = editorRef.current?.getContent()
		if (!html) return
		updateWidget(widgetId, { customHtml: html }).then(res => {
			setFormMode(false)
			toast.success('Виджет сохранен!')
		})
	}

	const refresh = () => {
		editorRef.current?.setContent(widgetHtml)
		setPreviewHtml(widgetHtml)
		updateWidget(widgetId, { customHtml: null }).then(res => {
			setFormMode(false)
			toast.success('Виджет возвращен к начальному виду!')
		})
	}

	useEffect(() => {
		setPreviewHtml(widgetHtml)
	}, [widgetHtml])

	useEffect(() => {
		if (previewRef.current) {
			previewRef.current.innerHTML = previewHtml
			const calendarRoot = previewRef.current.querySelector(
				'#online-queue-calendar'
			)
			if (!calendarRoot) return
			calendarRoot.innerHTML = ''
			let calendar = new Calendar(calendarRoot as HTMLElement, {
				plugins: [dayGridPlugin],
				initialView: 'dayGridMonth',
				locale: ruLocale,
			})
			setCalendar(calendar)
			calendar.render()
		}
	}, [previewHtml])

	const openForm = () => {
		if (formButton.current) formButton.current.disabled = true
		const form = document?.getElementById('online-queue-form')
		const info = document.querySelector('#online-queue-form #info')
		if (!form || !info) return
		info.innerHTML = `
      <div class="info-inner">
        <p class="title">Название мероприятия</p>
        <div class="info-time">
          <span>21.12.2024</span>
          <span>с 14:00 до 15:00</span>
        </div>
      </div>
    `
		form.classList.remove('unactive')
		form.classList.add('active')
		setTimeout(() => {
			if (formButton.current) formButton.current.disabled = false
		}, 1000)
	}

	const closeForm = () => {
		if (formButton.current) formButton.current.disabled = true
		const form = document?.getElementById('online-queue-form')
		if (!form) return
		form.addEventListener('submit', event => {
			event.preventDefault()
		})
		form.classList.remove('active')
		form.classList.add('unactive')
		setTimeout(() => {
			const info = document.querySelector('#online-queue-form #info')
			if (info) info.innerHTML = ''
			if (formButton.current) formButton.current.disabled = false
		}, 1000)
	}

	useEffect(() => {
		formMode ? openForm() : closeForm()
	}, [formMode])

	return (
		<div className='flex flex-1 justify-between gap-8 text-black'>
			<div className='w-1/2'>
				<p className='mb-3 text-lg'>Редактирование виджета</p>
				<div className='bg-secondary h-[400px] rounded-[10px]'>
					<Editor
						apiKey='9ldpaxak54aua50sjqri4d0afsxe375len4me5v6enve07jo'
						onInit={(_evt, editor) => {
							editorRef.current = editor
						}}
						init={{
							language_url: '/locales/ru.js',
							language: 'ru',
							promotion: false,
							statusbar: false,
							menubar: false,
							highlight_on_focus: false,
							plugins:
								'anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks code preview',
							toolbar:
								'undo redo blocks fontfamily fontsize | bold italic underline forecolor backcolor | code',
						}}
						onPostRender={() => {
							setIsShow(true)
						}}
						initialValue={isShow ? widgetHtml : ''}
					/>
				</div>
				<div className='mt-5 flex justify-between items-center'>
					<div className='flex items-center gap-5'>
						<Button size={'icon'} onClick={refresh}>
							<RotateCcw />
						</Button>
						<Button onClick={preview}>Вывести на превью</Button>
					</div>
					<Button onClick={save}>Сохранить виджет</Button>
				</div>
			</div>
			<div className='w-1/2 widget-preview'>
				<div className='mb-3 flex items-center justify-between gap-3'>
					<p className='text-lg'>Превью</p>
					<div className='flex items-center gap-3'>
						<Button
							ref={formButton}
							variant={formMode ? 'destructive' : 'default'}
							onClick={() => {
								setFormMode(prev => !prev)
							}}
						>
							{formMode ? 'Закрыть форму' : 'Открыть форму'}
						</Button>
					</div>
				</div>
				<div ref={previewRef}></div>
			</div>
		</div>
	)
}

export default WidgetEditor
