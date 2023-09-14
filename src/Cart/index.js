import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCartItems } from "../api/cart";
import {
  Container,
  Title,
  Table,
  Group,
  Button,
  Image,
  Space,
} from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { removeItemFromCart } from "../api/cart";
import Header from "../Header";
export default function Cart() {
  const queryClient = useQueryClient();
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });
  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const checkBoxAll = (event) => {
    if (event.target.checked) {
      const newCheckedList = [];
      cart.forEach((cart) => {
        newCheckedList.push(cart._id);
      });
      setCheckedList(newCheckedList);
      setCheckAll(true);
    } else {
      setCheckedList([]);
      setCheckAll(false);
    }
  };
  const checkboxOne = (event, id) => {
    if (event.target.checked) {
      const newCheckedList = [...checkedList];
      newCheckedList.push(id);
      setCheckedList(newCheckedList);
    } else {
      const newCheckedList = checkedList.filter((cart) => cart !== id);
      setCheckedList(newCheckedList);
      if (newCheckedList.length === 0) {
        setCheckAll(false);
      }
    }
  };

  const deleteCheckedItems = () => {
    const newCart = cart.filter((item) => !checkedList.includes(item._id));

    queryClient.setQueryData(["cart"], newCart);

    setCheckedList([]);
    localStorage.setItem("cart", JSON.stringify(newCart));

    setCheckAll(false);
    setCheckedList([]);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.map((item) => (total = total + item.quantity * item.price));
    return total;
  };

  const deleteMutation = useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      notifications.show({
        title: "Product Deleted",
        color: "green",
      });
    },
  });

  return (
    <Container>
      <Space h="30px" />
      <Header />
      <Title align="center">Cart</Title>
      <Space h="30px" />
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
              <Checkbox
                type="checkbox"
                checked={checkAll}
                disabled={cart && cart.length > 0 ? false : true}
                onChange={(event) => {
                  checkBoxAll(event);
                }}
              />
            </th>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>
              <Group position="right">Action</Group>
            </th>
          </tr>
        </thead>
        <tbody>
          {cart ? (
            cart.map((c) => {
              return (
                <tr key={c._id}>
                  <td>
                    <Checkbox
                      checked={
                        checkedList && checkedList.includes(c._id)
                          ? true
                          : false
                      }
                      type="checkbox"
                      onChange={(event) => {
                        checkboxOne(event, c._id);
                      }}
                    />
                  </td>
                  <td>
                    {c.image && c.image !== "" ? (
                      <>
                        <Image
                          age
                          src={"http://localhost:5000/" + c.image}
                          width="100px"
                        />
                      </>
                    ) : (
                      <Image
                        src={
                          "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                        }
                        width="100px"
                      />
                    )}
                  </td>
                  <td> {c.name}</td>
                  <td>${c.price}</td>
                  <td>{c.quantity}</td>
                  <td>${c.price * c.quantity}</td>
                  <td>
                    <Group position="right">
                      <Button
                        color="red"
                        size="xs"
                        radius="5px"
                        onClick={() => {
                          deleteMutation.mutate(c._id);
                        }}
                      >
                        Remove
                      </Button>
                    </Group>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>No Product Add Yet!</td>
            </tr>
          )}
          <tr>
            <td colSpan={5} className="text-end me-5"></td>
            <td>${calculateTotal()}</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Group position="apart">
        <Button
          color="red"
          disabled={checkedList && checkedList.length > 0 ? false : true}
          onClick={(event) => {
            event.preventDefault();
            deleteCheckedItems();
          }}
        >
          Delete Selected
        </Button>
        <Button>Cheackout</Button>
      </Group>
    </Container>
  );
}
