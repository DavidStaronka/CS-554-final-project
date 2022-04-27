import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
//import logo from "../../src/logo.svg"
//import logo from './logo.svg';


function Home() {
  return (
    <Container>
      <Card >
        <Card.Body>
          <Card.Text as='h5'>This website allows you to keep track of your DnD characters</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
