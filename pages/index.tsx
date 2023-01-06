import React, { useState, useEffect } from "react";
import axios from "axios";
import { drone, droneAndPilot } from "../types";
import Pilot from "../components/Pilot";
import { Flex, useToast, Grid, Box } from "@chakra-ui/react";
import { getTimeDiffms } from "../util";

function Title(props: {children: string}) {
  return <Flex textAlign="center" justify="center" align="center" fontWeight="bolder" fontSize="18">{props.children}</Flex>;
}

export default function Home() {
  const [NDZPilots, setNDZPilots] = useState<droneAndPilot[]>([]);
  const [drones, setDrones] = useState<drone[]>([]);
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://birdnest-flask-app.herokuapp.com/dronesandpilots")
        .then((response) => {
          setNDZPilots(response.data as droneAndPilot[]);
        })
        .catch((error: Error) => {
          console.log(error);
          toast({
            position: "top-right",
            status: "error",
            title: error.message + " fetching pilots",
            duration: 1500,
          });
        });
      axios
        .get("https://birdnest-flask-app.herokuapp.com/drones")
        .then((response) => {
          setDrones(response.data as drone[]);
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
    <Flex direction="column" w="25vw" minW="350px">
      <Grid templateColumns="50% 25% 25%" w="100%" margin="1em 0">
        <Title>Pilot name</Title>
        <Title>Closer distance to the nest</Title>
        <Title>Last seen</Title>
      </Grid>
      {NDZPilots.sort(
        (DaP1, DaP2) =>
          getTimeDiffms(DaP1.timestamp) - getTimeDiffms(DaP2.timestamp)
      ).map((droneAndPilot) => (
        <Pilot droneAndPilot={droneAndPilot}></Pilot>
      ))}
    </Flex>
  );
}
