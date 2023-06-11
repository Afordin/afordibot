import { RankingCollection, ResetRankingCommandConstructor } from 'application/types/resetRanking'

export class ResetRankingCommand implements ResetRankingCommandConstructor {
	public collection: RankingCollection

	constructor({ collection }: ResetRankingCommandConstructor) {
		this.collection = collection
	}
}
