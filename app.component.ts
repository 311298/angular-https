import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { post } from "./post.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  // onCreatePost(postData: { title: string; content: string }) {
  onCreatePost(postData: post) {
    // Send Http request
    console.log(postData);

    this.http
      .post<{ name: string }>(
        // here were are passing string not form object, it is firebase special key
        "https://https-3581e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log("response data we sent -> ", responseData);
      });
  }
  //post takes 2 arguments url and data
  //2 post request are send first one is option ( check whether allowed or not) and another request is we send body

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: post }>(
        "https://https-3581e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
      )
      .pipe(
        // map((responseData: { [key: string]: post }) => {
        //instead of defining inside the reponseData we can define it inside the https methods
        map((responseData) => {
          console.log("data before transform ->", responseData);
          console.log("key from data", Object.keys(responseData));
          const postArray: post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              console.log("key of the object(data) -> ", key);
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        })
      )
      .subscribe((post) => {
        this.isFetching = false;
        console.log("posts we fetched -> ", post);
        this.loadedPosts = post;
      });
  }
}
// fetch post methods need to be called inside the fetch method and also inside the ngOnint life cycle hook
// it also need to subscibe in order to work
// while using the pipe, it is necessary to use the return function so that subscribe get some data to work on
