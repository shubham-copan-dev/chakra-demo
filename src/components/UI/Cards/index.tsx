import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import Card from './card';

function cardView() {
  const cardsdata = [
    {
      title: 'New Request',
      number: '60',
    },
    {
      title: 'Onboarding in Progress',
      number: '50',
    },
    {
      title: 'Invite sent to Customer',
      number: '70',
    },
    {
      title: 'Onboarding Completed',
      number: '30',
    },
    {
      title: 'Trade Full Pending Approval',
      number: '50',
    },
    {
      title: 'Onboarding Cycle-time',
      number: '70',
    },
  ];

  return (
    <>
      <Flex align="center" justify="space-between" pt={5} pb={3} pe={5} ps={5}>
        <Heading
          as="h1"
          fontSize="xxl"
          fontWeight="medium"
          lineHeight="base"
          color="BaseClr.Primary"
        >
          Customer Management
        </Heading>
        <Flex p="px" borderRadius="semiBase" bg="SectionClr.button">
          <Button
            type="button"
            bg="transparent"
            borderRadius="semiBase"
            fontSize="sm"
            fontWeight="medium"
            pt="px"
            pb="px"
            pe={1}
            ps={1}
            color="BaseClr.Primary"
            _hover={{
              bg: 'bgClr.LightLow',
              color: 'hoverClr.primaryHover',
              boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            All Regions
          </Button>
          <Button
            type="button"
            bg="transparent"
            borderRadius="semiBase"
            fontSize="sm"
            fontWeight="medium"
            pt="px"
            pb="px"
            pe={1}
            ps={1}
            color="BaseClr.Primary"
            _hover={{
              bg: 'bgClr.LightLow',
              color: 'hoverClr.primaryHover',
              boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            North America
          </Button>
          <Button
            type="button"
            bg="transparent"
            borderRadius="semiBase"
            fontSize="sm"
            fontWeight="medium"
            pt="px"
            pb="px"
            pe={1}
            ps={1}
            color="BaseClr.Primary"
            _hover={{
              bg: 'bgClr.LightLow',
              color: 'hoverClr.primaryHover',
              boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            APAC
          </Button>
        </Flex>
      </Flex>

      <Flex
        mb={4}
        className="main-cards"
        border="1px"
        borderColor="BaseClr.Teritary"
        borderRadius="normal"
        ms={5}
        me={5}
        w="fit-content"
      >
        <Flex
          className="ccc"
          borderRadius="normal"
          bg="bgClr.LightLow"
          pt={5}
          pb={5}
          w="full"
          flexWrap="wrap"
        >
          {cardsdata.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index} index={index}>
              <Text
                mb={2}
                fontSize="sm"
                fontWeight="medium"
                lineHeight="normal"
                color="BaseClr.Primary"
              >
                {item.title}
              </Text>
              <Flex justify="space-between" align="center">
                <Heading
                  as="h3"
                  m={0}
                  fontSize="xxl"
                  fontWeight="medium"
                  lineHeight="base"
                  color="BaseClr.Primary"
                >
                  {item.number}
                </Heading>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>
    </>
  );
}

export default cardView;
