import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChallengesServices } from "../challenges/challenges.services";
import { Subscription } from "rxjs";
import { Day, DayStatus } from "../challenges/day.model";


@Component ({
    selector: 'ns-today',
    templateUrl:'./today.component.html',
    styleUrls:['./today.component.css'],
    moduleId:module.id
})
export class TodayComponent implements OnInit, OnDestroy {
    currentDay: Day;
    private curChallengeSub: Subscription;
    constructor (private challengeService : ChallengesServices){}
    ngOnInit() {
        this.curChallengeSub = this.challengeService.currentChallenge.subscribe(challenge => {
            if (challenge) {
                this.currentDay = challenge.currentDay;
            }
        })
    }

    onActionSelected (action: DayStatus) {
        this.challengeService.updateDay(this.currentDay.dayInMonth, action);
    }

    getActionName() {
        if (this.currentDay.status === DayStatus.Completed) {
            return 'complete';
        }

        if (this.currentDay.status === DayStatus.Failed) {
            return 'fail';
        }
        return null;
    }

    ngOnDestroy () {
        if (this.curChallengeSub) {
            this.curChallengeSub.unsubscribe();
        }
    }

}
