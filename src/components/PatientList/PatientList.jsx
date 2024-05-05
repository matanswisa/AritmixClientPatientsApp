import React, { useEffect, useState } from 'react';
import './patientList.css';

const PatientList = ({ patients, loadMorePatients }) => {
    const [sortByMeetingDate, setSortByMeetingDate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayMore, setDisplayMore] = useState(false);


    const handleSortByMeetingDate = () => {
        setSortByMeetingDate(!sortByMeetingDate);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDisplayMore = () => {
        loadMorePatients();
    };

    const renderPatientItem = (patient, indx) => {
        return (
            <li className="patient-item" key={patient.id}>
                <b>{patient.id}</b>
                {patient.fullName} - Next appointment: {patient.meetingDate ? new Date(patient.meetingDate).toLocaleDateString() : "No appointment"}
            </li>
        );
    };




    const filteredPatients = patients.filter(patient =>
        patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedPatients = sortByMeetingDate
        ? filteredPatients.slice().sort((a, b) => {
            if (!a.meetingDate) return 1;
            if (!b.meetingDate) return -1;
            return new Date(a.meetingDate) - new Date(b.meetingDate);
        })
        : filteredPatients;



    return (
        <div className="patient-list-container">
            <h1>Patient List</h1>
            <div className="controls">
                <button className="sort-button" onClick={handleSortByMeetingDate}>
                    {sortByMeetingDate ? 'Sort by Default' : 'Sort by Meeting Date'}
                </button>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by Patient ID or Name"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <ul className="patient-list">
                {sortedPatients.slice(0, displayMore ? sortedPatients.length : patients.length).map(patient => renderPatientItem(patient))}
            </ul>
            {!displayMore && <button className="display-more-button" onClick={handleDisplayMore}>Display More Patients</button>}
        </div>
    );
}

export default PatientList;
