//Imports
import React from 'react';

class AddFishForm extends React.Component {

    createFish(event) {
        event.preventDefault();

        const fish = {
          name: this.name.value,
          price: this.price.value,
          status: this.status.value,
          desc: this.desc.value,
          image: this.image.value,
        }

        this.props.addFish(fish); //Call the function passed in as a prop
        this.fishForm.reset();
    }

    render() {

      return (
        <form className="fish-edit" onSubmit={(e) => this.createFish(e) } ref={(input) => this.fishForm = input} >
          <input ref={(input) => this.name = input} type="text" placeholder="Fish Name" />
          <input ref={(input) => this.price = input} type="text" placeholder="Fish Price" />

          <select ref={(input) => this.status = input}>
            <option value="avalible">Avalible!</option>
            <option value="unavalible">Sold Out!</option>
          </select>

          <textarea ref={(input) => this.desc = input}  placeholder="Fish Desc"></textarea>
          <input ref={(input) => this.image = input} type="text" placeholder="Fish Image" />
          <button type="submit">+ Add Item</button>
        </form>
      )

    }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;