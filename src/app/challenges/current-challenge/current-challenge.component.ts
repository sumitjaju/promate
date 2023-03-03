
import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { Subscription } from 'rxjs';

import { DayModelComponent } from '../day-model/day-model.component';
import { UIService } from '~/app/shared/ui/ui.service';
import { ChallengesServices } from '../challenges.services';
import { Challenges } from '../challenges.model';
import { Day, DayStatus } from '../day.model';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css'],
    moduleId: module.id
})

export class CurrentChallengeComponent implements OnInit, OnDestroy {
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    currentChallenge : Challenges;
    days: {dayInMonth:number, dayInWeek: number} [] = [];

    private curChallengSub: Subscription;

    constructor(private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService,
        private challengeService: ChallengesServices) {}

    ngOnInit () {
        this.curChallengSub = this.challengeService.currentChallenge.subscribe(
            challenge => {
                this.currentChallenge = challenge;
            }
        );
    }

    getRow(index:number, day: {dayInMonth:number, dayInWeek: number}) {
        const startRow = 1;
        const weeekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(), 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
        return startRow + weeekRow + irregularRow;
    }

    onChangeStatus(day: Day){
        if (!this.getIsSettable(day.dayInMonth)) {
            return;
        }
        this.modalDialog.showModal(DayModelComponent, {
            fullscreen:false, viewContainerRef: this.uiService.getRootVCRef()?
            this.uiService.getRootVCRef() : this.vcRef,
            context: { date: day.date, status: day.status }
        }).then ((status: DayStatus) => {
            if (status === DayStatus.Open) {
                return;
            }
            this.challengeService.updateDay(day.dayInMonth, status);
        });
    }

    ngOnDestroy () {
        if (this.curChallengSub) {
            this.curChallengSub.unsubscribe();
        }
    }

    getIsSettable(dayInMonth: number) {
        return dayInMonth <= new Date().getDate();
    }

}
