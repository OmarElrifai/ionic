import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { recipes } from './recipes';
import { RecipesService } from './recipes.service';
import { AlertController, IonItemSliding, ModalController, SegmentCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Location, Locations } from '../shared/interfaces/location';
import { MarkerEl } from '../shared/interfaces/marker';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  // recipes?: recipes[];

  // constructor(private recipesService: RecipesService) {}

  constructor(private modalCtrl: ModalController, private renderer: Renderer2  ,private recipesService:RecipesService) { }
  @ViewChild('map') mapEl!: ElementRef;
  // map!: google.maps.Map;

  public map?: GoogleMap;

  public heading?: string ;

  public description?: string ;

  // public locationOptions = {
  //   header: 'Asia',
  //   subHeader: 'Select a country from the list',
  //   message: 'There\'s only three :)',
  //   translucent: true,
  // };

  private markers: Array<MarkerEl>|any = [] ;

  private ids: Array<string> = [];

  locations: Location[]=this.recipesService.locations;


  ngOnInit() {
    // this.getGoogleMap()
  }

  
  
  ngAfterViewInit(): void {
  
    this.createMap();
  }

  ionViewDidEnter() {
    
  }

  ngOnDestroy() {
    this.map?.removeAllMapListeners();
    this.map?.destroy();
    this.map = undefined;
  }

  private async createMap(): Promise<void> {
    this.map = await GoogleMap.create({
      id: 'google-map',
      element: this.mapEl.nativeElement,
      apiKey: environment.keys.googleMaps,
      forceCreate: true,
      config: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 16
      },
    });
    this.map?.enableCurrentLocation(true)
}
  async updateLocation (e:  any){
  console.log(e.detail.value);
  const location = this.recipesService.locations.find((location)=>{return location.country == e.detail.value});
  // let count
  this.markers = location?.locations.map((location:any,index: number) => ({
    coordinate: {
      lat: location.lat,
      lng: location.lng
    },
    title: location.name,
    snippet: location.description
  }));


  this.map?.setCamera({
    coordinate: {
      lat: location?.lat || 0,
      lng: location?.lng || 0
        },
    zoom: 10
  });

  

  this.ids = await this.map?.addMarkers(this.markers) || [];

  this.markers.map((marker:any,index:any)=>{
    marker.id = this.ids[index]
  })
  await this.map?.setOnMarkerClickListener((event) => {
    const summary = this.markers.map((marker:any)=>{
      return marker.id == event.markerId ? marker : null;
    })

    console.log(summary);
  });

}
}
