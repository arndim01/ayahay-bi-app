export interface AuthUser {
	id: string
	email: string
	name: string
	role?: string
	created_at?: string
}

export interface AuthCredentials {
	email: string
	password: string
}

export interface AuthRegister {
	name: string
	email: string
	password: string
}

export interface AuthResponse {
	access_token: string
	refresh_token?: string
	user: AuthUser
}

export interface AuthSuccessResponse {
	message: string
}

export interface AuthErrorResponse {
	status_code: number
	message: string
	error: string
}
