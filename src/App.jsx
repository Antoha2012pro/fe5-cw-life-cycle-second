import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: "Завантаження...",
      error: null,
    };
  };

  loadPrice = async () => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
      const data = await response.json();
      this.setState({ price: `$${data.bitcoin.usd.toLocaleString()}`, error: null });
    } catch (error) {
      this.setState({error: "Помилка мережи"});
    };
  };

  componentDidMount() {
    this.loadPrice();
    this.timer = setInterval(() => this.loadPrice(), 10000);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.price !== this.state.price) {
      console.log(this.state.price);
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  };

  render() {
    return (
      <div className='bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-6 text-center transition-all'>
        <h2 className='text-sm font-semibold text-slate-500 uppercase tracking-wider'>Курс Bitcoin</h2>
        <p className='text-4xl font-black text-emerald-600 my-4 tracking-tight animate-pulse'>{this.state.price}</p>
      </div>
    );
  };
};
