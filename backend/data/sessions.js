const { ObjectId } = require("mongodb");
const collections = require("../config/mongoCollections");
const sessions = collections.sessions;
const userData = require('./users');


async function createSession(sessionName, dungeonMasterId, characterIds = []){
    if (!sessionName) throw "Must provide a session name";
    if (typeof sessionName !== 'string') throw 'Session name must be a string';
    // Add any Session Name restrictions? Len? ints?

    const existsDM = await userData.userExists(dungeonMasterId);
    if (!existsDM) throw 'Must be a dungeon master';

    // Create a session object
    const sessionCollection = await sessions();
    const newSession = {
        sessionName: sessionName,
        characterIds: characterIds
    };

    // Add session object to db
    const insertInfo = await sessionCollection.insertOne(newSession);
    if (insertInfo.insertedCount === 0) throw 'Could not add session';

    return newSession;
}

async function getSession(sessionId, dungeonMasterId){
    if (!sessionId) throw "Must provide a session id";
    if (typeof sessionId !== 'string') throw 'Session name must be a string';

    const existsDM = await userData.userExists(dungeonMasterId);
    if (!existsDM) throw 'Must be a dungeon master';

    // Mongo look up for session
    const sessionCollection = await sessions();
    const session = await sessionCollection.findOne({ _id: ObjectId(sessionId) });
    if (!session) throw "Session does not exist";

    return session;
}

async function getSessions(dungeonMasterId){
    const existsDM = await userData.userExists(dungeonMasterId);
    if (!existsDM) throw 'Must be a dungeon master';

    const sessionCollection = await sessions();
    const sessionList = await sessionCollection.find({}).toArray();
    if (!sessionList) throw "No sessions exist";

    return sessionList;
}

async function deleteSession(sessionId, dungeonMasterId){
    if (!sessionId) throw "Must provide a session id";
    if (typeof sessionId !== 'string') throw 'Session name must be a string';

    const existsDM = await userData.userExists(dungeonMasterId);
    if (!existsDM) throw 'Must be a dungeon master';

    // Check if sesison exists
    const sessionCollection = await sessions();
    const session = await this.getSession(sessionId);
    if (!session) throw 'Session not found';

    // Delete Session
    const deleteInfo = await sessionCollection.deleteOne({ _id: ObjectId(sessionId) });
    if (deleteInfo.deletedCount === 0) throw 'Could not delete post';

    return true;
}

async function addCharacterToSession(sessionId, characterId){
    if (!sessionId) throw "Must provide a session id";
    if (typeof sessionId !== 'string') throw 'Session id must be a string';
    if (!characterId) throw "Must provide a character id";
    if (typeof characterId !== 'string') throw 'Character id must be a string';

    // Check if session exists
    const sessionCollection = await sessions();
    const session = await this.getSession(sessionId);
    if (!session) throw 'Session not found';
    const sessionOid = ObjectId(session._id);
    
    // Add new id to the list
    const { characterIds } = session;
    let newCharIdList = characterIds;
    newCharIdList.push(characterId);

    // Create new session
    const newSession = {
        sessionName: session.sessionName,
        characterIds: newCharIdList
    };

    // Update the db
    const updateInfo = await sessionCollection.updateOne(
        { _id: sessionOid },
        { $set: newSession }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return newSession
}

async function sessionExists(sessionName){
    if (!sessionName) throw "Must provide a session id";
    if (typeof sessionName !== 'string') throw 'Session id must be a string';

    // const existsDM = await userData.userExists(dungeonMasterId);
    // if (!existsDM) throw 'Must be a dungeon master';

    const sessionCollection = await sessions();
    const session = await sessionCollection.findOne({ sessionName: sessionName });

    return (session) ? true : false;
}

module.exports = {
    createSession,
    getSession,
    getSessions,
    deleteSession,
    addCharacterToSession,
    sessionExists
}