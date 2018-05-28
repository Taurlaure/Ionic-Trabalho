import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GeoAulaProvider } from '../../providers/geo-aula/geo-aula';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapa: any;
  latitude: any;
  longitude: any;
  latitudeDestino: 0;
  longitudeDestino: 0;
  enderecoPosicao: '';
  enderecoDestino: any =  '';

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public platform: Platform,
    public geoAulaProvider: GeoAulaProvider
  ) {
    console.log('construtor');

    platform.ready().then(() => {
      console.log('platform construtor')
      this.obterPosicao();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

   rota(){
    if (this.latitudeDestino !=0){
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay = new google.maps.DirectionsRenderer();


      let startPosition = new google.maps.LatLng(
          this.latitude,
          this.longitude
      );

      const mapOptions = {
        zoom:18,
        center: startPosition,
        disableDefaultUI: true
      };

      this.mapa = new google.maps.Map(document.getElementById('map'),
      mapOptions);
      directionsDisplay.setMap(this.mapa);

      const request = {
        origin: new google.maps.LatLng(this.latitude, this.longitude),
          destination: new google.maps.LatLng(this.latitudeDestino, this.longitudeDestino),
          travelMode: 'DRIVING'
      };
      console.log(request)

      directionsService.route(request, (result, status) => {
        console.log('status', status)
        if (status == 'OK') {
          console.log('result', result)
          directionsDisplay.setDirections(result);
        }
      });
    }
  }

  obterPosicao(): any {
    this.geolocation.getCurrentPosition()
    .then(res => {
      console.log(res);
      //this.latitude = res.coords.latitude;
      //this.longitude = res.coords.longitude;
      this.latitude = -18.5742094;
      this.longitude = -46.513054499999996;
      this.loadMap();
    })
    .catch((err) => {
      console.log(err);
      this.latitude = -18.5742094;
      this.longitude = -46.513054499999996;
      this.loadMap();
    })
  }

  loadMap() {
    let mapContainer = document.getElementById('map');
    this.mapa = new google.maps.Map(
      mapContainer,
      {
        center: new google.maps.LatLng(this.latitude, this.longitude), zoom: 14
      }
    );

    this.buscarEnderecoPorCoodernadas();

    let marcador = new google.maps.Marker({
      icon: 'assets/imgs/iconeAqui.png',
      map: this.mapa,
      position: new google.maps.LatLng(this.latitude, this.longitude)
    });

    if(this.latitude != 0) {
      var marcador2 = new google.maps.Marker({
        icon: 'assets/imgs/iconeAqui.png',
        map: this.mapa,
        position: new google.maps.LatLng(this.latitudeDestino, this.longitudeDestino)
      })
    }
    console.log(marcador2, marcador)
  }

  buscarEnderecoPorCoodernadas() {
    this.geoAulaProvider.buscarEndereco(this.latitude, this.loadMap)
      .then((result) => {
        this.enderecoPosicao = result;
      })
  }

  novolugar() {
    this.enderecoDestino = "rua Padre Caldeira, 231, Patos de Minas, MG";
    this.geoAulaProvider.buscarCoordenadas(this.enderecoDestino)
    .then(retorno => {
      this.latitudeDestino = retorno[0].geometry.location.lat();
      this.longitudeDestino = retorno[0].geometry.location.lng();
      this.loadMap();
    })
  }
}
