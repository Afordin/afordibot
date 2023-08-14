// @ts-nocheck
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'

describe('Instantiate axios http client', () => {
	let axiosHttpClient: AxiosHttpClient
	const axiosMock = { get: vi.fn(), post: vi.fn() }

	beforeEach(() => {
		axiosHttpClient = new AxiosHttpClient({ axios: axiosMock })
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('should be a function', () => {
		expect(typeof AxiosHttpClient).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof axiosHttpClient).toBe('object')
		expect(typeof axiosHttpClient.get).toBe('function')
		expect(typeof axiosHttpClient.post).toBe('function')
	})

	test('post method should return expected data', async () => {
		axiosMock.post
			.mockResolvedValueOnce({ data: 'test' })
			.mockResolvedValueOnce({ data: { id: 1, name: 'test' } })
			.mockResolvedValueOnce({ data: { username: 'test' } })
		expect(await axiosHttpClient.post({ url: 'test' })).toEqual('test')
		expect(await axiosHttpClient.post({ url: 'test' })).toEqual({ id: 1, name: 'test' })
		expect(await axiosHttpClient.post({ url: 'test' })).toEqual({ username: 'test' })
	})

	test('get method should return expected data', async () => {
		axiosMock.get
			.mockResolvedValueOnce({ data: 'test' })
			.mockResolvedValueOnce({ data: { id: 1, name: 'test' } })
			.mockResolvedValueOnce({ data: { username: 'test' } })
		expect(await axiosHttpClient.get({ url: 'test' })).toEqual('test')
		expect(await axiosHttpClient.get({ url: 'test' })).toEqual({ id: 1, name: 'test' })
		expect(await axiosHttpClient.get({ url: 'test' })).toEqual({ username: 'test' })
	})
})
