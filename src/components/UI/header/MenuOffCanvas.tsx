import { MenuIcon } from "@/chakraConfig/icons";
import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useState } from "react";

import Slider from "../common/Slider/slider";

interface SideNavProps {
  data: any;
  description: any;
  imagesrc: any;
  title: any;
}

function MenuOffCanvas() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [sidenavData, setSideNavData] = useState<SideNavProps | null>(null);

  const isOpen = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const onClose = () => {
    setIsOffcanvasOpen(false);
    setSideNavData(null);
  };

  const handleHover = (value: any) => {
    setSideNavData(value);
  };

  const items = [
    {
      imagesrc: "/images/customer.svg",
      title: "Customers",
      description: "Track your customer behavior and preferences",
      content: {
        imagesrc: "/images/customer.svg",
        title: "Customers",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
        data: [
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
        ],
      },
    },
    {
      imagesrc: "/images/product.svg",
      title: "Products",
      description: "Track product sales and performance",
      content: {
        imagesrc: "/images/product.svg",
        title: "Products",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
        data: [
          {
            datahead: "Create ",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
        ],
      },
    },
    {
      imagesrc: "/images/order.svg",
      title: "Orders",
      description: "Manage your orders with ease",
      content: {
        imagesrc: "/images/order.svg",
        title: "Orders",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
        data: [
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
        ],
      },
    },
    {
      imagesrc: "/images/fulfillment.svg",
      title: "Fulfillment",
      description: "Optimize your order fulfillment process",
      content: {
        imagesrc: "/images/fulfillment.svg",
        title: "Fulfillment",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
        data: [
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
        ],
      },
    },
    {
      imagesrc: "/images/reports.svg",
      title: "Reports",
      description: "Get meaningful insights through reports",
      content: {
        imagesrc: "/images/reports.svg",
        title: "Reports",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
        data: [
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
        ],
      },
    },
    {
      imagesrc: "/images/mystore.svg",
      title: "My Store",
      description: "Discover your store's unique offerings",
      content: {
        imagesrc: "/images/mystore.svg",
        title: "My Store",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
        data: [
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
          {
            datahead: "Create Customer",
            datadescription:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorum ducimus natus. Aliquid harum mollitia",
          },
        ],
      },
    },
  ];

  return (
    <Box>
      <Button
        type="button"
        onClick={isOpen}
        className="slider-control border-0 bg-transparent p-0"
      >
        <MenuIcon w={18} h={18} _hover={{ color: "hoverClr.primaryHover" }} />
      </Button>

      <Slider isOpen={isOffcanvasOpen} onClose={onClose}>
        <Box className="left-col" maxW="400px">
          <Button
            type="button"
            onClick={onClose}
            className="slider-control border-0 bg-transparent p-0"
          >
            <MenuIcon
              w={18}
              h={18}
              _hover={{ color: "hoverClr.primaryHover" }}
            />
          </Button>
          <Heading
            as="h4"
            fontSize="lg"
            fontWeight="medium"
            lineHeight="normal_1"
            color="BaseClr.Primary"
            mt={8}
            mb={5}
          >
            Apps
          </Heading>
          {items.map(
            (item: {
              title: any;
              content: any;
              imagesrc: any;
              description: any;
            }) => (
              // eslint-disable-next-line react/jsx-key
              <Box className="slider">
                <UnorderedList className="p-0 slider-list" ms={0}>
                  <ListItem
                    key={item.title}
                    onMouseOver={() => handleHover(item.content)}
                    onFocus={() => handleHover(item.content)}
                    display="Flex"
                    alignItems="Center"
                    gap={3}
                    mb={1}
                    pt={1}
                    pb={1}
                    pe={2}
                    ps={2}
                    _hover={{
                      bg: "bgClr.LightMedium",
                      borderTopLeftRadius: "normal",
                      borderBottomLeftRadius: "normal",
                    }}
                  >
                    <Box className="item-icon">
                      <Image
                        src={item.imagesrc}
                        alt="image"
                        width={30}
                        height={30}
                      />
                    </Box>
                    <Box className="menu-items">
                      <Heading
                        as="h5"
                        m="0"
                        fontSize="md"
                        fontWeight="medium"
                        lineHeight="normal"
                        color="BaseClr.Primary"
                      >
                        {item.title}
                      </Heading>
                      <Text
                        as="p"
                        m="0"
                        fontSize="xs"
                        fontWeight="medium"
                        lineHeight="normal"
                        color="BaseClr.LightSecondary"
                        minW="250px"
                      >
                        {item.description}
                      </Text>
                    </Box>
                    <Image
                      src="/images/right-arrow.svg"
                      alt="arrow"
                      className="right-arrow"
                    />
                  </ListItem>
                </UnorderedList>
              </Box>
            )
          )}
        </Box>
        {sidenavData !== null && (
          <Box
            className="rght-col"
            position="absolute"
            top={0}
            width="700px"
            h="100%"
            py={12}
            px={12}
            bg="bgClr.LightMedium"
            right="-22%"
          >
            <Box className="d-flex gap-3 sidenav-header">
              <Image
                src={sidenavData.imagesrc}
                alt="image"
                width={50}
                height={50}
              />
              <Box className="d-flex flex-column">
                <Heading
                  as="h1"
                  fontSize="lg"
                  fontWeight="regular"
                  lineHeight="normal_1"
                  color="BaseClr.LightSecondary"
                >
                  {sidenavData.title}
                </Heading>
                <Text
                  as="p"
                  fontSize="xs"
                  fontWeight="medium"
                  lineHeight="normal"
                  color="BaseClr.LightSecondary"
                >
                  {sidenavData.description}
                </Text>
              </Box>
            </Box>
            <hr />
            <Box className="row pt-4">
              {sidenavData.data.map(
                (item: { datahead: any; datadescription: any }) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link
                    href="hello"
                    className="d-flex flex-column col-6 mb-4 p-4 sidenav-content"
                    maxW="300px"
                    _hover={{
                      textDecoration: "none",
                      bg: "bgClr.LightLow",
                      borderRadius: "normal",
                    }}
                  >
                    <Text
                      m="0"
                      fontSize="sm"
                      fontWeight="medium"
                      lineHeight="normal"
                      color="BaseClr.Primary"
                    >
                      {item.datahead}
                    </Text>
                    <Text
                      as="span"
                      className="pt-2"
                      fontSize="sm"
                      fontWeight="medium"
                      lineHeight="normal"
                      color="BaseClr.LightSecondary"
                    >
                      {item.datadescription}
                    </Text>
                  </Link>
                )
              )}
            </Box>
          </Box>
        )}
      </Slider>
    </Box>
  );
}

export default MenuOffCanvas;
