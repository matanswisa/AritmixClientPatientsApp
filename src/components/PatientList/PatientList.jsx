import React, { useEffect, useState } from 'react';
import './patientList.css';

const PatientList = ({ patients, patient, loadMorePatients }) => {
    const [displayMore, setDisplayMore] = useState(false);
    const [sortedPatients, setSortedPatients] = useState([]);


    const handleDisplayMore = () => {
        loadMorePatients(true);
    };

    const renderPatientItem = (patient, indx) => {
        const lastAppointmentIndx = patient.appointments.length - 1;
        return (
            <li className="patient-item" key={patient.id}>
                <b>id:{patient.id} </b> ,
                <b>{patient.fullName}</b> 
                {patient.appointments.length > 0 && (
                    <p>
                        Next appointment date: <b> {(patient.appointments[lastAppointmentIndx] !== null && patient.appointments[lastAppointmentIndx]?.appointmentDate.length) ? new Date(patient.appointments[lastAppointmentIndx].appointmentDate).toLocaleDateString() : ""}</b>
                        <br />appointment details: {patient.appointments.length && patient.appointments[lastAppointmentIndx].appointmentType.name}
                    </p>
                )}
            </li>
        );
    };

    const sortAppointmentsByDate = (appointments) => {
        return appointments.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    };

    const sortPatientsByClosestAppointment = (patients) => {
        patients.forEach(patient => {
            if (patient.appointments.length > 0) {
                patient.appointments = sortAppointmentsByDate(patient.appointments);
            }
        });

        return patients.sort((a, b) => {
            if (a.appointments.length === 0) return 1;
            if (b.appointments.length === 0) return -1;
            const closestAppointmentA = a.appointments[a.appointments.length - 1].appointmentDate;
            const closestAppointmentB = b.appointments[b.appointments.length - 1].appointmentDate;
            return new Date(closestAppointmentA) - new Date(closestAppointmentB);
        });
    };

    useEffect(() => {
        const tempSortedPatients = sortPatientsByClosestAppointment(patients)
        setSortedPatients(tempSortedPatients)
    }, [patients])

    return (
        <div className="patient-list-container">

            <ul className="patient-list">
                {(patient !== null && sortedPatients) ?
                    renderPatientItem(patient) :
                    sortedPatients.map(patient => renderPatientItem(patient))
                }
            </ul>
            {!displayMore && <button className="display-more-button" onClick={handleDisplayMore}>Display More Patients</button>}
        </div>
    );
}

export default PatientList;
