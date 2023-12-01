'use client';

import { DotIcon } from '@/chakraConfig/icons';
import { fieldTypes } from '@/utilities/constants';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

import ReuseButton from '../common/ReuseButton';

// Customer Name

export function CustomerName(params: any) {
  const { value } = params;

  return (
    <Flex alignItems="center" gap={2}>
      {value ? (
        <>
          <Flex
            bg=" SectionClr.button"
            p="1.5"
            borderRadius="50%"
            w="lg"
            h="lg"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Image src="images/profile.svg" alt="profile" width={32} height={32} /> */}
          </Flex>
          <Box>
            <Link href="#link" color="hoverClr.primaryHover">
              {value}
            </Link>
          </Box>
        </>
      ) : null}
    </Flex>
  );
}

// Tier

export function Tier(params: any) {
  const { value } = params;
  const Medal: any = () => {
    switch (params?.value) {
      case fieldTypes?.BRONZE:
        return 'images/Bronze.svg';
      case fieldTypes?.SILVER:
        return 'images/Silver.svg';
      case fieldTypes?.GOLD:
        return 'images/Gold.svg';
      case fieldTypes?.PLATINUM:
        return 'images/Premium.svg';
      default:
        return undefined;
    }
  };

  return (
    <Flex alignItems="center" gap={2}>
      {value ? (
        <>
          {' '}
          <Image src={Medal()} alt="medal" w="30px" h="30px" />
          {value}
        </>
      ) : null}
    </Flex>
  );
}

// Experiece Level

export function Experience(params: any) {
  const { value } = params;

  return <Box>{value ? <ReuseButton variantType="outline" text={value} /> : null}</Box>;
}

// Status

export function Status(params: any) {
  const { value } = params;

  const showStatus: any = () => {
    switch (params?.value) {
      case fieldTypes?.ACTIVE:
        return 'primary';
      case fieldTypes?.INACTIVE:
        return 'secondary';

      default:
        return '';
    }
  };

  return <Box>{value ? <ReuseButton variantType={showStatus()} text={value} /> : null}</Box>;
}

// Lifecycle

export function LifeCycle(params: any) {
  const { value } = params;

  return (
    <Flex alignItems="center" gap={2}>
      {/* <Image src={Lifecycle} alt="life" /> */}
      <Image src="images/LifecycleOnboard.png" alt="life" />
      <Link href="#link">{value}</Link>
    </Flex>
  );
}

// CIS

export function Cis(params: any) {
  const { value } = params;

  return (
    <Flex alignItems="center" gap={2}>
      {value ? (
        <>
          <Flex
            bg=" SectionClr.button"
            p="1.5"
            borderRadius="50%"
            w="lg"
            h="lg"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Image src="images/profile.svg" alt="profile" width={32} height={32} /> */}
          </Flex>
          <Box>
            <Link href="#link">{value}</Link>
          </Box>
        </>
      ) : null}
    </Flex>
  );
}

// Action

export function Action(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: 'SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        w="lg"
        h="lg"
        alignItems="center"
        display="flex"
        justifyContent="center"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}

// BDM

export function Bdm(params: any) {
  const { value } = params;

  return (
    <Flex alignItems="center" gap={2}>
      {value ? (
        <>
          <Flex
            bg="#eff1f3"
            p="1.5"
            borderRadius="50%"
            w="lg"
            h="lg"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Image src="images/profile.svg" alt="profile" width={32} height={32} /> */}
          </Flex>
          <Box>
            <Link href="#link" color="hoverClr.primaryHover">
              {value}
            </Link>
          </Box>
        </>
      ) : null}
    </Flex>
  );
}

// PROJECT

export function Project(params: any) {
  const { value } = params;

  return (
    <Flex alignItems="center" gap={2}>
      {value ? (
        <>
          <Flex
            bg="#eff1f3"
            p="1.5"
            borderRadius="50%"
            w="lg"
            h="lg"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Image src="images/profile.svg" alt="profile" width={32} height={32} /> */}
          </Flex>
          <Box>
            <Link href="#link" color="hoverClr.primaryHover">
              {value}
            </Link>
          </Box>
        </>
      ) : null}
    </Flex>
  );
}
export function Guidelines(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: ' SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="lg"
        h="lg"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}
export function Gpb(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: ' SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="lg"
        h="lg"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}
export function Rocks(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: ' SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="lg"
        h="lg"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}
export function Ms(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: ' SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="lg"
        h="lg"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}
export function Nnb(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: ' SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="lg"
        h="lg"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}
export function On(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: ' SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="lg"
        h="lg"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}
export function Job(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: ' SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="lg"
        h="lg"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}
export function Coms(params: any) {
  const { value } = params;

  return (
    <Flex justifyContent="space-between">
      <Text color="hoverClr.primaryHover">{value}</Text>

      <Box
        _hover={{ bg: ' SectionClr.button' }}
        p="1.5"
        borderRadius="50%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="lg"
        h="lg"
        mt="5px"
      >
        <DotIcon w="xs" h="xs" _hover={{ color: 'hoverClr.primaryHover' }} />
      </Box>
    </Flex>
  );
}
