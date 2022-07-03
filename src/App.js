import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import TodoListing from './components/TodoListing';

const App = ()=> {  
  return (
    <div className="App">
       <TodoListing />
    </div>
  );
}

export default App;
