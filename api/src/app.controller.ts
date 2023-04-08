import {Controller, Get} from '@nestjs/common'
import {Episode, FinalSpaceService} from './services/finalSpace.service'

@Controller()
export class AppController {
    constructor(private readonly finalSpaceService: FinalSpaceService) {}

    @Get()
    episodes(): Promise<Episode[]> {
        return this.finalSpaceService.episodes()
    }
}
