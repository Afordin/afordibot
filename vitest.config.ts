import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
	resolve: {
		alias: {
			application: path.resolve(__dirname, 'src/application/'),
			domain: path.resolve(__dirname, 'src/domain/'),
			infrastructure: path.resolve(__dirname, 'src/infrastructure/'),
		},
	},
})
