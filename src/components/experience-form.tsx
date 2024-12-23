import { useState } from 'react'

type Props = {
	onProceed: (experience: 'like' | 'dislike') => void
	onSkip: () => void
}

export function ExperienceForm({ onProceed, onSkip }: Props) {
	const [experience, setExperience] = useState<'like' | 'dislike' | null>()

	const onGotoPlaystore = () => onProceed('like')
	const onGotoFeedback = () => onProceed('dislike')

	const renderBottomButton = () => {
		if (experience === 'like') {
			return (
				<button
					className="w-full bg-blue-700 text-white"
					onClick={onGotoPlaystore}
				>
					Rate 5 stars on play store
				</button>
			)
		} else if (experience === 'dislike') {
			return (
				<button
					className="w-full bg-blue-700 text-white"
					onClick={onGotoFeedback}
				>
					Submit feedback
				</button>
			)
		}
	}

	const activeStyles = () => {
		return {
			border: '1px solid blue',
			backgroundColor: 'skyblue',
		}
	}

	return (
		<>
			<button className="absolute top-0 right-0 text-sm" onClick={onSkip}>
				Skip this
			</button>
			<div className="flex flex-col h-full">
				<div className="">
					<h1 className="text-5xl h-32 text-center grid place-items-center">
						👍
					</h1>
					<h2 className="text-2xl text-center">
						Like shopping on Udaan?
					</h2>
				</div>
				<div className="flex justify-center mt-auto p-4 gap-2">
					<button
						className="w-16 h-16 rounded-full"
						onClick={() => setExperience('like')}
						style={experience === 'like' ? activeStyles() : {}}
					>
						👍
					</button>
					<button
						className="w-16 h-16 rounded-full"
						onClick={() => setExperience('dislike')}
						style={experience === 'dislike' ? activeStyles() : {}}
					>
						👎
					</button>
				</div>
				<div className="items-end">{renderBottomButton()}</div>
			</div>
		</>
	)
}
