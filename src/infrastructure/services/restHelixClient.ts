import { config } from 'infrastructure/config'
import { HelixToken, HelixUserData } from 'infrastructure/types/restHelixClient'
import { Dependencies } from 'types/container'

export class RestHelixClient {
	private _httpClient: Dependencies['httpClient']

	constructor({ httpClient }: Dependencies) {
		this._httpClient = httpClient
	}

	private async _getHelixToken() {
		const url = `https://id.twitch.tv/oauth2/token?client_id=${config.helix.clientId}&client_secret=${config.helix.clientSecret}&grant_type=client_credentials`
		const token = await this._httpClient.post<HelixToken>({ url })
		return token.access_token
	}

	public async getUserImage(username: string) {
		const accessToken = await this._getHelixToken()
		const url = `https://api.twitch.tv/helix/users?login=${username}`
		const options = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Client-ID': config.helix.clientId,
				'Content-Type': 'application/json',
			},
		}
		const { data } = await this._httpClient.get<{ data: HelixUserData[] }>({ url, options })
		if (data.length === 0) return null
		return data[0].profile_image_url
	}
}
