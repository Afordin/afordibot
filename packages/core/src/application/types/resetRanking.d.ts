export type RankingCollection = 'weekly' | 'monthly'

export interface ResetRankingCommandConstructor {
	collection: RankingCollection
}
