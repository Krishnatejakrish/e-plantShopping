import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Product deleted" : "Error deleting product",
      description: message,
      status: success ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    toast({
      title: success ? "Product updated" : "Error updating product",
      description: message,
      status: success ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });
    if (success) onClose();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transform="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product.price}
        </Text>
        <HStack>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name || ""}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                value={updatedProduct.price || ""}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({ ...prev, price: e.target.value }))
                }
              />
              <Input
                placeholder="Product Image"
                name="image"
                value={updatedProduct.image || ""}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({ ...prev, image: e.target.value }))
                }
              />
              <Input
                placeholder="Product Description"
                name="description"
                value={updatedProduct.description || ""}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
