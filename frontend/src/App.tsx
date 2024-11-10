import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

interface DataType {
  name: string;
  age: number;
  date: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/data') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data: DataType) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {data ? (
          <>
            <p>{data.name}</p>
            <p>{data.age}</p>
          </>
        ) : (
          <p>Loading data...</p>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
