import axios from 'axios';
import {proxy,key} from '../config';

export default class Search{
    constructor(query){
        this.query=query;
    }

    async getResults(){
        
        try{
            const results= await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result=results.data.recipes;
            console.log(results);
            //console.log(result.data.recipes[2]);
        }
        catch(error){
            alert(error);
        }
    }
}
