import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { recipes } from './recipes';
import { RecipesService } from './recipes.service';
import { AlertController, IonItemSliding, SegmentCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  // recipes?: recipes[];

  // constructor(private recipesService: RecipesService) {}

  // ngOnInit() {
  //   this.recipes = this.recipesService.getAllRecipes();
  //   console.log("loaded",this.recipes)
  // }



  recipes?: recipes[];
  count = 10;

  constructor(private recipesService:RecipesService, private router:Router, private alertController:AlertController) {

  }


  ngOnInit() {
      
  }

  ionViewWillEnter(){
    this.recipesService.getRecipes().subscribe( (recipes:any) =>{
      this.recipes = recipes;
      console.log(recipes)
    });
  }

  segmentChange(segmentChange:any){
    console.log("segment value: ",segmentChange.detail)
  }

  async removeItem(id:number) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: [{
        text:'Confirm',
        role:'confirm',
        handler:()=>{
          this.recipesService.removeRecipe(id);
          this.router.navigate(["/recipes"]);
          this.recipesService.getRecipes().subscribe( (recipes:any) =>{
            this.recipes = recipes;
            console.log(recipes)
          });
        }
      },{
        text:'Cancel',
        role:'cancel'
      }],
    });

    await alert.present();
  }
  loadRecipes(){

  }

  onSlide(id:number,slidingEvent:IonItemSliding){
    slidingEvent.close();
    this.router.navigate(['/recipes/',id])
  }
  consoleLog(x:any){
    console.log(x)
  }

}
