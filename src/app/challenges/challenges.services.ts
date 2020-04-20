import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { Challenges } from './challenges.model';
import { DayStatus, Day } from './day.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChallengesServices implements OnDestroy {
  private _currentChallenge = new BehaviorSubject<Challenges>(null);
  private userSub: Subscription;
  constructor (
      private http: HttpClient,
      private authService: AuthService
  ) {
      this.userSub = this.authService.user.subscribe(
          user => {
              if (!user) {
                  this._currentChallenge.next(null);
              }
          }
      );

  }

  get currentChallenge() {
      return this._currentChallenge.asObservable();
  }

  createNewChallenge(title: string, description: string) {
    const newChallenge = new Challenges(
      title,
      description,
      new Date().getFullYear(),
      new Date().getMonth()
    );
    // Save it to server
    this.http
    .put('https://ns-pledge-app.firebaseio.com/challenge.json',newChallenge)
    .subscribe( res => {
        console.log("Response received !!");
    });
    this.saveToServer(newChallenge);
    this._currentChallenge.next(newChallenge);
  }

  /**
   * Fetch the existing activity.
   */
  fetchCurrentChallenge () {
    return this.authService.user.pipe(
        take(1),
        switchMap(currentUser => {
        if (!currentUser || !currentUser.isAuth) {
            return of(null);
        }
        return this.http.get<{
            title: string,
            description: string,
            month: number,
            year: number,
            _days: Day[]}>
         (`https://ns-pledge-app.firebaseio.com/challenge/${currentUser.id}.json?auth=${
             currentUser.token
            }`
         )
    }),
    tap(resData => {
         const loadedChallenge = new Challenges(
            resData.title, resData.description,
            resData.year, resData.month,
            resData._days
         );
         this._currentChallenge.next(loadedChallenge);
     }));
  }

  updateChallenge (title: string, description: string) {
    this._currentChallenge.pipe(take(1)).subscribe(
        challenge => {
            const updatedChallenge = new Challenges(
                title,
                description,
                challenge.year,
                challenge.month,
                challenge.days
            );
            //save it to the server
            this.saveToServer(updatedChallenge);
            this._currentChallenge.next(updatedChallenge);
        }
    )
  }

  updateDay (dayInMonth: number, status: DayStatus) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
        if (!challenge || challenge.days.length < dayInMonth) {
            return;
        }
        const dayIndex = challenge.days.findIndex(d =>
            d.dayInMonth === dayInMonth
        )
        challenge.days[dayIndex].status = status;
        this._currentChallenge.next(challenge);
        //console.log(challenge.days[dayIndex]);
        // Save this to a server.
        this.saveToServer(challenge);
    })
  }

  /**
   * Save or update the activity.
   */
  private saveToServer (challenge: Challenges) {
    this.authService.user.pipe(
        take(1),
        switchMap(currentUser => {
        if (!currentUser || !currentUser.isAuth) {
            return of(null);
        }
        return this.http
        .put(
            `https://ns-pledge-app.firebaseio.com/challenge/${currentUser.id}.json?auth=${
                currentUser.token}`,
            challenge
        )
    })).subscribe( res => {
        console.log(res);
    });
  }

  cleanUp() {
      this._currentChallenge.next(null);
  }

  ngOnDestroy () {
      this.userSub.unsubscribe();
  }

}

