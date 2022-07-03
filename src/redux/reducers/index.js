import { 
    TODO_FETCH_BEGIN,TODO_FETCH_FAILDED,TODO_FETCH_COMPETED,
 } from '../actions/index';


let initialState ={
    loading:false,
    list:[],
    error:''
}
const reducer = (state=initialState,action)=>{
    switch(action.type){
       case TODO_FETCH_BEGIN:
           return {
               ...state,
               loading:true
           }
       case TODO_FETCH_COMPETED:
           return { 
               loading:false,
               list:action.payload,
               error:''
           }
       case TODO_FETCH_FAILDED:
           return { 
               loading:false,
               list:[],
               error:''
           }
       default:
           return state
                   
   }
}

export default reducer;