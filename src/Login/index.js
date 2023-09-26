import {
  TextInput,
  PasswordInput,
  Button,
  Space,
  Container,
  Card,
  Group,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import Header from "../Header";

function Login() {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <Container>
        <Header />
        <Space h="30px" />
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <TextInput
            leftSectionPointerEvents="none"
            label="Your email"
            placeholder="Your email"
          />
          <PasswordInput
            label="Password"
            visible={visible}
            onVisibilityChange={toggle}
            placeholder="Password"
          />
          <Space h="30px" />
          <Group position="apart">
            {" "}
            <Button component={Link} to="/signup">
              Don't have a Account? Sign up here
            </Button>
            <Button>Submit</Button>
          </Group>
        </Card>
      </Container>
    </>
  );
}

export default Login;
