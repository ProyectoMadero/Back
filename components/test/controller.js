const { insert, update, getAll } = require('../../store/firebase');
const rooms = require('../../store/dummy/rooms.json')
const services = require('../../store/dummy/services.json')
const requests = require('../../store/dummy/requests.json')
const offers = require('../../store/dummy/offers.json')

function getInsertRooms(req, res, next){
    try {
        rooms.forEach(room => {
            insert('rooms', room);
            console.log(`room ${room.id} created successfully`);
        })
        return res.status(201).send({
            status: 'success',
            message: `rooms created successfully`,
            data: rooms
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

function getInsertServices(req, res, next){
    try {
        services.forEach(service => {
            insert('services', service);
            console.log(`service ${service.id} created successfully`);
        })
        return res.status(201).send({
            status: 'success',
            message: `services created successfully`,
            data: services
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

function getInsertRequests(req, res, next){
    try {
        requests.forEach(request => {
            insert('requests', request);
            console.log(`request ${request.id} created successfully`);
        })
        return res.status(201).send({
            status: 'success',
            message: `requests created successfully`,
            data: requests
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

function getInsertOffers(req, res, next){
    try {
        offers.forEach(offer => {
            insert('offers', offer);
            console.log(`offer ${offer.id} created successfully`);
        })
        return res.status(201).send({
            status: 'success',
            message: `offers created successfully`,
            data: offers
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function postInsertFavorites(req, res, next){
    try {
        const { id } = req.body;
        const entryObject = {
            id,
            rooms: []
        }
        await insert('favorite_rooms', entryObject);
        res.status(201).send({
            status: 'success',
            message: 'favorites created successfully',
            data: entryObject
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function getUpdateRoomsImages(req, res, next) {
    try {
        const rooms = await getAll('rooms');
        rooms.forEach(async (room, i) => {
            const entryObject = {
                images: [`r (${i + 1}).jpg`]
            }
            console.log(entryObject);
            await update('rooms', room.id, entryObject);
        });
        res.status(201).send({
            status: 'success',
            message: 'rooms\' images updated successfully',
            data: rooms
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getInsertServices,
    getInsertRooms,
    getInsertRequests,
    getInsertOffers,
    postInsertFavorites,
    getUpdateRoomsImages
}