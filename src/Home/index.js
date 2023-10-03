import { Container, Title, Space, Divider } from "@mantine/core";
import { Link } from "react-router-dom";

import Products from "../Products";
import Header from "../Header";

function Home() {
  return (
    <Container>
      <Header title={"Welcome To My Store"} page="home" />
      <Space h="30px" />
      <Products />
      <Space h="30px" />
    </Container>
  );
}

export default Home;
