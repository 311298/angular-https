import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}

  createPosts(title: string, content: string) {
    const postData = { title: title, content: content };
    return this.http.post<{ name: string }>(
      // here were are passing string not form object, it is firebase special key
      "https://https-3581e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
      postData,
      {
        observe: "response",
      }
    );
    //   .subscribe((responseData) => {
    //     console.log("response data we sent -> ", responseData);
    //   });
  }

  deletePosts() {
    return this.http.delete(
      "https://https-3581e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
      {
        observe: "events",
      }
    );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: post }>(
        "https://https-3581e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
        {
          headers: new HttpHeaders({
            "cusotm-header": "hello",
          }),
          params: new HttpParams().set("print", "pretty"),
          responseType: "json",
        }
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
        }),
        catchError((error) => {
          throw error;
        })
      );
    //   .subscribe((post) => {
    //     // this.isFetching = false;
    //     console.log("posts we fetched -> ", post);
    //     // this.loadedPosts = post;
    //   });
  }
}

// fetch post methods need to be called inside the fetch method and also inside the ngOnint life cycle hook
// it also need to subscibe in order to work
// while using the pipe, it is necessary to use the return function so that subscribe get some data to work on
//httpParams upon created new to appended with new key value pair but it is immutable
//params:customParams(variable)
// const customParams= new httpparams()
//cutomParams=customParam.append('print','pretty')
