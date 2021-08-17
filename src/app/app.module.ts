import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { DayModelComponent } from "./challenges/day-model/day-model.component";
import { ChallengesActionsModule } from "./challenges/challenges-actions/challenges-actions.module";
import { IntroComponent } from "./auth/intro.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        AppRoutingModule,
        ChallengesActionsModule
    ],
    declarations: [
        AppComponent,
        DayModelComponent,
        IntroComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA // disables angular web checks.
    ],
    entryComponents: [DayModelComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
