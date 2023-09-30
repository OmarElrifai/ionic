import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { recipes } from '../recipes';
import { AlertController } from '@ionic/angular';
import { RecipesPage } from '../recipes.page';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.page.html',
  styleUrls: ['./recipes-details.page.scss'],
})
export class RecipesDetailsPage implements OnInit {

  recipe?:recipes

  constructor(private activatedRoute:ActivatedRoute,
    private recipesService:RecipesService, 
    private router:Router, 
    private alertController:AlertController) { 
      this.activatedRoute.paramMap.subscribe(param =>{
        if(!param.has("recipeId")){
          this.recipe = {
            id : 0,
            imageUrl:"",
            ingrediants:[],
            title:""
          }
        }else{
          let id = param.get("recipeId");
          this.recipesService.getRecipeById(id).subscribe((recipe:any) =>{
            this.recipe = recipe;
          });
        }
        
      })
  }

  ngOnInit() {
    
  }

  alerta(id:any){
    const alert = this.alertController.create({
      header: 'Removal Confirmation',
      message: 'Are you sure you want to remove this recipe?',
      buttons: [{
        text:"Cancel",
        role:"cancel"
      },{
        text:"Delete",
        handler: ()=>{
          this.recipesService.removeRecipe(id);
          this.router.navigate(["/recipes"]);
        }
      }]
    }).then((alertEl)=>{alertEl.present()})

  }

}
