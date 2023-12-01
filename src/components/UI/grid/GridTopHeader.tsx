'use client';

import {
  CheckIcon,
  ColumnIcon,
  DownloadIcon,
  FilterIcon,
  LoadingIcon,
  RowIcon,
  SettingIcon,
} from '@/chakraConfig/icons';
import { InputField, ReactSelectField } from '@/components/formFields';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import CustomButton from '../common/customButton';

function GridTopHeader() {
  // Customize Offcanvas Control
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Customize Offcanvas Control
  const [showfilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFlter = () => setShowFilter(true);

  // Form Control

  const options = [
    { label: 'North America', value: 'North America ', id: 1 },
    { label: 'NPAC', value: 'NPAC', id: 2 },
  ];

  const { control } = useForm();

  // Input field

  const searchStyles: any = {
    position: 'absolute',
    top: '50%',
    left: '15px',
    transform: 'translateY(-50%)',
  };

  const SerchImg = (
    <Image src="images/Search.svg" alt="Search" width={20} height={20} style={searchStyles} />
  );

  return (
    <Box className="grid-header align-items-center" bg="#eff1f3">
      <Flex alignItems="center" justifyContent="space-between" pt="3" pb="3" ps="5" pe="5">
        <Box className="right-content ">
          <Flex gap="2" alignItems="center">
            {/* CustomerStage DropDown */}

            <Menu>
              <Text as="span" fontSize="lg" fontWeight="medium" lineHeight="normal_1">
                Show me{' '}
              </Text>
              <MenuButton>
                <Flex
                  className="dropdown-content"
                  align="center"
                  gap={3}
                  padding="1"
                  borderRadius="8px"
                  _hover={{ bg: 'hoverClr.lightHover' }}
                >
                  <Box className="para text-start">
                    <Text
                      fontSize="lg"
                      margin="0"
                      fontWeight="medium"
                      lineHeight="normal_1"
                      color="hoverClr.primaryHover"
                    >
                      Customers in all stages
                    </Text>
                  </Box>
                  <Box>
                    <ChevronDownIcon w="2xs" h="2xs" color="hoverClr.primaryHover" />
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList w="276px" pt={3} pb={3} boxShadow="0px 20px 70px 0px rgba(0, 0, 0, 0.25)">
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
                  Customers in all stages
                </MenuItem>
                <MenuItem
                  _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="BaseClr.Primary"
                >
                  Customers by Owner
                </MenuItem>
                <MenuItem
                  _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="BaseClr.Primary"
                >
                  Customers by Tier
                </MenuItem>
                <MenuItem
                  _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="BaseClr.Primary"
                >
                  Customers by Medal
                </MenuItem>
                <MenuItem
                  _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="BaseClr.Primary"
                >
                  Customers in all stages
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
                  Customers in all stages
                </MenuItem>
                <MenuItem
                  _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="BaseClr.Primary"
                >
                  Customers in all stages
                </MenuItem>
                <MenuItem
                  _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="BaseClr.Primary"
                >
                  Customers in all stages
                </MenuItem>
                <MenuItem
                  _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="BaseClr.Primary"
                >
                  Customers in all stages
                </MenuItem>
                <MenuItem
                  _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                  fontSize="sm"
                  fontWeight="regular"
                  lineHeight="normal"
                  color="BaseClr.Primary"
                >
                  Customers in all stages
                </MenuItem>
              </MenuList>
            </Menu>

            <Flex alignItems="center" gap="3">
              <Link href="www" display="inline-flex">
                <LoadingIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
              </Link>

              {/* Download DropDown */}

              <Menu>
                <MenuButton _hover={{ color: 'hoverClr.primaryHover' }}>
                  <Flex align="center" gap={3} padding="1" borderRadius="8px">
                    <DownloadIcon w="xs" h="xs" />
                  </Flex>
                </MenuButton>
                <MenuList w="173px" pt={3} pb={3} boxShadow="0px 20px 70px 0px rgba(0, 0, 0, 0.25)">
                  <MenuItem
                    _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                    fontSize="sm"
                    fontWeight="regular"
                    lineHeight="normal"
                    color="BaseClr.Primary"
                    gap="1"
                  >
                    <Image src="images/excel.svg" />
                    Excel
                  </MenuItem>
                  <MenuItem
                    _hover={{ color: 'hoverClr.primaryHover', bg: 'strokeClr.LightWeak' }}
                    fontSize="sm"
                    fontWeight="regular"
                    lineHeight="normal"
                    color="BaseClr.Primary"
                    gap="1"
                  >
                    {' '}
                    <Image src="images/CSV.svg" />
                    CSV
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
        <Box className="search" pt={1} pb={1} pe={3} ps={3}>
          <InputField
            control={control}
            name="Search"
            type="search"
            placeHolder="Search all..."
            imageUrl={SerchImg}
            rules={{
              required: true,
            }}
            normalize={(value: any) => value.trim()}
            mainClass="col-12 position-relative"
            inputClass=" form-control"
          />
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        pt={1.5}
        pb={1.5}
        pe={5}
        ps={5}
        borderBottom="1px"
        borderBottomColor="#dfe3e6"
      >
        {/* Customize View offcanvas */}
        <Button
          type="button"
          onClick={handleShow}
          variant="unstyled"
          _hover={{ color: 'hoverClr.primaryHover' }}
        >
          <Flex alignItems="center" gap={2}>
            <SettingIcon w="xs" h="xs" display="inline-flex" />
            <Text
              as="span"
              fontSize="sm"
              fontStyle="normal"
              fontWeight="medium"
              lineHeight="normal"
            >
              Customize View
            </Text>
          </Flex>
        </Button>

        <Drawer isOpen={show} placement="right" onClose={handleClose}>
          <DrawerOverlay>
            <DrawerContent maxW="688px" p={0}>
              <DrawerCloseButton mt={1} />
              <DrawerHeader
                fontSize="lg"
                fontStyle="normal"
                fontWeight="medium"
                lineHeight="normal_1"
                h="74px"
                display="flex"
                borderBottom="1px"
                borderBottomColor="#DFE3E6"
                p="5"
                alignItems="center"
              >
                Customize View
              </DrawerHeader>

              <DrawerBody p={0}>
                <Flex h="full">
                  {/* Column 1 */}
                  <Box flex="1" borderRight="1px" borderRightColor="#DFE3E6" pt="1" pb="1" ps="3">
                    <Stack direction="column">
                      <Flex alignItems="center" pt={1} pb={1} ps={3} pe={3} gap={1}>
                        {' '}
                        <CheckIcon /> <Checkbox>Stage</Checkbox>
                      </Flex>
                      <Flex alignItems="center" pt={1} pb={1} ps={3} pe={3} gap={1}>
                        {' '}
                        <CheckIcon /> <Checkbox>Tier</Checkbox>
                      </Flex>
                      <Flex alignItems="center" pt={1} pb={1} ps={3} pe={3} gap={1}>
                        {' '}
                        <CheckIcon /> <Checkbox>Tier</Checkbox>
                      </Flex>
                      <Flex alignItems="center" pt={1} pb={1} ps={3} pe={3} gap={1}>
                        {' '}
                        <CheckIcon /> <Checkbox>Status</Checkbox>
                      </Flex>
                      <Flex alignItems="center" pt={1} pb={1} ps={3} pe={3} gap={1}>
                        {' '}
                        <CheckIcon /> <Checkbox>Owner</Checkbox>
                      </Flex>
                      <Flex alignItems="center" pt={1} pb={1} ps={3} pe={3} gap={1}>
                        {' '}
                        <CheckIcon /> <Checkbox>Stage</Checkbox>
                      </Flex>
                      <Flex alignItems="center" pt={1} pb={1} ps={3} pe={3} gap={1}>
                        {' '}
                        <CheckIcon /> <Checkbox>Region</Checkbox>
                      </Flex>
                    </Stack>
                  </Box>

                  {/* Column 2 */}
                  <Box flex="1" p={4}>
                    <Flex gap={1} flexDirection="column">
                      <Flex gap={1} alignItems="center">
                        <RowIcon /> Rows <Box h="10px" w="10px" bg="#A1C2E1" borderRadius="22px" />
                      </Flex>
                      <Flex
                        alignItems="center"
                        pt={1}
                        pb={1}
                        ps={3}
                        pe={3}
                        gap={1}
                        bg="#A1C2E1"
                        borderRadius=" semiBase"
                        h="xl"
                        justifyContent="space-between"
                      >
                        {' '}
                        <Flex alignItems="center" gap={1}>
                          <CheckIcon />
                          Stage
                        </Flex>
                        <CloseButton _hover={{ bg: 'transparent' }} />
                      </Flex>
                    </Flex>
                    <Divider my="4" />
                    <Flex gap={1} flexDirection="column">
                      <Flex gap={1} alignItems="center">
                        <ColumnIcon /> Columns{' '}
                        <Box h="10px" w="10px" bg="#A1C2E1" borderRadius="22px" />
                      </Flex>
                      <Flex
                        alignItems="center"
                        pt={1}
                        pb={1}
                        ps={3}
                        pe={3}
                        gap={1}
                        bg="#A1C2E1"
                        borderRadius=" semiBase"
                        h="xl"
                        justifyContent="space-between"
                      >
                        {' '}
                        <Flex alignItems="center" gap={1}>
                          <CheckIcon />
                          Stage
                        </Flex>
                        <CloseButton _hover={{ bg: 'transparent' }} />
                      </Flex>
                      <Flex
                        alignItems="center"
                        pt={1}
                        pb={1}
                        ps={3}
                        pe={3}
                        gap={1}
                        bg="#A1C2E1"
                        borderRadius=" semiBase"
                        h="xl"
                        justifyContent="space-between"
                      >
                        {' '}
                        <Flex alignItems="center" gap={1}>
                          <CheckIcon />
                          Stage
                        </Flex>
                        <CloseButton _hover={{ bg: 'transparent' }} />
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </DrawerBody>

              <DrawerFooter borderTop="1px" borderTopColor="#DFE3E6" display="flex" gap={2}>
                <CustomButton variant="discard" text="Discard" />
                <CustomButton variant="apply" text="Apply" />
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        {/* Filter Offcanvas */}

        <Flex className="filterSide" gap={3} alignItems="center">
          <Button
            type="button"
            onClick={handleShowFlter}
            id="2"
            variant="unstyled"
            _hover={{ color: 'hoverClr.primaryHover' }}
          >
            <Flex alignItems="center" gap={2}>
              <FilterIcon w="xs" h="xs" mt={1} />
              <Text
                as="span"
                fontSize="sm"
                fontStyle="normal"
                fontWeight="medium"
                lineHeight="normal"
              >
                Add/Change Filter
              </Text>
            </Flex>
          </Button>

          <Drawer isOpen={showfilter} placement="right" onClose={handleCloseFilter}>
            <DrawerOverlay>
              <DrawerContent maxW="379px" p={0}>
                <DrawerCloseButton />
                <DrawerHeader
                  fontSize="lg"
                  fontStyle="normal"
                  fontWeight="medium"
                  lineHeight="normal_1"
                >
                  Filters
                </DrawerHeader>
                <DrawerBody p={0}>
                  <FormControl>
                    <ReactSelectField
                      name="business"
                      label="Business Developmemt Manager"
                      control={control}
                      options={options}
                      rules={{ required: 'This field is required' }}
                      isMulti={false}
                      mainClass="col-sm-12 pe-3 ps-3"
                      labelClass="lableStyle"
                    />
                    <Divider my="4" />
                    <ReactSelectField
                      name="region"
                      label="Region"
                      control={control}
                      options={options}
                      rules={{ required: 'This field is required' }}
                      isMulti={false}
                      mainClass="col-sm-12 pe-3 ps-3"
                      labelClass="lableStyle"
                    />
                    <Divider my="4" />
                    <ReactSelectField
                      name="class"
                      label="Classification"
                      control={control}
                      options={options}
                      rules={{ required: 'This field is required' }}
                      isMulti={false}
                      mainClass="col-sm-12  pe-3 ps-3"
                      labelClass="lableStyle"
                    />
                    <Divider my="4" />
                    <ReactSelectField
                      name="customer"
                      label="Customer Name"
                      control={control}
                      options={options}
                      rules={{ required: 'This field is required' }}
                      isMulti={false}
                      mainClass="col-sm-12 pe-3 ps-3"
                      labelClass="lableStyle"
                    />
                    <Divider my="4" />
                    <ReactSelectField
                      name="cis"
                      label="CIS"
                      control={control}
                      options={options}
                      rules={{ required: 'This field is required' }}
                      isMulti={false}
                      mainClass="col-sm-12 pe-3 ps-3"
                      labelClass="lableStyle"
                    />
                    <Divider my="4" />
                    <ReactSelectField
                      name="start"
                      label="Start Time"
                      control={control}
                      options={options}
                      rules={{ required: 'This field is required' }}
                      isMulti={false}
                      mainClass="col-sm-12 pe-3 ps-3"
                      labelClass="lableStyle"
                    />
                    <Divider my="4" />
                    <ReactSelectField
                      name="tier"
                      label="Tier"
                      control={control}
                      options={options}
                      rules={{ required: 'This field is required' }}
                      isMulti={false}
                      mainClass="col-sm-12 pe-3 ps-3"
                      labelClass="lableStyle"
                    />
                    {/* Your form fields go here */}
                    <Divider my="4" />
                  </FormControl>
                </DrawerBody>
                <DrawerFooter borderTop="1px" borderTopColor="#DFE3E6" display="flex" gap={2}>
                  <CustomButton variant="discard" text="Discard" />
                  <CustomButton variant="apply" text="Apply" />
                </DrawerFooter>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>

          <Flex
            className="applied-fliter"
            alignItems="center"
            gap={1}
            _hover={{ color: 'hoverClr.primaryHover' }}
          >
            <SettingIcon w="xs" h="xs" display="inline-flex" />
            <Link
              href="www"
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Text
                as="span"
                fontSize="sm"
                fontStyle="normal"
                fontWeight="medium"
                lineHeight="normal"
              >
                View Applied Filters
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default GridTopHeader;
