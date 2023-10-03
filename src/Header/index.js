import {
  Group,
  Space,
  Title,
  Divider,
  Button,
  Text,
  Avatar,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Header({ title, page = "" }) {
  const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);

  return (
    <div className="header">
      <Space h="50px" />
      <Title align="center">{title}</Title>
      <Space h="20px" />
      <Group position="apart">
        <Group>
          <Button
            component={Link}
            to="/"
            variant={page === "home" ? "filled" : "light"}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/cart"
            variant={page === "cart" ? "filled" : "light"}
          >
            Cart
          </Button>
          <Button
            component={Link}
            to="/orders"
            variant={page === "orders" ? "filled" : "light"}
          >
            My Orders
          </Button>
        </Group>
        <Group position="right">
          {cookies && cookies.currentUser ? (
            <>
              <Group>
                <Avatar
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  radius="xl"
                />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {cookies.currentUser.name}
                  </Text>

                  <Text c="dimmed" size="xs">
                    {cookies.currentUser.email}
                  </Text>
                </div>
              </Group>
              <Button
                variant={"light"}
                onClick={() => {
                  // clear the currentUser cookie to logout
                  removeCookies("currentUser");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant={page === "login" ? "filled" : "light"}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant={page === "signup" ? "filled" : "light"}
              >
                Sign Up
              </Button>
            </>
          )}
        </Group>
      </Group>
      <Space h="20px" />
      <Divider />
    </div>
  );
}
