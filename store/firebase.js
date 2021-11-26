const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

//Funciones CRUD
async function insert (collection, entryObject) {
    let entry
    if(!entryObject.id){
        entry = db.collection(collection).doc()
        entryObject.id = entry.id
    } else {
        entry = db.collection(collection).doc(entryObject.id.toString())
    }
    await entry.set(entryObject)
}

async function remove (collection, id) {
    await db.collection(collection).doc(id).delete();
}

async function changeStatus (collection, id, active) {
    await db.collection(collection).doc(id).update({active: !active})
}

async function get (collection, id = ''){
    const ref = db.collection(collection).doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
        console.log('No such document!');
    }
    return doc.data();
}

async function getWhere (collection, clause) {
    const { atributte, operand, value } = clause
    const query = new Array()
    await db.collection(collection).where(atributte, operand, value)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            query.push(doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    return query;
}

async function getAll(collection) {
    const ref = db.collection(collection);
    const documents = await ref.get();
    const array = []
    if (documents.empty) {
        console.log('No matching documents');
        return;
    }
    documents.forEach(doc => array.push(doc.data()));
    return array;
}

async function update(collection, id, data) {
    const ref = db.collection(collection).doc(id);
    await ref.update(data)
}

module.exports = {
    admin,
    db,
    insert,
    remove,
    get,
    getWhere,
    getAll,
    update,
    changeStatus
}