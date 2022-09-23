import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  array2BPushed: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);

    this.http
      .post(
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
    this.http
      .get(
        "https://https-3581e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
      )
      .pipe(
        map((data) => {
          console.log("data before transform ->", data);
          console.log("key from data", Object.keys(data));
          const postArray = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              console.log("key of the object(data) -> ", key);
              postArray.push({ ...data[key], id: key });
            }
          }
          return postArray;
        })
      )
      .subscribe((post) => {
        console.log("posts we fetched -> ", post);
        console.log("loaded posts -> ", this.loadedPosts);
      });
  }
}
// fetch post methods need to be called inside the fetch method and also inside the ngOnint life cycle hook
// it also need to subscibe in order to work
