import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  erroTela: any = '';
  retorno1: any = '';
  retorno2: any = '';
  retorno3: any = '';
  nativeURL: any = '';
  conteudoArquivo: any = '';

  public textoDoArquivo: any = ''
  public conteudoArquivoUpdate: any = ''

  retorno4: any = '';

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private file: File,
    private emailComposer: EmailComposer) {

  }

  alerta(mensagem: string, cabec: string) {

    let alert = this.alertCtrl.create({
      title: cabec,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  criarArquivo() {

    let path = this.file.dataDirectory;
    let arquivo = 'teste.txt';

    this.file.createFile(path, arquivo, true)
      .then((ok) => {
        console.log(ok)
        this.alerta("Criado com sucesso", "Atenção");
      })
      .catch((err) => {
        console.log(err);
        this.alerta("Erro criar" + JSON.stringify(err), "Atenção");
      });
  }

  lerArquivo() {
    let path = this.file.dataDirectory;
    let arquivo = 'teste.txt';

    this.file.readAsText(path, arquivo)
      .then((ok) => {
        console.log(ok)
        this.conteudoArquivo = JSON.stringify(ok);
      })
      .catch((err) => this.alerta("erro leitura" + JSON.stringify(err), "Atenção"));
  }

  escreverNoArquivo() {
    let path = this.file.dataDirectory;
    let arquivo = 'teste.txt';

    this.file.writeFile(path, arquivo, this.textoDoArquivo, { replace: true }).then((res) => {
      console.log(res)
      this.conteudoArquivoUpdate = JSON.stringify(res)
    })
      .catch((err) => this.alerta("erro escrever" + JSON.stringify(err), "Atenção"));
  }

  deletarArquivo() {

    let path = this.file.dataDirectory;
    let arquivo = 'teste.txt';

    this.file.removeFile(path, arquivo).then((res) => {
      console.log(res)
      this.alerta("Deletado com sucesso", "Atenção");
    })
      .catch((err) => this.alerta("erro ao deletar" + JSON.stringify(err), "Atenção"));
  }
}
