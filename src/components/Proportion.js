import React from 'react';
import { Component } from 'react';
import * as _ from 'lodash';

export class Proportion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newIngredient: '',
      newQuantity: '',
      newType: 'gr',
      items: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  addNewItem() {
    const newItem = {
      id: _.uniqueId(),
      ingredient: this.state.newIngredient,
      quantity: parseFloat(this.state.newQuantity),
      type: this.state.newType,
      newQuantity: 0,
    };

    const items = [...this.state.items];

    if (items.length) {
      const quantity = items[0].quantity;
      const newQuantity = items[0].newQuantity;
      newItem.newQuantity = newItem.quantity * (newQuantity / quantity);
    }

    items.push(newItem);

    this.setState({
      newIngredient: '',
      newQuantity: '',
      newType: 'gr',
      items: items,
    });
  }

  removeItem(id) {
    const index = this.state.items.findIndex((item) => {
      return item.id === id;
    });

    const items = [...this.state.items];
    items.splice(index, 1);

    this.setState({
      items,
    });
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
    });
  }

  changeQuantity(e, id) {
    const value = parseFloat(e.target.value);
    const items = [...this.state.items];
    const item = items.find((item) => item.id === id);
    const newItem = item;
    newItem.newQuantity = value;

    for (let i = 0; i < items.length; i++) {
      const currentItem = items[i];
      if (currentItem.id === id) {
        continue;
      }

      currentItem.newQuantity = (
        currentItem.quantity *
        (newItem.newQuantity / newItem.quantity)
      ).toFixed(2);
    }

    this.setState({
      items,
    });
  }

  render() {
    return (
      <div className="container mx-auto">
        <div className="overflow-x-auto mx-15">
          <h1 className="font-bold p-5 text-center text-lg">Proporzioni</h1>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th>Quantità</th>
                <th>Tipo</th>
                <th>Nuova Quantità</th>
              </tr>
            </thead>
            {this.state.items.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <td>{item.ingredient}</td>
                  <td>{item.quantity}</td>
                  <td>{item.type}</td>
                  <td>
                    <input
                      placeholder="Nuova quantità"
                      className="input has-text-danger"
                      name="editedQuantity"
                      type="number"
                      value={item.newQuantity}
                      onChange={(e) => this.changeQuantity(e, item.id)}
                    />
                  </td>
                  <td className="column">
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => this.removeItem(item.id)}
                    >
                      Rimuovi
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="container mx-auto px-10 py-10 max-w-sm">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ingrediente</span>
            </label>
            <input
              placeholder=""
              className="input input-bordered"
              type="text"
              name="newIngredient"
              value={this.state.newIngredient}
              onChange={this.handleChange}
            />
            <label className="label">
              <span className="label-text">Quantità</span>
            </label>
            <input
              placeholder="Quantità"
              className="input input-bordered"
              type="number"
              name="newQuantity"
              value={this.state.newQuantity}
              onChange={this.handleChange}
            />
            <label className="label">
              <span className="label-text">Tipo</span>
            </label>
            <select
              className="select select-bordered w-full max-w-ws"
              name="newType"
              value={this.state.newType}
              onChange={this.handleChange}
            >
              <option selected value="gr">
                grammi
              </option>
              <option value="kg">chilogrammi</option>
              <option value="ml">millilitri</option>
              <option value="l">litri</option>
              <option value="prz">porzioni</option>
              <option value="pz">pezzo</option>
              <option value="C">cucchiaio</option>
              <option value="c">cucchiaino</option>
              <option value="tz">tazza</option>
            </select>
            <button className="btn btn-primary my-10" onClick={this.addNewItem}>
              Aggiungi
            </button>
          </div>
        </div>
      </div>
    );
  }
}
