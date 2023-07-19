// @ts-nocheck
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest'
import { RestHelixClient } from 'infrastructure/services/restHelixClient'

describe('Instantiate rest helix client', () => {
	let restHelixClient: RestHelixClient
	const httpClientMock = { get: vi.fn(), post: vi.fn() }
	const configMock = {
		helixConfig: {
			clientId: process.env.BOT_ID!,
			clientSecret: process.env.BOT_SECRET!,
			grantType: 'client_credentials',
		},
	}

	beforeEach(() => {
		restHelixClient = new RestHelixClient({ config: configMock, httpClient: httpClientMock })
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('should be a function', () => {
		expect(typeof RestHelixClient).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof restHelixClient).toBe('object')
		expect(typeof restHelixClient.getUsersData).toBe('function')
	})

	test('getUsersData method should return expected data', async () => {
		httpClientMock.post.mockResolvedValue({ access_token: 'test' })
		httpClientMock.get
			.mockResolvedValueOnce({ data: [{ profile_image_url: 'test' }] })
			.mockResolvedValueOnce({ data: [{ profile_image_url: 'test' }, { profile_image_url: 'test' }] })
		expect(await restHelixClient.getUsersData(['test'])).toEqual([{ profile_image_url: 'test' }])
		expect((await restHelixClient.getUsersData(['test', 'test'])).length).toBe(2)
		expect(httpClientMock.post).toHaveBeenCalledTimes(2)
		expect(httpClientMock.get).toHaveBeenCalledTimes(2)
	})
})
