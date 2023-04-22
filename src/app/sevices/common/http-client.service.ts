import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(requestParameters: RequestParameters) {
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
    }

  get<T>(requestParameters: RequestParameters, id?: string): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
    url =`${this.url(requestParameters).trim()}${id?`/${id}`:""}${requestParameters.queryString?`?${requestParameters.queryString}`:""}`;  
    return this.httpClient.get<T>(url,{ headers: requestParameters.headers ,responseType:requestParameters.responseType as 'json'});
  }

  post<T>(requestParameters: RequestParameters, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
      url =` ${this.url(requestParameters)}${requestParameters.queryString?`?${requestParameters.queryString}`:""}`;
    return this.httpClient.post<T>(url, body, { headers: requestParameters.headers ,responseType:requestParameters.responseType as 'json'});
  }

  put<T>(requestParameters: RequestParameters, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint
    else
      url = ` ${this.url(requestParameters)}${requestParameters.queryString?`?${requestParameters.queryString}`:""}`;
    return this.httpClient.put<T>(url, body, { headers: requestParameters.headers,responseType:requestParameters.responseType as 'json' });
  }
  delete<T>(requestParameters: RequestParameters, id: string):Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
      url =`${this.url(requestParameters).trim()}/${id}${requestParameters.queryString?`?${requestParameters.queryString}`:""}`;
    return this.httpClient.delete<T>(url, { headers: requestParameters.headers ,responseType:requestParameters.responseType as 'json'});
  }

}
export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?:string;
  fullEndPoint?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  responseType?:string='json'
}