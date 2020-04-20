import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DayStatus } from "../day.model";


@Component ({
    selector: 'ns-daymodel',
    templateUrl:'./day-model.component.html',
    styleUrls:['./day-model.component.css'],
    moduleId:module.id
})
export class DayModelComponent  {
    loadedDate: Date;
    loadedStatus: 'complete' | 'fail' = null;
    constructor(private modalParams: ModalDialogParams) {
    }

    ngOnInit() {
        const parsedParams = (this.modalParams.context as {
            date : Date;
            status: DayStatus;
        })
        this.loadedDate = parsedParams.date;
        if (parsedParams.status === DayStatus.Completed) {
            this.loadedStatus = 'complete';
        } else if (parsedParams.status === DayStatus.Failed) {
            this.loadedStatus = 'fail';
        } else {
            this.loadedStatus = null;
        }
    }

    onHandleInput(action: DayStatus) {
        this.modalParams.closeCallback(action);
    }
}
