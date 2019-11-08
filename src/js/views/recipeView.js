import {elements,elementStrings} from './base';
//import Fraction from 'fraction';
import fracty from 'fracty';
 
//clear recipe list from UI///
export const clearRecipe=()=>{elements.recipeData.innerHTML=''};

//function to convert decimal to fraction using fraction.js package////
const toFraction=count=>{

    if (count) {
        return `${fracty(count)}`;
    }
    
      
    /*const [int,dec]=count.toString().split('.').map(el=>parseInt(el,10));
    let fraction;
    //if no decimal exists Ex 4
    if(!dec){return count;}

    if(int===0){// count=0.5   
        fraction=new Fraction(count);//0.5-->1,2
        return `${fractional.numerator}/${fractional.denominator}`;//returns 1/2
    }else if(int>0){
        // count=4.5-->9/2-->4 1/2
        fraction= new Fraction(count-int);//to get only 0.5 to avoid 9/2 step
        return `${int}${fractional.numerator}/${fractional.denominator}`;    
    }
    */
    return '?';   
};

//function that generates the recipe list with count, unit,ingredient
const createRecipeList =ingredient=>`
<li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${toFraction(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
    </div>
</li>
`;

///function to render the recipe on the UI
export  const renderRecipe= (recipe,isliked)=>{
const markup=`
<figure class="recipe__fig">
    <img src=${recipe.image} alt=${recipe.title} class="recipe__img">
    <h1 class="recipe__title">
        <span>${recipe.title}</span>
    </h1>
</figure>

<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny btn-increase">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>

    </div>
    <button class="recipe__love">
    <svg class="header__likes">
        <use href="img/icons.svg#icon-heart${isliked? '':'-outlined'}"></use>
    </svg>
    </button>
</div>
<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map(el=>createRecipeList(el)).join('')}
    </ul>

    <button class="btn-small recipe__btn recipe__btn--add">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
</div>

<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href=${recipe.url} target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>

    </a>
</div>
   
`;
elements.recipeData.insertAdjacentHTML('afterbegin',markup);
};

///displaying servings changes and ingredient changes on UI//
export const displayRecipeChanges=recipe=>{
    //update servings 
    document.querySelector(`.${elementStrings.recipeServings}`).textContent=recipe.servings;

    //update ingredients
    const ingNode=Array.from(document.querySelectorAll(`.${elementStrings.ingCount}`));
    ingNode.forEach((element,index) => {
        element.textContent=toFraction(recipe.ingredients[index].count);
        console.log(element.textContent);
        
    });

}