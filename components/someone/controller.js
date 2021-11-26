const { insert, getWhere, update, getAll, get } = require('../../store/firebase');
const path = require('path');

//USUARIOS
async function postResgisterGuestWithExternalProvider (req, res, next) {
    try {
        const {name, email, id} = req.body;
        const { firstName, firstSurname, secondSurname } = getNameAndSurNames(name)
        const entryObject = {
            firstName,
            firstSurname,
            secondSurname,
            email,
            id
        }
        await insert('guests', entryObject)
        const user = {
            id,
            email,
            role: 'guest'
        }
        await insert('users', user);
        const favoriteRooms = {
            id: entryObject.id,
            rooms: []
        }
        await insert('favorite_rooms', favoriteRooms);
        res.status(201).send({
            status: 'success',
            message: 'guest created successfully',
            data: entryObject
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function postResgisterBirthday (req, res, next) {
    try {
        const { id } = req.body;
        let { birthday } = req.body;
        if(birthday.length > 10){
            const guestBithday = birthday.split('T')
            birthday = guestBithday[0];
        }
        await update('guests', id, { birthday })
        res.status(201).send({
            status: 'success',
            message: `guest\'s (${id}) birthday (${birthday}) updated successfully`
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function postResgisterGuest(req, res, next) {
    try {
        const { email, names, firstSurname, secondSurname } = req.body
        let { birthday } = req.body;
        if(birthday.length > 10){
            const guestBithday = birthday.split('T')
            birthday = guestBithday[0];
        }
        const entryObject = {
            email,
            names,
            firstSurname,
            secondSurname,
            birthday
        }
        await insert('guests', entryObject);
        const user = {
            id: entryObject.id,
            email,
            role: 'guest'
        }
        await insert('users', user);
        const favoriteRooms = {
            id: entryObject.id,
            rooms: []
        }
        await insert('favorite_rooms', favoriteRooms);
        res.status(201).send({
            status: 'success',
            message: 'guest created successfully',
            data: entryObject
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function postCheckDataHuesped(req, res, next) {
    try {
        const { email } = req.body
        const clause = {
            atributte: 'email',
            operand: '==',
            value: email
        }
        const query = await getWhere('guests', clause)
        const userExist = query.find(user => email === user.email)
        res.status(200).send(userExist)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function postCheckUserRol(req, res, next){
    try {
        const { id } = req.body
        const clause = {
            atributte: 'id',
            operand: '==',
            value: id
        }
        const query = await getWhere('users', clause)
        const user = query.find(user => id === user.id)
        res.status(200).send(user)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

//HABITACIONES
async function getRoom (req, res, next) {
    const { id } = req.params
    try {
        const document = await get('rooms', id)
        return res.status(200).send(document)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function getRooms (req, res, next) {
    try {
        const collection = await getAll('rooms')
        return res.status(200).send(collection)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

//SERVICIOS
async function getService(req, res, next) {
    try {
        const { id } = req.params
        const document = await get('services', id)
        return res.status(200).send(document)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function getServices(req, res, next) {
    try {
        const collection = await getAll('services')
        return res.status(200).send(collection)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

//PETICIONES
async function getRequest(req, res, next) {
    try {
        const { id } = req.params
        const document = await get('requests', id)
        return res.status(200).send(document)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function getRequests(req, res, next) {
    try {
        const collection = await getAll('requests')
        return res.status(200).send(collection)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
//OFERTAS
async function getOffer(req, res, next) {
    try {
        const { id } = req.params
        const document = await get('offers', id)
        return res.status(200).send(document)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function getOffers(req, res, next) {
    try {
        const collection = await getAll('offers')
        return res.status(200).send(collection)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

//IMAGENES
async function getRoomImage(req, res, next) {
    const image = path.join(__dirname, `../../public/img/rooms/${req.params.id}`);
    res.status(200).sendFile(image);
}

/* FUNCIONES AUXILIARES */

function getNameAndSurNames(str) {
    const tokens = str.split(' ');
    let names = new Array(); // Arreglo donde se guardan las palabras del nombre.
    const special_tokens = new Array('da','de','del','la', 'las','los','mac','mc','van','von','y','i','san','santa');// Palabras de apellidos y nombres compuestos
    let preposition = '';
    tokens.forEach(token =>{
        const _token = token.toLowerCase();
        if(special_tokens.includes(_token)) {
            preposition += _token + ' ';
        } else {
            names.push(preposition + firstLetterUpperCase(_token));
            preposition = '';
        }
    });
    let numNames = names.length;
    let firstName = '';
    let firstSurname = '';
    let secondSurname = '';
    switch (numNames){
        case 0:
            firstName = '';
        break;
        case 1:
            firstName = names[0];
        break;
        case 2:
            firstName = names[0];
            firstSurname = names[1];
        break;
        case 3:
            firstName = names[0];
            firstSurname = names[1];
            secondSurname = names[2];
        break;
        default:
            firstName = `${names[0]} ${names[1]}`;
            firstSurname = names[2];
            secondSurname = names[3];
        break;
    }
    userName = {
        firstName,
        firstSurname,
        secondSurname
    }
    return userName
}

function firstLetterUpperCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    postResgisterGuestWithExternalProvider,
    postResgisterGuest,
    postCheckDataHuesped,
    postResgisterBirthday,
    postCheckUserRol,
    getRoom,
    getRooms,
    getService,
    getServices,
    getRequest,
    getRequests,
    getOffer,
    getOffers,
    getRoomImage,
}