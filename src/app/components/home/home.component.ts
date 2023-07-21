import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
   console.log(window.sessionStorage);

  }

  searchQuery: string;
  showSearchHint: boolean = false;

  userProfilePhoto = 'assets/profile.jpg';
  tweetMessage = '';
  tweets: Tweet[] = [];

  ngOnInit(): void {
    let userid = window.sessionStorage.getItem("id")
    if(userid){
      this.getFeeds()
    }else{
      this.router.navigate(['/'])
    }
  }

  getFeeds(){
    let userId = window.sessionStorage.getItem('id')
    let token = window.sessionStorage.getItem('token')
    const apiUrl = `https://localhost:44327/api/Feed/${userId}`;
  // Set the headers (if required by your API)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*',
    'Authorization' :`Bearer ${token}`
  });

  // Make the HTTP POST request
  this.http.get(apiUrl, { headers: headers }).subscribe(
    (response: any) => {
      console.log('Login successful!', response);
      // set your feed to varible here


      this.router.navigate(['/home']);
    },
    (error: any) => {
      // Handle errors if the login fails
      console.error('Login failed!', error);
      // Perform any other error handling actions
    }
  );

  }


  toggleSearchHint(): void {
    this.showSearchHint = !this.showSearchHint;
  }


  postTweet() {
    if (this.tweetMessage) {
      const newTweet: Tweet = {
        username: 'Shweta Kale',
        handle: 'shweta',
        message: this.tweetMessage,
        image: 'https://images.unsplash.com/your-image-url',
        likes: 0,
       comments: []
      };

      this.tweets.unshift(newTweet);
      this.tweetMessage = '';
    }
  }

  likePost(tweet: any) {

    tweet.likes++;
  }

  promptComment(tweet: any) {
    const comment = prompt('Enter your comment:');
    if (comment) {
      tweet.comments.push(comment);
    }
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


