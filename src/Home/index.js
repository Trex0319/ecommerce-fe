import { Container, Title, Space, Divider, Group } from "@mantine/core";
import Products from "../Products";
import Header from "../Header";

export default function Home() {
  return (
    <Container>
      <Space h="30px" />
      <Header />
      <Space h="30px" />
      <Products />
      <Space h="30px" />
    </Container>
  );
}
