import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("request is on the way -> ");
    const modifiedrequerst = req.clone({
      headers: req.headers.append("auth", "xyz"),
    });
    // return next.handle(req);
    return next.handle(modifiedrequerst);
  }
}

// what is does?
//answer -> earlier we used to set header for each http methods separaterly but now with the help of interceptors we can set same header to each https methods.
