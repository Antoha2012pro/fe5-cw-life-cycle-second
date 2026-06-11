import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: "Завантаження...",
      coinId: "bitcoin",
      searchQuery: "",
      error: null,
    };
  };

  loadPrice = async () => {
    this.setState({ price: "Завантаження..." });

    const { coindId } = this.state;
    const lowerCoinId = coinId.toLowerCase();

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${lowerCoinId}&vs_currencies=usd`

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data[lowerCoinId]) {
        const currentPrice = data[lowerCoinId].usd;
        this.setState({ price: `$${currentPrice.toLocaleString()}`, error: null });
      } else {
        this.setState({ error: `Монету ${coindId} не знайдено (загубили)` });
      }
    } catch (error) {
      this.setState({ error: "Помилка мережи" });
    };
  };

  componentDidMount() {
    this.loadPrice();
    this.timer = setInterval(() => this.loadPrice(), 10000);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.coinId !== this.state.coinId) {
      this.loadPrice();
    };
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchQuery.trim().toLowerCase() !== "") {
      this.setState({ coinId: this.state.searchQuery.trim().toLowerCase(), error: null });
    };
  };

  render() {
    return (
      <div className='bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-6 text-center transition-all'>
        <form className='mb-6 flex gap-2' onSubmit={this.handleSearchSubmit}>
          <input type="text" placeholder='Введіть ID...' value={this.state.searchQuery} onChange={(event) => this.setState({searchQuery: event.target.value})} className='w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500' />
        </form>
      </div>
    );
  };
};
