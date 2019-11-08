import axios from 'axios';
import {proxy, key} from '../config';

export default class Recipe{
    constructor(id){
        this.id=id;
    }
    async getRecipe(){
        try{
            const results= await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
            //console.log(results);
            this.title=results.data.recipe.title;
            this.author=results.data.recipe.publisher;
            this.ingredients=results.data.recipe.ingredients;
            this.image=results.data.recipe.image_url;
            this.url=results.data.recipe.source_url;

        }
        catch(error){
            alert('something went wrong :( !')
        }
        
    }

    calcPrepTime(){
        //Assuming 15mins for every 3 ingredients
        const numberIngredients=this.ingredients.length;
        const ingredientSets=Math.ceil(numberIngredients/3);
        const prepTime=ingredientSets*15;
        this.time=prepTime;
    }

    calcServings(){
        this.servings=4;
    }

    ////////standardizing the recipe ingredient/////
    formatRecipeIngredients(){
        const ingLong=['tablespoons','tablespoon','teaspoons','teaspoon','ounces','ounce','cups','cup','cans','can',
        'kilograms','kilogram','kg','grams','gram','g','pinch','cloves'];
        const ingShort=['tbsp','tbsp','tsp','tsp','oz','oz','cup','cup','can','can','kg','kg','kg','g','g','g','pinch','clove'];
        
        const newIngredient=this.ingredients.map(ing=>{
            //1. make measures standard
            let ingredient= ing.toLowerCase();
            console.log(ingredient);
            ingLong.forEach((el,index)=>{
               ingredient=ingredient.replace(el,ingShort[index]);

           });

           //2.remove parenthesis
           ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');

           //3. separate ingredients into count, unit, and ingredient
           let ingObj;
           const ingArr=ingredient.split(' ');
           const unitIndex=ingArr.findIndex(value=>ingShort.includes(value));

           if(unitIndex>-1){
               //unit exists so separate count from unit into countArr
               //EX. [4,1/2,tomato,paste,dip]=> countArr=['4','1/2']
               //eval(countArr.join('+'))=>eval("4+1/2")--> 5
               const countArr=ingArr.slice(0,unitIndex);
               let count;
               if(countArr.length===1){
                   //countArr=['4-1/2']
                   count=eval(ingArr[0].replace('-','+'));
               }else{
                   //countArr=['4','1/2']
                   count=eval(ingArr.slice(0,unitIndex).join('+'));
               }
               ingObj={
                   count,
                   unit:ingArr[unitIndex],
                   ingredient:ingArr.splice(unitIndex+1).join(' ')
               };

           }else if(parseInt(ingArr[0],10)){//eval(ingArr[0].replace('-','+')),10)
               //no unit exist only number EX. [4,tomato,paste] or[4-1/2,tomato,paste]
               ingObj={
                   count:parseInt(ingArr[0],10),
                   unit:'',
                   ingredient:ingArr.slice(1).join(' ')
               }
           }else if(unitIndex===-1){
               //no unit, no count only ingredient
               ingObj={
                 count:1,
                 unit:'',
                 ingredient:ingredient 
               }
           }

           return ingObj;
        });

        this.ingredients= newIngredient;
        
    }

    ///////updating servings and ingredients/////
    updateServings(type){
        //update servings based on dec or inc
        const newServings=type==='dec'? this.servings-1:this.servings+1;

        //update ingredients
        this.ingredients.forEach(ing=>{
            ing.count*= (newServings/this.servings)
        });
        this.servings= newServings;
        console.log(this.ingredients,this.servings);
    }
}