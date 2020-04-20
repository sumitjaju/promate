import { NgModule } from "@angular/core";
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ChallengesTabsComponent } from "./challenges-tabs/challenges-tabs.component";
import { TodayComponent } from "../today/today.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";

const routes: Routes = [
    {
        path: 'tabs',
        component: ChallengesTabsComponent,
        children: [
            { path: 'today', component: TodayComponent, outlet: 'today' },
            { path: 'currentC', component: CurrentChallengeComponent, outlet: 'currentChallenge' }
        ]
    },
    { path: ':mode', loadChildren: '~/app/challenges/challenges-edit/challenges-edit.module#ChallengesEditModule' },
    { path: '', redirectTo: '/challenges/tabs', pathMatch: 'full'}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChallengesRoutingModule {}
