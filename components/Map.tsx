import { Box, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React, { useState } from "react";
import { drone } from "../types";
import { getDistance } from "../util";

function mapPosition(positionmm: string, dronesSizepx: number): number {
  return Math.round(+positionmm / 1000) * 2 - dronesSizepx/2;
}

export default function Map(props: { drones: drone[] }) {
  const { drones } = props;
  const dronesSize: number = 10
  const positionInfo: string[] = ["positionX", "positionY"]

  return (
    <Box
      minH="1000px"
      h="1000px"
      minW="1000px"
      w="1000px"
      border="3px solid #999"
      backgroundColor="#fff"
      position="relative"
      boxSizing="content-box"
    >
      <Box
        position="absolute"
        top="300px"
        left="300px"
        backgroundColor="rgba(0,0,0,0.05)"
        borderRadius="100%"
        border="1px dashed black"
        w="400px"
        h="400px"
        boxSizing="content-box"
      />
      {drones.length>0 && drones.map((drone: drone) => {
        const isNDZ: boolean = getDistance(drone)<100

        return <Popover key={drone.serialNumber}>
          <PopoverTrigger>
            <Box
              position="absolute"
              bottom={mapPosition(drone.positionY, dronesSize)+"px"}
              left={mapPosition(drone.positionX, dronesSize)+"px"}
              w={dronesSize+"px"}
              h={dronesSize+"px"}
              backgroundColor={isNDZ? "red" : "#555"}
              border="0px"
              cursor="pointer"
              borderRadius="100%"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
            <Flex>
                <Box marginRight='1em'>{"Serail number:"}</Box>
                <Box>{drone["serialNumber"]}</Box>
              </Flex>
              {positionInfo.map((key:string) => <Flex>
                <Box marginRight='1em'>{key+":"}</Box>
                <Box>{Math.round(+drone[key as keyof drone]/1000)+"m"}</Box>
              </Flex>)}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      })}
    </Box>
  );
}
