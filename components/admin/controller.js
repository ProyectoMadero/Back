const { admin, insert, get, getAll, changeStatus,  update } = require('../../store/firebase');

//Empleados
async function postRegisterEmployee(req, res, next){
    try {
        const { name, firstSurname, secondSurname, role, email, password } = req.body;
        const id = await admin.auth().createUser({
            email,
            emailVerified: false,
            password: password,
            displayName: `${name} ${firstSurname}`,
            disabled: false,
        })
        .then((userRecord) => {
            console.log('Successfully created new user:', userRecord.uid);
            return userRecord.uid;
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });
        console.log(id);
        const entryObject = {
            id,
            name,
            firstSurname,
            secondSurname,
            role,
            email,
        }
        await insert('employees', entryObject);
        const user = {
            id,
            email,
            role,
        }
        await insert('users', user);
        return res.status(201).send({
            status: 'success',
            message: `${role} created successfully`,
            data: entryObject
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putUpdateEmployeeData(req, res, next){
    try {
        const { id, data } = req.body;
        await update('employees', id, data);
        return res.status(201).send({
            status: 'success',
            message: `employee ${id} updated successfully`,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putUpdateEmployeeEmail(req, res, next){
    try {
        const { id, email } = req.body;
        const data = {
            email
        }
        await update('employees', id, data)
        return res.status(201).send({
            status: 'success',
            message: `email of employee ${id} updated successfully`
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putToggleStatusEmployee (re, res, next) {
    try {
        const { id } = req.body;
        await changeStatus('employees', id);
        res.status(201).send({
            status: 'success',
            message: `status of employee ${id} updated successfully`
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function getEmployee (req, res, next) {
    try {
        const { id } = req.params
        const document = await get('employees', id)
        return res.status(200).send(document)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function getEmployees (req, res, next) {
    try {
        const collection = await getAll('employees')
        return res.status(200).send(collection)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    postRegisterEmployee,
    putUpdateEmployeeData,
    putUpdateEmployeeEmail,
    getEmployee,
    getEmployees,
    putToggleStatusEmployee,
}