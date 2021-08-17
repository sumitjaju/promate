import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

import { ChallengesServices } from "../challenges.services";

@Component({
    selector: 'ns-challenges-tabs',
    templateUrl: './challenges-tabs.component.html',
    styleUrls: ['./challenges-tabs.component.css'],
    moduleId: module.id
})

export class ChallengesTabsComponent implements OnInit {
    isLoading = false;
    constructor (private router: RouterExtensions,
        private active: ActivatedRoute,
        private challengeService: ChallengesServices
    ){}

    ngOnInit() {
        this.isLoading = true;
        this.challengeService.fetchCurrentChallenge().subscribe(
            res => {
                console.log('Fetched challenge');
                this.isLoading = false;
                this.loadTabRoutes();
            }, err => {
                console.log(err);
                this.isLoading = false;
                this.loadTabRoutes();
            }
        )
    }

    private loadTabRoutes () {

        setTimeout(() => {
            this.router.navigate([{
                outlets: {
                    currentChallenge:['currentC'],
                    today : ['today'],
                    care : ['care']
                }}],
                {
                    relativeTo: this.active
                }
            );
        }, 10);

    }

}
