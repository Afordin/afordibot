import type { Dependencies } from 'types/container'
import type { Post, Get } from 'infrastructure/types/axiosHttpClient'

export class AxiosHttpClient {
	private _axios: Dependencies['axios']

	constructor({ axios }: Pick<Dependencies, 'axios'>) {
		this._axios = axios
	}

	public async post<T>({ url, body, options }: Post) {
		const { data } = await this._axios.post<T>(url, body, options)
		return data
	}

	public async get<T>({ url, options }: Get) {
		const { data } = await this._axios.get<T>(url, options)
		return data
	}
}
