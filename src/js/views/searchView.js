import {elements} from './base';

///get input from search field/////////
export const getSearchInput=()=>elements.formSearchField.value;

///clearing up search field////
export const clearSearchField=()=>{
    elements.formSearchField.value='';
};

///clearing up the search results list////
export const clearSearchResList=()=>{
    elements.formSearchResList.innerHTML='';
    elements.formSearchResPageBtn.innerHTML='';
};

////fnc that limits the title length of each recipe to only 17 words///
const limitRecipeTitle=(title, limit=17)=>{
    return (title.length > 17 ? `${title.slice(0,limit)}...` : title);
};

////fnc that highlights any recipe that is selected from the search list///
export const highlighSelectedRecipe=id=>{
    const resultArr=Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(result=>{result.classList.remove('results__link--active')});
    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active')
}

/////fnc that takes a single recipe obj and insert fields into html//////
const renderRecipe=recipe=>{
    const markup=`
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src=${recipe.image_url} alt=${recipe.title}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.formSearchResList.insertAdjacentHTML('beforeend',markup);
};

/////fnc that creates the pagination buttons
     //type: prev or next
const createButtons=(page,type)=>{
    const button=`
    <button class="btn-inline results__btn--${type} "data-goto=${type==='prev' ? page-1 : page+1}>
            <span>page ${type==='prev' ? page-1 : page+1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type==='next'? 'right': 'left'}"></use>
            </svg>            
    </button>
    `;
    elements.formSearchResPageBtn.insertAdjacentHTML('afterbegin',button);
};

/////fnc that renders the pagination Buttons
const renderButtons=(page,numberResults,resultsPerPage,)=>{
   const pages=Math.ceil(numberResults/resultsPerPage);
   if(page===1 && pages>1){
       //display only next page button
       createButtons(page,'next');
   }
   else if(page<pages){
       //display both next and prev page buttons
       createButtons(page,'prev');
       createButtons(page,'next')
   }
   else if(page===pages && pages>1 ){
       //display only prev button
       createButtons(page,'prev');
   }   
};

////displaying the search results list on UI////
export const renderResults=(recipeArr,page=1,resultsPerPage=10)=>{
    const start= (page-1)*resultsPerPage;
    const end= page*resultsPerPage;

    //1. rendering the results recipe Results//
    recipeArr.slice(start,end).forEach(renderRecipe);

    //2. rendering the pagination buttons//
    renderButtons(page,recipeArr.length,resultsPerPage);
};
    