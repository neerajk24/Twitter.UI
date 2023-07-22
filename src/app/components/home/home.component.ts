import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,public homeService:HomeService ) {
  //  console.log(window.sessionStorage);

  }

  searchQuery: string;
  showSearchHint: boolean = false;

  userProfilePhoto = 'assets/profile.jpg';
  tweetMessage = '';
  tweets: Tweet[] = [];
  baseURL:string ;
  userid:string ;
  username:string = "Test User";
  showComment= false;
  showCommentid:string;




  ngOnInit(): void {
    this.baseURL = window.sessionStorage.getItem('baseURL')
    this.userid = window.sessionStorage.getItem("id")
    if(this.userid){
      this.getFeeds()
      // this.getUsername()
    }else{
      this.router.navigate(['/'])
    }
  }

  getFeeds(){
    let userId = window.sessionStorage.getItem("id")
    const apiUrl = `${this.baseURL}Feed/${userId}`;

  // Make the HTTP POST request
  this.homeService.getRequest(apiUrl).subscribe(
    (response:Tweet[]) => {
      console.log('Login successful!', response);
      this.tweets = response;

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
      const newTweet: Tweet = {...new Tweet(),
        content: this.tweetMessage,
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

  getUsername(){
    let apiURL = `${window.sessionStorage.getItem('baseURL')}User/${this.userid}`
    return this.homeService.getRequest(apiURL).subscribe((res:any)=>{
      if(res){
        this.username = res.name
        console.log(this.username);
      }
    },
    (error)=>{
      console.log(error);

    })
  }

  toggleComment(getid){
    if(!this.showComment){
      this.showComment = !this.showComment
      this.showCommentid = getid;
      return
    }
    if(this.showCommentid !=null && getid != null && this.showCommentid != getid){
      this.showCommentid = getid
      return
    }

    this.showComment = !this.showComment
    this.showCommentid = getid;
  }
}

// interface Tweet {
//   username: string;
//   handle: string;
//   message: string;
//   image: string;
//   likes: number;
//   comments: string[];
// }

class Tweet {
  id: number;
  content: string;
  timestamp: string;
  likes: number;
  comments : string[];
  video : string;
  image:string;

}





