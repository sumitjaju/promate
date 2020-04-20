import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject, of } from "rxjs";
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from "./user.model";
import { RouterExtensions } from "nativescript-angular/router";
import { setString, getString, hasKey, remove } from 'tns-core-modules/application-settings';
import { ChallengesServices } from "../challenges/challenges.services";

const FIREBASE_API_KEY = "AIzaSyDLUNNtubhq2FQsUGwTLo9c22a3fSSKBEY";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
    private _user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: number;
    constructor(
        private http: HttpClient,
        private router: RouterExtensions) {}

    get user() {
        return this._user.asObservable();
    }

    signUp (email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
            {email: email, password: password, returnSecureToken: true}
        ).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.error.message)
            return throwError(errorRes);
        }),
        tap (
            resData => {
                if(resData && resData.idToken) {
                    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
                    const user = new User(
                        email,
                        resData.localId,
                        resData.idToken,
                        expirationDate
                    );
                    this._user.next(user);
                }
            }
        )
        )
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
            {email: email, password: password, returnSecureToken: true}
        ).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.error.message)
            return throwError(errorRes);
        }),
        tap (
            resData => {
                if(resData && resData.idToken) {
                    this.handleLogin(
                        email,
                        resData.idToken,
                        resData.localId,
                        parseInt(resData.expiresIn)
                    )
                }
            }
        ))
    }

    autoLogin () {
        if (!hasKey('userData')) {
            return of(false);
        }

        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(getString('userData'));

        const loadedUser = new User(
            userData.email,userData.id,
            userData._token, new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.isAuth) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            //this.router.navigate(['/challenges'], {clearHistory: true});
            return of(true);
        }

        return of(false);
    }

    autoLogout (expiryDuration: number) {
        this.tokenExpirationTimer = setTimeout(() =>
            this.logout,expiryDuration
        );
    }

    handleLogin(email: string, token: string, userId: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        setString('userData',JSON.stringify(user));
        this.autoLogout(user.timeToExpiry);
        this._user.next(user);
    }

    private handleError (errorMessage: string) {
        console.log(errorMessage)
        switch(errorMessage) {
            case 'EMAIL_EXISTS':
                alert('The email address already exists!');
            case 'INVALID_PASSWORD':
                alert('Your password is invalid!');
            default:
                alert('Authentication failed. Please check!');
        }
    }

    logout() {
        this._user.next(null);
        remove('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.router.navigate(['/auth'],{ clearHistory: true});
    }
}
