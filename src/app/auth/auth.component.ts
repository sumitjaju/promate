import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TextField } from 'tns-core-modules/ui/text-field'
import { AuthService } from "./auth.service";
//import { alert, action } from 'tns-core-modules/ui/dialogs';

@Component ({
    selector: 'ns-auth',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.component.css'],
    moduleId:module.id
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordCntrlIsValid = true;
    isLogin = true;
    isLoading = false;
    @ViewChild('passwordEl', {static: false}) passwordEl : ElementRef<TextField>;

    constructor (private router: RouterExtensions, private authService: AuthService){}
    ngOnInit() {

        this.form = new FormGroup({
            email:new FormControl(null,{updateOn: 'blur', validators: [Validators.required, Validators.email]}),
            password: new FormControl (null, {updateOn: 'blur', validators: [Validators.required, Validators.minLength(6)]})
        })
        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        })
        this.form.get('password').statusChanges.subscribe(status => {
            this.passwordCntrlIsValid = status === 'VALID';
        })
    }

    // onSignIn() {
    //     this.router.navigate(['/today'], { clearHistory: true });
    // }

    onDone() {
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    onSubmit(){
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        if (!this.form.valid) {
            return;
        }
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        this.form.reset();
        this.emailControlIsValid = true;
        this.passwordCntrlIsValid = true;
        this.isLoading = true;
        if (this.isLogin) {
            this.authService.login(email, password).subscribe (
                resData => {
                    this.isLoading = false;
                    this.router.navigate(['/challenges'],{ clearHistory: true });
                },
                err => {
                    console.log(err);
                    this.isLoading = false;
                }
            );
            //this.router.navigate(['/challenges'], { clearHistory: true });
        } else {
            this.authService.signUp(email, password).subscribe(
                resData => {
                    this.isLoading = false;
                    this.router.navigate(['/challenges'],{ clearHistory: true });
                },
                err => {
                    console.log(err);
                    this.isLoading = false;
                }
            );
        }
    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }
}
