import { NgModule } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ActionBarComponent } from "./action-bar.component";

@NgModule ({
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    declarations: [ActionBarComponent],
    exports: [ActionBarComponent]
})
export class SharedModule {}
