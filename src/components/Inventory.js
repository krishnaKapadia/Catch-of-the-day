//Imports
import React from 'react';
import AddFishForm from './AddFishForm';
import base from "../base";

class Inventory extends React.Component {

    constructor() {
      super();
      this.renderInventory = this.renderInventory.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.renderLogin = this.renderLogin.bind(this);
      this.authenticate = this.authenticate.bind(this);
      this.authHandler = this.authHandler.bind(this);
      this.logout = this.logout.bind(this);

      this.state = {
        uid: null,
        owner: null
      }
    }

    componentDidMount() {
      base.onAuth((user) => {
        if(user) {
          this.authHandler(null, {user});
        }
      });
    }

    handleChange(e, key) {
      const fish = this.props.fishes[key];
      //Take a copy of the fish and update it with the new data
      const updatedFish = {
        ...fish,
        [e.target.name]: e.target.value
      }
      this.props.updateFish(key, updatedFish);
    }

    //Authentication using base given the provider name
    authenticate(provider) {
      console.log("Logging in using " + provider);
      base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout() {
      base.unauth();
      this.setState({ uid: null });
    }

    authHandler(err, authData) {
      if(err) {
        console.log(err);
        return;
      }

      //Grab the store information
      const storeRef = base.database().ref(this.props.storeId);

      //query firebase for the store database
      storeRef.once('value', (snapshot) => {
        const data = snapshot.val() || {};


        //Set it as ours
        if(!data.owner) {
          storeRef.set({
            owner: authData.user.uid
          });
        }

        this.setState({
          uid: authData.user.uid,
          owner: data.owner || authData.user.uid
        });


      });
    }

    renderLogin() {
      return (
        <nav className="login">
          <h2>Inventory</h2>
          <p>Sign in to manage your store's inventory</p>

          <button className="facebook" onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
          <button className="github" onClick={() => this.authenticate('github')}>Login with Github</button>

        </nav>
      )
    }

    renderInventory(key) {
      const fish = this.props.fishes[key];

      return (
        <div className="fish-edit" key={key}>
          <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
          <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>

          <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
            <option value="avalible">Avalible!</option>
            <option value="unavalible">Sold Out!</option>
          </select>

          <textarea name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
          <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
          <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
        </div>
      )
    }


    render() {
      const logout = <button onClick={this.logout}>Log Out!</button>
      //Check if they are logged in
      if(!this.state.uid) {
        return <div>{this.renderLogin()}</div>
      }

      //check if they are the owner
      if (this.state.uid !== this.state.owner) {
        return (
          <div>
            <p>Sorry you aren't the owner of this store!</p>
            {logout}
          </div>
        )
      }
      return (
        <div>
            <h2>Inventory</h2>
            {logout}
            <AddFishForm addFish={this.props.addFish}/>
            <button onClick={this.props.loadSamples} >Load sample Inventory</button>
            {Object.keys(this.props.fishes).map(this.renderInventory)}
        </div>
      )
    }

}

export default Inventory;
