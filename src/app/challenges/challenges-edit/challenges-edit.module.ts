import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengesEditComponent } from "./challenges-edit.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SharedModule } from "~/app/shared/ui/shared.module";


@NgModule ( {
    declarations: [ChallengesEditComponent],
    imports:[
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild([
            {
                path : '', component: ChallengesEditComponent
            }
        ]),
        SharedModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA // disables angular web checks.
    ]
})
export class ChallengesEditModule {

}
