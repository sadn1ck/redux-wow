/**
 *
 *
 *
 *
 */

type Action = {
	type: string
	payload?: any
}
type ReducerFn<T> = (state: T, action: Action) => T
type Subscription<T> = (newState: T, op: Action) => void

type Dispatch = (action: Action) => void
type MiddlewareAPI<T> = { dispatch: Dispatch; getState: () => T }
type Middleware<T> = (api: MiddlewareAPI<T>) => Dispatch

class Store<T> {
	state: T
	reducer: ReducerFn<T>
	handlers: Array<Subscription<T>>
	middleware: Array<Middleware<T>>

	constructor(
		initialState: T,
		reducer: ReducerFn<T>,
		middleware: Middleware<T>[],
	) {
		this.state = initialState
		this.reducer = reducer
		this.handlers = []
		this.middleware = middleware
	}

	getState() {
		return this.state
	}

	dispatch(action: Action) {
		this.middleware.forEach((m) => {
			m({ dispatch: () => {}, getState: () => this.state })(action)
		})

		const newState = this.reducer(this.state, action)

		this.handlers.forEach((sub) => {
			sub(newState, action)
		})

		this.state = newState
	}

	subscribe(cb: (newState: T, op: Action) => void): () => void {
		this.handlers.push(cb)

		return () => {
			this.handlers = this.handlers.filter((h) => h !== cb)
		}
	}
}

export function createStore<T>(
	initialState: T,
	reducer: (state: T, action: Action) => T,
	middleware: Middleware<T>[] = [],
) {
	const store = new Store(initialState, reducer, middleware)
	return store
}

const actions = {
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT',
	RESET: 'RESET',
}

const reducer: ReducerFn<{ count: number }> = (state, action) => {
	switch (action.type) {
		case actions.INCREMENT:
			return {
				count: state.count + 1,
			}
		case actions.DECREMENT:
			return {
				count: state.count - 1,
			}
		case actions.RESET:
			return {
				count: 0,
			}
		default:
			return state
	}
}

const logger: Middleware<{ count: number }> = ({ getState }) => {
	return (action) => {
		console.log(`logging action`, action)
		console.log(`state`, getState())
	}
}

export const SAMPLE = {
	actions,
	reducer,
	middleware: logger,
}
