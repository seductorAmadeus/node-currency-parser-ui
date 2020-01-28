import React, {useState, useEffect} from 'react';
import './App.css';
import Table from './components/Table';
import {APIURL} from './constants/routes';

function App() {
  const [currencyData, setData] = useState({});

  async function fetchData() {
    const res = await fetch(`${APIURL}/currency?name=Bitcoin`);
    const data = await res.json();
    setData(data);
  }

  useEffect(() => {
    document.title = `Главная`;
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Table data={currencyData} />
      </header>
    </div>
  );
}

export default App;
