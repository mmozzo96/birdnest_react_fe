import {
  Box,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@chakra-ui/react";
import { Drone } from "../types";
import { getDistance } from "../util";
import React from "react";

function mapPosition(positionmm: string, dronesSizepx: number): number {
  return Math.round(+positionmm / 1000) * 2 - dronesSizepx / 2;
}

export default function Map(props: { drones: Drone[] }) {
  const { drones } = props;
  const dronesSize: number = 10;
  const positionInfo: string[] = ["positionX", "positionY"];

  return (
    <Box
      minH={{ md: "1000px", base: "500px" }}
      h={{ md: "1000px", base: "500px" }}
      minW={{ md: "1000px", base: "500px" }}
      w={{ md: "1000px", base: "500px" }}
      border="3px solid #999"
      backgroundColor="#fff"
      position="relative"
      boxSizing="content-box"
    >
      {drones.length > 0 ? (
        <>
          <Box
            position="absolute"
            top={{ md: "300px", base: "150px" }}
            left={{ md: "300px", base: "150px" }}
            backgroundColor="rgba(0,0,0,0.05)"
            borderRadius="100%"
            border="1px dashed black"
            w={{ md: "400px", base: "200px" }}
            h={{ md: "400px", base: "200px" }}
            boxSizing="content-box"
          />
          {drones.map((drone: Drone) => {
            const isNdz: boolean = getDistance(drone) < 100;

            return (
              <Popover key={drone.serialNumber}>
                <PopoverTrigger>
                  <Box
                    position="absolute"
                    bottom={{
                      md: mapPosition(drone.positionY, dronesSize) + "px",
                      base: mapPosition(drone.positionY, dronesSize) / 2 + "px",
                    }}
                    left={{
                      md: mapPosition(drone.positionX, dronesSize) + "px",
                      base: mapPosition(drone.positionX, dronesSize) / 2 + "px",
                    }}
                    w={dronesSize + "px"}
                    h={dronesSize + "px"}
                    backgroundColor={isNdz ? "red" : "#555"}
                    border="0px"
                    cursor="pointer"
                    borderRadius="100%"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody>
                    <Flex>
                      <Box marginRight="1em">{"Serail number:"}</Box>
                      <Box>{drone["serialNumber"]}</Box>
                    </Flex>
                    {positionInfo.map((key: string) => (
                      <Flex key={key}>
                        <Box marginRight="1em">{key + ":"}</Box>
                        <Box>
                          {Math.round(+drone[key as keyof Drone] / 1000) + "m"}
                        </Box>
                      </Flex>
                    ))}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            );
          })}
        </>
      ) : (
        <Flex h="100%" w="100%" justify="center" align="center">
          <Spinner size="xl" thickness="4px" speed="0.8s" />
        </Flex>
      )}
    </Box>
  );
}
