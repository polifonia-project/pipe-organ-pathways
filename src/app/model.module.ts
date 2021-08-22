import { NgModule } from "@angular/core"; 
import { Model } from "./repository.model"; 
import { HttpClientModule } from "@angular/common/http"; 
import { RestDataSource } from "./rest.datasource";

@NgModule({ 
    imports: [HttpClientModule], 
    providers: [Model, RestDataSource] })

export class ModelModule { }