import {elements,elementStrings} from './base';

export const toggleLikeBtn=isliked=>{
    const iconString= isliked? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);

};

export const toggleLikeMenu=numberLikes=>{
    elements.likeMenuBtn.style.visibility= numberLikes>0? 'visible' : 'hidden';

};