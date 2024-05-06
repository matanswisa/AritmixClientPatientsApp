import React, { useEffect, useState } from 'react';
import './patientList.css';
import AutocompleteSearch from '../AutoComplete/autoComplete';

const PatientList = ({ patients, loadMorePatients }) => {
    const [sortByAppointmentDate, setSortAppointmentDate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayMore, setDisplayMore] = useState(false);


    const handleSortByMeetingDate = () => {
        setSortAppointmentDate(!sortByAppointmentDate);
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
                {patient.fullName} - Next appointment: {(patient.appointments[0] !== null && patient.appointments[0]?.appointmentDate.length) ? new Date(patient.appointments[0].appointmentDate).toLocaleDateString() : "No appointment"}
            </li>
        );
    };




    const filteredPatients = patients.filter(patient =>
        patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedPatients = sortByAppointmentDate
        ? filteredPatients.slice().sort((a, b) => {
            if (!a.meetingDate) return 1;
            if (!b.meetingDate) return -1;
            return new Date(a.meetingDate) - new Date(b.meetingDate);
        })
        : filteredPatients;



    return (
        <div className="patient-list-container">

            <ul className="patient-list">
                {sortedPatients.slice(0, displayMore ? sortedPatients.length : patients.length).map(patient => renderPatientItem(patient))}
            </ul>
            {!displayMore && <button className="display-more-button" onClick={handleDisplayMore}>Display More Patients</button>}
        </div>
    );
}

export default PatientList;
