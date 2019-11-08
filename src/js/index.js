// Global app controller
import Search from './models/Search';
import {elements,renderLoadSpinner,clearLoadSpinner} from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import ShoppingList from './models/ShoppingList';
import * as shoppingListView from './views/shoppingListView';
import Likes from './models/Likes';
import * as likesView from './views/likesView';

/////////App State////////////
const state={};
window.state=state;
/**************************************************************************************************
 * SEARCH CONTROLLER***************/
const controlSearch=async ()=>{

    //1.get query from view
    //const query='pizza';
    const query=searchView.getSearchInput(); 
    //console.log(query);
    
    if(query){
        //2. creat new Search object and add it to state
        state.search=new Search(query);

        //3.pepare UI for results
        searchView.clearSearchField();
        searchView.clearSearchResList();
        renderLoadSpinner(elements.formResults)

        try{

            //4.search for recipes
            await state.search.getResults();

            //5. render results on UI
            clearLoadSpinner();
            searchView.renderResults(state.search.result);
            console.log(state.search.result);
        }
        catch(error){
            alert('oh snap!! cannot find recipes')
            clearLoadSpinner();

        }

        
    }
};



//////////EVENT LISTENERS For SEARCH CONTROLLER////////////////
elements.formSearch.addEventListener('submit',eventz=>{
    eventz.preventDefault();
    controlSearch();
});

elements.formSearchResPageBtn.addEventListener('click',eventz=>{
    const btn=eventz.target.closest('.btn-inline');
    if(btn){
        const gotoPage=parseInt(btn.dataset.goto,10)
        searchView.clearSearchResList();
        searchView.renderResults(state.search.result,gotoPage);

    }
    
});
//////Testing////
/*window.addEventListener('load',eventz=>{
    eventz.preventDefault();
    controlSearch();
});
//const search= new Search('pizza');
//console.log(search);
*/




/*******************************************************************************************
 * *******RECIPE CONTROLLER**************/
const controlRecipe= async()=>{
    //1.get recipeId from browser
    const id= window.location.hash.replace('#','');
    console.log(id);

    if(id){

        //2. prepare UI for changes
        if(state.search) searchView.highlighSelectedRecipe(id);//highlights the selected recipe
        recipeView.clearRecipe();
        renderLoadSpinner(elements.recipeData);

        //3. create new recipe obj and add to application state
        state.recipe=new Recipe(id);
        window.r=state.recipe;//opens recipe object to the console.
        

        try{
            //4.get recipe data and format it
            await state.recipe.getRecipe();
            state.recipe.formatRecipeIngredients();
            console.log(state.recipe.ingredients)

            //5. calc prep time and servings
            state.recipe.calcPrepTime();
            state.recipe.calcServings();

            //6.render recipe to UI
            clearLoadSpinner();
            recipeView.renderRecipe(state.recipe,state.like.isLiked(id));

            console.log(state.recipe);
        }
        catch(error){
            alert('oh shoot !! cannot process recipe');
            clearLoadSpinner();
        }

    }

};

//////EVENT LISTENERS FOR RECIPE CONTROLLER //////
['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));
 //const recipe= new Recipe(47746);
 //recipe.getRecipe();




/****************************************************************************************************
 **********SHOPPING LIST CONTROLLER*****************************/
window.shop= new ShoppingList();
const controlShoppingList=()=>{

    //1.create new shopping list and add to App state if none exist
    if(!state.shoppingList) state.shoppingList=new ShoppingList();
    console.log(state.shoppingList);

    //1.Obtain ingredeint from the recipe  add to Shopping list & UI
    state.recipe.ingredients.forEach(el=>{
        const item=state.shoppingList.addItems(el.count,el.unit,el.ingredient);
        shoppingListView.renderShoppingList(item);
    });
    console.log(state.shoppingList.items);
    
};



/////EVENT LISTENERS FOR SHOPPING LIST //////////

//deleting ingredient from the list
elements.shopping.addEventListener('click',event=>{
    //selecting element by id
    const id=event.target.closest('.shopping__item').dataset.itemid;
  
    //deleting from app state and UI
    if(event.target.matches('.shopping__delete, .shopping__delete *')){
        //delete from state
        state.shoppingList.deleteShopListItem(id);

        //delete from Ui
        shoppingListView.deleteShoppingList(id);

        ////updating the count//
    }else if(event.target.matches('.shopping__count--value')){
        const newCount= event.target.value;
        state.shoppingList.updateCount(id,parseFloat(newCount,10));
    }
});

//TESTING FOR LIKE PERSISTENCE//
state.like=new Likes();
likesView.toggleLikeMenu(state.like.getNumLikes());

/*********************************************************************************
 * ************************LIKES CONTROLLER**********************************/
 const controlLike=()=>{
     //if no likes exist create one and add to app state
     if(!state.like) state.like=new Likes();
    const currentId= state.recipe.id;
    
     //if  recipe is not liked
     if(!state.like.isLiked(currentId)){
         //add recipe to likes
        const newLike= state.like.addLike(currentId,state.recipe.author,state.recipe.title,state.recipe.image);

         //toggle likes button
         likesView.toggleLikeBtn(true);
         //add like to UI
         console.log(state.like.likes);

     }else {
         //remove recipe from likes
         state.like.deleteLike(currentId);

         //toggle likes button
         likesView.toggleLikeBtn(false);
         
         //remove like to UI
         console.log(state.like.likes);
     }

     //toggle love menu Button
     likesView.toggleLikeMenu(state.like.getNumLikes());

 };















































   //////////////Event listeners to handle Recipe button clicks/////////////////

   elements.recipeData.addEventListener('click',event=>{
    //decrease button is clicked
   if(event.target.matches('.btn-decrease, .btn-decrease *')){
       if(state.recipe.servings>1){
           state.recipe.updateServings('dec');
           recipeView.displayRecipeChanges(state.recipe);
       }

        //increase button is clicked
   }else if(event.target.matches('.btn-increase, .btn-increase *')){
       state.recipe.updateServings('inc');
       recipeView.displayRecipeChanges(state.recipe);

       //add ingredients to shopping List
   }else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
       controlShoppingList();

       //like button is clicked
   }else if(event.target.matches('.recipe__love, .recipe__love *')){
       controlLike()
   }
   console.log(event.target);

});
























