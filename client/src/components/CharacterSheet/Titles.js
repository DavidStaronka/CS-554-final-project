import { FormControl, Button } from "react-bootstrap";

function Titles(props) {
  const [char, setChar] = props.char;
  const [saved, setSaved] = props.saved;

  const handleCharChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };

  const handleSave = () => {
    //send axios call with char to backend
    setSaved(true);
  };

  const saveButton = () => {
    if (saved) {
      return (
        <Button className="btn btn-lg btn-success ml-auto" onClick={handleSave}>
          Save
        </Button>
      );
    }
    return (
      <Button className="btn btn-lg btn-danger ml-auto" onClick={handleSave}>
        Save
      </Button>
    );
  };

  const characterDescription = () => {
    return (
      <div className="border border-2 border-secondary">
        <h5>Description:</h5>
        <FormControl
          as="textarea"
          type="textarea"
          value={char.description}
          onChange={(e) => handleCharChange("description", e.target.value)}
          className="mx-auto"
        />
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <img alt={char.name} src={char.img} height="100" width="100" />

        <h3>
          Race:
          <FormControl
            type="text"
            value={char.race}
            onChange={(e) => handleCharChange("race", e.target.value)}
            className="w-50 mx-auto"
          />
        </h3>

        <h3>
          Class:
          <FormControl
            type="text"
            value={char.class}
            onChange={(e) => handleCharChange("class", e.target.value)}
            className="w-50 mx-auto"
          />
        </h3>

        <h3>
          Level:
          <FormControl
            type="text"
            value={char.level}
            onChange={(e) => handleCharChange("level", e.target.value)}
            className="w-50 mx-auto"
          />
        </h3>
        {saveButton()}
      </div>
      <div className="d-flex justify-content-between">
        <h1>{char.name}</h1>
        <h3>
          Alignment:
          <FormControl
            type="text"
            value={char.alignment}
            onChange={(e) => handleCharChange("alignment", e.target.value)}
            className="w-75 mx-auto"
          />
        </h3>
        <h3>
          Background:
          <FormControl
            type="text"
            value={char.background}
            onChange={(e) => handleCharChange("background", e.target.value)}
            className="w-75 mx-auto"
          />
        </h3>
      </div>
      {characterDescription()}
    </div>
  );
}

export default Titles;
