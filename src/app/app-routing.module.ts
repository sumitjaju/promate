import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { IntroComponent } from "./auth/intro.component";

const routes: Routes = [
    { path: '', component: IntroComponent },
    { path: 'auth', loadChildren: '~/app/auth/auth.module#AuthModule' },
    {
        path: 'challenges',
        loadChildren: '~/app/challenges/challenges.module#ChallengesModule',
        canLoad: [AuthGuard]
    },
    { path: 'challenges', redirectTo: '/challenges/tabs', pathMatch: 'full' },
];

@NgModule ({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
