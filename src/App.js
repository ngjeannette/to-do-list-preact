import "./App.css";
import { h, render, Component } from "preact";
import List from "./List";

export default class App extends Component {
  state = { list: [], search: "" };
  handleInputChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = () => {
    let { list, search } = this.state;
    this.setState({ list: [...list, search], search: "" });
  };

  render({}, { list, search }) {
    return (
      <div className="App">
        <div className="App-header">
          <div>
            <h1 className="has-text-black is-size-1">To Do Test</h1>
            <div className="input-container">
              <input
                className="input"
                id="input"
                type="text"
                placeholder="Feed the 🐱"
                onChange={this.handleInputChange}
                value={search}
              />
              <button
                className="button is-link"
                id="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
            <List list={list} />
          </div>
        </div>
      </div>
    );
  }
}
