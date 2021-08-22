import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";

@Component({
    selector: "paOtherPeople",
    templateUrl: "otherPeople.component.html"
})

export class OtherPeopleComponent {

    constructor(private model: Model){}
    // model: Model = new Model();

    mode: number = 1;
    
    getThemes(): Theme[] {
        return this.model.getThemes();
    }

    getScriptsOfTheme(id: number): Script[] {
        return this.model.getScriptsOfTheme(id);
    }

    getApprovedActivitiesOfAScript(id: number): Activity[] {
        return this.model.getApprovedActivitiesOfAScript(id);
    }

}