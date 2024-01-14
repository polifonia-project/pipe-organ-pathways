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

    copyDivisionTable(name: string, parthood:string, divisions: {divisionname: string, divisionorder: number, stops: {stoporder: string, stopname:string, stopspecification: string}[]}[]): string {
        let copyString: string = '<table class="table table-sm">';
        copyString = copyString+`<tbody>
            <tr>
                <td scope="col" colspan="2">
                    ${name}
                </td>
            </tr>
            <tr>
                <td scope="col" colspan="2">
                    ${parthood}
                </td>
            </tr>
        </tbody>`;

        for(var division of divisions) {
            copyString = copyString+`<thead>
            <tr>
                <th scope="col" colspan="2">
                    ${division.divisionname}
                </th>
            </tr>
        </thead>
        <tbody>`;
            for(var stop of division.stops) {
                copyString = copyString+`<tr>
                <td>${stop.stopname}</td>
                <td>${stop.stopspecification}</td>
            </tr>`
            }
        copyString = copyString+'</tbody>';
        }
        copyString = copyString+'</table>'
        return copyString;
    }
}
