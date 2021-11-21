import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import { agent } from 'app/api';

const AboutPage = () => {
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>

      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error()}
        >
          Test 400 error
        </Button>

        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error()}
        >
          Test 401 error
        </Button>

        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error()}
        >
          Test 404 error
        </Button>

        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error()}
        >
          Test 500 error
        </Button>

        <Button
          variant="contained"
          onClick={() => agent.TestErrors.getValidationsError()}
        >
          Test validation error
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default AboutPage;
