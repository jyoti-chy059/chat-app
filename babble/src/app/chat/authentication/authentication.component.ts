import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { ChatService } from '../../shared/chat.service';
import { FormsService } from '../../shared/forms.service';
import { Auth } from '../../interface/auth';
import { UsernameAvailable } from '../../interface/username-available';
import { Country } from '../../interface/country';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    public setTabPosition = 'center';
	public overlayDisplay = false;
	public isuserNameAvailable = false;
    public loginError = false;
    public countryInfo: Country[] = null;
    @Input('index') countryIndex: ElementRef;
	private loginForm: FormGroup;
	private registrationForm: FormGroup;

  constructor(private router: Router,
              private chatService: ChatService,
              private formsService: FormsService
            ) { 
              this.registrationForm = this.formsService.createRegistrationForm();
              this.loginForm = this.formsService.createLoginForm();
            }

  ngOnInit() {
        this.chatService.getCountryInfo().subscribe(
            data=>{
                this.countryInfo = data;
            }
        )
            
  }
  changeCity(e){
    let value = e.target.value;
    let index = (value.match(/\d+/g).map(Number)).toString();
   // let index = countryIndex.toString();
    this.registrationForm.patchValue({
        alpha2Code: this.countryInfo[index].alpha2Code,
        callingCode: this.countryInfo[index].callingCodes,
        currency: this.countryInfo[index].currencies[0].code,
        timeZone: this.countryInfo[index].timezones
    })
  }

  register(): void {
    if (this.registrationForm.valid) {
        this.overlayDisplay = false;
        this.chatService.register(this.registrationForm.value).subscribe(
            (response: Auth) => {
                localStorage.setItem('userid', response.userId);
                this.router.navigate(['/chat/home']);
            },
            (error) => {
                this.overlayDisplay = true;
                /* Uncomment it, Incase if you like to reset the Login Form. */
                // this.registrationForm.reset();
                alert('Something bad happened; please try again later.');
            }
        );
    }
}

login(): void {
  if (this.loginForm.valid) {
      this.overlayDisplay = true;
      this.chatService.login(this.loginForm.value).subscribe(
          (response: Auth) => {
              this.overlayDisplay = false;
              localStorage.setItem('userid', response.userId);
              localStorage.setItem('userName', response.userName);
              localStorage.setItem('firstName', response.firstName);
              localStorage.setItem('lastName', response.lastName);
              localStorage.setItem('countryName', response.countryName);
              this.router.navigate(['/chat/home']);
          },
          (error) => {
              /* Uncomment it, Incase if you like to reset the Login Form. */
              // this.loginForm.reset();
              this.overlayDisplay = false;
              this.loginError =  true;
          }
      );
  }
}

getUsernameSuggestion(): void {
  this.registrationForm.controls['username'].valueChanges
  .pipe(
      map((term) => {
          this.isuserNameAvailable = false;
          return term;
      })
  )
  .pipe(
      debounceTime(800),
      distinctUntilChanged()
  )
  .subscribe((term: string) => {
      if (term !== '') {
          this.overlayDisplay = true;
          this.chatService.usernameAvailable(term).subscribe((response: UsernameAvailable) => {
              this.overlayDisplay = false;
              if (response.error) {
                  this.isuserNameAvailable = true;
              } else {
                  this.isuserNameAvailable = false;
              }
          });
      }
  });
}

}
