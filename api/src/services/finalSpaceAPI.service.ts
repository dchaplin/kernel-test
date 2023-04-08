import {Injectable} from '@nestjs/common'
import axios from 'axios'

const BASE_URL = 'https://finalspaceapi.com/api/v0'

export type APIEpisode = {
    id: number
    name: string
    air_date: string
    director: string
    writer: string
    characters: string[]
    img_url: string
}

export type APICharacter = {
    id: number
    name: string
    status: string
    species: string
    gender: string
    hair: string
    alias: string[]
    origin: string
    abilities: string[]
    img_url: string
}

@Injectable()
export class FinalSpaceAPIService {
    async episodes(): Promise<APIEpisode[]> {
        return this.get('/episode')
    }

    async characters(): Promise<APICharacter[]> {
        return this.get('/character')
    }

    private async get(path: string) {
        const {data} = await axios(`${BASE_URL}${path}`, {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })

        if (data.error) throw new Error(data.message)
        return data
    }
}
