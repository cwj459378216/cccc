import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RequestService {


    constructor(private http: HttpClient) {
    }

    public get(api: string, options?: {}): Observable<any> {
        return this.http.get(encodeURI(this.getBaseUrl() + api), options)
            .pipe(
                delay(100),
                map((data: any) => (data.data || data)),
                catchError(this.handleError)
            );
    }

    public put(api: string, data?: any): Observable<any> {
        return this.http.put(this.getBaseUrl() + api, data)
            .pipe(
                delay(100),
                map((data: any) => (data.data || data)),
                catchError(this.handleError)
            );
    }

    public post(api: string, data?: any, head?: any): Observable<any> {
        return this.http.post(this.getBaseUrl() + api, data, head)
            .pipe(
                delay(100),
                map((data: any) => (data.data || data)),
                catchError(this.handleError)
            );
    }

    public delete(api: string): Observable<any> {
        return this.http.delete(this.getBaseUrl() + api)
            .pipe(
                delay(100),
                map((data: any) => (data.data || data)),
                catchError(this.handleError)
            );
    }

    // public getBaseUrl(): string {
    //   return environment.request.protocol + '://' + environment.request.url +
    //     (environment.request.port ? ':' + environment.request.port : '') + '/';
    // }

    public getBaseUrl(): string {
        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api';
    }

    public getWSSUrl(): string {
        return 'wss://' + location.hostname + (location.port ? ':' + location.port : '') + '/wss';
    }

    public getBaseUrlWs(): string {
        return location.hostname + `:8009`;
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error(errMsg);
        return throwError(errMsg);
    }

    // old
    // private handResults(data){
    //   console.log(typeof data);
    //   console.log(data);
    //   if(data.data){
    //     return data.data;
    //   }else {
    //     if(!data.msg || data.code == 19 || data.code == 25 || data.code == 26){
    //       return data;
    //     }
    //     this.isShowPrompt[0].title = "Information";
    //     this.isShowPrompt[0].type = 3;
    //     this.isShowPrompt[0].show = true;
    //     this.isShowPrompt[0].content = data.msg;
    //     return data;
    //   }
    // }
    public getOriginData(api: string, options?: {}): Observable<any> {
        return this.http.get(this.getBaseUrl() + api, options)
            .pipe(
                delay(100),
                map((data: any) => (data)),
                catchError(this.handleError)
            );
    }

    public postOriginData(api: string, data?: any): Observable<any> {
        return this.http.post(this.getBaseUrl() + api, data)
            .pipe(
                delay(100),
                map((data: any) => (data)),
                catchError(this.handleError)
            );
    }

    public putOriginData(api: string, data?: any): Observable<any> {
        return this.http.put(this.getBaseUrl() + api, data)
            .pipe(
                delay(100),
                map((data: any) => (data)),
                catchError(this.handleError)
            );
    }

    public deleteOriginData(api: string, data?: any): Observable<any> {
        return this.http.delete(this.getBaseUrl() + api, data)
            .pipe(
                delay(100),
                map((data: any) => (data)),
                catchError(this.handleError)
            );
    }
}
