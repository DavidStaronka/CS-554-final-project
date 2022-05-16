
const dbConnection = require('../config/mongoConnection');
const users = require('../data/users');
const characters = require('../data/characters');
const sessions = require('../data/sessions');

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

    try {
        // Create User
        const user1 = await users.create("afeWxWqnXmaZ1rv1hhNDXOyON6l1", "test@test.com");

        // Create Session
        const session1 = await sessions.createSession("Test Session", user1);

        // Create Character
        const character1 = await characters.createCharacter({ name: "Test Character", session: session1.sessionName, userId: user1 });
;    } 
    catch (e) {
        console.log(e);
    }

  console.log('Done seeding database');
  await db.serverConfig.close();
};

main().catch(console.log);
