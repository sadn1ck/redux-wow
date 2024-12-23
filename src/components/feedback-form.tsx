const questions = [
	'Delivery Time',

	'Range of products',

	'High prices',

	'Issues with app',

	'Quality of products / Damaged',

	'Products',

	'Credit',

	'Others',

	'Comments',
]

type Props = {
	onSkip: () => void
	onDone: (value: unknown) => void
}

export function Feedbackform({ onSkip, onDone }: Props) {
	return (
		<form
			className="flex flex-col p-4 gap-4"
			onSubmit={(e) => {
				e.preventDefault()
				const form = e.target as HTMLFormElement
				const formData = new FormData(form)
				form.reset()
				onDone([...formData.entries()])
			}}
		>
			{questions.map((question) => {
				return (
					<label key={question} className="flex gap-4 p-1">
						<input name={question} type="checkbox" />
						{question}
					</label>
				)
			})}

			<label className="flex flex-col p-1">
				Comments
				<textarea
					name="comments"
					placeholder="Add your comments"
				></textarea>
			</label>

			<button type="submit">Submit</button>
			<button onClick={onSkip}>Skip</button>
		</form>
	)
}
