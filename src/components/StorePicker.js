//Imports, need to repeat for every file not like jquery
import React from 'react';
import { getFunName } from '../helpers'; // ES6 named export reference, as the function is not default we have to import it like this.

//Creating a component
class StorePicker extends React.Component {

    //event is a javascript inbuilt DOM parameter
    goToStore(event) {
      event.preventDefault();
      const storeId = this.storeInput.value;

      //Accesses the router to transition from the store picker to a different url.
      this.context.router.transitionTo(`/store/${storeId}`);
    }


    //Every component that extends React.Component needs a render method. it is bound to the class so therefore we can use the, this, keyword
    render() {
     //return <p>This is the store picker component</p>

     //Can only return nested element i.e only 1 parent, so you can only return 1 parent element not multiple ones.
     //tags in JSX use the className attribute as opposed to class in html
     return (

        <form className="store-selector" onSubmit={this.goToStore.bind(this)}> { /* Again as onSubmit points to something that is not a string, it is encased in {}. Also using .bind(this) allows us to use the this keyword in the goToStore function */ }

           { /* THIS IS JSX MUST PUT COMMENTS INSIDE THE PARENT ELEMENT OR ERROR WILL OCCUR
              CAUSE YOULL BE RETURNING 2 THINGS, THE COMMENT AND THE ACTUAL CODE*/ }
           <h2>Please Enter a Store</h2>

           <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } ref={(input) => { this.storeInput = input } } /> { /*ref's allow us to set props to values*/}
           <button type="submit">Visit Store -></button>
        </form>

     )

    }

}

//Makes the router avalible to the class by reference, note: they dont want you to do this for everythign mainly just the router
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
