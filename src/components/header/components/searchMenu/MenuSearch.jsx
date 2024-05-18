import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menuSearch.scss';
import { RiSearch2Line } from 'react-icons/ri';
import logoHorizontal from '../../../../assets/imgLemnos/logoHorizontal.svg';

export default function MenuSearch() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const products = [
            {
                id: 1,
                name: 'Apple 27" iMac Desktop Computer (16GB RAM, 1TB HDD, Intel Core i5)',
                price: 19.99,
                image: logoHorizontal,
            },
            {
                id: 2,
                name: 'Product 2',
                price: 24.99,
                image: '../../../assets/logoHorizontal.png',
            },
            {
                id: 3,
                name: 'Product 3',
                price: 24.99,
                image: 'product2.jpg',
            },
            {
                id: 4,
                name: 'Product 4',
                price: 24.99,
                image: 'product2.jpg',
            },
            {
                id: 5,
                name: 'Product 5',
                price: 24.99,
                image: 'product2.jpg',
            },
            {
                id: 6,
                name: 'Product 6',
                price: 24.99,
                image: 'product2.jpg',
            },
            {
                id: 7,
                name: 'Product 7',
                price: 24.99,
                image: 'product2.jpg',
            },
            {
                id: 8,
                name: 'Product 8',
                price: 24.99,
                image: 'product2.jpg',
            },
            {
                id: 9,
                name: 'Product 9',
                price: 24.99,
                image: 'product2.jpg',
            },
            {
                id: 10,
                name: 'Product 10',
                price: 24.99,
                image: 'product2.jpg',
            },
        ];

        const filteredResults = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );

        setSearchResults(filteredResults);
        setShowResults(true); 
    };

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/productFilter?search=${searchTerm}`);
    };

    const handleSearchResultClick = (productId) => {
        navigate(`/product/${productId}`);
        setSearchTerm('');
        setSearchResults([]);
        setShowResults(false);
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        onCategoryChange(newCategory);
    };

    return (
        <div className="searchContainer">
            <form onSubmit={handleSearch} className="inputSearch">
                <input
                    type="text"
                    placeholder="Search..."
                    name="search"
                    id="inputSearch"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onBlur={() => setShowResults(false)}
                />
                <button type="submit">
                    <RiSearch2Line className="searchIcon" />
                </button>
            </form>
            {showResults && searchResults.length > 0 && (
                <ul className="searchResults">
                    {searchResults.map(product => (
                        <li
                            className="itemSearch"
                            key={product.id}
                            onClick={() => handleSearchResultClick(product.id)}
                        >
                            <div className="containerVisual">
                                <img src={product.image} alt="imagem produto" />
                                <h4>{product.name}</h4>
                            </div>
                            <p>{BRL.format(product.price)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
