import { Card, CardBody } from '@chakra-ui/react';
import React from 'react';

function card({ index, children }: any) {
  return (
    <Card
      pe={5}
      ps={5}
      border={0}
      borderRadius={0}
      borderLeft={index === 0 ? '0' : '1px'}
      borderColor="bgClr.LightStrong"
      boxShadow={0}
      minW="220px"
    >
      <CardBody p={0}>{children}</CardBody>
    </Card>
  );
}

export default card;
