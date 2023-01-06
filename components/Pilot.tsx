import { Box, Grid, Popover, PopoverTrigger, PopoverContent, Button, PopoverBody, Flex } from "@chakra-ui/react";
import React from "react";
import { droneAndPilot, pilot } from "../types";
import LastSeen from "./LastSeen";

function PopoverBodyItem(props: {children: pilot}) {
  const pilot = props.children

  return <Flex direction="column">
    <Flex>
      <Box marginRight='1em'>email:</Box> <Box>{pilot.email}</Box>
    </Flex>
    <Flex>
      <Box marginRight='1em'>Phone number:</Box> <Box>{pilot.phoneNumber}</Box>
    </Flex>
    <Flex>
      <Box marginRight='1em'>Pilot ID:</Box> <Box>{pilot.pilotId}</Box>
    </Flex>
  </Flex>
}

export default function Pilot(props: {droneAndPilot: droneAndPilot}) {
  const {droneAndPilot} = props

  if(!droneAndPilot.pilot.pilotId) {
    return <Popover placement="right">
    <PopoverTrigger>
      <Button marginBottom="8px" w="100%">
        No available pilot info
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverBody>
        {JSON.stringify(droneAndPilot.droneData, null, 2)}
      </PopoverBody>
    </PopoverContent>
  </Popover>
  }

  return <Popover placement="right">
    <PopoverTrigger>
      <Button marginBottom="8px">
        <Grid templateColumns='50% 25% 25%' w='100%'>
          <Box>
            {droneAndPilot.pilot.firstName}{' '}{droneAndPilot.pilot.lastName}
          </Box>
          <Box>
            {Math.floor(droneAndPilot.distance*100)/100}{' m'}
          </Box>
          <LastSeen timestamp={droneAndPilot.timestamp}/>
        </Grid>
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverBody>
        <PopoverBodyItem>{droneAndPilot.pilot}</PopoverBodyItem>
      </PopoverBody>
    </PopoverContent>
  </Popover>
}