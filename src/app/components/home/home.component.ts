import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

 
  searchQuery: string;
  showSearchHint: boolean = false;

  userProfilePhoto = 'assets/profile.jpg';
  tweetMessage = '';
  tweets: Tweet[] = [];



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


