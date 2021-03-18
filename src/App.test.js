import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { expect } from "chai";
import App from "./App";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
// var jsdom = require("mocha-jsdom");
// global.document = jsdom({
//   url: "http://localhost:3000/"
// });

let rootContainer, wrapper;
// before each tests are executed
beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  act(() => {
    ReactDOM.render(<App />, rootContainer);
  });
  wrapper = mount(<App />)
});

// after each tests are executed
afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer = null;
});

describe("App Component Testing", () => {
  // 1) test to render h1 tags UI
  it('render the title', () => {
    const h1 = rootContainer.querySelector("h1");
    expect(h1.textContent).to.equal("To Do Test", "h1 is not rendered");
  });

  // 2) test to render submit will add onto list
  it('click submit will add onto list', () => {
    wrapper.find('.input').simulate('change', { target: { value: 'React' } });
    wrapper.find('#submit').simulate('click');
    expect(wrapper.exists('.checkbox')).to.equal(true, "checkbox is not true");
    const checkbox = wrapper.find('.checkbox');
    expect(checkbox.text()).to.equal('React', "checkbox label is not react");

  });

  // 3) test click of check will check checkbox, and click again will remove checkbox... checking checkbox checks checkbox :D
  it('click of check will toggle checkbox true, and click again toggles checkbox false', () => {
    wrapper.find('.input').simulate('change', { target: { value: 'React' } });
    wrapper.find('#submit').simulate('click');
    wrapper.find('input[type="checkbox"]').simulate("click", { target: { id: 'item-0', checked: true } });
    wrapper.update();
    wrapper.find({ type: 'checkbox' }).forEach(node => {
      expect(node.props().checked).to.equal(true, "checkbox is not true")
    });
    wrapper.find('input[type="checkbox"]').simulate("click", { target: { id: 'item-0', checked: false } });
    wrapper.find({ type: 'checkbox' }).forEach(node => {
      expect(node.props().checked).to.equal(false, "checkbox is not false");
    });
  });

  // 4) test click of check update complete total + 1
  it('check of checkbox updates complete', () => {
    wrapper.find('.input').simulate('change', { target: { value: 'React' } });
    wrapper.find('#submit').simulate('click');
    wrapper.find('input[type="checkbox"]').simulate("click", { target: { id: 'item-0', checked: true } });
    wrapper.update();
    expect(parseInt(wrapper.find('#total').text())).to.equal(1, "total checked is not 1");
  })

  // 5) test click of check update complete total - 1
  it('uncheck of checkbox updates complete', () => {
    wrapper.find('.input').simulate('change', { target: { value: 'React' } });
    wrapper.find('#submit').simulate('click');
    wrapper.find('input[type="checkbox"]').simulate("click", { target: { id: 'item-0', checked: true } });
    wrapper.find('input[type="checkbox"]').simulate("click", { target: { id: 'item-0', checked: false } });
    wrapper.update();
    expect(parseInt(wrapper.find('#total').text())).to.equal(0, "total checked is not 0");
  });
});

// to run test: npm test or yarn run test