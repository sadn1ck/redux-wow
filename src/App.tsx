import { useEffect, useState } from 'react'
import { createStore, SAMPLE } from './store'

const countStore = createStore({ count: 1 }, SAMPLE.reducer)

function App() {
	const [localState, setLocalState] = useState(countStore.getState())

	useEffect(() => {
		const unsub = countStore.subscribe((newState) => {
			setLocalState(newState)
		})
		return () => {
			unsub()
		}
	}, [])

	return (
		<>
			<h1 className="text-center text-5xl">{localState.count}</h1>
			<div className="flex flex-col justify-center gap-4 pt-6">
				<button
					onClick={() => {
						countStore.dispatch({
							type: SAMPLE.actions.INCREMENT,
						})
					}}
				>
					+1
				</button>
				<button
					onClick={() => {
						countStore.dispatch({
							type: SAMPLE.actions.DECREMENT,
						})
					}}
				>
					-1
				</button>
				<button
					onClick={() => {
						countStore.dispatch({
							type: SAMPLE.actions.RESET,
						})
					}}
				>
					Reset
				</button>
			</div>
		</>
	)
}

export default App
