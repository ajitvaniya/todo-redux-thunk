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

