import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengeActionsComponent } from "./challenges-actions.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule ({
    declarations: [ChallengeActionsComponent],
    imports : [NativeScriptCommonModule],
    exports: [ChallengeActionsComponent],
    schemas: [
        NO_ERRORS_SCHEMA // disables angular web checks.
    ]
})
export class ChallengesActionsModule { }
