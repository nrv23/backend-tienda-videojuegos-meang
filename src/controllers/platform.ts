import { PlatformService } from './../services/platform';

export class PlatformController {


    private platformService: PlatformService;

    constructor() {
        this.platformService = new PlatformService();
    }


    public getPlatform(id: string) {

        return this.platformService.getPlatform(id);
    }
}