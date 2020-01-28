import React, {Component} from 'react';
import './Table.css';
import PropTypes from 'prop-types';

const sortTypes = {
  up_price: {
    class: 'sort-up-price',
    fn: (a, b) => a.usd_price - b.usd_price,
  },
  up_date: {
    class: 'sort-up-date',
    fn: (a, b) => new Date(a.last_updated) - new Date(b.last_updated),
  },
  down_price: {
    class: 'sort-down-price',
    fn: (a, b) => b.usd_price - a.usd_price,
  },
  down_date: {
    class: 'sort-down-date',
    fn: (a, b) => new Date(b.last_updated) - new Date(a.last_updated),
  },
  default_price: {
    class: 'sort-default-price',
    fn: (a, b) => a,
  },
  default_date: {
    class: 'sort-default-date',
    fn: (a, b) => a,
  },
};

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: 'default_price',
    };
  }

  onPriceSortChange = () => {
    const {currentSort} = this.state;
    let nextSort;

    if (!['down_price', 'up_price', 'default_price'].includes(currentSort)) {
      this.setState({currentSort: 'down_price'});
    } else {
      if (currentSort === 'down_price') nextSort = 'up_price';
      else if (currentSort === 'up_price') nextSort = 'default_price';
      else if (currentSort === 'default_price') nextSort = 'down_price';

      this.setState({
        currentSort: nextSort,
      });
    }
  };

  onDateSortChange = () => {
    const {currentSort} = this.state;
    let nextSort;

    if (!['down_date', 'up_date', 'default_date'].includes(currentSort)) {
      this.setState({currentSort: 'down_date'});
    } else {
      if (currentSort === 'down_date') nextSort = 'up_date';
      else if (currentSort === 'up_date') nextSort = 'default_date';
      else if (currentSort === 'default_date') nextSort = 'down_date';

      this.setState({
        currentSort: nextSort,
      });
    }
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
              className={`cell active-sort price ${sortTypes[currentSort].class}`}
              onClick={this.onPriceSortChange}
              onKeyPress={this.onPriceSortChange}>
              USD price
            </div>
            {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
            <div
              role="button"
              className={`cell active-sort date ${sortTypes[currentSort].class}`}
              onClick={this.onDateSortChange}
              onKeyPress={this.onDateSortChange}>
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
