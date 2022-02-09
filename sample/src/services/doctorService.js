
const KEYS = {
    doctors: 'doctors',
    doctorId: 'doctorId'
}

export const getSpecializationCollection = () => ([
    { id: '1', title: 'Allergy and immunology' },
    { id: '2', title: 'Anesthesiology' },
    { id: '3', title: 'Dermatology' },
    { id: '4', title: 'Diagnostic radiology' },
])

export function insertDoctor(data) {
    let doctors = getAllDoctors();
    data['id'] = generateDoctorId()
    doctors.push(data)
    localStorage.setItem(KEYS.doctors, JSON.stringify(doctors))
}

export function updateDoctor(data) {
    let doctors = getAllDoctors();
    let recordIndex = doctors.findIndex(x => x.id == data.id);
    doctors[recordIndex] = { ...data }
    localStorage.setItem(KEYS.doctors, JSON.stringify(doctors));
}

export function deleteDoctor(id) {
    let doctors = getAllDoctors();
    doctors = doctors.filter(x => x.id != id)
    localStorage.setItem(KEYS.doctors, JSON.stringify(doctors));
}

export function generateDoctorId() {
    if (localStorage.getItem(KEYS.doctorId) == null)
        localStorage.setItem(KEYS.doctorId, '0')
    var id = parseInt(localStorage.getItem(KEYS.doctorId))
    localStorage.setItem(KEYS.doctorId, (++id).toString())
    return id;
}

export function getAllDoctors() {
    console.log("get doctor");
    

    if (localStorage.getItem(KEYS.doctors) == null)
        localStorage.setItem(KEYS.doctors, JSON.stringify([]))
    let doctors = JSON.parse(localStorage.getItem(KEYS.doctors));
    //map departmentID to department title
    let specializations = getSpecializationCollection();
    return doctors.map(x => ({
        ...x,
        specialization: specializations[x.specializationId - 1].title
    }))
}