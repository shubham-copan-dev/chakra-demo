import {
  HelpIcon,
  LikeIcon,
  MenuBarIcon,
  NotificationsIcon,
  SettingIcon, // SearchIcon,
  SignOutIcon,
  TourIcon,
} from '@/chakraConfig/icons';
import { InputField } from '@/components/formFields';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Link as ChakraLink,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import MenuOffCanvas from './MenuOffCanvas';

function Header() {
  // Form control
  const { control } = useForm();

  //  Help offcanvas State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const searchStyles: any = {
    position: 'absolute',
    top: '50%',
    left: '15px',
    transform: 'translateY(-50%)',
  };

  const SerchImg = (
    <Image src="Search.svg" alt="Search" width={20} height={20} style={searchStyles} />
  );
  // const SerchImg = <SearchIcon />;
  return (
    <Box as="header" bg="BaseClr.PrimaryInvert" borderBottom="1px" borderColor="BaseClr.Teritary">
      <Flex align="center" justify="space-between" padding="5px 24px">
        <Flex align="center">
          <Box me={3}>
            <MenuOffCanvas />
          </Box>
          <Box>
            <Image src="/images/logo.svg" alt="logo" width={150} height="40px" />
          </Box>
        </Flex>
        <Flex>
          <Flex alignItems="center">
            <Box>
              <Button
                type="button"
                borderRadius="50%"
                w="xl"
                h="xl"
                p={0}
                bg="BaseClr.PrimaryInvert"
                _hover={{ bg: 'hoverClr.lightHover', color: 'hoverClr.primaryHover' }}
                onClick={handleShow}
              >
                <HelpIcon w="20px" h="20px" />
              </Button>

              <Drawer isOpen={show} placement="right" onClose={handleClose}>
                <DrawerOverlay />
                <DrawerContent maxW="350px">
                  <DrawerCloseButton />
                  <DrawerHeader
                    minW="350px"
                    fontSize="lg"
                    fontWeight="medium"
                    lineHeight="normal_1"
                    color="BaseClr.Primary"
                  >
                    Help
                  </DrawerHeader>
                  <DrawerBody pe={3} minW="350px">
                    <Box border="1px" borderColor="bgClr.LightStrong" borderRadius="8px" mb={2}>
                      <Image src="/images/HelpOffcanvas.png" alt="frame" w="306px" />
                      <Box p={3}>
                        <Heading
                          as="h6"
                          fontSize="md"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="BaseClr.Primary"
                        >
                          Search for customers
                        </Heading>
                        <Text
                          fontSize="xs"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="BaseClr.LightSecondary"
                        >
                          As you embark on your business journey, envision yourself as an intrepid
                          explorer. With determination and precision, venture into uncharted
                          territories to seek out new prospects.
                        </Text>
                        <ChakraLink
                          href="abc"
                          fontSize="sm"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="hoverClr.primaryHover"
                          _hover={{ textDecoration: 'none' }}
                        >
                          Try it
                        </ChakraLink>
                      </Box>
                    </Box>
                    <Box border="1px" borderColor="bgClr.LightStrong" borderRadius="8px" mb={2}>
                      <Image src="/images/HelpOffcanvas.png" alt="frame" w="306px" />
                      <Box p={3}>
                        <Heading
                          as="h6"
                          fontSize="md"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="BaseClr.Primary"
                        >
                          Search for customers
                        </Heading>
                        <Text
                          fontSize="xs"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="BaseClr.LightSecondary"
                        >
                          As you embark on your business journey, envision yourself as an intrepid
                          explorer. With determination and precision, venture into uncharted
                          territories to seek out new prospects.
                        </Text>
                        <ChakraLink
                          href="abc"
                          fontSize="sm"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="hoverClr.primaryHover"
                          _hover={{ textDecoration: 'none' }}
                        >
                          Try it
                        </ChakraLink>
                      </Box>
                    </Box>
                    <Box border="1px" borderColor="bgClr.LightStrong" borderRadius="8px" mb={2}>
                      <Image src="/images/HelpOffcanvas.png" alt="frame" w="306px" />
                      <Box p={3}>
                        <Heading
                          as="h6"
                          fontSize="md"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="BaseClr.Primary"
                        >
                          Search for customers
                        </Heading>
                        <Text
                          fontSize="xs"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="BaseClr.LightSecondary"
                        >
                          As you embark on your business journey, envision yourself as an intrepid
                          explorer. With determination and precision, venture into uncharted
                          territories to seek out new prospects.
                        </Text>
                        <ChakraLink
                          href="abc"
                          fontSize="sm"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="hoverClr.primaryHover"
                          _hover={{ textDecoration: 'none' }}
                        >
                          Try it
                        </ChakraLink>
                      </Box>
                    </Box>
                    {/* Repeat the structure for other helpOffcanvas items */}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
            {/* -------------- Header Notification -------------------- */}
            <Box>
              <Menu>
                <MenuButton
                  borderRadius="50%"
                  w="xl"
                  h="xl"
                  p={0}
                  bg="BaseClr.PrimaryInvert"
                  _hover={{ bg: 'hoverClr.lightHover', color: 'hoverClr.primaryHover' }}
                >
                  <NotificationsIcon w="20px" h="20px" />
                </MenuButton>

                <MenuList w={450} transform="translate3d(967px, 70px, 0px)">
                  <Box p="24px" display="flex" alignItems="center" justifyContent="space-between">
                    <Text
                      as="span"
                      fontSize="lg"
                      fontWeight="medium"
                      lineHeight="shorter"
                      color="BaseClr.Primary"
                    >
                      Notifications
                    </Text>
                    <Link href="s" display="inline-flex">
                      <SettingIcon w="20px" h="20px" />
                    </Link>
                  </Box>

                  <MenuItem>
                    <Flex gap={3} maxW="full">
                      <Image src="/images/profile.svg" alt="profile" width="40px" height="40px" />{' '}
                      <Box m="auto">
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          lineHeight="normal"
                          color="BaseClr.Primary"
                        >
                          <strong>Ruth Kyle</strong> has assigned you as Customer Success
                          Representative for <strong>Compass Health.</strong>
                        </Text>
                        <Text
                          as="span"
                          fontSize="xs"
                          fontWeight="regular"
                          lineHeight="normal"
                          color="BaseClr.LightSecondary"
                        >
                          2h ago
                        </Text>
                      </Box>
                    </Flex>
                  </MenuItem>
                  <MenuItem>
                    {' '}
                    <Box w="inherit">
                      <SkeletonCircle size="10" />
                      <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
                    </Box>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
          <Divider mx={2} orientation="vertical" h="inherit" />
          <Menu>
            <MenuButton
              p={1}
              _hover={{ bg: 'hoverClr.lightHover' }}
              borderRadius="base"
              role="group"
            >
              <Flex align="center" gap={3}>
                <Box bg="BaseClr.Teritary" borderRadius="50%" display="inline-flex" p={2}>
                  <MenuBarIcon w="2xs" h="2xs" _groupHover={{ color: 'hoverClr.primaryHover' }} />
                </Box>
                <Box>
                  <Text
                    fontSize="sm"
                    margin="0"
                    fontWeight="medium"
                    lineHeight="normal"
                    color="BaseClr.Primary"
                    _groupHover={{ color: 'hoverClr.primaryHover' }}
                  >
                    AreaTrend.com
                  </Text>
                  <Text
                    as="span"
                    fontSize="xs"
                    fontWeight="medium"
                    lineHeight="normal"
                    color="BaseClr.LightSecondary"
                  >
                    View by
                  </Text>
                </Box>
                <Box>
                  <ChevronDownIcon _groupHover={{ color: 'hoverClr.primaryHover' }} />
                </Box>
              </Flex>
            </MenuButton>
            <MenuList w="350px" pt={3} pb={3} boxShadow="0px 20px 70px 0px rgba(0, 0, 0, 0.25)">
              <Box pt={1} pb={1} pe={3} ps={3}>
                <InputField
                  control={control}
                  name="Search"
                  type="search"
                  placeHolder="Search for companies..."
                  imageUrl={SerchImg}
                  rules={{
                    required: true,
                  }}
                  normalize={(value: any) => value.trim()}
                  mainClass="col-12 position-relative"
                  inputClass=" form-control"
                  // bg="BaseClr.LightSecondary"
                  // placeholderStyle={{ color: 'red', fontStyle: 'italic' }}
                />
              </Box>
              <Text
                pt={1}
                pb={1}
                pe={3}
                ps={3}
                m={0}
                fontSize="xs"
                fontWeight="medium"
                lineHeight="normal"
                color="BaseClr.LightSecondary"
              >
                Most Recent
              </Text>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                AreaTrend.com
              </MenuItem>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                Bodybuilding
              </MenuItem>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                Phone Flipper
              </MenuItem>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                Speed Sourcing
              </MenuItem>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                Triple T Trading
              </MenuItem>
              <hr />
              <Text
                pt={1}
                pb={1}
                pe={3}
                ps={3}
                m={0}
                fontSize="xs"
                fontWeight="medium"
                lineHeight="normal"
                color="BaseClr.LightSecondary"
              >
                The A. I. Root Company
              </Text>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                (DNDB)ATIRA DESIGNS PVT LTD
              </MenuItem>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                10 Strawberry Street
              </MenuItem>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                14 Karat Home Inc
              </MenuItem>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                24/7 Comfort Apparel
              </MenuItem>
              <MenuItem
                _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                3D CAM PAZARLAMA SANAYI VE TICARET LTDSTI
              </MenuItem>
            </MenuList>
          </Menu>

          <Divider mx={2} orientation="vertical" h="inherit" />

          <Menu>
            <MenuButton
              p={1}
              _hover={{ bg: 'hoverClr.lightHover' }}
              borderRadius="base"
              role="group"
            >
              {' '}
              <Flex gap={3} align="center">
                <Box>
                  <Image src="/images/profile.svg" alt="profile" width={38} height={38} />
                </Box>
                <Box>
                  <Text
                    fontSize="sm"
                    margin="0"
                    fontWeight="medium"
                    lineHeight="normal"
                    color="BaseClr.Primary"
                    _groupHover={{ color: 'hoverClr.primaryHover' }}
                  >
                    Amberly
                  </Text>
                  <Text
                    as="span"
                    fontSize="xs"
                    fontWeight="medium"
                    lineHeight="normal"
                    color="BaseClr.LightSecondary"
                  >
                    Director
                  </Text>
                </Box>
                <Box>
                  <ChevronDownIcon _groupHover={{ color: 'hoverClr.primaryHover' }} />
                </Box>
              </Flex>
            </MenuButton>

            <MenuList maxW="300px" boxShadow="0px 20px 70px 0px rgba(0, 0, 0, 0.25)">
              <MenuItem>
                <Flex gap={3}>
                  <Image src="/images/profile.svg" alt="profile" width={50} height={50} />{' '}
                  <Box>
                    <Heading
                      as="h6"
                      fontSize="lg"
                      fontWeight="regular"
                      lineHeight="normal_1"
                      color="BaseClr.Primary"
                      mb={0}
                    >
                      Amberly
                    </Heading>
                    <Text
                      fontSize="xs"
                      fontWeight="medium"
                      lineHeight="normal"
                      color="BaseClr.LightSecondary"
                      mb={1}
                    >
                      Director
                    </Text>{' '}
                    <ChakraLink
                      href="abc"
                      fontSize="sm"
                      fontWeight="medium"
                      lineHeight="normal"
                      color="hoverClr.primaryHover"
                      _hover={{ textDecoration: 'none' }}
                    >
                      Manage your account
                    </ChakraLink>
                  </Box>
                </Flex>
              </MenuItem>
              <Divider />
              <MenuItem
                pt={1}
                pb={1}
                pe={3}
                ps={3}
                display="Flex"
                gap={2}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                <SettingIcon w={18} h={18} /> Settings
              </MenuItem>
              <MenuItem
                pt={1}
                pb={1}
                pe={3}
                ps={3}
                display="Flex"
                gap={2}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                <LikeIcon w={18} h={18} /> Give feedback
              </MenuItem>

              <MenuItem
                pt={1}
                pb={1}
                pe={3}
                ps={3}
                display="Flex"
                gap={2}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                <HelpIcon w={18} h={18} /> Help
              </MenuItem>
              <MenuItem
                pt={1}
                pb={1}
                pe={3}
                ps={3}
                display="Flex"
                gap={2}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                <TourIcon w={18} h={18} /> Take a Quick Tour
              </MenuItem>
              <Divider />
              <MenuItem
                pt={1}
                pb={1}
                pe={3}
                ps={3}
                display="Flex"
                gap={2}
                fontSize="sm"
                fontWeight="regular"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                <SignOutIcon w={18} h={18} /> Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
