import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {

  urlGetDisciplinas: string = "http://ws.unipam.edu.br/servicoportalaula/api/portalaluno/alunodisciplina";
  urlPost: string = "http://ws.unipam.edu.br/servicoportalaula/api/portalaluno/alunodisciplinapost";
  headers:any;
  options:any;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
  }

  getDisciplinas(usuario:string): Observable<any> {
    let url = this.urlGetDisciplinas + '?Matricula='+ usuario;
    return this.http.get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDisciplinasPost(usuario:string): Observable<any> {
    let data = JSON.stringify({
      'Matricula': usuario
    });
    return this.http.post(this.urlPost, data, this.options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}` 
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
