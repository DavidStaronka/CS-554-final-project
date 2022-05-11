const { ObjectId } = require("mongodb");
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

  async updateCharacter(body) {
    // TODO add input checks
    // if (!body.name || typeof body.name !== "string") throw "Must provice a valid name";
    // if (!body.session || typeof body.session !== "string")
    //   throw "Must provice a valid session name";
    // if (!body.userId || typeof body.userId !== "string") throw "Invalid userId";

    const characterCollection = await characters();
    body._id = ObjectId(body._id);
    let newCharacter = body;
    console.log("UPDATE CHARACTER");
    console.log(body);

    const insertInfo = await characterCollection.replaceOne({ _id: body._id }, body);
    // if (insertInfo.insertedCount === 0) throw `Could not update character`;
    console.log(insertInfo);
    return insertInfo.insertedId;
  },

  async getCharacters(userID) {
    if (!userID || typeof userID !== "string") throw "Must provice a valid userID";

    const characterCollection = await characters();
    const allCharacters = await characterCollection.find({ profileId: userID }).toArray();
    if (allCharacters === null) return null;
    //console.log(allCharacters);
    return allCharacters;
  },

  async getCharacter(characterId, userID) {
    console.log(`GET CHAR ID ${characterId}`);
    if (!characterId || typeof characterId !== "string") throw "Must provice a valid characterId";
    if (!userID || typeof userID !== "string") throw "Must provice a valid userID";
    const characterCollection = await characters();
    const character = await characterCollection.findOne({ _id: ObjectId(characterId) });
    if (character === null) return null;
    if (character.profileId !== userID) throw "You do not have access to this character";
    return character;
  },

  async characterExists(characterId) {
    if (!characterId || typeof characterId !== "string") throw "Must provide a valid characterId";

    const characterCollection = await characters();
    const character = await characterCollection.findOne({ _id: characterId });
    if (character === null) return false;   
    return true;
  },
};
