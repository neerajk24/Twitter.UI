import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 
 // constructor(){}
 ngOnInit(): void {
    
 }


loginForm: FormGroup;

constructor(private formBuilder: FormBuilder, private router: Router) {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}

login(): void {
  if (this.loginForm.invalid) {
    // Perform actions if the form is invalid (e.g., display error messages)
    return;
  }

  // Form is valid, proceed with the login process
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;

  

  // If login is successful, navigate to the home page
  this.router.navigate(['/home']);
}

openRegister(): void {
  // Perform actions for opening the registration page
}
}


