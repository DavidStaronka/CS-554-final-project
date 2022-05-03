const collections = require('../config/mongoCollections');
const users = collections.users;

module.exports = {
    async create(firebaseuid, userEmail) {
        if(!userEmail || typeof userEmail !== 'string') throw 'Must provice a valid userEmail';
        if(!firebaseuid || typeof firebaseuid !== 'string') throw 'Must provice a valid firebaseuid';
        if(await this.userExists(firebaseuid)) throw 'user already in use'

        const userCollection = await users();
        let newUser = {
            userEmail: userEmail,
            firebaseuid: firebaseuid,
            sessions: [],
            characters: [],
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