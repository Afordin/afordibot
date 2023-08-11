export interface HelixToken {
	access_token: string
	expires_in: number
	token_type: string
}

export interface HelixUserData {
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
