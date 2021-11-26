const upload = require('../../middlewares/uploadRoomPictures');
const { insert, get, getAll, changeStatus,  update } = require('../../store/firebase');

//SERVICIOS
async function postInsertService(req, res, next) {
    try {
        const { name, description, image, price, discount, time } = req.body
        entryObject = {
            name,
            description,
            image,
            price,
            discount,
            time
        }
        await insert('services', entryObject);
        return res.status(201).send({
            status: 'success',
            message: `service ${entryObject.name} created successfully`,
            data: entryObject
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putEditService(req, res, next) {
    try {
        const { id, data } = req.body;
        await update('services', id, data)
        return res.status(201).send({
            status: 'success',
            message: `service ${id} updated successfully`,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putChangeStatusService(req, res, next) {
    try {
        const { id } = req.body;
        await changeStatus('service', id);
        res.status(201).send({
            status: 'success',
            message: `status of service ${id} updated successfully`
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

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
async function postInsertRequest(req, res, next) {
    try {
        const { name, description, image, time } = req.body
        entryObject = {
            name,
            description,
            image,
            time
        }
        await insert('requests', entryObject);
        return res.status(201).send({
            status: 'success',
            message: `request ${entryObject.name} created successfully`,
            data: entryObject
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putEditRequest(req, res, next) {
    try {
        const { id, data } = req.body;
        await update('requests', id, data)
        return res.status(201).send({
            status: 'success',
            message: `request ${id} updated successfully`,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putChangeStatusRequest(req, res, next) {
    try {
        const { id } = req.body;
        await changeStatus('requests', id);
        res.status(201).send({
            status: 'success',
            message: `status of request ${id} updated successfully`
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

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
async function postInsertOffer(req, res, next) {
    try {
        const { name, description, image } = req.body
        entryObject = {
            name,
            description,
            image
        }
        await insert('offers', entryObject);
        return res.status(201).send({
            status: 'success',
            message: `offer ${entryObject.name} created successfully`,
            data: entryObject
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putEditOffer(req, res, next) {
    try {
        const { id, data } = req.body;
        await update('offers', id, data)
        return res.status(201).send({
            status: 'success',
            message: `offer ${id} updated successfully`,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function putChangeStatusOffer(req, res, next) {
    try {
        const { id } = req.body;
        await changeStatus('offers', id);
        res.status(201).send({
            status: 'success',
            message: `status of offer ${id} updated successfully`
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

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

//HABITACIONES
async function postInsertRoom (req, res, next) {
    try {
        const { type, number, features, description} = req.body
        const entryObject = {
            type,
            number,
            description,
            features,
        }
        console.log(entryObject);
        await insert('rooms', entryObject)
        return res.status(200).send({
            status: 'success',
            message: 'room added successfully',
            data: entryObject
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}

async function postInsertRoomImages (req, res, next) {
    try {
        let images = [];
        for (const file of req.files) {
            images.push(file.originalname);
        }
        update('rooms', req.params.id, {images})
        return res.status(200).send({
            status: 'success',
            message: `room's (${req.params.id}) images added successfully`,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}

async function putUpdateRoom (req, res, next) {
    try {
        const { type, number, features, description, images, idRoom} = req.body
        const entryObject = {
            type,
            number,
            description,
            features,
            images,
            idRoom
        }
        update('rooms', idRoom, entryObject);
        return res.status(200).send({
            status: 'success',
            message: 'room added successfully',
            data: entryObject
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}

async function putUpdateRoomImages (req, res, next) {
    try {
        let images = [];
        for (const file of req.files) {
            images.push(file.originalname);
        }
        return res.status(200).send({
            status: 'success',
            message: `room's (${req.params.id}) images added successfully`,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}

async function deleteRoom (req, res, next) {
    const { id } = req.params
    try {
        remove('rooms', id)
        return res.status(200).send({
            status: 'success',
            message: 'entry delated successfully',
            data: id
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

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

//HUESPEDES
async function postRegisterGuestWithExternalProvider (req, res, next) {
    try {
        const {name, email, password, id} = req.body;
        const { firstName, firstSurname, secondSurname } = getNameAndSurNames(name)
        console.log(firstName);
        const entryObject = {
            firstName,
            firstSurname,
            secondSurname,
            email,
            password,
            id
        }
        await insert('users', entryObject)
        res.status(200).send({
            status: 'success',
            message: 'entry added successfully',
            data: entryObject
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function postRegisterGuest(req, res, next) {
    try {
        const {id, email, password, names, firstSurname, secondSurname, birthday } = req.body
        const entryObject = {
            id,
            email,
            password,
            names,
            firstSurname,
            secondSurname,
            birthday
        }
        await insert('users', entryObject)
        res.status(200).send({
            status: 'success',
            message: 'entry added successfully',
            data: entryObject
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function getGuest (req, res, next) {
    try {
        const id = req.params.id
        const document = await get('guests', id)
        delete document.password
        console.table(document);
        return res.status(200).send(document)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

async function getGuests (req, res, next) {
    try {
        const collection = await getAll('guests')
        collection.forEach( user => {
            delete user.password
        })
        return res.status(200).send(collection)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

/* FUNCIONES AUXILIARES */

async function getNameAndSurNames(str) {
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
    console.log(names);
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
    console.log(`Nombres: ${firstName}`);
    console.log(`1er Apellido: ${firstSurname}`);
    console.log(`2do Apellido: ${secondSurname}`);
    return userName
}

async function firstLetterUpperCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    postInsertRoom,
    postInsertRoomImages,
    putUpdateRoom,
    putUpdateRoomImages,
    deleteRoom,
    getRoom,
    getRooms,
    postRegisterGuestWithExternalProvider,
    postRegisterGuest,
    getGuest,
    getGuests,
    postInsertService,
    putEditService,
    putChangeStatusService,
    getService,
    getServices,
    postInsertRequest,
    putEditRequest,
    putChangeStatusRequest,
    getRequest,
    getRequests,
    postInsertOffer,
    putEditOffer,
    putChangeStatusOffer,
    getOffer,
    getOffers,
}