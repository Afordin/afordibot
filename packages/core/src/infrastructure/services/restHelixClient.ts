import type { HelixToken, HelixUserData } from 'infrastructure/types/restHelixClient'
import type { Dependencies } from 'types/container'

export class RestHelixClient {
	private _config: Dependencies['config']
	private _httpClient: Dependencies['httpClient']

	constructor({ config, httpClient }: Pick<Dependencies, 'config' | 'httpClient'>) {
		this._config = config
		this._httpClient = httpClient
	}

	public async getHelixToken() {
		const url = `https://id.twitch.tv/oauth2/token?client_id=${this._config.helixConfig.clientId}&client_secret=${this._config.helixConfig.clientSecret}&grant_type=client_credentials`
		const token = await this._httpClient.post<HelixToken>({ url })
		return token.access_token
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
		const accessToken = await this.getHelixToken()
		const url = `https://api.twitch.tv/helix/users?login=${usernames.join('&login=')}`
		const options = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Client-ID': this._config.helixConfig.clientId,
				'Content-Type': 'application/json',
			},
		}
		const { data } = await this._httpClient.get<{ data: HelixUserData[] }>({ url, options })
		return data
	}

	public async getUsersData(usernames: string[]) {
		const chunks = this._createUsernamesChunks(usernames)
		const promises = chunks.map((chunk) => this._getChunkUsersData(chunk))
		const usersData = await Promise.all(promises)
		return usersData.flat()
	}
}
