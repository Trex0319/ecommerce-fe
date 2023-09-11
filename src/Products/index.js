import { useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Divider,
  Button,
  LoadingOverlay,
} from "@mantine/core";

const fetchProducts = async (category) => {
  const response = await axios.get(
    "http://localhost:5000/products" +
      (category !== "" ? "?category=" + category : "")
  );
  return response.data;
};

const deleteProducts = async (product_id = "") => {
  const response = await axios({
    method: "DELETE",
    url: "http://localhost:5000/products/" + product_id,
  });
  return response.data;
};

function Products() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState("");
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });

  const memoryProducts = queryClient.getQueryData(["products", ""]);
  const categoryOptions = useMemo(() => {
    let options = [];
    if (memoryProducts && memoryProducts.length > 0) {
      memoryProducts.forEach((product) => {
        if (!options.includes(product.category)) {
          options.push(product.category);
        }
      });
    }
    return options;
  }, [memoryProducts]);

  const deleteMutation = useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", category],
      });
      notifications.show({
        title: "Product Deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Group position="apart">
        <Title order={3} align="center">
          Products
        </Title>
        <Button
          color="green"
          onClick={() => {
            navigate("/product_add");
          }}
        >
          Add New
        </Button>{" "}
      </Group>
      <Space h="20px" />
      <Group>
        <select
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option value="">All Categories</option>
          {categoryOptions.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </Group>
      <Space h="20px" />
      <LoadingOverlay visible={isLoading} />
      <Grid>
        {products
          ? products.map((product) => {
              return (
                <Grid.Col key={product._id} lg={4} sm={6} xs={12}>
                  <Card align="center" withBorder shadow="md" p="20px">
                    <Title order={5}>{product.name}</Title>
                    <Space h="10px" />
                    <Divider />
                    <Space h="10px" />
                    <Group position="apart" spacing={2}>
                      <Badge color="green">{product.price}</Badge>
                      <Badge color="yellow">{product.category}</Badge>
                    </Group>
                    <Space h="20px" />
                    <Button
                      fullWidth
                      component={Link}
                      to={"/movies/" + product._id}
                      color="blue"
                    >
                      Add To Cart
                    </Button>
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/product/" + product._id}
                        color="blue"
                        size="xs"
                        radius="50px"
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          deleteMutation.mutate(product._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}
export default Products;
