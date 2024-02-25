export class CollectionArtwork {
    constructor (
        public name?: string,
        public artist?: string,
        public year?: string,
        public filelocation?: string,
        public searchstring?: string,
        public location?: string,
        public artworkuri?: string,
        public building?: string,
        public divisions?: string[],
        public stops?: string[]
    ) {}
}

