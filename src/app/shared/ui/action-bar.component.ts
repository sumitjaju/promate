import { Component, OnInit, Input } from "@angular/core";
import { isAndroid } from 'tns-core-modules/platform';
import { UIService } from "./ui.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component ({
    selector: 'ns-action-bar',
    templateUrl:'./action-bar.component.html',
    styleUrls:['./action-bar.component.css'],
    moduleId:module.id
})
export class ActionBarComponent implements OnInit {

    @Input() title: string;
    @Input() showBackButton = true;
    @Input() hasMenu = true;

    constructor (private uiService:UIService, private router: RouterExtensions){}
    ngOnInit() {
    }

    get andriod() {
        return isAndroid;
    }

    // get canGoBack() {
    //     return this.router.canGoBack() && this.showBackButton;
    // }

    // onGoBack() {
    //     this.router.backToPreviousPage();
    // }

    onToggleMenu () {
        this.uiService.toggleDrawer();
    }
}
