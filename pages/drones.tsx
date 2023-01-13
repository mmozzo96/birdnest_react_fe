import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { Drone } from "../types";
import { getDistance } from "../util";
import { useRouter } from "next/router";
import axios from "axios";
import Map from "../components/Map";
import TableRow from "../components/TableRow";
import React, { useEffect, useState } from "react";

export default function Drones() {
  const router = useRouter();
  const toast = useToast();
  const [drones, setDrones] = useState<Drone[]>([]);
  const [ndzDrones, setNdzDrones] = useState<Drone[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://birdnest-flask-app.herokuapp.com/drones")
        .then((response) => {
          setDrones(response.data as Drone[]);
          setNdzDrones(
            (response.data as Drone[]).filter(
              (drone: Drone) => getDistance(drone) < 100
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
            {ndzDrones.length > 0 &&
              ndzDrones.map((drone: Drone) => {
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
