import { describe, expect, test, vi } from 'vitest'
import { createStore, SAMPLE } from './store'

describe('basic store', () => {
	test('increment/decrement', () => {
		const store = createStore({ count: 0 }, SAMPLE.reducer)

		// increment twice
		store.dispatch({
			type: SAMPLE.actions.INCREMENT,
		})
		store.dispatch({
			type: SAMPLE.actions.INCREMENT,
		})
		expect(store.getState().count).toBe(2)

		// decrement once
		store.dispatch({
			type: SAMPLE.actions.DECREMENT,
		})
		expect(store.getState().count).toBe(1)

		// increment + reset
		store.dispatch({
			type: SAMPLE.actions.INCREMENT,
		})
		store.dispatch({
			type: SAMPLE.actions.RESET,
		})
		expect(store.getState().count).toBe(0)
	})

	test('subscription', () => {
		const store = createStore({ count: 0 }, SAMPLE.reducer)

		const spyCb = vi.fn((newState, op) => {
			// console.log(newState, op)
		})

		store.subscribe((newState, ops) => {
			spyCb(newState, ops)
		})

		expect(spyCb).toHaveBeenCalledTimes(0)

		store.dispatch({
			type: SAMPLE.actions.INCREMENT,
		})
		expect(spyCb).toHaveBeenCalledTimes(1)
	})

	test('multiple subscription', () => {
		const store = createStore({ count: 0 }, SAMPLE.reducer)

		const spyCb1 = vi.fn((newState, op) => {
			// console.log(newState, op)
		})
		const spyCb2 = vi.fn(() => {})

		store.subscribe(spyCb1)
		store.subscribe(spyCb2)

		expect(spyCb1).toHaveBeenCalledTimes(0)
		expect(spyCb2).toHaveBeenCalledTimes(0)

		store.dispatch({
			type: SAMPLE.actions.INCREMENT,
		})
		expect(spyCb1).toHaveBeenCalledTimes(1)
		expect(spyCb2).toHaveBeenCalledTimes(1)
	})

	test('multiple subscription + unsubscribe', () => {
		const store = createStore({ count: 0 }, SAMPLE.reducer)

		const spyCb1 = vi.fn((newState, op) => {
			// console.log(newState, op)
		})
		const spyCb2 = vi.fn(() => {})

		store.subscribe(spyCb1)
		const unsub2 = store.subscribe(spyCb2)

		expect(spyCb1).toHaveBeenCalledTimes(0)
		expect(spyCb2).toHaveBeenCalledTimes(0)

		// 1 increment, calls both
		store.dispatch({
			type: SAMPLE.actions.INCREMENT,
		})
		expect(spyCb1).toHaveBeenCalledTimes(1)
		expect(spyCb2).toHaveBeenCalledTimes(1)

		unsub2()

		// 1 increment after unsub of 2, calls only 1
		store.dispatch({
			type: SAMPLE.actions.INCREMENT,
		})
		expect(spyCb1).toHaveBeenCalledTimes(2)
		expect(spyCb2).toHaveBeenCalledTimes(1)
	})

	test('logger middleware', () => {
		const store = createStore({ count: 0 }, SAMPLE.reducer, [
			SAMPLE.middleware,
		])
		store.dispatch({
			type: SAMPLE.actions.INCREMENT,
		})

		expect(store.getState().count).toBe(1)
	})
})
