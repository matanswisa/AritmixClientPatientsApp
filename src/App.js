import logo from './logo.svg';
import './App.css';
import PatientList from './components/PatientList/PatientList';
// import { patients } from './data/patients';
import { useEffect, useState } from 'react';
import SearchComponent from './components/AutoComplete/autoComplete';

const JUMPS = 10;
const take = 10

function App() {

  const [patients, setPatients] = useState([]);
  const [skip, setSkip] = useState(0);
  const [patient, selectedPatient] = useState({});
  const [isResetPatientsList, setIsResetPatientsList] = useState(false);

  const loadMorePatients = (isResetPatientsList) => {
    const apiUrl = `http://localhost:5000/api/Patients/Paged?skip=${skip}&take=${take}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => { //update patients with 10 more
        setPatients(prevPatients => isResetPatientsList ? [...prevPatients, ...data] : [...data]);
        setSkip(prevSkip => prevSkip + JUMPS);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }


  useEffect(() => {
    fetch(`http://localhost:5000/api/Patients/Paged?skip=${skip}&take=${take}`)
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

  }, [])


  useEffect(() => {
    console.log(patients)
  }, [patients])

  return (
    <div className="App">
      <h1>Patient List</h1>
      <div className="controls">
        <SearchComponent setPatients={setPatients} setSkip={setSkip} skip={skip} setIsResetPatientsList={setIsResetPatientsList} />

      </div>
      <PatientList patients={patients} loadMorePatients={loadMorePatients} />
    </div>
  );
}

export default App;
