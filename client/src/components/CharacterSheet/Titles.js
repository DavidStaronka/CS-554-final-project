import { FormControl } from "react-bootstrap";

function Titles(props) {
  const [char, setChar] = props.char;
  const setSaved = props.saved[1];

  const handleCharChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };

  const characterDescription = () => {
    return (
      <div className="border border-2 border-secondary w-75 mx-1">
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
  const characterCondition = () => {
    return (
      <div className="border border-2 border-secondary w-25 mx-1">
        <h5>Condition:</h5>
        <FormControl
          type="text"
          value={char.condition}
          onChange={(e) => handleCharChange("condition", e.target.value)}
          className="mx-auto"
        />
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>
          Race:
          <FormControl
            type="text"
            value={char.race}
            onChange={(e) => handleCharChange("race", e.target.value)}
            className="w-50 mx-auto"
          />
        </h4>

        <h4>
          Class:
          <FormControl
            type="text"
            value={char.class}
            onChange={(e) => handleCharChange("class", e.target.value)}
            className="w-50 mx-auto"
          />
        </h4>

        <h4>
          Level:
          <FormControl
            type="number"
            value={char.level}
            onChange={(e) => handleCharChange("level", e.target.value)}
            className="w-50 mx-auto"
          />
        </h4>
      </div>
      <div className="d-flex justify-content-between">
        <h4>{char.name}</h4>
        <h4>
          Alignment:
          <FormControl
            type="text"
            value={char.alignment}
            onChange={(e) => handleCharChange("alignment", e.target.value)}
            className="w-75 mx-auto"
          />
        </h4>
        <h4>
          Background:
          <FormControl
            type="text"
            value={char.background}
            onChange={(e) => handleCharChange("background", e.target.value)}
            className="w-75 mx-auto"
          />
        </h4>
        <h4>
          Inspiration
          <FormControl
            type="number"
            value={char.inspiration}
            onChange={(e) => handleCharChange("inspiration", e.target.value)}
            className="w-50 mx-auto"
          />
        </h4>
      </div>
      <div className="d-flex mx-3">
        {characterDescription()}
        {characterCondition()}
      </div>
    </div>
  );
}

export default Titles;
