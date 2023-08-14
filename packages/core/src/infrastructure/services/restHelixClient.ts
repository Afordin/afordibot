import type { HelixToken, HelixClipParams, HelixClip, HelixUserData } from 'infrastructure/types/restHelixClient'
import type { Dependencies } from 'types/container'

export class RestHelixClient {
	private _config: Dependencies['config']
	private _httpClient: Dependencies['httpClient']
	private _utils: Dependencies['utils']

	constructor({ config, httpClient, utils }: Pick<Dependencies, 'config' | 'httpClient' | 'utils'>) {
		this._config = config
		this._httpClient = httpClient
		this._utils = utils
	}

	public async getHelixToken() {
		const { clientId, clientSecret, grantType } = this._config.helixConfig
		const params = { client_id: clientId, client_secret: clientSecret, grant_type: grantType }
		const url = this._utils.urlSearchParams('https://id.twitch.tv/oauth2/token', params)
		const token = await this._httpClient.post<HelixToken>({ url })
		return token.access_token
	}

	public async getClips(params: Partial<HelixClipParams>) {
		const url = this._utils.urlSearchParams('https://api.twitch.tv/helix/clips', params)
		const options = await this._createClientOptions()
		const { data } = await this._httpClient.get<{ data: HelixClip[] }>({ url, options })
		return data
	}

	public async getUsersData(usernames: string[]) {
		const chunks = this._createUsernamesChunks(usernames)
		const promises = chunks.map((chunk) => this._getChunkUsersData(chunk))
		const usersData = await Promise.all(promises)
		return usersData.flat()
	}

	private async _createClientOptions() {
		const accessToken = await this.getHelixToken()
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Client-ID': this._config.helixConfig.clientId,
				'Content-Type': 'application/json',
			},
		}
	}

	private _createUsernamesChunks(usernames: string[]) {
		const iterations = Math.ceil(usernames.length / 100)
		const chunks: string[][] = []
		const size = 100

		for (let i = 0; i < iterations; i++) {
			const startIndex = size * i
			const endIndex = size * (i + 1)
			const chunk = usernames.slice(startIndex, endIndex)
			chunks.push(chunk)
		}
		return chunks
	}

	private async _getChunkUsersData(usernames: string[]) {
		const url = `https://api.twitch.tv/helix/users?login=${usernames.join('&login=')}`
		const options = await this._createClientOptions()
		const { data } = await this._httpClient.get<{ data: HelixUserData[] }>({ url, options })
		return data
	}
}
