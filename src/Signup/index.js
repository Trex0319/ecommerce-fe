import {
  TextInput,
  PasswordInput,
  Stack,
  Button,
  Space,
  Container,
  Card,
  Group,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import Header from "../Header";

function SignUp() {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <Container>
        <Header />
        <Space h="30px" />
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <TextInput
            leftSectionPointerEvents="none"
            label="Your Name"
            placeholder="Your Name"
          />
          <TextInput
            leftSectionPointerEvents="none"
            label="Your email"
            placeholder="Your email"
          />
          <Stack>
            <PasswordInput
              label="Password"
              visible={visible}
              onVisibilityChange={toggle}
              placeholder="Password"
            />
            <PasswordInput
              label="Confirm password"
              visible={visible}
              onVisibilityChange={toggle}
              placeholder="Password"
            />
          </Stack>
          <Space h="30px" />
          <Group position="apart">
            {" "}
            <Button component={Link} to="/login">
              Already got an Account? Login here
            </Button>
            <Button>Submit</Button>
          </Group>{" "}
        </Card>
      </Container>
    </>
  );
}

export default SignUp;
