import type { FirebaseConfig, HelixConfig, ConfigConstructor } from 'infrastructure/types/config'

export class Config {
	public readonly firebaseConfig: FirebaseConfig
	public readonly helixConfig: HelixConfig

	constructor(config: ConfigConstructor) {
		this.firebaseConfig = config.firebaseConfig
		this.helixConfig = config.helixConfig
	}
}
