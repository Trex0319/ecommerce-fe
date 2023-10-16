import {
  Container,
  Space,
  TextInput,
  Card,
  Button,
  Group,
  Grid,
  PasswordInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import { useState } from "react";
import { registerUser } from "../api/auth";
import { notifications } from "@mantine/notifications";
import { useCookies } from "react-cookie";
export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [visible, { toggle }] = useDisclosure(false);
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      //store user data into cookies
      setCookie("currentUser", user, {
        maxAge: 60 * 60 * 24 * 30, // expire in 30 days
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });
  const handleSubmit = () => {
    // make sure email & password are not empty.
    if (!name || !email || !password || !confirmPassword) {
      notifications.show({
        title: "Please fill in all fields.",
        color: "red",
      });
    } else if (password !== confirmPassword) {
      notifications.show({
        title: "Password and Confirm Password does not match",
        color: "red",
      });
    } else {
      registerMutation.mutate(
        JSON.stringify({
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };
  return (
    <Container size="100%">
      <Space h="50px" />
      <Header title="Sign Up A New Account" page="signup" />
      <Space h="50px" />
      <Card
        withBorder
        shadow="lg"
        p="20px"
        mx="auto"
        sx={{
          maxWidth: "700px",
        }}
      >
        <Grid gutter={20}>
          <Grid.Col span={6}>
            <TextInput
              value={name}
              placeholder="Name"
              label="Name"
              required
              onChange={(event) => setName(event.target.value)}
            />
            <Space h="20px" />
            <TextInput
              value={email}
              placeholder="Email"
              label="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              value={password}
              placeholder="Password"
              label="Password"
              visible={visible}
              onVisibilityChange={toggle}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <Space h="20px" />
            <PasswordInput
              value={confirmPassword}
              placeholder="Confirm Password"
              label="Confirm Password"
              visible={visible}
              onVisibilityChange={toggle}
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </Grid.Col>
        </Grid>
        <Space h="40px" />
        <Group position="center">
          <Button onClick={handleSubmit}>Submit</Button>
        </Group>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
    </Container>
  );
}
