//Imports
import React from 'react';

/*
    This whole class has been converted to a stateless function as it ony has 1 render method in it.
    This is the recommeded syntac but it doesnt really matter functionaly
*/

const Header = (props) => {
    return (

      <header className="top">
         { /* <h1> {props.title} </h1> , this.props allows us to access the value of the prop we need, needs the curly braces */ }
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">Of</span>
            <span className="the">The</span>
          </span>
          Day
        </h1>

        <h3 className="tagline"> <span> {props.tagline} </span> </h3>

      </header>

    )
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}


export default Header;
