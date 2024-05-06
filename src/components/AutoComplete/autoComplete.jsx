import React, { useEffect, useState } from 'react';
import './autoComplete.css'
function SearchComponent({ setPatients, setSkip, skip }) {
    const [patient, setPatient] = useState(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    console.log(showResults, results)

    const handlePatientClick = (item) => {
        console.log("clicked,.....", item)
        setQuery(item.fullName);
        setPatients([item])
        setPatient(item)
        setSkip(0)
        setResults([]);
        setShowResults(false);
    };

    const fetchPatients = (query) => {
        fetch("http://localhost:5000/api/Patients").then((response) => {
            return response.json();
        }).then((json) => {

            const results = json.splice(0, skip + 10).filter(patient => patient.fullName.toLowerCase().includes(query.toLowerCase()) || String(patient.id).includes(query.toLowerCase()));
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
        setShowResults(false);
    }


    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={onSearch}
                // onBlur={clearSearch}

                placeholder="Search patient..."
            />
            {showResults && (
                <div className="results-container">
                    {results.map((patient, index) => (
                        <div key={index} className="result-item" onClick={() => handlePatientClick(patient)}>
                            id: {patient.id} ,  {patient.fullName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchComponent;
