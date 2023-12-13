import { Injectable } from "@angular/core"; 
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { observable, Observable, Observer } from "rxjs"; 
import { Theme } from "./theme.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { Activity } from "./activity.model";
import { CollectionArtwork } from "./collectionArtwork.model";
import { User } from "./user.model";
import { ConfigSettings } from "./config";
import { Exhibition } from "./exhibition.model";
import { ScriptSet } from "./scriptSet.model";

@Injectable() export class RestDataSource { 

    // configuration settings
    private configSettings = new ConfigSettings;

    private APIURL = this.configSettings.APIURL;

    // Citizen data URLs 
    private exhibitionUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22exhibition%22%7D&limit=9999';
    private userUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22user%22%7D&limit=9999';
    private themeUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22theme%22%7D&limit=9999';
    private scriptsetUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22scriptset%22%7D&limit=9999';
    private artworkUrl =  this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22artwork%22%7D&limit=9999';
    private scriptUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22script%22%7D&limit=9999';
    private activityUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22activity%22%7D&limit=9999';
    private saveUrl = this.APIURL + this.configSettings.citizenDatasetUUID;

    constructor(private http: HttpClient) { }

    //Exhibition
    getExhibitionData(): Observable<Exhibition[]> {
        // return this.http.get<Exhibition[]>(this.exhibitionUrl, this.configSettings.config);
        return this.http.get<Exhibition[]>(this.exhibitionUrl);
    }

    saveExhibition(exhibition: Exhibition): Observable<User> {
        // return this.http.post<Exhibition>(this.saveUrl, exhibition, this.configSettings.config);
        return this.http.post<Exhibition>(this.saveUrl, exhibition);
    }

    updateExhibition(exhibition: Exhibition) {
        // return this.http.put<Exhibition>(`${this.saveUrl}/${exhibition._id}`, exhibition, this.configSettings.config);
        return this.http.put<Exhibition>(`${this.saveUrl}/${exhibition._id}`, exhibition);
    }

    deleteExhibition(_id: string) {
        // return this.http.delete<Exhibition>(`${this.saveUrl}/${_id}`, this.configSettings.config);
        return this.http.delete<Exhibition>(`${this.saveUrl}/${_id}`);
    }

    // User
    getUserData(): Observable<User[]> {
        // return this.http.get<User[]>(this.userUrl, this.configSettings.config);
        return this.http.get<User[]>(this.userUrl);
    }

    saveUser(user: User): Observable<User> {
        // return this.http.post<User>(this.saveUrl, user, this.configSettings.config);
        return this.http.post<User>(this.saveUrl, user);
    }

    updateUser(user: User) {
        // return this.http.put<User>(`${this.saveUrl}/${user._id}`, user, this.configSettings.config);
        return this.http.put<User>(`${this.saveUrl}/${user._id}`, user);
    }

    deleteUser(_id: string) {
        // return this.http.delete<User>(`${this.saveUrl}/${_id}`, this.configSettings.config);
        return this.http.delete<User>(`${this.saveUrl}/${_id}`);
    }
    
    // Script set
    getScriptSetData(): Observable<ScriptSet[]> { 
        // return this.http.get<ScriptSet[]>(this.userUrl, this.configSettings.config);
        return this.http.get<ScriptSet[]>(this.scriptsetUrl); 
    } 

    saveScriptSet(scriptset: ScriptSet): Observable<ScriptSet> { 
        // return this.http.post<ScriptSet>(this.saveUrl, scriptset, this.configSettings.config);
        return this.http.post<ScriptSet>(this.saveUrl, scriptset); 
    }

    updateScriptSet(scriptset: ScriptSet): Observable<ScriptSet> {
        // return this.http.put<ScriptSet>(`${this.saveUrl}/${scriptset._id}`, scriptset, this.configSettings.config);
        return this.http.put<ScriptSet>(`${this.saveUrl}/${scriptset._id}`, scriptset); 
    }

    deleteScriptSet(_id: string): Observable<ScriptSet> { 
        // return this.http.delete<ScriptSet>(`${this.saveUrl}/${_id}`, this.configSettings.config);
        return this.http.delete<ScriptSet>(`${this.saveUrl}/${_id}`); 
    }

    // Theme
    getThemeData(): Observable<Theme[]> { 
        // return this.http.get<Theme[]>(this.themeUrl, this.configSettings.config); 
        return this.http.get<Theme[]>(this.themeUrl); 
    } 

    saveTheme(theme: Theme): Observable<Theme> { 
        // return this.http.post<Theme>(this.saveUrl, theme, this.configSettings.config); 
        return this.http.post<Theme>(this.saveUrl, theme); 
    }

    updateTheme(theme: Theme): Observable<Theme> {
        // return this.http.put<Theme>(`${this.saveUrl}/${theme._id}`, theme, this.configSettings.config); 
        return this.http.put<Theme>(`${this.saveUrl}/${theme._id}`, theme); 
    }

    deleteTheme(_id: string): Observable<Theme> { 
        // return this.http.delete<Theme>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
        return this.http.delete<Theme>(`${this.saveUrl}/${_id}`); 
    }

    // Artwork
    getArtworkData(): Observable<Artwork[]> { 
        // return this.http.get<Artwork[]>(this.artworkUrl, this.configSettings.config); 
        return this.http.get<Artwork[]>(this.artworkUrl); 
    } 

    saveArtwork(artwork: Artwork): Observable<Artwork> { 
        // return this.http.post<Artwork>(this.saveUrl, artwork, this.configSettings.config); 
        return this.http.post<Artwork>(this.saveUrl, artwork); 
    }

    updateArtwork(artwork: Artwork): Observable<Artwork> {
        // return this.http.put<Artwork>(`${this.saveUrl}/${artwork._id}`, artwork, this.configSettings.config); 
        return this.http.put<Artwork>(`${this.saveUrl}/${artwork._id}`, artwork); 
    }

    deleteArtwork(_id: string): Observable<Artwork> { 
        // return this.http.delete<Artwork>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
        return this.http.delete<Artwork>(`${this.saveUrl}/${_id}`); 
    }

    // Script
    getScriptData(): Observable<Script[]> { 
        // return this.http.get<Script[]>(this.scriptUrl, this.configSettings.config); 
        return this.http.get<Script[]>(this.scriptUrl); 
    } 

    saveScript(script: Script): Observable<Script> { 
        // return this.http.post<Script>(this.saveUrl, script, this.configSettings.config); 
        return this.http.post<Script>(this.saveUrl, script); 
    }

    updateScript(script: Script): Observable<Script> {
        // return this.http.put<Script>(`${this.saveUrl}/${script._id}`, script, this.configSettings.config); 
        return this.http.put<Script>(`${this.saveUrl}/${script._id}`, script); 
    }

    deleteScript(_id: string): Observable<Script> { 
        // return this.http.delete<Script>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
        return this.http.delete<Script>(`${this.saveUrl}/${_id}`); 
    }

    // Activity
    getActivityData(): Observable<Activity[]> { 
        // return this.http.get<Activity[]>(this.activityUrl, this.configSettings.config); 
        return this.http.get<Activity[]>(this.activityUrl); 
    } 

    saveActivity(activity: Activity): Observable<Activity> { 
        // return  this.http.post<Activity>(this.saveUrl, activity, this.configSettings.config); 
        return  this.http.post<Activity>(this.saveUrl, activity); 
    }

    updateActivity(activity: Activity): Observable<Activity> {
        // return this.http.put<Activity>(`${this.saveUrl}/${activity._id}`, activity, this.configSettings.config); 
        return this.http.put<Activity>(`${this.saveUrl}/${activity._id}`, activity); 
    }

    deleteActivity(_id: string): Observable<Activity> { 
        // return this.http.delete<Activity>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
        return this.http.delete<Activity>(`${this.saveUrl}/${_id}`); 
    }

    //Collection query

    private collectionURL = this.configSettings.collectionURL+this.configSettings.collectionDatasetUUID+'/sparql?query='+this.configSettings.collectionQuery;
      
    getCollection(): Observable<CollectionArtwork> {
        const obs = new Observable((observer) => {
            this.http.get<any>(this.collectionURL).subscribe(data => {
                let resarray:  Array<CollectionArtwork> = [];
                for(var item of data["results"]["bindings"]) {
                    let collectionItem: CollectionArtwork = {name: item["title"]["value"], artist: item["creatorname"]["value"], year:item["year"]["value"],
                    filelocation: this.configSettings.imageURL+item["artworkurl"]["value"]+".jpg", searchstring: item["title"]["value"]+', '+item["creatorname"]["value"],
                    location: item["location"]["value"], artworkuri: item["artwork"]["value"]
                    };
                    observer.next(collectionItem);
                }
                observer.complete();
            },
                error=>{
                    console.log("error",error);
                    observer.complete();
                }
            );
        });
        return obs;
    }

    private buildQueryPt1 = `PREFIX core: %3Chttps://w3id.org/polifonia/ontology/core/%3E
    PREFIX core2: %3Chttps://w3id_org/polifonia/ontology/core/%3E
    PREFIX organs: %3Chttp://w3id.org/polifonia/resource/organs/%3E
    PREFIX organ: %3Chttp://w3id.org/polifonia/ontology/organs/%3E
    
    SELECT ?start (?agentLabel as ?builder) (group_concat(?taskLabel;separator="|") as ?tasks)
    WHERE { 
      BIND(%3C`;

    private buildQueryPt2 = `%3E as ?organ) .
     
     ?organ core2:isDescribedBy ?project .
      
     ?project core2:hasTimeInterval ?timeInterval .
     ?timeInterval rdf:type core:TimeInterval .
     ?timeInterval core2:startTime ?start .
     ?timeInterval core2:endTime ?end .
      
     ?project core2:hasAgentRole ?agentRole .
     ?agentRole core2:hasRole organs:roleBuilder .
     ?agentRole core2:hasAgent ?agent .
     ?agent rdfs:label ?agentLabel .
    
      
     ?project core2:definesTask ?task .
     ?task rdfs:label ?taskLabel .
      
    FILTER regex(str(?agentLabel), ".*[a-zA-Z].*")
     
    } 
    GROUP BY ?project ?agent ?agentLabel ?start ?end
    ORDER BY ASC(?start)
    `;

    getBuildHistory(artworkuri: string): Observable<any> {
        let buildURL = this.configSettings.collectionURL+this.configSettings.collectionDatasetUUID+'/sparql?query='+this.buildQueryPt1+artworkuri+this.buildQueryPt2;
        const obs = new Observable((observer) => {
            this.http.get<any>(buildURL).subscribe(data => {
                for(var item of data["results"]["bindings"]) {
                    let buildItem: {year: string, builder: string, tasks: string} = {year: item["start"]["value"], 
                    builder: item["builder"]["value"],
                    tasks: item["tasks"]["value"]
                    };
                    observer.next(buildItem);
                }
                observer.complete();
            },
                error=>{
                    observer.complete();
                }
            );
        });
        return obs;
    }

}


