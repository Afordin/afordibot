export namespace BotTypes {
	export interface TokenResponse {
		access_token: string
		expires_in: number
		refresh_token: string
		scope: string[]
		token_type: string
	}

	export interface UserDataResponse {
		id: string
		login: string
		display_name: string
		type: string
		broadcaster_type: string
		description: string
		profile_image_url: string
		offline_image_url: string
		view_count: number
		email: string
		created_at: string
	}

	export interface UserData {
		data: UserDataResponse[]
	}
}
