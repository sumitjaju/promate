import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { take } from "rxjs/operators";
import { ChallengesServices } from "../challenges.services";

@Component({
    selector: 'ns-challenges-edit',
    templateUrl: './challenges-edit.component.html',
    styleUrls: ['./challenges-edit.component.css'],
    moduleId: module.id
})

export class ChallengesEditComponent implements OnInit {
    constructor (private activatedRouter: ActivatedRoute,
        private pageRoute: PageRoute,
        private router: RouterExtensions,
        private challengeService: ChallengesServices){}
    isCreating = true;
    title = '';
    description = '';

    onSubmit(title : string, description : string) {
        console.log(title + " " + description);
        if (this.isCreating) {
            this.challengeService.createNewChallenge(title, description);
        } else {
            this.challengeService.updateChallenge(title, description)
        }

        this.router.backToPreviousPage();
    }

    ngOnInit() {
        // this.activatedRouter.paramMap.subscribe(paramMap => {
        //     console.log(paramMap.get("mode"));
        // });
        this.pageRoute.activatedRoute.subscribe(activateRouter => {
            this.activatedRouter.paramMap.subscribe(paramMap => {
                //console.log(paramMap.get("mode"));
                if (!paramMap.has('mode')) {
                    this.isCreating = true;
                } else {
                    this.isCreating = paramMap.get('mode') != 'edit';
                }
                if (!this.isCreating) {
                    this.challengeService.currentChallenge.pipe(take(1)).subscribe(
                        challenge => {
                            this.title = challenge.title;
                            this.description = challenge.description;
                        }
                    );
                }

            });
        });
    }



}
