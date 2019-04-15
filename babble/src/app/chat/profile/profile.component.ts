import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { Location } from '../../../../node_modules/@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    userName: [''],
    firstName: [''],
    lastName: [''],
    country: [''],
  })

  constructor(private fb: FormBuilder, private location: Location) { }

  ngOnInit() {
    this.profileForm.setValue({
      userName: localStorage.getItem('userName'), 
      firstName: localStorage.getItem('firstName'), 
      lastName: localStorage.getItem('lastName'), 
      country: localStorage.getItem('countryName'), 

    });
  }

  goBack(){
    this.location.back();
  }

}
