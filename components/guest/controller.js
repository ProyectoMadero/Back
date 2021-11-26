const { insert, get, update, getWhere, getAll } = require('../../store/firebase');

//Reservaciones
async function postReserveRoom(req, res, next) {
    try {
        const { user, room, information, services, requests, /* check, guests, notes, totalCost, */ } = req.body;
        const entryObject = {
            user,
            room,
            information,
            services,
            requests,
            /* check,
            cost,
            guests,
            notes, */
            status: 'active'
        }
        insert('reservations', entryObject);
        res.status(201).send({
            status: 'successful',
            message: `${user.id} has reservated the room ${room.room_number} successfuly`,
            data: entryObject
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function putChangeReservationStatus(req, res, next) {
    try {
        const { id, status } = req.body
        update('reservations', id, `status: ${status}`)
        res.status(201).send({
            status: 'successful',
            message: `${id} has changed its status to ${status} successfuly`
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//Servicios
async function getServices (req, res, next){
    try {
        const services = await getAll('services');
        res.status(200).send(services);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//Peticiones
async function getRequests (req, res, next){
    try {
        const services = await getAll('requests');
        res.status(200).send(services);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//Favoritos
async function inserFavoriteRoom(req, res, next){
    try {
        const { room, id } = req.body;
        const clause = {
            atributte: 'id',
            operand: '==',
            value: id
        }
        const query = await getWhere('favorite_rooms', clause)
        const favorites = query[0];
        /* res.status(200).send(favorites); */
        favorites.rooms.push(room);
        await update('favorite_rooms', id, {rooms: favorites.rooms})
        return res.status(201).send({
            status: 'success',
            message: `favorites of guest ${id} updated successfully`,
            data: favorites
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function removeFavoriteRoom(req, res, next){
    try {
        const { id } = req.body;
        const roomID = req.body.room;
        const clause = {
            atributte: 'id',
            operand: '==',
            value: id
        }
        const query = await getWhere('favorite_rooms', clause)
        const favorites = query[0];
        const newFavorites = favorites.rooms.filter(room => room.id != roomID);
        await update('favorite_rooms', id, {rooms: newFavorites})
        return res.status(201).send({
            status: 'success',
            message: `room ${roomID} remove of guest's (${id}) favorites successfully`,
            data: newFavorites
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function getFavoriteRooms(req, res, next){
    try {
        const { id } = req.params;
        const clause = {
            atributte: 'id',
            operand: '==',
            value: id
        }
        const query = await getWhere('favorite_rooms', clause)
        const favorites = query[0];
        return res.status(200).send(favorites.rooms);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    postReserveRoom,
    putChangeReservationStatus,
    inserFavoriteRoom,
    removeFavoriteRoom,
    getFavoriteRooms,
    getServices,
    getRequests,

}