import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ExternalHRefModule } from "@marco-eckstein/angular-lib-common";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ExternalHRefModule.forRoot({ externalHRefTargetDefaultsToBlank: true }),
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
