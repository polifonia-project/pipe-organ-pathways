import { Component, OnInit } from "@angular/core";
import { Artwork } from "./artwork.model";
import { ConfigSettings } from "./config";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { Observable } from "rxjs";
import { CollectionArtwork } from "./collectionArtwork.model";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: "paArtworkTable",
    templateUrl: "artworkTable.component.html"
})

export class ArtworkTableComponent implements OnInit {

    builderStartList: {text: string}[];
    locationStartList: {text: string}[]
    yearStartList: {text: string}[];
    buildingStartList: {text: string}[];
    divisionStartList: {text: string}[]
    stopStartList: {text: string}[];

    builderStartListArchive: {text: string}[];
    locationStartListArchive: {text: string}[]
    yearStartListArchive: {text: string}[];
    buildingStartListArchive: {text: string}[];
    divisionStartListArchive: {text: string}[]
    stopStartListArchive: {text: string}[];

    public handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/img/488199.png';
    }

    ngOnInit() {
        // let artworks: Artwork[]  = this.activatedRoute.snapshot.data.model2;

        //facets for my collection
        this.builderStartList = this.uniqByMap(this.getArtworks().map(x => x.artist)).map(x => ({text: x}));
        this.locationStartList = this.uniqByMap(this.getArtworks().map(x => x.location)).map(x => ({text: x}));
        this.yearStartList = this.uniqByMap(this.getArtworks().map(x => x.year)).map(x => ({text: x}));
        this.buildingStartList = this.uniqByMap(this.getArtworks().map(x => x.building)).map(x => ({text: x}));
        this.divisionStartList = this.uniqByMap(this.getArtworks().map(x => x.divisions).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
        this.stopStartList = this.uniqByMap(this.getArtworks().map(x => x.stops).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));

        //facets for acrchive collection 
        this.builderStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.artist)).map(x => ({text: x}));
        this.locationStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.location)).map(x => ({text: x}));
        this.yearStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.year)).map(x => ({text: x}));
        this.buildingStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.building)).map(x => ({text: x}));
        this.divisionStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.divisions).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
        this.stopStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.stops).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
    }

    getCollection() {
        return this.model.getCollection();
    }
    //holding facet selections when moving between tabs
    builderField = '';
    locationField = '';
    yearField = '';
    buildingField = '';
    divisionField = '';
    stopField = '';
    builderArchiveField = '';
    locationArchiveField = '';
    yearArchiveField = '';
    buildingArchiveField = '';
    divisionArchiveField = '';
    stopArchiveField = '';


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
    

    constructor(public currentuser: CurrentUser, private model: Model, private activatedRoute: ActivatedRoute){}

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

    artworkAlreadyAdded(artworkuri) {
        if(this.getArtworks().find(x => x.artworkuri == artworkuri)) {
            return true;
        }
        else {
            return false;
        }

    }

    getSelectedCollectionItemAsList() {
        let result = [];
        if(this.selectedCollectionItem) {
            result.push(this.selectedCollectionItem);
        }
        return result;
    }

    selectCollectiomItemName() {
        if(this.selectedCollectionItem) {
            return this.selectedCollectionItem.name;
        }
        else {
            return '';
        }
    }
    selectCollectiomItemArtist() {
        if(this.selectedCollectionItem) {
            return this.selectedCollectionItem.artist;
        }
        else {
            return '';
        }
    }
    selectCollectiomItemURL() {
        if(this.selectedCollectionItem) {
            return this.selectedCollectionItem.url;
        }
        else {
            return '';
        }
    }
    selectCollectiomItem_id() {
        if(this.selectedCollectionItem) {
            return this.selectedCollectionItem._id;
        }
        else {
            return '';
        }
    }
    selectedCollectionItem: Artwork = null;
    artworkAddedAlert: boolean = false;

    saveArtwork() {
        let artwork: Artwork = {type: "artwork", name: this.selectItem["name"], buildHistory: this.getDBBuildHistory(), dispositions: this.getDBDispositionInfo(), 
        artist: this.selectItem["artist"], year: this.selectItem["year"], url: this.selectItem["filelocation"], location: this.selectItem["location"], artworkuri: this.selectItem["artworkuri"],
        building: this.selectItem["building"], stops: this.selectItem["stops"], divisions: this.selectItem["divisions"]
        };

        //add current user_ID as owner
        let user_ID = this.currentuser.getUser()._id;
        artwork.owner = user_ID;

        let currentArtworksOfLogin = this.getArtworks();
        if(!(currentArtworksOfLogin.find(x => x.owner == artwork.owner && x.artworkuri == artwork.artworkuri))) {
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


    // *********my collection search
    searchCollectionOrganText = "";
    searchCollectionDisplayLimit = 12;


    //selections from selection and events
    builderSelected: string = null;
    locationSelected: string = null;
    yearSelected: string = null;
    buildingSelected: string = null;
    divisionSelected: string = null;
    stopSelected: string = null;

    builderSelectedArchive: string = null;
    locationSelectedArchive: string = null;
    yearSelectedArchive: string = null;
    buildingSelectedArchive: string = null;
    divisionSelectedArchive: string = null;
    stopSelectedArchive: string = null;


     //**********archive search interface
     searchOrganText = "";
     searchDisplayLimit = 12;
    

    uniqByMap<T>(array: T[]): T[] {
        const map = new Map();
        for (const item of array) {
            map.set(item, item);
        }
        return Array.from(map.values());
    }
    foo() {
        console.log(this.builderArchiveField);
        console.log("builderStartListArchive",this.builderStartListArchive);
        console.log(this.builderStartList);
        console.log(this.locationStartList);
        console.log(this.yearStartList);
        console.log(this.filteredResults());
    }


    //////////my collection facets
    keywordBuilder = 'text';
    keywordYear = 'text';
    keywordLocation = 'text';
    keywordBuilding = 'text';
    keywordDivision = 'text';
    keywordStop = 'text';

    selectEventBuilder(item: {text: string}) {
        this.builderSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }

    onChangeSearchBuilder(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }

    onFocusedBuilder(e) {
    // do something
    }

    inputClearedBuilder(e) {
        this.builderSelected = null;
        this.recaluateNameLists();
    }

    selectEventLocation(item: {text: string}) {
        this.locationSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }
  
    onChangeSearchLocation(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }
  
    onFocusedLocation(e) {
        // do something
    }

    inputClearedLocation(e) {
        this.locationSelected = null;
        this.recaluateNameLists();
    }

    selectEventYear(item: {text: string}) {
        this.yearSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }
      
    onChangeSearchYear(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedYear(e) {
    // do something
    }
    
    inputClearedYear(e) {
        this.yearSelected = null;
        this.recaluateNameLists();
    }

    selectEventBuilding(item: {text: string}) {
        this.buildingSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }
      
    onChangeSearchBuilding(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedBuilding(e) {
    // do something
    }
    
    inputClearedBuilding(e) {
        this.buildingSelected = null;
        this.recaluateNameLists();
    }
    
    selectEventDivision(item: {text: string}) {
        this.divisionSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }
      
    onChangeSearchDivision(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedDivision(e) {
    // do something
    }
    
    inputClearedDivision(e) {
        this.divisionSelected = null;
        this.recaluateNameLists();
    }
    
    selectEventStop(item: {text: string}) {
        this.stopSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }
      
    onChangeSearchStop(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedStop(e) {
    // do something
    }
    
    inputClearedStop(e) {
        this.stopSelected = null;
        this.recaluateNameLists();
    }

    //////////archive facets
    keywordBuilderArchive = 'text';
    keywordYearArchive = 'text';
    keywordLocationArchive = 'text';
    keywordBuildingArchive = 'text';
    keywordDivisionArchive = 'text';
    keywordStopArchive = 'text';

    selectEventBuilderArchive(item: {text: string}) {
        this.builderSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }

    onChangeSearchBuilderArchive(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }

    onFocusedBuilderArchive(e) {
    // do something
    }

    inputClearedBuilderArchive(e) {
        this.builderSelectedArchive = null;
        this.recaluateNameListsArchive();
    }

    selectEventLocationArchive(item: {text: string}) {
        this.locationSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }
  
    onChangeSearchLocationArchive(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }
  
    onFocusedLocationArchive(e) {
        // do something
    }

    inputClearedLocationArchive(e) {
        this.locationSelectedArchive = null;
        this.recaluateNameListsArchive();
    }

    selectEventYearArchive(item: {text: string}) {
        this.yearSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }
      
    onChangeSearchYearArchive(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedYearArchive(e) {
    // do something
    }
    
    inputClearedYearArchive(e) {
        this.yearSelectedArchive = null;
        this.recaluateNameListsArchive();
    }

    selectEventBuildingArchive(item: {text: string}) {
        this.buildingSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }
      
    onChangeSearchBuildingArchive(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedBuildingArchive(e) {
    // do something
    }
    
    inputClearedBuildingArchive(e) {
        this.buildingSelectedArchive = null;
        this.recaluateNameListsArchive();
    }
    
    selectEventDivisionArchive(item: {text: string}) {
        this.divisionSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }
      
    onChangeSearchDivisionArchive(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedDivisionArchive(e) {
    // do something
    }
    
    inputClearedDivisionArchive(e) {
        this.divisionSelectedArchive = null;
        this.recaluateNameListsArchive();
    }
    
    selectEventStopArchive(item: {text: string}) {
        this.stopSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }
      
    onChangeSearchStopArchive(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedStopArchive(e) {
    // do something
    }
    
    inputClearedStopArchive(e) {
        this.stopSelectedArchive = null;
        this.recaluateNameListsArchive();
    }

    //reloading the shown results based on facet selection
    filteredResults() {
        let results = this.getArtworks().filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchCollectionOrganText.toLowerCase())});
    
        if(this.builderSelected) {
            results = results.filter(x => x.artist == this.builderSelected);
        }
        if(this.locationSelected) {
            results = results.filter(x => x.location == this.locationSelected);
        }
        if(this.yearSelected) {
            results = results.filter(x => x.year == this.yearSelected);
        }
        if(this.buildingSelected) {
            results = results.filter(x => x.building == this.buildingSelected);
        }
        if(this.divisionSelected) {
            results = results.filter(x => x.divisions.includes(this.divisionSelected));
        }
        if(this.stopSelected) {
            results = results.filter(x => x.stops.includes(this.stopSelected));
        }
        return results;
    }

    filteredResultsArchive() {
        let results = this.model.getCollection().filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchOrganText.toLowerCase())});
    
        if(this.builderSelectedArchive) {
            results = results.filter(x => x.artist == this.builderSelectedArchive);
        }
        if(this.locationSelectedArchive) {
            results = results.filter(x => x.location == this.locationSelectedArchive);
        }
        if(this.yearSelectedArchive) {
            results = results.filter(x => x.year == this.yearSelectedArchive);
        }
        if(this.buildingSelectedArchive) {
            results = results.filter(x => x.building == this.buildingSelectedArchive);
        }
        if(this.divisionSelectedArchive) {
            results = results.filter(x => x.divisions.includes(this.divisionSelectedArchive));
        }
        if(this.stopSelectedArchive) {
            results = results.filter(x => x.stops.includes(this.stopSelectedArchive));
        }
        return results;
    }

    recaluateNameLists() {
        let results = this.filteredResults().filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchCollectionOrganText.toLowerCase())});

        let builderNameList: {text: string}[] = this.uniqByMap(results.map(x => x.artist)).map(x => ({text: x}));
        this.builderStartList = [... builderNameList];

        let locationNameList: {text: string}[] = this.uniqByMap(results.map(x => x.location)).map(x => ({text: x}));
        this.locationStartList = [... locationNameList];

        let yearNameList: {text: string}[] = this.uniqByMap(results.map(x => x.year)).map(x => ({text: x}));
        this.yearStartList = [... yearNameList];

        let buildingNameList: {text: string}[] = this.uniqByMap(results.map(x => x.building)).map(x => ({text: x}));
        this.buildingStartList = [... buildingNameList];

        let divisionsNameList = this.uniqByMap(results.map(x => x.divisions).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
        this.divisionStartList = [... divisionsNameList];

        let stopsNameList = this.uniqByMap(results.map(x => x.stops).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
        this.stopStartList = [... stopsNameList];
    }

    recaluateNameListsArchive() {
        let results = this.filteredResultsArchive().filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchOrganText.toLowerCase())});

        let builderNameList: {text: string}[] = this.uniqByMap(results.map(x => x.artist)).map(x => ({text: x}));
        this.builderStartListArchive = [... builderNameList];

        let locationNameList: {text: string}[] = this.uniqByMap(results.map(x => x.location)).map(x => ({text: x}));
        this.locationStartListArchive = [... locationNameList];

        let yearNameList: {text: string}[] = this.uniqByMap(results.map(x => x.year)).map(x => ({text: x}));
        this.yearStartListArchive = [... yearNameList];

        let buildingNameList: {text: string}[] = this.uniqByMap(results.map(x => x.building)).map(x => ({text: x}));
        this.buildingStartListArchive = [... buildingNameList];

        let divisionsNameList = this.uniqByMap(results.map(x => x.divisions).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
        this.divisionStartListArchive = [... divisionsNameList];

        let stopsNameList = this.uniqByMap(results.map(x => x.stops).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
        this.stopStartListArchive = [... stopsNameList];
    }
}
