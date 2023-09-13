import { Container, Title, Space, Divider, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function Header() {
  return (
    <Container>
      <Title align="center">Welcome to My Store</Title>
      <Space h="30px" />
      <Group position="apart">
        <Button component={Link} to="/" variant="light">
          Home
        </Button>
        <Button component={Link} to="/cart" variant="light">
          Cart
        </Button>
        <Button variant="light">My Orders</Button>
      </Group>
      <Space h="30px" />
      <Divider />
    </Container>
  );
}
