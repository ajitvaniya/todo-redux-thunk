const { default: axios } = require('axios');
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const thunkMiddleWare = require('redux-thunk').default

let initialState ={
    loading:false,
    list:[],
    error:''
}

/*---------START ACTIONS------------------- */
const TODO_FETCH_BEGIN ='TODO_FETCH_BEGIN';
const TODO_FETCH_COMPETED ='TODO_FETCH_COMPETED'; 
const TODO_FETCH_FAILDED = 'TODO_FETCH_FAILDED'; 

const startTodoFetch = ()=>{
    return {
        type:TODO_FETCH_BEGIN
    }
}
const completeTodoFetch = (todoData=[])=>{
    return {
        type:TODO_FETCH_COMPETED,
        payload: todoData
    }
}
const failedTodoFetch =(errMsg)=>{
    return {
        type:TODO_FETCH_FAILDED,
        payload:errMsg
    }
}
/*---------END ACTIONS------------------- */

/*---------START REDUCERS------------------- */
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
/*---------END REDUCERS------------------- */

const fetchTodos =()=>{
    return function (dispatch){
        dispatch(startTodoFetch())
        axios.get('https://jsonplaceholder.typicode.com/todos').then((res)=>{
             return dispatch(completeTodoFetch(res.data))
        }).catch((err)=>{
            return dispatch(failedTodoFetch(err.statusText))
        })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleWare));
const unsubscribe =  store.subscribe(()=>{
    console.log('store updated',store.getState())
})  
store.dispatch(fetchTodos())
unsubscribe();















