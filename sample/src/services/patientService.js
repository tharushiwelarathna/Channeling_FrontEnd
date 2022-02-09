const KEYS = {
    patients: 'patients',
    patientId: 'patientsId'
}

export const getDiseasesCollection = () => ([
    { id: '1', title: 'Allergies' },
    { id: '2', title: 'Colds and Flu' },
    { id: '3', title: 'Diarrhea' },
    { id: '4', title: 'Headaches' },
])

export function insertPatient(data) {
    let patients = getAllPatients();
    data['id'] = generatePatientId()
    patients.push(data)
    localStorage.setItem(KEYS.patients, JSON.stringify(patients))
}

export function updatePatient(data) {
    let patients = getAllPatients();
    let recordIndex = patients.findIndex(x => x.id == data.id);
    patients[recordIndex] = { ...data }
    localStorage.setItem(KEYS.patients, JSON.stringify(patients));
}

export function deletePatient(id) {
    let patients = getAllPatients();
    patients = patients.filter(x => x.id != id)
    localStorage.setItem(KEYS.patients, JSON.stringify(patients));
}

export function generatePatientId() {
    if (localStorage.getItem(KEYS.patientId) == null)
        localStorage.setItem(KEYS.patientsId, '0')
    var id = parseInt(localStorage.getItem(KEYS.patientId))
    localStorage.setItem(KEYS.patientId, (++id).toString())
    return id;
}

export function getAllPatients() {
    if (localStorage.getItem(KEYS.patients) == null)
        localStorage.setItem(KEYS.patients, JSON.stringify([]))
    let patients = JSON.parse(localStorage.getItem(KEYS.patients));
    //map departmentID to department title
    let diseases = getDiseasesCollection();
    return patients.map(x => ({
        ...x,
        diseases: diseases[x.diseasesId - 1].title
    }))
}