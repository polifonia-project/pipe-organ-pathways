import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component } from "@angular/core";
import { Artwork } from "./artwork.model";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { contextStage, followStage, multiquestionStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, Stage, statementStage, storyStage, thankyouStage, welcomeStage } from "./stage.model";
import { Theme } from "./theme.model";
import { User } from "./user.model";
import { Exhibition } from "./exhibition.model";
import { ConfigSettings } from "./config";
import { Question } from "./question.model";
import { findIndex } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "paScriptWizard",
    templateUrl: "scriptWizard.component.html"
}) 

export class ScriptWizardComponent {

    public handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/img/488199.png';
    }

    constructor(public currentuser: CurrentUser, public model: Model, private activatedRoute: ActivatedRoute){}

    builderStartList: {text: string}[];
    locationStartList: {text: string}[]
    yearStartList: {text: string}[];
    buildingStartList: {text: string}[];
    divisionStartList: {text: string}[]
    stopStartList: {text: string}[];

    showCurrentSelection: boolean = false;

    setFacetsOnScriptOpening() {
        this.builderStartList = this.uniqByMap(this.getArtworks(this.model.selectedScript).map(x => x.artist)).map(x => ({text: x}));
        this.locationStartList = this.uniqByMap(this.getArtworks(this.model.selectedScript).map(x => x.location)).map(x => ({text: x}));
        this.yearStartList = this.uniqByMap(this.getArtworks(this.model.selectedScript).map(x => x.year)).map(x => ({text: x}));
        this.buildingStartList = this.uniqByMap(this.getArtworks(this.model.selectedScript).map(x => x.building)).map(x => ({text: x}));
        this.divisionStartList = this.uniqByMap(this.getArtworks(this.model.selectedScript).map(x => x.divisions).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
        this.stopStartList = this.uniqByMap(this.getArtworks(this.model.selectedScript).map(x => x.stops).reduce((x, y) => x.concat(y), [])).map(x => ({text: x}));
    }


    //holding facet selections when moving between tabs
    builderField = '';
    locationField = '';
    yearField = '';
    buildingField = '';
    divisionField = '';
    stopField = '';
    
    //get build history for clipboard
    getBuildHistoryForClipboard(artwork: Artwork): string {
        if(!artwork.buildHistory.length) {
            return "";
        }
        let buildHistory: string = `<table class="table">
        <thead>
            <tr>
                <th scope="col">Year</th>
                <th scope="col">Builder</th>
                <th scope="col">Tasks</th>
            </tr>
        </thead>
        <tbody>
        `;
        for(var historyItem of artwork.buildHistory) {
            buildHistory = buildHistory.concat(
            `   <tr>
                <td>`,historyItem.year,`</td>
                <td>`,historyItem.builder,`</td>
                <td>`,this.splitTasks(historyItem.tasks),`</td>
            </tr>
        `
            );
        }
        return buildHistory+`</tbody>
</table>`;
    }

    splitTasks(tasks: string) {
        let textArray = tasks.split("|");
        return textArray.join("<br/>");
    }

    //for filtering personal artwork collection
    searchText = '';

    //for filtering scripts
    searchScriptText = '';

    reloadScripts() {
        this.model.refreshScripts();
    }

    reloadActivities() {
        this.model.refreshActivities();
    }

    showup() {
        window.scroll(0,0);
    }
    
    configSettings = new ConfigSettings;

    currentUser: number = 1;

    showallscripts: boolean = false;

    showStageHelp = false;

    newStageMessage: boolean = false;

    newStageMessageText: string = "New stage added to the end of your path";

    copyStageMessage: boolean = false;

    copyStageMessageText: string = "Stage copied below"

    copiedStage: number = undefined;

    copyScriptMessage: boolean = false;

    copyScriptMessageText: string = "Path copied"

    copiedScript: number = undefined;

    initializeNewQuestion() {
        let newQuestion = new Question;
        newQuestion = {type: "question", title: "Question goes here", choice: false, multiselect: false, options: []};
        return newQuestion;
    }

    //URL for accessing the script directly
    scriptURL(script: Script): string {
        return this.configSettings.baseURL + "slowLooking/" + script._id;
        // return window.location.origin.concat("/slowLooking/", script._id);
    }

    responsesURL(script: Script): string {
        return this.configSettings.baseURL + "allResponses/" + script._id;
        // return window.location.origin.concat("/allResponses/", script._id);
    }

    toggleScriptStatus(script) {
        script.open = !script.open;
        this.saveScript(script);
    }

    toggleScriptVisibility(script) {
        script.visible = !script.visible;
        this.saveScript(script);
    }

    toggleScriptApproval(script) {
        script.autoapproved = !script.autoapproved;
        this.saveScript(script);
    }

    toggleScriptFeatured(script) {
        script.featured = !script.featured;
        this.saveScript(script);
    }

    restoreScript(script) {
        script.removed = false;
        this.saveScript(script);
    }

    removeScript(script) {
        script.removed = true;
        this.saveScript(script);
        this.removeConfirmation_Id = "";
        this.removeScriptFromScriptsets(script._id);
    }

    toggleStageHelp() {
        if(this.showStageHelp) {
            this.showStageHelp = false;
        }
        else {
            this.showStageHelp = true;
        }
    }

    removeConfirmation_Id = "";

    confirmRemove(_id: string) {
        this.removeConfirmation_Id = _id;
    }

    deleteConfirmation_Id = "";

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    deleteStageConfirmationId = 0;

    confirmStageDelete(id:number) {
        this.deleteStageConfirmationId = id;
    }

    trackByIdx(index: number, obj: any): any {
        return index;
      }

    showArchivedScripts = false;

    showOpenScripts: boolean = true;

    showClosedScripts: boolean = true;

    selectScript(_id: string) {
        this.model.viewScript = _id;
        this.model.selectedScript  = this.getScript(_id);
    }

    unselectScript() {
        this.model.viewScript = '0';
        this.model.selectedScript = undefined;
    }

    editScriptDescription: string = "0";

    editScriptStage: number = 0;

    saveScript(script: Script) {
        if(script.artworkids == undefined) {
            script.artworkids = [];
        }
        this.model.saveScript(script);
    }

    stagesOfAScript(script: Script) {
        return script.stages.length;
    }

    addScript() {
        let newscript = new Script();
        newscript.name = "Untitled path";
        newscript.open = true;
        newscript.visible = false;
        newscript.archived = false;
        newscript.autoapproved = true;
        // newscript.artworkid = this.model.getDefaultArtworkId();
        // newscript.themeids = [this.model.getDefaultThemeId()];
        newscript.themeids = [];
        newscript.artworkids = [];
        newscript.stages = [];

        let user = this.currentuser.getUser();
        let userID = user.id;
        if (userID != undefined) {
            newscript.owner = user._id;
            if(this.currentuser.getUser().displayname) {
                newscript.author = this.currentuser.getUser().displayname;
            }
            else {
                newscript.author = this.currentuser.getUser().username;
            }
        }

        this.model.saveScript(newscript);
        this.editScriptDescription="0"; 
        this.editScriptStage=0;
    }

    copyScript(script: Script) {

        //need to make a deep copy of the script
        let newScript: Script = JSON.parse(JSON.stringify(script));

        //remove id and _id to be created when saved
        newScript.id = null;
        newScript._id = undefined;

        this.model.saveScript(newScript, true);

        this.copyScriptMessage = true;
        this.copiedScript = script.id;
    }

    getScript(_id: string) {
        return this.model.getScript(_id);
    }

    copyStage(stageIndex: number, stageID: number) {
        let script = this.model.selectedScript;

        //need to make a deep copy of the stage
        let newStage: Stage = JSON.parse(JSON.stringify(script.stages[stageIndex]));

        newStage.id = null;

        newStage.id = this.model.saveStage(newStage, script);

        //add new stage to (end of) script
        this.model.addStageToScript(script, newStage);

        let newIndex = script.stages.findIndex(x => x.id == newStage.id);

        //move stage just after copied stage
        if(newIndex >= stageIndex+1) {
            this.model.moveScriptStage(script, newIndex, stageIndex+1);
        }
        this.copyStageMessage = true;
        this.copiedStage = stageID;

    }

    addWelcomeStage(script: Script, id?: number) {
        let stage = new welcomeStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addContextStage(script: Script, id?: number) {
        let stage = new contextStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }
    
    addStatementStage(script: Script, id?: number) {
        let stage = new statementStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addQuestionStage(script: Script, id?: number) {
        let stage = new questionStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addStoryStage(script: Script, id?: number) {
        let stage = new storyStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addMultiQuestionStage(script: Script, id?: number) {
        let stage = new multiquestionStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addShareWithMuseumStage(script: Script, id?: number) {
        let stage = new shareWithMuseumStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addFollowStage(script: Script, id?: number) {
        let stage = new followStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addShareWithSomeoneStage(script: Script, id?: number) {
        let stage = new shareWithSomeoneStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addThankyouStage(script: Script, id?: number) {
        let stage = new thankyouStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    shiftStagePosition(script: Script, event, old) {
        //reorder script stages
        this.model.moveScriptStage(script, old, event.target.value);
    }

    exhibitionsChange(script: Script, exhibitionid: string, selected: any) {
        if(selected.target.checked) {
            this.model.addExhibitionToScript(script, exhibitionid);
        }
        else {
            this.model.removeExhibitionFromScript(script, exhibitionid);
        }
        this.model.saveScript(script);
    }

    themesChange(script: Script, themeid: string, selected: any) {
        if(selected.target.checked) {
            this.model.addThemeToScript(script, themeid);
        }
        else {
            this.model.removeThemeFromScript(script, themeid);
        }
        this.model.saveScript(script);
    }

    deleteStage(script: Script, stage: Stage) {
        this.model.removeStageFromScript(script, stage);
    }

    artworksChange(script: Script, artworkid: string, selected: any) {
        if(selected.target.checked) {
            this.model.addArtworkToScript(script, artworkid);
        }
        else {
            this.model.removeArtworkFromScript(script, artworkid);
            
            //remove artwork from script stages
            for(var stage of script.stages) {
                this.model.removeArtworkFromIncludedArtworks(script, stage, artworkid);
            }
        }
        this.model.saveScript(script);
    }

    getArtworks(script: Script) {
        let artworks =  this.model.getArtworks();

        // filter artworks for login
        let filteredArtworks = this.filterArtworksForScriptOwner(artworks, script);

        let sortedArtworks = filteredArtworks.sort((a, b) => (a.artist < b.artist) ? -1 : 1);

        return sortedArtworks;
    }

    filterArtworksForScriptOwner(artworks: Artwork[], script: Script): Artwork[] {

        if (!script.owner == undefined) {
            return [];
        }

        let filteredArtworks = artworks.filter(x => x.owner == script.owner);
        return filteredArtworks;
    }

    getArtworksFromIds(name: string, artworkIds: Array<string>, script: Script, stage?: Stage): Array<Artwork> {
        let myartworks: Array<Artwork> = [];
        for(var artworkid of artworkIds) {
            let myartwork = this.getArtwork(artworkid);
            if(myartwork != undefined) {
                myartworks.push(myartwork);
            }
        }
        return myartworks;
    }

    getArtworkAsList(_id: string) {
        let artwork = this.model.getArtwork(_id);
        return [artwork];
    } 
    
    getArtwork(_id: string) {
        let artwork = this.model.getArtwork(_id);
        return artwork;
    }

    getThemes(): Theme[] {
        let themes = this.model.getThemes();
        let sortedThemes = themes.sort((a, b) => (a.id < b.id) ? -1 : 1);
        return sortedThemes;
    }

    getTheme(_id: string): Theme {
        return this.model.getTheme(_id);
    }

    addStatementStageToScript(script: Script) {
        let stage = this.addStatementStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.model.viewScript = script._id;
        this.newStageMessageText = "New statement stage added to the end of your script";
        this.newStageMessage = true;
        // this.editScriptStage = stage.id;
    }

    addQuestionStageToScript(script: Script) {
        let stage = this.addQuestionStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.model.viewScript = script._id;
        this.newStageMessageText = "New question stage added to the end of your script";
        this.newStageMessage = true;
        // this.editScriptStage = stage.id;
    }

    addStoryStageToScript(script: Script) {
        let stage = this.addStoryStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.model.viewScript = script._id;
        this.newStageMessageText = "New story stage added to the end of your script";
        this.newStageMessage = true;
        // this.editScriptStage = stage.id;
    }

    addMultiQuestionStageToScript(script: Script) {
        let stage = this.addMultiQuestionStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.model.viewScript = script._id;
        this.newStageMessageText = "New multiquestion stage added to the end of your script";
        this.newStageMessage = true;
        //this.editScriptStage = stage.id;
    }

    deleteScript(_id: string) {
        this.model.deleteScript(_id);
        this.removeScriptFromScriptsets(_id);
    }

    removeScriptFromScriptsets(_id: string) {
        let scriptsets = this.model.getScriptSets();
        for(var scriptset of scriptsets) {
            let ind = scriptset.scriptids.findIndex(x => x == _id)
            if(ind > -1) {
                let filteredscripts = scriptset.scriptids.filter(x => x != _id);
                scriptset.scriptids = filteredscripts;
                this.model.saveScriptSet(scriptset);
            }
        }
    }

    getThemesFromIds(themeIds: Array<string>) {
        let mythemes: Array<Theme> = [];
        for(var themeid of themeIds) {
            let mytheme = this.getTheme(themeid);
            if(mytheme != undefined) {
                mythemes.push(mytheme);
            }
        }
        return mythemes;
    }

    getExhibitionsFromIds(exhibitionIds: Array<string>) {
        let myexhibitions: Array<Exhibition> = [];
        for(var exhibitionid of exhibitionIds) {
            let myexhibition = this.getExhibition(exhibitionid);
            if(myexhibition != undefined) {
                myexhibitions.push(myexhibition);
            }
        }
        return myexhibitions;
    }

    getExhibition(_id: string) {
        return this.model.getExhibition(_id);
    }

    getExhibitions() {
        return this.model.getExhibitions();
    }

    getArtworkFromId(artworkId: string) {
        if(artworkId == undefined) {
            return [];
        }
        else {
            let artwork = this.getArtwork(artworkId);
            if(artwork == undefined) {
                return []
            }
            return [artwork];
        }
    }

    getScripts(): Script[] {
        let scripts = this.model.getScripts();

        // filter scripts for login
        let filteredScripts = this.filterScriptsForLogin(scripts);

        //filter removed scripts for non-admin
        if(!this.isAdmin()) {
            filteredScripts = filteredScripts.filter(x => !x.removed);
        }

        let sortedScripts = filteredScripts.sort((a, b) => (a.id > b.id) ? -1 : 1);
        return sortedScripts;
    }

    filterScriptsForLogin(scripts: Script[]): Script[] {
        let user = this.currentuser.getUser();
        let userID = user.id;

        if (userID == undefined) {
            return [];
        }

        //admin sees all scripts
        if(userID == 1) {
            if(this.showallscripts) {
                return scripts;
            }
            else {
                let editorID = this.get_IDOfUserID(this.currentUser);
                if(editorID != undefined) {
                    let filteredScripts = scripts.filter(x => x.owner == editorID);
                    return filteredScripts;
                }
                else {
                    let filteredScripts: Array<Script> = [];
                    return filteredScripts;
                }
            }
        }

        let filteredScripts = scripts.filter(x => x.owner == user._id);
        return filteredScripts;
    }

    get_IDOfUserID(currentUser: number) {
        let myuser = this.getUsers().find(user => user.id == currentUser);
        if(myuser != undefined) {
            return myuser._id;
        }
        else {
            return undefined;
        }
    }

    getUsers(): User[] {
        return this.model.getUsers().sort((a, b) => (a.id < b.id) ? -1 : 1);;
    }

    includeArtworksChange(script: Script, stage: Stage, artworkid: string, selected: any) {
        if(selected.target.checked) {
            //add artwork to included artworks
            this.model.addArtworkToIncludedArtworks(script, stage, artworkid);
        }
        else {
            //remove artwork from included artworks
            this.model.removeArtworkFromIncludedArtworks(script, stage, artworkid);
        }
        this.model.saveScript(script);
    }

    isLoggedIn() {
        return this.currentuser.getUserID() != undefined;
    }

    drop(event: CdkDragDrop<string[]>, script: Script, i: number) {
        if(script.stages[i] as multiquestionStage) {
            moveItemInArray((script.stages[i] as multiquestionStage).questions, event.previousIndex, event.currentIndex);
            this.saveScript(script);
        }
    }

    deleteMultistageQuestion(script: Script, stageNumber: number, questionNumber: number) {
        if(script.stages[stageNumber] as multiquestionStage) {
            (script.stages[stageNumber] as multiquestionStage).questions.splice(questionNumber, 1);
            this.saveScript(script);
        }
    }

    deleteMultiquestionOption(script: Script, stageNumber: number, questionNumber: number, optionNumber: number) {
        if(script.stages[stageNumber] as multiquestionStage) {
            (script.stages[stageNumber] as multiquestionStage).questions[questionNumber].options.splice(optionNumber, 1);
            this.saveScript(script);
        }
    }

    deleteQuestionOption(script: Script, stageNumber: number, optionNumber: number) {
        if(script.stages[stageNumber] as questionStage) {
            (script.stages[stageNumber] as questionStage).question.options.splice(optionNumber, 1);
            this.saveScript(script);
        }
    }

    checkMultiquestionOptions(script: Script, stageNumber: number, questionNumber: number) {
        if(script.stages[stageNumber] as multiquestionStage) {
            if((script.stages[stageNumber] as multiquestionStage).questions[questionNumber].options.length < 2) {
                (script.stages[stageNumber] as multiquestionStage).questions[questionNumber].options = ["Option 1", "Option 2"];
                this.saveScript(script);
            }
        }
    }

    checkQuestionOptions(script: Script, stageNumber: number) {
        if(script.stages[stageNumber] as questionStage) {
            if((script.stages[stageNumber] as questionStage).question.options.length < 2) {
                (script.stages[stageNumber] as questionStage).question.options = ["Option 1", "Option 2"];
                this.saveScript(script);
            }
        }
    }

    stageDrop(script: Script, event: CdkDragDrop<string[]>) {
        this.model.moveScriptStage(script, event.previousIndex, event.currentIndex);
    }

    isAdmin() {
        return this.currentuser.getUserID() == 1;
    }

    isLoggedOut() {
        return this.currentuser.getUserID() == undefined;
    }

    statementOnlyScript(script: Script) {
        for(var stage of script.stages) {
            if(stage.stagetype != "statement") {
                return false;
            }
        }
        return true;
    }

    //*********artwork faceted search
    selectedCollectionItem: Artwork = null;

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

    uniqByMap<T>(array: T[]): T[] {
        const map = new Map();
        for (const item of array) {
            map.set(item, item);
        }
        return Array.from(map.values());
    }

    //////////////////

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

    //reloading the shown results based on facet selection
    filteredResults() {
        let results = this.getArtworks(this.model.selectedScript).filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchCollectionOrganText.toLowerCase())});

        if(this.showCurrentSelection) {
            results = results.filter(x => this.model.selectedScript.artworkids.includes(x._id));
        }
    
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
}