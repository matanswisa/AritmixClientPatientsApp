import React, { useEffect, useState } from 'react';
import './patientList.css';

const PatientList = ({ patients, loadMorePatients }) => {
    const [displayMore, setDisplayMore] = useState(false);


    const handleDisplayMore = () => {
        loadMorePatients(true);
    };

    const renderPatientItem = (patient, indx) => {
        return (
            <li className="patient-item" key={patient.id}>
                <b>{patient.id}</b>
                {patient.fullName} - Next appointment: {(patient.appointments[0] !== null && patient.appointments[0]?.appointmentDate.length) ? new Date(patient.appointments[0].appointmentDate).toLocaleDateString() : "No appointment"}
            </li>
        );
    };


    return (
        <div className="patient-list-container">

            <ul className="patient-list">
                {patients.map(patient => renderPatientItem(patient))}
            </ul>
            {!displayMore && <button className="display-more-button" onClick={handleDisplayMore}>Display More Patients</button>}
        </div>
    );
}

export default PatientList;
