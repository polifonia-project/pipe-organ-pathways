import { Component } from "@angular/core";
import { Artwork } from "./artwork.model";
import { ConfigSettings } from "./config";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { Observable } from "rxjs";


@Component({
    selector: "paArtworkTable",
    templateUrl: "artworkTable.component.html"
})

export class ArtworkTableComponent {

    public handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/img/488199.png';
    }

    //for filtering personal artwork collection
    searchText = '';

    // configuration settings
    configSettings = new ConfigSettings;

    deleteConfirmation_Id = "";

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    placeholderText = this.configSettings.artworks_searchplaceholder;
    selected: boolean = false;
    selectItem: Array<any> = [];

    selectedArtworkLabel() {
        return this.selectItem["name"] + ", " + this.selectItem["artist"] + ", " + this.selectItem["year"];
    }

    selectedName() {
        return this.selectItem["name"];
    }
    selectedArtist() {
        return this.selectItem["artist"];
    }
    selectedYear() {
        return this.selectItem["year"];
    }
    selectedURL() {
        return this.selectItem["filelocation"];
    }
    keyword = 'searchstring';
    data = this.model.getCollection();

    // data for testing
    // data = [
    //     {name: "Jacob’s Dream", artist: "Patrick Hall", year: "2002", filelocation: "https://imma.ie/wp-content/uploads/2018/11/1551.jpg"},
    //     {name: "Tarot Set", artist: "Ulla von Brandenburg", year: "2008", filelocation: "https://imma.ie/wp-content/uploads/2018/11/2260.jpg"},
    //     {name: "Patrick Hall", artist: "Nick Miller", year: "1994", filelocation: "https://imma.ie/wp-content/uploads/2018/11/487.jpg"},
    //     {name: "Burning Tree", artist: "Patrick Hall", year: "2006", filelocation: "https://imma.ie/wp-content/uploads/2021/03/33.jpg"},
    //     {name: "Sphère-Trame", artist: "François Morellet", year: "1962", filelocation: "https://imma.ie/wp-content/uploads/2018/11/1989.jpg"},
    //     {name: "Ancestors", artist: "Patrick Hall", year: "1991", filelocation: "https://imma.ie/wp-content/uploads/2018/11/911.jpg"},
    //     {name: "Rising of Faust", artist: "Patrick Hall", year: "1996", filelocation: "https://imma.ie/wp-content/uploads/2018/11/1066.jpg"}
    // ];
  
  
    selectEvent(item) {
        this.reloadArtworks();
        this.model.resetBuildHistory();
        this.model.resetDispositionInfo();
        // do something with selected item
        this.selected = true;
        this.selectItem = item;
        this.getBuildHistory(item.artworkuri);
        this.getDispositionInfo(item.artworkuri);
        this.resetDispositionSelection();
        this.hideBuildHistory = true;
        this.hideDispositionHistory = true;
    }
    
    onChangeSearch(val: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocused(e){
      // do something when input is focused
    }


    constructor(public currentuser: CurrentUser, private model: Model){}

    getArtworks() {
        let artworks =  this.model.getArtworks();

        // filter artworks for login
        let filteredArtworks = this.filterArtworksForLogin(artworks);

        let sortedArtworks = filteredArtworks.sort((a, b) => (a.artist < b.artist) ? -1 : 1);
        
        return sortedArtworks;
    }

    filterArtworksForLogin(artworks: Artwork[]): Artwork[] {
        let user = this.currentuser.getUser();
        let userID = user.id;

        if (userID == 0) {
            return [];
        }

        let filteredArtworks = artworks.filter(x => x.owner == user._id);
        return filteredArtworks;
    }

    saveArtwork() {
        let artwork: Artwork = {type: "artwork", name: this.selectItem["name"], buildHistory: this.getDBBuildHistory(), dispositions: this.getDBDispositionInfo(), 
        artist: this.selectItem["artist"], year: this.selectItem["year"], url: this.selectItem["filelocation"], location: this.selectItem["location"], artworkuri: this.selectItem["artworkuri"]};

        //add current user_ID as owner
        let user_ID = this.currentuser.getUser()._id;
        artwork.owner = user_ID;

        let currentArtworksOfLogin = this.getArtworks();
        if(!(currentArtworksOfLogin.find(x => x.owner == artwork.owner && x.url == artwork.url))) {
            this.model.saveArtwork(artwork);
        }
    }

    deleteArtwork(_id: string) {
        //delete artwork from scripts
        let scripts = this.model.getScriptsOfAnArtwork(_id);
        this.model.removeArtworkFromScripts(scripts, _id);

        //delete artwork
        this.model.deleteArtwork(_id);
    }

    isLoggedIn() {
        return this.currentuser.getUserID() != undefined;
    }

    reloadArtworks() {
        this.model.refreshArtworks();
    }

    getScriptsOfAnArtwork(_id: string) {
        return this.model.getScriptsOfAnArtwork(_id);
    }

    getBuildHistory(artworkid) {
        this.model.getBuildHistory(artworkid);
    }

    getDBBuildHistory() {
        return this.model.getDBBuildHistory();
    }

    splitTextOnSeparator(text: string) {
        return text.split("|");
    }

    getDispositionInfo(artworkid='http://w3id.org/polifonia/resource/organs/Part03_007HELMO') {
        this.model.getDispositionInformation(artworkid);
    }

    getDBDispositionInfo() {
        return this.model.getDBDispositionInfo();
    }

    resetDBDispositionInfo() {
        this.model.resetDispositionInfo();
    }

    hideBuildHistory: boolean = true;

    hideDispositionHistory: boolean = true;

    dispositionSelection: number[] = [0, 1];

    resetDispositionSelection() {
        this.dispositionSelection = [0, 1];
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