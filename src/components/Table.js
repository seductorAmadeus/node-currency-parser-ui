import React, {Component} from 'react';
import './Table.css';
import PropTypes from 'prop-types';

const sortTypes = {
  up: {
    class: 'sort-up',
    fn: (a, b) => a.usd_price - b.usd_price || a.last_updated - b.last_updated,
  },
  down: {
    class: 'sort-down',
    fn: (a, b) => b.usd_price - a.usd_price || b.last_updated - a.last_updated,
  },
  default: {
    class: 'sort',
    fn: (a, b) => a,
  },
};

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: 'default',
    };
  }

  onSortChange = () => {
    const {currentSort} = this.state;
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';

    this.setState({
      currentSort: nextSort,
    });
  };

  render() {
    const {currentSort} = this.state;
    const {currency} = this.props;
    const {data} = currency;

    if (!data || data.length <= 0) {
      return <div>wait...</div>;
    }

    return (
      data &&
      data.length > 0 && (
        <div id="results" className="wrap__table table ">
          <div className="row header__table">
            <div className="cell">ID</div>
            <div className="cell">Currency name</div>
            {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
            <div
              role="button"
              className={`cell active-sort ${sortTypes[currentSort].class}`}
              onClick={this.onSortChange}
              onKeyPress={this.onSortChange}>
              USD price
            </div>
            {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
            <div
              role="button"
              className={`cell active-sort ${sortTypes[currentSort].class}`}
              onClick={this.onSortChange}
              onKeyPress={this.onSortChange}>
              Date
            </div>
            <div className="cell">Volume 24h</div>
            <div className="cell">% change 1h</div>
            <div className="cell">% change 24h</div>
            <div className="cell">% change 7d</div>
          </div>

          {[...data].sort(sortTypes[currentSort].fn).map(item => (
            <div className="row" key={item.id}>
              <div className="cell">{item.id}</div>
              <div className="cell">{item.name}</div>
              <div className="cell">{item.usd_price}</div>
              <div className="cell">{item.last_updated}</div>
              <div className="cell">{item.volume_24h}</div>
              <div className="cell">{item.percent_change_1h}</div>
              <div className="cell">{item.percent_change_24h}</div>
              <div className="cell">{item.percent_change_7d}</div>
            </div>
          ))}
        </div>
      )
    );
  }
}

Table.propTypes = {
  currency: PropTypes.object.isRequired,
};
