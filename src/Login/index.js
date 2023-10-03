import {
  PasswordInput,
  TextInput,
  Group,
  Container,
  Title,
  Space,
  Button,
  Card,
} from "@mantine/core";
import Header from "../Header";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Login() {
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      // store user data into cookies
      setCookie("currentUser", user, {
        maxAge: 60 * 60 * 24 * 14, // expire in 14 days
      });
      // redirect to home
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
    if (!email || !password) {
      notifications.show({
        title: "Please fill in both email and password.",
        color: "red",
      });
    } else {
      loginMutation.mutate(
        JSON.stringify({
          email: email,
          password: password,
        })
      );
    }
  };

  return (
    <Container>
      <Header title="Login" page="login" text="" />
      <Space h="60px" />
      <Card
        withBorder
        shadow="lg"
        mx="auto"
        sx={{
          maxWidth: "500px",
        }}
      >
        <TextInput
          value={email}
          placeholder="Email"
          label="Email"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <Space h="20px" />
        <PasswordInput
          value={password}
          placeholder="Password"
          label="Password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <Space h="20px" />
        <Group position="center">
          <Button onClick={handleSubmit}>Login</Button>
        </Group>
      </Card>
    </Container>
  );
}
