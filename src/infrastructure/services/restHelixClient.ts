import { config } from 'infrastructure/config'
import { HelixToken, HelixUserData } from 'infrastructure/types/restHelixClient'
import { Dependencies } from 'types/container'

export class RestHelixClient {
	private _httpClient: Dependencies['httpClient']

	constructor({ httpClient }: Pick<Dependencies, 'httpClient'>) {
		this._httpClient = httpClient
	}

	private async _getHelixToken() {
		const url = `https://id.twitch.tv/oauth2/token?client_id=${config.helix.clientId}&client_secret=${config.helix.clientSecret}&grant_type=client_credentials`
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
		const accessToken = await this._getHelixToken()
		const url = `https://api.twitch.tv/helix/users?login=${usernames.join('&login=')}`
		const options = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Client-ID': config.helix.clientId,
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
