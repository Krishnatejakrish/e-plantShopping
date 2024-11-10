import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  useToast();
  const toast = useToast();

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast({
        title: "Product created",
        description: message,
        status: "success",
        duration: 2000,
      });
      //  console.log("success:",success)
      //  console.log("message:",message)
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
      });
    }

    setNewProduct({
      name: "",
      price: "",
      image: "",
      description: "",
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Nmae"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Product image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Input
              placeholder="Product description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />

            <Button colorScheme={"blue"} onClick={handleAddProduct}>
              Add product
            </Button>
          </VStack>
          <Link to={"/"}>
            <Button colorScheme={"gray"} mt={4}>
              Back to Home
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
