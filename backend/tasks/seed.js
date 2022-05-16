
const dbConnection = require('../config/mongoConnection');
const users = require('../data/users');
const characters = require('../data/characters');
const sessions = require('../data/sessions');

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

    try {
        // Create User
        const user1 = await users.create("e62m8hwESFdUvVmo9ZKJ56qBlOp2", "stevens@stevens.com");

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
