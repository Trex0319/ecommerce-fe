import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  getCartItems,
  removeItemFromCart,
  removeItemsFromCart,
} from "../api/cart";
import {
  Container,
  Title,
  Table,
  Group,
  Button,
  Image,
  Space,
  Divider,
} from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Header from "../Header";
import { Link } from "react-router-dom";

export default function Cart() {
  const queryClient = useQueryClient();
  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  // const calculateTotal = () => {
  //   let total = 0;
  //   cart.map((item) => (total = total + item.quantity * item.price));
  //   console.log(total);
  //   return total;
  // };

  const cartTotal = useMemo(() => {
    let total = 0;
    cart.map((item) => (total = total + item.quantity * item.price));
    return total;
  }, [cart]);

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
    deleteProductsMutation.mutate(checkedList);
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

  const deleteProductsMutation = useMutation({
    mutationFn: removeItemsFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      notifications.show({
        title: "Selected Products Deleted",
        color: "green",
      });
      // to reset the checkbox
      setCheckAll(false);
      setCheckedList([]);
    },
  });

  return (
    <Container>
      <Header title="Cart" page="cart" />
      <Space h="35px" />
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
                          src={"http://localhost:5000/" + c.image}
                          width="100px"
                        />
                      </>
                    ) : (
                      <Image
                        src={
                          "https://www.aachifoods.com/templates/default-new/images/no-prd.jpg"
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
                        size="sm"
                        onClick={(event) => {
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
            <td>
              <strong>${cartTotal}</strong>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Space h="25px" />
      <Group position="apart">
        <Button
          color="red"
          size="sm"
          className="ms-2"
          disabled={checkedList && checkedList.length > 0 ? false : true}
          onClick={(event) => {
            event.preventDefault();
            deleteCheckedItems();
          }}
        >
          Delete Selected
        </Button>
        <Button
          component={Link}
          to="/checkout"
          disabled={cart.length > 0 ? false : true}
        >
          Checkout
        </Button>
      </Group>
    </Container>
  );
}
