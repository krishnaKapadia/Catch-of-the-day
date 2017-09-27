//Always first import libraries that we will use, UP TO VIDEO #16
import React from 'react';
import { render } from 'react-dom'; //This imports the render method from the react-dom library, not the whole library
import { BrowserRouter, Match, Miss } from 'react-router';

//Import styles
import './css/style.css';

//Also Import components, .js extention is not needed
import App from './components/App';
import StorePicker from "./components/StorePicker";
import NotFound from "./components/NotFound";

//Router to show the right page depending on the url
const Root = () => {

    return (
      /* This allows us to show a spesific component when the pattern/url matches that spesified. Matches can be put anywhere.
         Props that are not strings must be encased within curly braces
      */
      <BrowserRouter>
        <div>
            <Match exactly pattern="/" component={StorePicker} />
            <Match pattern="/store/:storeId" component={App} />
            <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    )

}


//Showing the component to the screen. Shows the router which then shows the others
//render(<component/>, html div/class to put it in), Must self close the component tag
render(<Root/>, document.querySelector('#main'));
