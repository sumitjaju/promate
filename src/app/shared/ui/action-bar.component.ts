import { Component, OnInit, Input, ViewContainerRef } from "@angular/core";
import { isAndroid } from 'tns-core-modules/platform';
import { UIService } from "./ui.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { HelpComponent } from "~/app/today/help.component";

const modalView = "ns-ui-category/modal-view/modal-navigation/modal-root";

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

    constructor (private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,private uiService: UIService,private router: RouterExtensions){}

    ngOnInit() {
    }

    get andriod() {
        return isAndroid;
    }

    getInfo() {
        this.modalDialog.showModal(HelpComponent, {
            fullscreen:false, viewContainerRef: this.uiService.getRootVCRef()?
            this.uiService.getRootVCRef() : this.vcRef,
            context: { }
        })
    }

    onToggleMenu () {
        this.uiService.toggleDrawer();
    }
}
