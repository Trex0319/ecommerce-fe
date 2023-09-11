import { Container, Title, Space, Divider } from "@mantine/core";

import Products from "../Products";

function Home() {
  return (
    <Container>
      <Space h="50px" />
      <Title align="center">Welcome to My Store</Title>
      <Space h="30px" />
      <Divider />
      <Space h="30px" />
      <Products />
      <Space h="30px" />
      <Divider />
      <Space h="30px" />
      {/* list all the Tv shows here */}
    </Container>
  );
}

export default Home;
