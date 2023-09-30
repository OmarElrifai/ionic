import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, SelectChangeEventDetail, SelectCustomEvent } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Location, Locations } from '../../interfaces/location';
import { MarkerEl } from '../../interfaces/marker';
import { RecipesService } from 'src/app/recipes/recipes.service';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent  implements OnInit ,AfterViewInit{

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
      lng: location?.lng || 0,
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

//ko
  closeModal(){
    this.modalCtrl.dismiss();
  }

  // getGoogleMap() : Promise<any>{
  //   const win = window as any;
  //   const googleModule = win.google;
  //   const maps = googleModule.maps
  //   if(googleModule && maps ){
  //     return Promise.resolve(maps)
  //   }
  //   return new Promise((resolve, reject)=>{
  //     let script = document.createElement("script");
  //     script.innerHTML="(g=>{var h,a,k,p='The Google Maps JavaScript API',c='google',l='importLibrary',q='__ib__',m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement('script'));e.set('libraries',[...r]+'');for(k in g)e.set(k.replace(/[A-Z]/g,t=>'_'+t[0].toLowerCase()),g[k]);e.set('callback',c+'.maps.'+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+' could not load.'));a.nonce=m.querySelector('script[nonce]')?.nonce||'';m.head.append(a)}));d[l]?console.warn(p+' only loads once. Ignoring:',g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key: 'AIzaSyBmlWKzWD_Nt7toxn8LKx-kZBzmYR5p5-A', v: 'beta'});"
  //     script.defer=true;
  //     script.async = true
  //     document.body.append(script);

  //     script.onload = async ()=>{
  //       // const loadedGoogleModule = win.google;
  //       // const loadedMaps = loadedGoogleModule.maps;
  //       const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  //       if(loadedGoogleModule && loadedMaps){
  //         resolve(maps);
          
  //       }
        
  //     }
  //   })
    
  // }
}
