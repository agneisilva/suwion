var mongo = require('mongodb');

let getCompleteDoc = (id, localField, collectionToJoin, foreignField) => {
    let query = [
        {
            "$match": {
                "_id": new mongo.ObjectID(id)
              }
        },
        {
            "$lookup": {
                "from": collectionToJoin,
                "localField": localField ,
                "foreignField": foreignField ,
                "as": localField
            }
        }
    ];

    return query;
}

let selectById = (value) => {
    let query = { _id: new mongo.ObjectID(value) };

    return query;
}

let selectExact = (field, value) => {
    let query = {};

    query[field] = { '$regex': "^" + value + "$", '$options': 'i' };

    return query;
}

let selectConteins = (field, value) => {
    let query = {};

    query[field] = { '$regex': value, '$options': 'i' };

    return query;
}

let updateById = (doc) => {
    let identifyQuery = selectById(doc._id);

    delete doc._id;

    let data = { $set: doc };

    return [identifyQuery, data];
}

let ToObjectID = (value) => {
    return new mongo.ObjectID(value);
}

exports.getCompleteDoc = getCompleteDoc;
exports.selectById = selectById;
exports.selectExact = selectExact;
exports.selectConteins = selectConteins;
exports.updateById = updateById;
exports.ToObjectID = ToObjectID;