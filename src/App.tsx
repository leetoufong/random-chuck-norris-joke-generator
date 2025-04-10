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
        <>
            <button onClick={() => getJoke('random')}>Click to generate a Random Chuck Norris Joke</button>
            <p>Or chose a joke from category below</p>
            <select onChange={(event) => getJoke(`random?category=${event.target.value}`)}>
                <option>Select a category</option>
                <>
                    {categories.map((category, index) => {
                        return <option key={index} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                    })}
                </>
            </select>
            <p>{joke}</p>
        </>
    )
}

export default App;
