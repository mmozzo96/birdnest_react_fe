import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Map from "../components/Map";
import { drone } from "../types";
import axios from "axios";
import { getDistance } from "../util";
import TableRow from "../components/TableRow";

export default function Drones() {
  const router = useRouter();
  const toast = useToast();
  const [drones, setDrones] = useState<drone[]>([]);
  const [NDZDrones, setNDZDrones] = useState<drone[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://birdnest-flask-app.herokuapp.com/drones")
        .then((response) => {
          setDrones(response.data as drone[]);
          setNDZDrones(
            (response.data as drone[]).filter(
              (drone: drone) => getDistance(drone) < 100
            )
          );
        })
        .catch((error: Error) => {
          console.log(error);
          toast({
            position: "top-right",
            status: "error",
            title: error.message + " fetching drones",
            duration: 1500,
          });
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex direction="column" w="100%" minW="900px">
      <Flex justify={{ md: "space-between", base: "" }}>
        <Heading size="md" marginBottom="4rem">
          Pilots that crossed No Drone Zone limit
        </Heading>
        <Button
          marginLeft={{ md: "", base: "50px" }}
          onClick={() => {
            router.push("/");
          }}
        >
          Go back
        </Button>
      </Flex>
      <Flex justify="space-between" direction={{ md: "row", base: "column" }}>
        <Map drones={drones}></Map>
        <Flex
          direction="column"
          w="500px"
          minW="500px"
          marginLeft={{ md: "50px", base: "" }}
        >
          <Heading
            size="md"
            textTransform="uppercase"
            marginTop={{ md: "", base: "50px" }}
          >
            No Drone Zone drones
          </Heading>
          <Flex
            direction={{ md: "column", base: "row" }}
            align={{ md: "", base: "start" }}
            marginTop={{ md: "", base: "50px" }}
          >
            <TableRow
              isTitle={true}
              templateColumns={{ md: "40% 30% 30%", base: "1fr" }}
              templateRows={{ base: "repeat(3, 1fr)", md: "1fr" }}
              minW="200px"
              maxW={{ base: "200px", md: "100%" }}
            >
              {["Serial number", "Position X", "Position Y"].map(
                (element: string) => (
                  <Flex align="center" justify="center" key={element}>
                    {element}
                  </Flex>
                )
              )}
            </TableRow>
            {NDZDrones.length > 0 &&
              NDZDrones.map((drone: drone) => {
                const droneInfo = [
                  drone.serialNumber,
                  Math.round(+drone.positionX / 1000) + "m",
                  Math.round(+drone.positionY / 1000) + "m",
                ];
                return (
                  <TableRow
                    templateColumns={{ md: "40% 30% 30%", base: "1fr" }}
                    templateRows={{ base: "repeat(3, 1fr)", md: "1fr" }}
                    minW={{ md: "", base: "200px" }}
                    key={drone.serialNumber}
                  >
                    {droneInfo.map((element: string) => (
                      <Flex align="center" justify="center" key={element}>
                        {element}
                      </Flex>
                    ))}
                  </TableRow>
                );
              })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
