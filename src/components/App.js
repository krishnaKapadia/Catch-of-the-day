//Imports
import React from 'react';

//Import components too
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

//Firebase connection
import base from '../base';

//Class decleration
class App extends React.Component {

  constructor() {
    super();

    //Binding to allow this keyword to be used
    this.addFish = this.addFish.bind(this);
    // this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    //Creates our state
    this.state = {
      fishes: [],
      order: []
    };

  }

  // Special method inbuilt with react
  componentWillMount() {
    //Runs jsut before <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      ,{
        context: this,
        state: 'fishes'
      });

      //Check to see if there is an order in localStorage
      const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

      if(localStorageRef) {
        //Update the <Order> state
        this.setState({
          order: JSON.parse(localStorageRef)
        })
      }
  }

  // Special method inbuilt with react
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // Special method inbuilt with react
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  //Function to add fish to the state/order
  addFish(fish) {
    //Update the state

    //First make copy of the state, best practise way, can use direct assignment but not good
    const fishes = {...this.state.fishes};

    //Add in the new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    //set state
    this.setState({ fishes });
  }

  //Function to update the fishes state array
  updateFish(key, fish) {
    const fishes = {...this.state.fishes};
    fishes[key] = fish;
    this.setState({ fishes });
  }

  //Delets the item
  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples = () => {
    this.setState({
      fishes : sampleFishes
    })
  };

  addToOrder(key) {
    //Take a copy of the state as before
    const order = {...this.state.order};

    //update/add the new number of fish to the order
    order[key] = order[key] + 1 || 1;

    //Update the state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {

      return (
          <div className="catch-of-the-day">
              <div className="menu">
                 { /*The header component with some custom props/attributes to allow us to pass through information*/ }
                  <Header title="Johns Fish Market" tagline="Fresh from the sea!"/>

                  {/* Adds list of fishs */}
                  <ul className="list-of-fish">
                     {
                       Object.keys(this.state.fishes)
                       /* Key prop allows us to access the key from prop index, cannot use prop called key as thats reserved */
                       .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} /* This is how we pass functions through props */
                       addToOrder={this.addToOrder}/>)
                     }
                  </ul>

              </div>

              {/* Dont pass in the whole state, just what u need from it */}
              <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder}/>

              {/* In order to use these functions and variables in the child classes we must pass then through using props*/}
              <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish} removeFish={this.removeFish} storeId={this.props.params.storeId}/>

          </div>
      )

  }

}

export default App;
