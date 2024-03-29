import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ActionBarComponent } from "./action-bar.component";

@NgModule ({
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    declarations: [ActionBarComponent],
    exports: [ActionBarComponent],
    schemas: [
        NO_ERRORS_SCHEMA // disables angular web checks.
    ]
})
export class SharedModule {}
