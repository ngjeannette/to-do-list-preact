import { h, render, Component } from "preact";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      errored: false,
      totalCheck: 0,
      checkedValue: false,
      checkDictionary: {},
    };
  }

  componentDidCatch(error) {
    this.setState({ errored: true });
  }

  handleClick = (event) => {
    let { checkedValue, checkDictionary, totalCheck } = this.state;
    const checked = event.target.checked;
    const id = event.target.id;
    const updateCheck = { ...checkDictionary, [id]: checked };
    const totalFilteredCheck = Object.values(updateCheck).filter((item) => item)
      .length;
    this.setState({
      checkedValue: !checkedValue,
      checkDictionary: updateCheck,
      totalCheck: totalFilteredCheck,
    });
  };
  render(props, { totalCheck, checkDictionary }) {
    return (
      <nav className="panel">
        <p className="panel-heading">Keeping in Track</p>
        <div className="checklist">
          {props.list.map((item, i) => {
            return (
              <div className="panel-block" href="#" key={i}>
                <label className="checkbox">
                  <input
                    maxLength="20"
                    id={`item-${i}`}
                    type="checkbox"
                    checked={!!checkDictionary[`item-${i}`]}
                    onChange={() => {}}
                    onClick={this.handleClick}
                  />
                  {item}
                </label>
              </div>
            );
          })}
        </div>
        {props.list.length > 0 && (
          <div className="panel-block total">
            <span className="is-outlined is-fullwidth">Completed:</span>
            <span id="total">{totalCheck}</span>
            <span>{`/${props.list.length}`}</span>
          </div>
        )}
      </nav>
    );
  }
}
