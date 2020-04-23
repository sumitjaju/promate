import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { UIService } from "./shared/ui/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent, {static:false}) drawerCoponent: RadSideDrawerComponent;
    private drawerSub: Subscription;
    private sideDrawer : RadSideDrawer;
    activeChallenge:string;
    currentUser : string;
    constructor (private uiService:UIService,
        private changeDetect: ChangeDetectorRef,
        private vcRef: ViewContainerRef, private authService: AuthService) {
    }

    ngOnInit(){
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if(this.sideDrawer){
                this.sideDrawer.toggleDrawerState();
            }
        });
        this.uiService.setRootVCRef(this.vcRef);
        // this.authService.autoLogin().subscribe(
        //     success => {
        //         console.log(success);
        //     }
        // )
    }

    onLogout() {
        this.uiService.toggleDrawer();
        this.authService.logout();
    }

    ngAfterViewInit() {
        this.sideDrawer = this.drawerCoponent.sideDrawer;
        this.changeDetect.detectChanges();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }
    // enteredChallenge = '';
    OnChallengeInput(challengeDescription: string) {
        //this.enteredChallenge = challengeDescription;
        this.activeChallenge = challengeDescription;
    }
}
