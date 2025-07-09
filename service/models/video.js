

export class Video {
    constructor({ id, name, videoUrl, highlighting }) {
        this.id = id;
        this.name = name;
        this.videoUrl = videoUrl;
        this.highlighting = highlighting;
    }

    static fromApi(data) {
        if (Array.isArray(data)) {
            return data.map(item => new Video(item));
        }
        return new Video(data);
    }
}
