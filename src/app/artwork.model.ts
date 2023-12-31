export class Artwork {
    constructor (
        public _id?: string,
        public type: string = "artwork",
        public id?: number,
        public name?: string,
        public artist?: string,
        public year?: string,
        public fileLocation?: string,
        public url?: string,
        public owner?: string,
        public location?: string,
        public artworkuri?: string,
        public buildHistory?: {year: string, builder: string, tasks: string}[],
        public dispositions?: {parthoodname: string, divisions: {divisionname: string, divisionorder: number, stops: {stoporder: string, stopname:string, stopspecification: string}[]}[]}[]
    ) {}
}