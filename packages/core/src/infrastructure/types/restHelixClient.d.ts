export interface HelixToken {
	access_token: string
	expires_in: number
	token_type: string
}

export interface HelixClipParams {
	broadcaster_id: string
	game_id: string
	id: string
	started_at: string
	ended_at: string
	first: string
	before: string
	after: string
}

export interface HelixClip {
	id: string
	url: string
	embed_url: string
	broadcaster_id: string
	broadcaster_name: string
	creator_id: string
	creator_name: string
	video_id: string
	game_id: string
	language: string
	title: string
	view_count: number
	created_at: string
	thumbnail_url: string
	duration: number
	vod_offset: number
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
