import { Dependencies } from 'types/container'
import { ResetRankingCommand } from './resetRankingCommand'

export class ResetRanking {
	private _userRepository: Dependencies['userRepository']

	constructor({ userRepository }: Pick<Dependencies, 'userRepository'>) {
		this._userRepository = userRepository
	}

	public async execute({ collection }: ResetRankingCommand) {
		this._userRepository.delete({ collection })
	}
}
