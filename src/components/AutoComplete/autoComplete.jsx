import React, { useEffect, useState } from 'react';
import './autoComplete.css'

function SearchComponent({ setSkip, skip, patients }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    console.log(showResults, results)

    const handlePatientClick = (item) => {
        console.log("clicked,.....", item)
        setQuery(item.fullName);
        // setPatients([item])
        // setSkip(0)
        setResults([])
        // clearSearch()
        setShowResults(false);
    };

    const fetchPatients = (query) => {
        fetch("http://localhost:5000/api/Patients").then((response) => {
            return response.json();
        }).then((json) => {

            const results = json.filter(patient => patient.fullName.toLowerCase().includes(query.toLowerCase()) || String(patient.id).includes(query?.toLowerCase())).splice(0, 10);
            console.log(results);
            if (results.length) {
                setResults(results)
                setShowResults(true)
            }
        })
    }

    const onSearch = (event) => {

        fetchPatients(event.target.value)
        setQuery(event.target.value)


    }

    const clearSearch = (event) => {
        // if (!results.length)
        setShowResults(false);

    }


    const showSearchResults = () => {
        setShowResults(true);
    };

    const hideSearchResults = () => {
        // Add a slight delay before hiding the results
        setTimeout(() => {
            setShowResults(false);
        }, 200); // Adjust the delay time as needed
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
