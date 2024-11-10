import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, [fetchProducts]);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          bgClip={"text"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
        >
          Current Products 🛍️
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          { products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

     {
      products.length === 0 && (
        <Text
        fontSize="xl"
        textAlign={"center"}
        fontWeight={"bold"}
        color={"gray.500"}
      >
        No products found 🥲
        <Link to={"/create"}>
          <Text
            as={"span"}
            color={"blue.500"}
            _hover={{ textDecoration: "underline" }}
          >
            Create a new product
          </Text>
        </Link>
      </Text>
      )

     }
      </VStack>
    </Container>
  );
};

export default Homepage;
