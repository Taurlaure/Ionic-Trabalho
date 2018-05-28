import { Component } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {EmailComposer} from '@ionic-native/email-composer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fotoBase64 : any;
  fotoDiretorio: any;

  constructor(public navCtrl: NavController,
     private alertCtrl : AlertController,
     private camera: Camera,
     private emailComposer: EmailComposer
    ) {

  }

  enviarEmail(){

    if (this.fotoDiretorio)
    {
      let email = {
        to: 'wiliangs@unipam.edu.br',
        attachments: [ this.fotoDiretorio ],
        subject: 'Foto Anexa',
        body: ' A foto segue anexa',
        isHtml: true
      };
      this.emailComposer.open(email);
    }
    else {
      this.alerta("Favor tirar uma foto que está no diretorio", "Atenção");
    }
  }

  tirarFotoBase64() {
    let cameraOptions : CameraOptions = {
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth:800,
      targetHeight:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      saveToPhotoAlbum:true
      }
      this.camera.getPicture(cameraOptions)
      .then((imageData) => {
        this.fotoBase64 = "data:image/jpeg;base64," + imageData;
      })
      .catch((err) => {
        console.log(err);
        this.alerta(err.toString(), "Atenção");
      })

  }

  tirarFotoDiretorio(){
    let cameraOptions : CameraOptions = {
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth:800,
      targetHeight:600,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      saveToPhotoAlbum:true
    }
    this.camera.getPicture(cameraOptions)
    .then((imageData)=> {
      this.fotoDiretorio = imageData;
    }).catch((err)=> {
      console.log(err);
      this.alerta(err.toString(), "Atenção");
    })
  }

  alerta(mensagem, titulo)
  {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

}
