
const dbConnection = require('../config/mongoConnection');
const users = require('../data/users');
const characters = require('../data/characters');
const sessions = require('../data/sessions');

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

    try {
        // User
        const user1 = await users.create("e62m8hwESFdUvVmo9ZKJ56qBlOp2", "stevens@stevens.com");

        // Session
        const session1 = await sessions.createSession("Test Session 100", user1);

        // Character
        const character1 = await characters.createCharacter({ name: "Test Character", session: session1.session, userId: user1 }); 

        console.log(JSON.stringify(session1));
        //console.log(character1);
;    } 
    catch (e) {
        console.log(e);
    }

  console.log('Done seeding database');
  await db.serverConfig.close();
};

main().catch(console.log);
