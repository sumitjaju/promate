import { CanLoad } from "@angular/router";
import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { take, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService, private router: RouterExtensions) {}

    canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
        //throw new Error("Method not implemented.");
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.token) {
                    return this.authService.autoLogin();
                }
                return of(true);
            }),
            tap(isAuth => {
                if(!isAuth) {
                    this.router.navigate(['/auth']);
                }
            })

        )
    }
}
