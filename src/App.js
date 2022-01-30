import React, { Component } from 'react';
import Main from './components/MainComponents'
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>
        );
  }
}

export default App;
// the code below same as code above just different way to write it 
// export {App};
