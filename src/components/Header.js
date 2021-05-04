import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">All Receipes</Link>
            <Link to={`/is_incorrect?bool=true`} className="item">Incorrect</Link>
            <Link to={`/is_untagged?bool=false`} className="item">UnTagged</Link>
            <Link to={`/is_disabled?bool=false`} className="item">Disabled</Link>
        </div>
    )
}

export default Header;