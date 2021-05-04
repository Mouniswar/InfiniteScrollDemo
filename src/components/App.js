import React from 'react';
import AllItems from './AllItems';
import IncorrectItems from './IncorrectItems';
import UntaggedItems from './UntaggedItems';
import DisabledItems from './DisabledItems';
import Header from './Header';
import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <div className="ui container" style={{overflowY:'scroll'}}>
                <BrowserRouter>
                    <Header />
                    <Route path="/" exact component={AllItems} />
                    <Route path="/is_incorrect" exact component={IncorrectItems} />
                    <Route path="/is_untagged" exact component={UntaggedItems} />
                    <Route path="/is_disabled" exact component={DisabledItems} />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;