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
        <div className="text-center p-20 w-full max-w-[900px] ml-auto mr-auto">
            <h1 className="font-bold uppercase text-yellow-300 mb-10"><span className="block text-6xl">Random</span> <span className="block text-8xl">Chuck Norris</span> <span className="block text-6xl">Joke Generator</span></h1>

            <div className="mb-5">
                <button className="bg-gray-900 rounded border-gray-500 px-2 py-1" onClick={() => getJoke('random')}>Generate a joke</button>
            </div>

            <div className="mb-10">
                <label className="mr-3" htmlFor="categories">Or chose a joke from category:</label>
                <select id="categories" className="text-gray-900 rounded border px-2 py-1" onChange={(event) => getJoke(`random?category=${event.target.value}`)}>
                    <option>Select a category</option>
                    <>
                        {categories.map((category, index) => {
                            return <option key={index} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                        })}
                    </>
                </select>
            </div>

            <p className="text-yellow-300 text-4xl">{joke}</p>
        </div>
    )
}

export default App;
