import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  baseURL:string ;
  ngOnInit(): void {
   this.baseURL = window.sessionStorage.getItem('baseURL')

 }


registerForm: FormGroup;
error:string = null;
constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
  this.registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required]
  });
}

register(): void {
  if (this.registerForm.invalid) {
    // Perform actions if the form is invalid (e.g., display error messages)
    return;
  }

  // Form is valid, proceed with the register process
  const name = this.registerForm.value.name;
  const email = this.registerForm.value.email;
  const password = this.registerForm.value.password;
  const confirmpassword = this.registerForm.value.confirmpassword;

  if(password !== confirmpassword){
    this.error = "Password not Match"
    return
  }

  // Your API URL for the register endpoint
  const apiUrl = `${this.baseURL}User/signup`;

  // Create the request body
  const requestBody = {
    name : name,
    email: email,
    password: password
  };

  // Set the headers (if required by your API)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  });

  // Make the HTTP POST request
  this.http.post(apiUrl, requestBody, { headers: headers }).subscribe(
    (response: any) => {
      console.log('register successful!', response);
      this.router.navigate(['/']);
    },
    (error: any) => {
      // Handle errors if the register fails
      console.error('register failed!', error);
      if(error.status == 200){
        this.router.navigate(['/']);
      }
      // Perform any other error handling actions
    }
  );
}

openLogin(): void {
  this.router.navigate(['/']);
}

}

interface Tweet {
  username: string;
  handle: string;
  message: string;
  image: string;
  likes: number;
  comments: string[];
}


