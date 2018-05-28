import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public retorno: any;
  public formato: any;
  
  constructor(public navCtrl: NavController, public barCode: BarcodeScanner, public alertCtrl: AlertController) {

  }

  lerCodBarra(){
    this.barCode.scan({
      "prompt": "Posicione a leitura no codigo de barra",
      "orientation": "landscape"
    }).then((res)=>{
      this.retorno = res.text
      this.formato = res.format
    }).catch((err)=>{
      this.alerta('ERRO AO ABRIR CODIGO DE BARRA', 'ERRO!')
    })
  }

  alerta(mensagem : string, cabec : string){ 
    let alert = this.alertCtrl.create({
      title: cabec,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }
}
