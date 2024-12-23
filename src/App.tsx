import { useEffect, useRef, useState } from 'react'
import { ExperienceForm } from './components/experience-form'
import { Feedbackform } from './components/feedback-form'

function App() {
	const [formStep, setFormStep] = useState<'experience' | 'feedback'>(
		'experience',
	)
	const [modalState, setModalState] = useState(true)
	const modalRef = useRef<HTMLDivElement | null>(null)
	const overlayRef = useRef<HTMLDivElement | null>(null)

	const onSkip = () => {
		setModalState(false)
		setFormStep('experience')
	}
	const onDone = (value: unknown) => {
		alert(JSON.stringify(value))
		setModalState(false)
		setFormStep('experience')
	}

	useEffect(() => {
		const onEscape = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === 'escape') {
				onSkip()
			}
		}
		window.addEventListener('keydown', onEscape)
		return () => {
			window.removeEventListener('keydown', onEscape)
		}
	}, [])

	useEffect(() => {
		const modal = modalRef.current
		const overlay = overlayRef.current

		const outsideClickHandler = (e: MouseEvent) => {
			if (!modalState) return false
			const el = e.target as HTMLElement
			console.log(el, modal, el.contains(modal))
			if (el.contains(modal)) {
				return
			} else {
				onSkip()
				return
			}
		}

		overlay?.addEventListener('click', outsideClickHandler)
		return () => overlay?.addEventListener('click', outsideClickHandler)
	}, [modalState])

	return (
		<div className="Screen">
			<button className="" onClick={() => setModalState(true)}>
				Feedback
			</button>
			{modalState && (
				<>
					<div
						className="absolute inset-0 bg-black/20 h-full flex items-center justify-center p-2"
						ref={overlayRef}
					/>

					<div
						className="border-2 w-[500px] bottom-2 absolute ModalContent rounded-t-md shadow-lg bg-gray-200 left-1/2 -translate-x-1/2"
						ref={modalRef}
						style={{
							height: formStep === 'experience' ? '50vh' : '90vh',
						}}
					>
						{formStep === 'experience' ? (
							<ExperienceForm
								onSkip={onSkip}
								onProceed={(value) => {
									if (value === 'like') {
										alert('Gave 5 stars wow')
										setFormStep('experience')
										setModalState(false)
									} else {
										setFormStep('feedback')
									}
								}}
							/>
						) : (
							<>
								<Feedbackform onDone={onDone} onSkip={onSkip} />
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default App
