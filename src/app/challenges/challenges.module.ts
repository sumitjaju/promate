import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, ModalDialogService } from 'nativescript-angular/common';
import { ChallengesRoutingModule } from "./challenges-routing.module";
import { SharedModule } from "../shared/ui/shared.module";
import { ChallengesActionsModule } from "./challenges-actions/challenges-actions.module";

import { ChallengesTabsComponent } from "./challenges-tabs/challenges-tabs.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import { TodayComponent } from "../today/today.component";
import { CareComponent } from "./care-tips/care.component";


@NgModule({
    declarations: [
        ChallengesTabsComponent,
        CurrentChallengeComponent,
        TodayComponent,
        CareComponent
    ],
    imports: [NativeScriptCommonModule,
        ChallengesRoutingModule,
        SharedModule,
        ChallengesActionsModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA // disables angular web checks.
    ]
})
export class ChallengesModule {}
