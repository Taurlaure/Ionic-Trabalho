import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Disciplina } from './../../model/Disciplina';

@IonicPage()
@Component({
  selector: 'page-listar',
  templateUrl: 'listar.html',
})
export class ListarPage {

  usuario: string;
  url: string = "http://ws.unipam.edu.br/servicoportalaula/api/portalaluno/alunodisciplina";
  urlPost: string = "http://ws.unipam.edu.br/servicoportalaula/api/portalaluno/alunodisciplinapost";

  DisciplinasAluno: Array<Disciplina>;
  DisciplinasAlunoPost: Array<Disciplina>;
  retorno: any;
  retornoPost: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.usuario = this.navParams.get('matricula');
    let urlGet = this.url + '?Matricula=' + this.usuario;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    this.http.get(urlGet, options)
    .map(res => res.json())
    .subscribe(data => {
      this.retorno = data.DisciplinasAluno;
      this.DisciplinasAluno = new Array<Disciplina>();

      for(let i = 0; i < this.retorno.length ; i++) {
        var disciplina = new Disciplina();

        disciplina.$CodTurma = this.retorno[i].CodTurma.toString();
        disciplina.$Disciplina = this.retorno[i].Disciplina.toString();
        disciplina.$Matricula = this.retorno[i].Matricula.toString();
        disciplina.$Nome = this.retorno[i].Nome.toString();

        this.DisciplinasAluno.length = this.DisciplinasAluno.length + 1;
        this.DisciplinasAluno[i] = disciplina;
      }
    },
    error => {
      console.log("Erro Get:");
      console.log(error)
    });
    console.log('fim');
  }

  ionViewDidLoad() {
  }

}
