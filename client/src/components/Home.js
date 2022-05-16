import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
//import logo from "../../src/logo.svg"
//import logo from './logo.svg';
import SignUp from "./SignUp";

function Home() {
  return (
    <Container>
      <Card >
        <Card.Body>
          <Card.Text as='h2'>This website allows you to keep track of your DnD characters</Card.Text>
        </Card.Body>
      </Card>
      <SignUp/>
    </Container>

  );
}

export default Home;
