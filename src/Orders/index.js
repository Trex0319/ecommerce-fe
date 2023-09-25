import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  Container,
  Title,
  Table,
  Group,
  Button,
  Image,
  Space,
  TextInput,
  Divider,
  Grid,
  Text,
  Select,
} from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { useNavigate, Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import Header from "../Header";
import { deleteOrder, fetchOrders, updateStatus } from "../api/order";

export default function Orders() {
  const queryClient = useQueryClient();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const updateMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      notifications.show({
        title: "Status Edited",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleUpdateStatus = async (order, valueOne) => {
    console.log(valueOne);
    updateMutation.mutate({
      id: order._id,
      data: JSON.stringify({
        status: valueOne,
      }),
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      notifications.show({
        title: "Order Deleted",
        color: "green",
      });
    },
  });

  console.log(orders);
  return (
    <>
      <Container>
        <Header title="My Orders" page="orders" />
        <Space h="35px" />
        <Table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Products</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders
              ? orders.map((o) => {
                  return (
                    <tr key={o._id}>
                      <td>
                        <td>{o.customerName}</td>({o.customerEmail})
                      </td>
                      <td>
                        {o.products.map((product, index) => (
                          <div key={index} style={{ display: "flex" }}>
                            {product.image && product.image !== "" ? (
                              <>
                                <Image
                                  src={"http://localhost:5000/" + product.image}
                                  width="60px"
                                />
                              </>
                            ) : (
                              <Image
                                src={
                                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                                }
                                width="60px"
                              />
                            )}
                            <Space w="10px" />
                            <p>{product.name}</p>
                          </div>
                        ))}
                      </td>
                      <td>{o.totalPrice}</td>
                      <td>
                        <Select
                          value={o.status}
                          onChange={(valueOne) =>
                            handleUpdateStatus(o, valueOne)
                          }
                          w="150px"
                          placeholder={o.status}
                          disabled={o.status == "Pending" ? true : false}
                          data={["Paid", "Failed", "Shipped", "Delivered"]}
                        />
                      </td>
                      <td>{o.paid_at}</td>
                      <td>
                        <Button
                          color="red"
                          variant="outline"
                          onClick={() => {
                            deleteMutation.mutate(o._id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
          <Button component={Link} to="/">
            Continue Shopping
          </Button>
        </Table>
        <Space h="100px" />
      </Container>
    </>
  );
}
