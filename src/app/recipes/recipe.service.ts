import { Injectable } from '@angular/core';


import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
recipesChanged = new Subject<Recipe[]>();


    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome!',
    //         'https://steemitimages.com/640x0/https://img.esteem.ws/5udznlq7j8.jpg',
    //         [
    //            new Ingredient('Meat',1) ,
    //            new Ingredient('French Fries',20)
    //         ]),

    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else you need to say?',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzs9m2TBuvr8G0DCzyNjqyj98J1UosKU6FwQ&usqp=CAU',
    //        [
    //         new Ingredient('Buns',2),
    //         new Ingredient('Meat',1)
    //        ] )
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes:Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe() {
        return this.recipes.slice();
    }

    getRecipes(index:number) {
        return this.recipes[index];
    }


    addIngredientsToShoppingList(ingredients: Ingredient[]) {
this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
this.recipes.push(recipe);
this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe (index: number, newRecipe: Recipe) {
this.recipes[index] = newRecipe;
this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index,1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
