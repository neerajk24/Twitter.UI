import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  baseURL:string ;
  userData:UserData;
  userid:any;
  ngOnInit(): void {
    this.baseURL = window.sessionStorage.getItem('baseURL');
    this.userid = window.sessionStorage.getItem("id");
    this.getUserData()
  }

  searchQuery: string;
  showSearchHint: boolean = false;
  enableEdit:boolean = false;

  registerForm: FormGroup;
  error:string = null;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public homeService: HomeService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  updateUserdata(): void {
    if (this.registerForm.invalid) {
      // Perform actions if the form is invalid (e.g., display error messages)
      return;
    }

    // Form is valid, proceed with the register process
    const name = this.registerForm.value.name;
    const bio = this.registerForm.value.bio;

    // Your API URL for the register endpoint
    const apiUrl = `${this.baseURL}User/${this.userid}`;

    // Create the request body
    const requestBody = {
      name : name,
      bio : bio,
      profilePicture : "test"
    };

    // Set the headers (if required by your API)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    // Make the HTTP POST request
    this.http.put(apiUrl, requestBody, { headers: headers }).subscribe(
      (response: any) => {
        console.log('register successful!', response);
        // this.router.navigate(['/']);
        this.getUserData();
        this.enableEdit = false;
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

  getUserData(){
    let apiURL = `${this.baseURL}User/${this.userid}`
    return this.homeService.getRequest(apiURL).subscribe((res:UserData)=>{
      if(res){
        this.userData = res
        console.log(this.userData);
      }
    },
    (error)=>{
      console.log(error);

    })
  }

  updateEdit(val:boolean){
    this.enableEdit = val;
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

interface UserData{
  Id: number;
  Bio: string;
  Email: String;
  FollowersCount:number;
  Following:[string];
  Name: string;
  ProfilePicture: String;
  Tweets: []
}

