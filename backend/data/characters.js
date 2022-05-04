const collections = require("../config/mongoCollections");
const characters = collections.characters;

module.exports = {
  async createCharacter(body) {
    console.log(body);
    if (!body.name || typeof body.name !== "string") throw "Must provice a valid name";
    if (!body.session || typeof body.session !== "string")
      throw "Must provice a valid session name";
    if (!body.userId || typeof body.userId !== "string") throw "Invalid userId";

    // if (await this.userExists(firebaseuid)) throw "user already in use";

    const { name, session, userId } = body;
    const characterCollection = await characters();
    let newCharacter = {
      profileId: userId,
      dmId: "we need to figure this out",
      sessionId: session,
      inspiration: 0,
      name: name,
      level: 1,
      race: "",
      class: "",
      alignment: "",
      background: "",
      description: "",
      inventory: "Empty",
      weapons: [],
      spells: [],
      spellSlots: {
        current: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        max: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
      speed: 30,
      armorClass: 20,
      hitPoints: {
        current: 12,
        max: 12,
      },
      condition: "",
      proficiencies: {
        skill: [],
        stat: [],
        armor: [],
        weapon: [],
        tool: [],
        language: [],
      },
    };

    const insertInfo = await characterCollection.insertOne(newCharacter);
    if (insertInfo.insertedCount === 0) throw `Could not add character`;
    console.log(insertInfo);
    return insertInfo.insertedId;
  },

  async getAllUsers() {
    const userCollection = await characters();
    const arr = await userCollection.find({}).toArray();
    return arr;
  },

  async userExists(userID) {
    if (!userID || typeof userID !== "string") throw "Must provide a valid userID";

    const userCollection = await characters();
    const user = await userCollection.findOne({ userID: userID });
    if (user === null) return false;
    return true;
  },

  async getUser(userID) {
    if (!userID || typeof userID !== "string") throw "Must provice a valid userID";

    const userCollection = await characters();
    const user = await userCollection.findOne({ userID: userID });
    if (user === null) return null;
    return user;
  },
};
