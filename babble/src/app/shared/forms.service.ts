import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../validators/username-validator';
import { PasswordValidator } from '../validators/password-validator';
import { MessageValidator } from '../validators/message-validator';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  createLoginForm(): FormGroup {
		return new FormBuilder().group({
			username: new UsernameValidator(),
			password: new PasswordValidator()
		});
	}

	createRegistrationForm(): FormGroup {
		return new FormBuilder().group({
			userName: new UsernameValidator(),
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			countryName: ['', Validators.required],
			alpha2Code: ['', Validators.required],
			callingCode: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			currency: ['', Validators.required],
			timeZone: ['', Validators.required],	
			password: new PasswordValidator(),

		});
	}

	createMessageForm(): FormGroup {
		return new FormBuilder().group({
			message: new MessageValidator
		});
	}
}
