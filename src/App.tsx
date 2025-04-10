import { useEffect, useState } from 'react';
import './App.css'

function App() {
    const ENDPOINT = 'https://api.chucknorris.io/jokes';
    const [categories, setCategories] = useState([]);
    const [joke, setJoke] = useState('');

    useEffect(() => {
        getCategories();
    }, []);

    function getCategories() {
        fetch(`${ENDPOINT}/categories`)
            .then(res => res.json())
            .then(json => {
                setCategories(json);
            });
    }

    function getJoke(val) {
        fetch(`${ENDPOINT}/${val}`)
            .then(res => res.json())
            .then(json => {
                setJoke(json.value);
            });
    }

    return (
        <div className="App">
            <h1 className="text-5xl font-bold uppercase text-yellow-400">Random Chuck Norris Joke Generator</h1>

            <button className="bg-gray-900 rounded border-gray-500 px-2 py-1" onClick={() => getJoke('random')}>Generate Joke</button>

            <label htmlFor="categories">Or chose a joke from category</label>
            <select id="categories" className="text-gray-900 rounded border px-2 py-1" onChange={(event) => getJoke(`random?category=${event.target.value}`)}>
                <option>Select a category</option>
                <>
                    {categories.map((category, index) => {
                        return <option key={index} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                    })}
                </>
            </select>

            <p>{joke}</p>
        </div>
    )
}

export default App;
