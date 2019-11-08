export const elements={
    formSearch: document.querySelector('.search'),
    formSearchField: document.querySelector('.search__field'),
    formSearchResList: document.querySelector(".results__list"),
    formResults:document.querySelector(".results"),
    formSearchResPageBtn:document.querySelector(".results__pages"),
    recipeData:document.querySelector(".recipe"),
    shopping: document.querySelector(".shopping__list"),
    deleteShopListItem: document.querySelector(".shopping__delete"),
    likeMenuBtn: document.querySelector(".likes__field"),
    

};

export const elementStrings={
    loader:'loader',
    recipeServings:'recipe__info-data--people',
    ingCount:'recipe__count'

}

/////creating the load spinner////
export const renderLoadSpinner=parentElement=>{
    const loaderElement=`
    <div class= ${elementStrings.loader}>
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parentElement.insertAdjacentHTML('afterbegin',loaderElement);
};

/////removing the load spinner///
export const clearLoadSpinner=()=>{
    const spinner=document.querySelector(`.${elementStrings.loader}`);
    if(spinner){
        spinner.parentElement.removeChild(spinner);
    } 
};