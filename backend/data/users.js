const collections = require('../config/mongoCollections');
const users = collections.users;

module.exports = {
    async create(userEmail) {
        if(!userEmail || typeof userEmail !== 'string') throw 'Must provice a valid userEmail';

        if(await this.userExists(userEmail)) throw 'Email already in use'

        const userCollection = await users();
        let newUser = {
            userEmail: userEmail
        }

        const insertInfo = await userCollection.insertOne(newUser);
        if(insertInfo.insertedCount === 0) throw `Could not add user ${userEmail}`;

        return insertInfo.insertedId;
    },

    async getAllUsers(){
        const userCollection = await users();
        const arr = await userCollection.find({}).toArray();
        return arr;
    },

    async userExists(userID){
        if(!userID || typeof userID !== 'string') throw 'Must provide a valid userID';

        const userCollection = await users();
        const user = await userCollection.findOne({userID: userID});
        if(user === null) return false;
        return true;
    },

    async getUser(userID){
        if(!userID || typeof userID !== 'string') throw 'Must provice a valid userID';

        const userCollection = await users();
        const user = await userCollection.findOne({userID: userID});
        if(user === null) return null;
        return user;
    },
}