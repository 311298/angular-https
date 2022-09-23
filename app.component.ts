import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { post } from "./post.model";
import { PostService } from "./post.service";
import { throwError } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching: boolean = false;
  error = null;

  constructor(private http: HttpClient, private ps: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  // onCreatePost(postData: { title: string; content: string }) {
  onCreatePost(postData: post) {
    // Send Http request
    // console.log(postData);
    this.ps.createPosts(postData.title, postData.content).subscribe({
      next: (responseData) => {
        // console.log(responseData);
      },
    });
  }
  //post takes 2 arguments url and data
  //2 post request are send first one is option ( check whether allowed or not) and another request is we send body

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.ps.fetchPosts().subscribe({
      next: (responseData) => {
        this.loadedPosts = responseData;
        this.isFetching = false;
      },
      error: (e) => {
        console.log(e.error.error);
        this.error = e.message;
      },
    });
  }

  onClearPosts() {
    // Send Http request
    this.ps.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
