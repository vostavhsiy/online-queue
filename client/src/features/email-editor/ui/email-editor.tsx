'use client'

import { updateEmail } from '@/entities/email/api'
import { Button } from '@/shared/ui'
import { Editor } from '@tinymce/tinymce-react'
import { AxiosError } from 'axios'
import * as hbs from 'handlebars'
import { RotateCcw } from 'lucide-react'
import { FC, useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
	emailId: string
	emailHtml: string
	emailMarkup: string
	companyName: string
	isUnmake?: boolean
}

const getRenderData = (data?: Object) => ({
	name: 'Иван',
	eventName: '"Констультация"',
	date: new Date().toLocaleDateString(),
	from: '11:00',
	to: '12:00',
	...data,
})

const EmailEditor: FC<Props> = ({
	emailHtml,
	emailMarkup,
	emailId,
	companyName,
	isUnmake,
}) => {
	const editorRef = useRef<any>(null)

	const [isPending, startTransition] = useTransition()

	const [previewHtml, setPreviewHtml] = useState(emailHtml)
	const previewRef = useRef<HTMLDivElement>(null)

	const [isShow, setIsShow] = useState(false)

	const preview = () => {
		const htmlMarkup = editorRef.current?.getContent()
		if (!htmlMarkup) return
		const template = hbs.compile(htmlMarkup)
		const html = template(getRenderData({ companyName }))
		setPreviewHtml(html)
	}

	const save = () => {
		const html = editorRef.current?.getContent()
		if (!html) return
		startTransition(async () => {
			try {
				const res = await updateEmail(
					emailId,
					isUnmake ? { unmakeCustomHtml: html } : { makeCustomHtml: html }
				)
				console.log(res)
				toast.success('Сохранено!')
			} catch (error) {
				//@ts-ignore
				toast.error(error.message)
			}
		})
	}

	const refresh = () => {
		startTransition(async () => {
			try {
				const res = await updateEmail(
					emailId,
					isUnmake ? { unmakeCustomHtml: null } : { makeCustomHtml: null }
				)
				setPreviewHtml(emailHtml)
				editorRef.current?.setContent(emailMarkup)
			} catch (error) {
				//@ts-ignore
				toast.error(error.message)
			}
		})
	}

	useEffect(() => {
		setPreviewHtml(emailHtml)
	}, [emailHtml])

	useEffect(() => {
		if (previewRef.current) {
			previewRef.current.innerHTML = previewHtml
		}
	}, [previewHtml])

	return (
		<div className='flex flex-1 justify-between gap-8'>
			<div className='w-1/2'>
				<p className='mb-3 text-lg'>
					Редактирование шаблона письма при{' '}
					{isUnmake ? 'удалении записи' : 'записи'}
				</p>
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
						initialValue={isShow ? emailMarkup : ''}
					/>
				</div>
				<div className='mt-5 flex justify-between items-center'>
					<div className='flex items-center gap-5'>
						<Button disabled={isPending} size={'icon'} onClick={refresh}>
							<RotateCcw />
						</Button>
						<Button disabled={isPending} onClick={preview}>
							Вывести на превью
						</Button>
					</div>
					<Button disabled={isPending} onClick={save}>
						Сохранить виджет
					</Button>
				</div>
			</div>
			<div className='w-1/2 widget-preview'>
				<div className='mb-3 flex items-center justify-between gap-3'>
					<p className='text-lg'>Превью</p>
				</div>
				<div ref={previewRef}></div>
			</div>
		</div>
	)
}

export default EmailEditor
