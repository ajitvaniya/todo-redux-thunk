import { createStore,applyMiddleware } from "redux"


import reducer from './reducers'
//import thunk from 'redux-thunk'

 const store = createStore(reducer)
 export default store;
 /*export default const store = createStore(
    reducer,
    {},
    applyMiddleware(thunk)
  )
 */