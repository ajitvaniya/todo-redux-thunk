import axios from 'axios'

export const TODO_FETCH_BEGIN ='TODO_FETCH_BEGIN';
export const TODO_FETCH_COMPETED ='TODO_FETCH_COMPETED'; 
export const TODO_FETCH_FAILDED = 'TODO_FETCH_FAILDED'; 

 
export  const startTodoFetch = ()=>{
    return {
        type:TODO_FETCH_BEGIN
    }
}
export const completeTodoFetch = (todoData=[])=>{
         return {
            type:TODO_FETCH_COMPETED,
            payload: todoData
        }
 }
export const failedTodoFetch =()=>{
    return {
        type:TODO_FETCH_FAILDED,
        payload:'Something went wrong! Please try later.'
    }
}

export const fetchTodos =()=>{
    return function (dispatch){
         axios.get('https://jsonplaceholder.typicode.com/todos').then((res)=>{
             return  dispatch(completeTodoFetch(res));
        }).catch((err)=>{
            return dispatch(failedTodoFetch())
        })
    }
}

