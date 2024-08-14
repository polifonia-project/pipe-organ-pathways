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

    // private collectionURL = this.configSettings.collectionURL+this.configSettings.collectionDatasetUUID+'/sparql?query='+this.configSettings.collectionQuery;
    private collectionURL = this.configSettings.collectionURL+'sparql?query='+this.configSettings.collectionQuery;
      
    getCollection(): Observable<CollectionArtwork> {
        const obs = new Observable((observer) => {
            this.http.get<any>(this.collectionURL).subscribe(data => {
                let resarray:  Array<CollectionArtwork> = [];
                for(var item of data["results"]["bindings"]) {
                    let collectionItem: CollectionArtwork = {name: item["title"]["value"], artist: item["creatorname"]["value"], year:item["year"]["value"],
                    filelocation: item["artworkurl"]["value"], searchstring: item["title"]["value"]+', '+item["creatorname"]["value"],
                    location: item["location"]["value"], artworkuri: item["artwork"]["value"], building: item["building"]["value"], divisions: item["divisions"]["value"].split("|"),
                    // let collectionItem: CollectionArtwork = {name: item["title"]["value"], artist: item["creatorname"]["value"], year:item["year"]["value"],
                    // filelocation: this.configSettings.imageURL+item["artworkurl"]["value"]+".jpg", searchstring: item["title"]["value"]+', '+item["creatorname"]["value"],
                    // location: item["location"]["value"], artworkuri: item["artwork"]["value"], building: item["building"]["value"], divisions: item["divisions"]["value"].split("|"),
                    // stops: item["stops"]["value"].split("|")
                    };
                    if(item["stops"] != undefined){
                        collectionItem.stops = item["stops"]["value"].split("|");
                    }
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

    buildQuery(artworkuri: string): string {
        return `PREFIX core: %3Chttps://w3id.org/polifonia/ontology/core/%3E
        PREFIX rdf: %3Chttp://www.w3.org/1999/02/22-rdf-syntax-ns%23%3E
        PREFIX rdfs: %3Chttp://www.w3.org/2000/01/rdf-schema%23%3E 
        PREFIX organ: %3Chttp://w3id.org/polifonia/ontology/organs/%3E
        PREFIX organs: %3Chttp://w3id.org/polifonia/resource/organs/%3E
        
        SELECT ?start (?agentLabel as ?builder) ?tasks WHERE {
        
        
        {SELECT ?project (group_concat(distinct ?taskLabel;separator="|") as ?tasks) 
        
        WHERE {
        BIND (%3C${artworkuri}%3E as ?organ) .
          
        ?organ rdf:type organ:Organ .
        ?organ core:describedBy ?project .
        ?project core:definesTask ?task .
        ?task core:value ?taskLabel .
        } 
        GROUP BY ?project
        }
        
        {
        SELECT ?project (SAMPLE(?agentLabel1) as ?agentLabel) WHERE { 
        BIND (%3C${artworkuri}%3E as ?organ) .
         ?organ core:describedBy ?project .
        ?project core:hasProjectist ?projectist .
        ?projectist core:involvesAgent ?agent .
        ?agent core:hasName ?name .
        ?name core:name ?agentLabel1 .
        }
        GROUP BY ?project
        }
        
        {
          SELECT ?project (SAMPLE(?starttime) as ?start) WHERE { 
        BIND (%3C${artworkuri}%3E as ?organ) .
        ?organ rdf:type organ:Organ .
        ?organ core:describedBy ?project .
        ?project core:hasTimedLocation ?timedLocation .
        ?timedLocation core:hasTimeInterval ?timeInterval .
        ?timeInterval core:time ?starttime .
        }
        GROUP BY ?project
        }
          
        }
        ORDER BY ASC(?start)`;

        return `PREFIX core: %3Chttps://w3id.org/polifonia/ontology/core/%3E
        PREFIX rdf: %3Chttp://www.w3.org/1999/02/22-rdf-syntax-ns%23%3E
        PREFIX rdfs: %3Chttp://www.w3.org/2000/01/rdf-schema%23%3E 
        PREFIX organ: %3Chttp://w3id.org/polifonia/ontology/organs/%3E
        PREFIX organs: %3Chttp://w3id.org/polifonia/resource/organs/%3E
        
        SELECT ?start (?agentLabel as ?builder) (group_concat(?taskLabel;separator="|") as ?tasks)
        
        WHERE {
        BIND (%3C${artworkuri}%3E as ?organ) .
        ?organ rdf:type organ:Organ .
        ?organ core:describedBy ?project .
        ?project core:hasTimedLocation ?timedLocation .
        ?timedLocation core:hasTimeInterval ?timeInterval .
        ?timeInterval core:time ?start .
        ?project core:hasProjectist ?projectist .
        ?projectist core:involvesAgent ?agent .
        ?agent core:hasName ?name .
        ?name core:name ?agentLabel .
        ?project core:definesTask ?task .
        ?task core:value ?taskLabel 
        
        
        } 
        GROUP BY ?project ?agent ?agentLabel ?start
        ORDER BY ASC(?start)`;

    }

    private buildQueryPt1 = `PREFIX core: %3Chttps://w3id.org/polifonia/ontology/core/%3E
    PREFIX core2: %3Chttps://w3id_org/polifonia/ontology/core/%3E
    PREFIX organs: %3Chttp://w3id.org/polifonia/resource/organs/%3E
    PREFIX organ: %3Chttp://w3id.org/polifonia/ontology/organs/%3E
    
    SELECT ?start (?agentLabel as ?builder) (group_concat(?taskLabel;separator="|") as ?tasks)
    WHERE { 
      BIND(%3C`;

    // private buildQueryPt2 = `%3E as ?organ) .
     
    //  ?organ core:isDescribedBy ?project .
      
    //  ?project core:hasTimeInterval ?timeInterval .
    //  ?timeInterval rdf:type core:TimeInterval .
    //  ?timeInterval core:startTime ?start .
    //  ?timeInterval core:endTime ?end .
      
    //  ?project core:hasAgentRole ?agentRole .
    //  ?agentRole core:hasRole organs:roleBuilder .
    //  ?agentRole core:hasAgent ?agent .
    //  ?agent rdfs:label ?agentLabel .
    
      
    //  ?project core:definesTask ?task .
    //  ?task rdfs:label ?taskLabel .
      
    // FILTER regex(str(?agentLabel), ".*[a-zA-Z].*")
     
    // } 
    // GROUP BY ?project ?agent ?agentLabel ?start ?end
    // ORDER BY ASC(?start)
    // `;

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
        // let buildURL = this.configSettings.collectionURL+'sparql?query='+this.buildQueryPt1+artworkuri+this.buildQueryPt2;
        let buildURL = this.configSettings.collectionURL+'sparql?query='+this.buildQuery(artworkuri);
        // let buildURL = this.configSettings.collectionURL+this.configSettings.collectionDatasetUUID+'/sparql?query='+this.buildQueryPt1+artworkuri+this.buildQueryPt2;
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

    getDispositionInfo(artworkuri: string): Observable<any> {
        let dispositionURL = this.configSettings.collectionURL+'sparql?query='+this.dispositionQuery(artworkuri);
        // let dispositionURL = this.configSettings.collectionURL+'sparql?query='+this.dispositionQueryPt1+artworkuri+this.dispositionQueryPt2;
        // let dispositionURL = this.configSettings.collectionURL+this.configSettings.collectionDatasetUUID+'/sparql?query='+this.dispositionQueryPt1+artworkuri+this.dispositionQueryPt2;

        const obs = new Observable((observer) => {
            this.http.get<any>(dispositionURL).subscribe(data => {
                for(var item of data["results"]["bindings"]) {
                    let parthoodname = item["parthoodlabel"]["value"];
                    let divisionList: {divisionname: string, divisionorder: number, stops: {stoporder: string, stopname:string, stopspecification: string}[]}[] = [];
                    let disposition: {parthoodname: string, divisions: {divisionname: string, divisionorder: number, stops: {stoporder: string, stopname:string, stopspecification: string}[]}[]} = null;
                    // let depositionItem: 
                    let divisionsInfo = item["divisionsInfo"]["value"];
                    let divisionsList = divisionsInfo.split("!");
                    for(var divisionInfo of divisionsList) {
                        let divisionInfoSplit = divisionInfo.split(":");
                        let divisionId = divisionInfoSplit[0];
                        let stops = divisionInfoSplit[1];
                        let stoplist = stops.split(";");
                        let divisionIdSplit = divisionId.split("|");
                        let divisionOrder = divisionIdSplit[0];
                        let divisionName = divisionIdSplit[1];
            
                        let stopList: {stoporder: string, stopname:string, stopspecification: string}[] = [];
                        for(var stop of stoplist) {
                            let stopSplit = stop.split("|");
                            let stopOrder = stopSplit[0];
                            let stopName = stopSplit[1];
                            let stopSpecification = stopSplit[2];
                            stopList.push({stoporder: stopOrder, stopname:stopName, stopspecification: stopSpecification})
                        }
                        stopList.sort((n1, n2) => {if(Number(n1.stoporder) > Number(n2.stoporder)) {return 1} else {return -1} });
                        divisionList.push({divisionname: divisionName, divisionorder: divisionOrder, stops: stopList});
                  
                    }
                    divisionList.sort((n1, n2) => {if(Number(n1.divisionorder) > Number(n2.divisionorder)) {return 1} else {return -1} });
                    disposition = {parthoodname: parthoodname, divisions: divisionList};
                    observer.next(disposition);
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

    dispositionQuery(artworkuri: string): string {
    return `PREFIX core: %3Chttps://w3id.org/polifonia/ontology/core/%3E
    PREFIX rdf: %3Chttp://www.w3.org/1999/02/22-rdf-syntax-ns%23%3E
    PREFIX rdfs: %3Chttp://www.w3.org/2000/01/rdf-schema%23%3E 
    PREFIX organ: %3Chttp://w3id.org/polifonia/ontology/organs/%3E
    PREFIX organs: %3Chttp://w3id.org/polifonia/resource/organs/%3E
    
        SELECT * 
        WHERE
        {
          BIND (%3C${artworkuri}%3E as ?organ) .
        ?organ rdf:type organ:Organ .
       ?organ core:includesWhole ?parthood .
       
         ?parthood core:label ?parthoodlabel .
         {
    
       SELECT ?parthood (GROUP_CONCAT(?divisionInfo;separator="!") AS ?divisionsInfo) 
       WHERE
       {
      
    SELECT ?parthood ?division (concat(?divisionId,":", ?stops) as ?divisionInfo)
       WHERE
       {
              BIND (%3C${artworkuri}%3E as ?organ) .
         ?organ core:includesWhole ?parthood .
       ?parthood core:hasPart ?division . 
       ?division core:name ?divisionName .
       ?division  core:isClassifiedBy ?divisionType .
       ?division organ:hasOrder ?divisionOrder .
       BIND(concat(str(?divisionOrder),"|",?divisionName) AS ?divisionId) .  
    
    {SELECT ?division (GROUP_CONCAT(?stopInfo;separator=";") AS ?stops)
       WHERE
       {
       SELECT ?division ?stopInfo
       WHERE {
         BIND (%3C${artworkuri}%3E as ?organ) .
         ?organ core:includesWhole ?parthood .
         ?parthood core:hasPart ?division .
       ?division rdf:type organ:OrganDivision .
       ?division core:hasPart ?stop .
       ?stop rdf:type organ:OrganDivisionStop .
       ?stop organ:hasOrder ?stopOrder .
       ?stop core:name ?stopName .
       ?stop organ:hasSpecification ?stopSpecification .
        BIND(concat(str(?stopOrder),"|",?stopName,"|",?stopSpecification) AS ?stopInfo) . 
       }
       ORDER BY ?stopOrder
       }
       GROUP BY ?division
    }
    }
    ORDER BY ?divisionOrder 
    }
    GROUP BY ?parthood
              }
       }
       ORDER BY ?parthoodlabel
    
    `;
    }


    private dispositionQueryPt1 = `PREFIX core: %3Chttps://w3id.org/polifonia/ontology/core/%3E
    PREFIX core2: %3Chttps://w3id_org/polifonia/ontology/core/%3E
    PREFIX organs: %3Chttp://w3id.org/polifonia/resource/organs/%3E
    PREFIX organs2: %3Chttp://w3id_org/polifonia/resource/organs/%3E
    PREFIX organ: %3Chttp://w3id.org/polifonia/ontology/organs/%3E
    PREFIX rdf: %3Chttp://www.w3.org/1999/02/22-rdf-syntax-ns%23%3E
    PREFIX rdfs: %3Chttp://www.w3.org/2000/01/rdf-schema%23%3E
    
    SELECT * 
    WHERE
    {
       BIND(%3C`;

    private dispositionQueryPt2 = `%3E as ?organ) .
    ?organ rdf:type organ:Organ .
   ?organ core:includesWhole ?parthood .
   
     ?parthood core:label ?parthoodlabel .
     {
   SELECT ?parthood (GROUP_CONCAT(?divisionInfo;separator="!") AS ?divisionsInfo) 
   WHERE
   {
   SELECT ?parthood ?parthoodlabel ?division (concat(?divisionId,":", ?stops) as ?divisionInfo)
   WHERE
   {
    ?parthood core:hasPart ?division . 
   ?division core:name ?divisionName .
   ?division  core:isClassifiedBy ?divisionType .
   ?division organ:hasOrder ?divisionOrder .
     BIND(concat(str(?divisionOrder),"|",?divisionName) AS ?divisionId) . 
     
   {SELECT ?division (GROUP_CONCAT(?stopInfo;separator=";") AS ?stops)
   WHERE
   {
   SELECT ?division ?stopInfo
   WHERE {
     ?division rdf:type organ:OrganDivision .
   
     ?division core:hasPart ?stop .
   ?stop rdf:type organ:OrganDivisionStop .
   ?stop organ:hasOrder ?stopOrder .
   ?stop core:hasName ?stopDName .
   FILTER(isIRI(?stopDName)) .
   ?stopDName core:name ?stopName .
   ?stop organ:hasSpecification ?stopSpecification .
    BIND(concat(str(?stopOrder),"|",?stopName,"|",?stopSpecification) AS ?stopInfo) . 
   }
   ORDER BY ?stopOrder
   }
   GROUP BY ?division
   }
   }
   ORDER BY ?divisionOrder 
   }
   GROUP BY ?parthood
   }
   }
   ORDER BY ?parthoodlabel`;



}


