import { Component, Input } from "@angular/core";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";


@Component({
    selector: "artworkInformation",
    templateUrl: "artworkInformation.component.html"
})
export class ArtworkInformationComponent {
    @Input() artworks: Artwork[];

    constructor(private model: Model){}

    hideBuildHistory: boolean = true;

    hideDispositionHistory: boolean = true;

    dispositionSelection: number[] = [0, 1];

    artworkSelection: number = 0;

    artworkSelectionList: {artwork:number, disposition: number}[] = [{artwork:0, disposition: 0}, {artwork:1, disposition: 0}];

    resetDispositionSelection() {
        this.dispositionSelection = [0, 1];
    }

    splitTextOnSeparator(text: string) {
        return text.split("|");
    }
}
