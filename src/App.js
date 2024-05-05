import logo from './logo.svg';
import './App.css';
import PatientList from './components/PatientList/PatientList';
// import { patients } from './data/patients';
import { useEffect, useState } from 'react';

const JUMPS = 10;

function App() {

  const [patients, setPatients] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);

  const loadMorePatients = () => {
    const apiUrl = `https://localhost:5001/api/Patients/Paged?skip=${skip + JUMPS}&take=10`;
    const tempPatients = [...patients];

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => { //update patiantes with 10 more.
        const updatedPatientsList = [...tempPatients, ...data];
        console.log("Updated list = ", updatedPatientsList);
        setPatients(updatedPatientsList);
        setSkip(skip + JUMPS);
        setTake(take + JUMPS);
      })


  }

  useEffect(() => {
    fetch(`https://localhost:5001/api/Patients/Paged?skip=${skip}&take=${take}`)
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
      <PatientList patients={patients} loadMorePatients={loadMorePatients} />
    </div>
  );
}

export default App;
