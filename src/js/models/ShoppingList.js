import uniqid from 'uniqid';

export default class ShoppingList{
    constructor(){
        this.items=[];

    }

    addItems(count,unit,ingredient){
        const newItem={
            id:uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(newItem);
        return newItem;

    }

    deleteShopListItem(id){
        //find index of object
        const itemIndex=this.items.findIndex(el=>
            el.id===id
        );
        //delete object from array
        this.items.splice(itemIndex,1);
    }

    updateCount(id,newCount){
        this.items.find(el=>el.id===id).count=newCount;

    }

}