"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformController = void 0;
const platform_1 = require("./../services/platform");
class PlatformController {
    constructor() {
        this.platformService = new platform_1.PlatformService();
    }
    getPlatform(id) {
        return this.platformService.getPlatform(id);
    }
}
exports.PlatformController = PlatformController;
