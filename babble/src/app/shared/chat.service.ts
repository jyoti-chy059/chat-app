import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UsernameAvailable } from '../interface/username-available';
import { AuthRequest } from '../interface/auth-request';
import { Auth } from '../interface/auth';
import { UserSessionCheck } from '../interface/user-session-check';
import { MessageRequest } from '../interface/message-request';
import { MessagesResponse } from '../interface/messages-response';
import { Country } from '../interface/country';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private BASE_URL = environment.apiUrl;
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(
		private http: HttpClient,
		public router: Router
	) { }

	getUserId(): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				resolve(localStorage.getItem('userid'));
			} catch (error) {
				reject(error);
			}
		});
	}

	removeLS(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				localStorage.removeItem('userid');
				localStorage.removeItem('username');
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}

	usernameAvailable(params: String): Observable<UsernameAvailable> {
		return this.http.post(`${this.BASE_URL}usernameAvailable`, JSON.stringify({ username: params }), this.httpOptions).pipe(
			map(
				(response: UsernameAvailable) => {
					return response;
				},
				(error) => {
					throw error;
				}
			)
		);
	}

	login(params: AuthRequest): Observable<Auth> {
		console.log(`${this.BASE_URL}login`);
		console.log(JSON.stringify(params));
		console.log(this.httpOptions);
		return this.http.post(`${this.BASE_URL}login`, JSON.stringify(params), this.httpOptions).pipe(
			map(
				(response: Auth) => {
					console.log(response);
					return response;
				},
				(error) => {
					throw error;
				}
			)
		);
	}

	register(params: AuthRequest): Observable<Auth> {
		console.log(`${this.BASE_URL}register`);
		console.log(JSON.stringify(params));
		console.log(this.httpOptions);
		return this.http.post(`${this.BASE_URL}register`, JSON.stringify(params), this.httpOptions).pipe(
			map(
				(response: Auth) => {
					return response;
				},
				(error) => {
					throw error;
				}
			)
		);
	}

	userSessionCheck(): Observable<boolean> {
		const userId = localStorage.getItem('userid');
		return new Observable(observer => {
			if (userId !== null && userId !== undefined) {
				this.http.post(`${this.BASE_URL}userSessionCheck`, JSON.stringify({ userId: userId }), this.httpOptions)
				.subscribe(
					(response: UserSessionCheck) => {
						if (response.error) {
							this.router.navigate(['/']);
							return false;
						}
						localStorage.setItem('username', response.username);
						observer.next(true);
					}, (error) => {
						this.router.navigate(['/']);
						observer.next(false);
					});
			} else {
				//this.router.navigate(['/']);
				observer.next(true);
			}
		});
	}

	getMessages(params: MessageRequest): Observable<MessagesResponse> {
		return this.http.post(`${this.BASE_URL}getMessages`, JSON.stringify(params), this.httpOptions).pipe(
			map(
				(response: MessagesResponse) => {
					return response;
				},
				(error) => {
					throw error;
				}
			)
		);
	}

	getCountryInfo(){
		return this.http.get<Country[]>('https://restcountries.eu/rest/v2/all').pipe(
			map(
				(response) =>{
					return response;
				},
				(error) => {
					throw error;
				}
			)
		)
	}
}
