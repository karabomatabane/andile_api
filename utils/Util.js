// util class with static methods
const { ObjectId } = require('mongoose').Types;

class Util {
    static convertToObjectId(ids) {
        return ids.map(id => new ObjectId(id));
    }
}

module.exports = Util;
