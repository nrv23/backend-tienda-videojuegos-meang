import { ClipQuality } from "./clipquality,model";

export class Clip {

    public clips: ClipQuality;
    public video: string;
    public preview: string;

    constructor(clips: ClipQuality, video: string, preview: string) {

        this.clips = clips;
        this.video = video;
        this.preview = preview;
    }
}