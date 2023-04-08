import {Injectable} from '@nestjs/common'
import {APICharacter, APIEpisode, FinalSpaceAPIService} from './finalSpaceAPI.service'

export type Episode = {
    id: number
    name: string
    imageUrl: string
    airDate: string
    characterImageUrls: string[]
}

@Injectable()
export class FinalSpaceService {
    constructor(private readonly APIService: FinalSpaceAPIService) {}

    async episodes() {
        const episodes = await this.APIService.episodes()
        const characters = await this.APIService.characters()

        return episodes.map((episode) => this.episodeObjectFrom(episode, characters))
    }

    private episodeObjectFrom(episode: APIEpisode, characters: APICharacter[]): Episode {
        const characterImageUrls = this.characterUrlsFor(episode, characters)

        return {
            id: episode.id,
            name: episode.name,
            imageUrl: episode.img_url,
            airDate: episode.air_date,
            characterImageUrls,
        }
    }

    private characterUrlsFor(episode: APIEpisode, characters: APICharacter[]) {
        const characterIds = this.characterIdsFrom(episode)
        const characterIdMap = this.characterIdMapFrom(characters)

        return characterIds.map((id) => characterIdMap.get(id).img_url)
    }

    private characterIdsFrom(episode: APIEpisode) {
        const characterUrls = episode.characters
        const baseUrl = 'https://finalspaceapi.com/api/v0/character/'

        return characterUrls.map((url) => Number(url.replace(baseUrl, '')))
    }

    private characterIdMapFrom(characters: APICharacter[]): Map<number, APICharacter> {
        return new Map(characters.map((character) => [character.id, character]))
    }
}
