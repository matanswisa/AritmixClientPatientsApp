import './App.css';
import PatientList from './components/PatientList/PatientList';
import { useEffect, useState } from 'react';
import SearchComponent from './components/AutoComplete/autoComplete';

export const TAKE_10_PATIENTS = 10 // number of patients to fetch each time

function App() {

  const [patient, setPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [skip, setSkip] = useState(0);

  const loadMorePatients = () => {
    const apiUrl = `http://localhost:5000/api/Patients/Paged?skip=${skip}&take=${TAKE_10_PATIENTS}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPatients(prevPatients => [...prevPatients, ...data]);
        setSkip(prevSkip => prevSkip + TAKE_10_PATIENTS);
        setPatient(null);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }


  useEffect(() => {
    fetch(`http://localhost:5000/api/Patients/Paged?skip=${skip}&take=${TAKE_10_PATIENTS}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPatients(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    setSkip(skip + TAKE_10_PATIENTS)
  }, [])


  return (
    <div className="App">
      <h1>Patient List</h1>
      <div className="controls">
        <SearchComponent setPatient={setPatient} patient={patient} setSkip={setSkip} patients={patients} setPatients={setPatients} />

      </div>
      <PatientList patient={patient} patients={patients} loadMorePatients={loadMorePatients} />
    </div>
  );
}

export default App;
