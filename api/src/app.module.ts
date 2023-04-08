import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {FinalSpaceService} from './services/finalSpace.service'
import {FinalSpaceAPIService} from './services/finalSpaceAPI.service'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, FinalSpaceAPIService, FinalSpaceService],
})
export class AppModule {}
