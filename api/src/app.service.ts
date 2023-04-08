import {Injectable} from '@nestjs/common'

@Injectable()
export class AppService {
    episodes(): string {
        return 'Hello World!'
    }
}
