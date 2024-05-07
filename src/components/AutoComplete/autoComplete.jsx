import React, { useEffect, useState } from 'react';
import './autoComplete.css';

function SearchComponent({ setPatient }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    let debounceTimer;

    const handlePatientClick = (item) => {
        setQuery(item.fullName);
        setPatient(item);
        setResults([]);
        setShowResults(false);
    };

    const fetchPatients = (query) => {
        fetch("http://localhost:5000/api/Patients")
            .then((response) => response.json())
            .then((json) => {
                const filteredResults = json.filter(patient => patient.fullName.toLowerCase().includes(query.toLowerCase()) || String(patient.id).includes(query?.toLowerCase())).splice(0, 10);
                setResults(filteredResults);
                setShowResults(true);
            });
    };

    const debounce = (func, delay) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    };

    const onSearch = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        debounce(() => {
            fetchPatients(newQuery);
        }, 1000);
    };

    const showSearchResults = () => {
        setShowResults(true);
    };

    const hideSearchResults = () => {
        setTimeout(() => {
            setShowResults(false);
        }, 300);
        if (!query.length) {
            setPatient(null);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={onSearch}
                onFocus={showSearchResults}
                onBlur={hideSearchResults}
                placeholder="Search patient..."
            />
            {showResults && (
                <div className="results-container">
                    {results.map((patient, index) => (
                        <div key={index} className="result-item" onClick={() => handlePatientClick(patient)}>
                            id: {patient.id} , {patient.fullName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchComponent;
