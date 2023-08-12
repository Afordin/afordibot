import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'

import axios from 'axios'
import admin from 'firebase-admin'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { DateService } from 'domain/services/date'
import { EmojiService } from 'domain/services/emoji'
import { UserGeneratorService } from 'domain/services/userGenerator'

import { Config } from 'infrastructure/config'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
import { RestHelixClient } from 'infrastructure/services/restHelixClient'
import { Utils } from 'infrastructure/services/utils'

import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'
import { userDocumentParser } from 'infrastructure/persistance/firebase/user/userDocumentParser'
import { UserRepository } from 'infrastructure/persistance/firebase/user/userRepository'
import { imageDocumentParser } from 'infrastructure/persistance/firebase/image/imageDocumentParser'
import { ImageRepository } from 'infrastructure/persistance/firebase/image/imageRepository'

import { GetChannelAflores, GetChannelAfloresCommand } from 'application/getChannelAflores'
import { GetChannelJolines, GetChannelJolinesCommand } from 'application/getChannelJolines'
import { GetUserJolines, GetUserJolinesCommand } from 'application/getUserJolines'
import { IncrementAflores, IncrementAfloresCommand } from 'application/incrementAflores'
import { IncrementJolines, IncrementJolinesCommand } from 'application/incrementJolines'
import { ResetRanking, ResetRankingCommand } from 'application/resetRanking'
import { UpdateUsersImages } from 'application/updateUsersImages'

import type { AwilixContainer } from 'awilix'
import type { Dependencies } from 'types/container'
import type { ConfigConstructor } from 'infrastructure/types/config'
import type { HelixUserData } from 'infrastructure/types/restHelixClient'
import type { Bot, GetAfloresResponse, GetJolinesResponse, IncrementAfloresResponse } from 'types/afordibot'

export class AfordiBot implements Bot {
	private readonly _container: AwilixContainer<Dependencies>

	constructor({ firebaseConfig, helixConfig }: ConfigConstructor) {
		dayjs.extend(utc)
		dayjs.extend(timezone)
		dayjs.extend(customParseFormat)
		dayjs.tz.setDefault('Europe/Madrid')

		const config = new Config({ firebaseConfig, helixConfig })

		this._container = createContainer<Dependencies>({
			injectionMode: InjectionMode.PROXY,
		})

		this._container.register({
			// Libraries
			axios: asValue(axios),
			admin: asValue(admin),
			dayjs: asValue(dayjs),

			// Domain services
			dateService: asClass(DateService),
			emojiService: asClass(EmojiService),
			userGenerator: asClass(UserGeneratorService),

			// Infrastructure config
			config: asValue(config),

			// Infrastructure services
			httpClient: asClass(AxiosHttpClient),
			restHelixClient: asClass(RestHelixClient),
			utils: asClass(Utils),

			// Persistance
			dbHandler: asClass(FirebaseHandler).singleton(),
			userDocumentParser: asFunction(userDocumentParser),
			userRepository: asClass(UserRepository),
			imageDocumentParser: asFunction(imageDocumentParser),
			imageRepository: asClass(ImageRepository),

			// Use cases
			getChannelAflores: asClass(GetChannelAflores),
			getChannelJolines: asClass(GetChannelJolines),
			getUserJolines: asClass(GetUserJolines),
			incrementAflores: asClass(IncrementAflores),
			incrementJolines: asClass(IncrementJolines),
			resetRanking: asClass(ResetRanking),
			updateUsersImages: asClass(UpdateUsersImages),
		})
	}

	/**
	 * Gets the access token from Twitch Helix API.
	 * @returns The Helix access token.
	 */
	public async getHelixToken(): Promise<string> {
		const restHelixClient = this._container.resolve<RestHelixClient>('restHelixClient')
		return await restHelixClient.getHelixToken()
	}

	/**
	 * Gets the users data from Twitch Helix API.
	 *
	 * @param usernames The names of the users to get the data from.
	 * @returns The users data.
	 */
	public async getUsersData(usernames: string[]): Promise<HelixUserData[]> {
		const restHelixClient = this._container.resolve<RestHelixClient>('restHelixClient')
		return await restHelixClient.getUsersData(usernames)
	}

	/**
	 * Gets the channel aflores count, aflor emoji and response message.
	 *
	 * @param obj.channelName The twitch channel name.
	 *
	 * @returns Promise object representing the response.
	 * @property message: The response message.
	 * @property aflores: The channel aflores count.
	 * @property aflor: A random aflor emoji.
	 */
	public async getChannelAflores({ channelName }: GetChannelAfloresCommand): Promise<GetAfloresResponse> {
		const command = new GetChannelAfloresCommand({ channelName })
		const useCase = this._container.resolve<GetChannelAflores>('getChannelAflores')
		const response = await useCase.execute(command)
		return {
			message: response.getMessage(),
			aflores: response.getAflores(),
			aflor: response.getAflor(),
		}
	}

	/**
	 * Gets the channel jolines count, pig emoji and response message.
	 *
	 * @param obj.channelName The twitch channel name.
	 *
	 * @returns Promise object representing the response.
	 * @prop message: The response message.
	 * @prop jolines: The channel jolines count.
	 * @prop pig: A random pig emoji.
	 */
	public async getChannelJolines({ channelName }: GetChannelJolinesCommand): Promise<GetJolinesResponse> {
		const command = new GetChannelJolinesCommand({ channelName })
		const useCase = this._container.resolve<GetChannelJolines>('getChannelJolines')
		const response = await useCase.execute(command)
		return {
			message: response.getMessage(),
			jolines: response.getJolines(),
			pig: response.getPig(),
		}
	}

	/**
	 * Gets the user's jolines count inside a twitch channel, pig emoji and response message.
	 *
	 * @param obj.username The twitch user's name.
	 * @param obj.channelName The twitch channel name.
	 *
	 * @returns Promise object representing the response.
	 * @property message: The response message.
	 * @property jolines: The user's jolines count inside the channel.
	 * @property pig: A random pig emoji.
	 */
	public async getUserJolines({ username, channelName }: GetUserJolinesCommand): Promise<GetJolinesResponse> {
		const command = new GetUserJolinesCommand({ username, channelName })
		const useCase = this._container.resolve<GetUserJolines>('getUserJolines')
		const response = await useCase.execute(command)
		return {
			message: response.getMessage(),
			jolines: response.getJolines(),
			pig: response.getPig(),
		}
	}

	/**
	 * Increment the channel and user's aflores count and returns the gifted aflor emoji and response message.
	 *
	 * @param obj.channelName The twitch channel name.
	 * @param obj.gifterName The user's name who gifted the aflor.
	 * @param obj.receiverName The user's name who received the aflor.
	 *
	 * @returns Promise object representing the response.
	 * @property message: The response message.
	 * @property aflor: The gifted aflor emoji.
	 */
	public async incrementAflores({
		channelName,
		gifterName,
		receiverName,
	}: IncrementAfloresCommand): Promise<IncrementAfloresResponse> {
		const command = new IncrementAfloresCommand({ channelName, gifterName, receiverName })
		const useCase = this._container.resolve<IncrementAflores>('incrementAflores')
		const response = await useCase.execute(command)
		return {
			message: response.getMessage(),
			aflor: response.getAflor(),
		}
	}

	/**
	 * Increments the channel's jolines count.
	 *
	 * @param obj.username The twitch user's name.
	 * @param obj.channelName The twitch channel name.
	 */
	public async incrementJolines({ username, channelName }: IncrementJolinesCommand): Promise<void> {
		const command = new IncrementJolinesCommand({ username, channelName })
		const useCase = this._container.resolve<IncrementJolines>('incrementJolines')
		await useCase.execute(command)
	}

	/**
	 * Resets the database collection ranking.
	 *
	 * @param obj.collection The database collection name.
	 */
	public async resetRanking({ collection }: ResetRankingCommand): Promise<void> {
		const command = new ResetRankingCommand({ collection })
		const useCase = this._container.resolve<ResetRanking>('resetRanking')
		await useCase.execute(command)
	}

	/**
	 * Updates all users images contained in the database.
	 */
	public async updateUsersImages(): Promise<void> {
		const useCase = this._container.resolve<UpdateUsersImages>('updateUsersImages')
		await useCase.execute()
	}
}
