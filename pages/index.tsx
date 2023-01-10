import React, { useState, useEffect } from "react";
import axios from "axios";
import {droneAndPilot } from "../types";
import Pilot from "../components/Pilot";
import { Flex, useToast, Heading, Button, Spinner } from "@chakra-ui/react";
import { getTimeDiffms } from "../util";
import { useRouter } from "next/router";

function removeDuplicates(fetchedNDZPilots: droneAndPilot[]): droneAndPilot[] {
  let fetchedNDZPilotsNoDuplicates: droneAndPilot[] = [];

  fetchedNDZPilots.forEach((NDZPilot: droneAndPilot) => {
    const serialNumbers: string[] = fetchedNDZPilotsNoDuplicates.map(
      (daP: droneAndPilot) => daP.serialNumber
    );

    if (!serialNumbers.includes(NDZPilot.serialNumber)) {
      fetchedNDZPilotsNoDuplicates.push(NDZPilot);
    } else {
      const previousNDZPilotIndex: number | undefined =
        fetchedNDZPilotsNoDuplicates.findIndex(
          (daP: droneAndPilot) => daP.serialNumber === NDZPilot.serialNumber
        );
      const previousNDZPilot =
        fetchedNDZPilotsNoDuplicates[previousNDZPilotIndex];

      if (
        previousNDZPilot?.distance &&
        previousNDZPilot?.distance > NDZPilot.distance
      ) {
        fetchedNDZPilotsNoDuplicates.splice(previousNDZPilotIndex, 1);
        fetchedNDZPilotsNoDuplicates.push(NDZPilot);
      }
    }
  });

  return fetchedNDZPilotsNoDuplicates;
}

export default function Home() {
  const [NDZPilots, setNDZPilots] = useState<droneAndPilot[]>([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://birdnest-flask-app.herokuapp.com/dronesandpilots")
        .then((response) => {
          const fetchedNDZPilots = response.data as droneAndPilot[];

          const fetchedNDZPilotsNoDuplicates: droneAndPilot[] =
            removeDuplicates(fetchedNDZPilots);
          setNDZPilots(fetchedNDZPilotsNoDuplicates);
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
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex direction="column" w="100%" minW="900px" h={{ md: "", base: "80hv" }}>
      <Flex justify={{ md: "space-between", base: "" }}>
        <Heading size="md" marginBottom="2rem">
          Pilots that crossed No Drone Zone limit
        </Heading>
        <Button
          marginLeft={{ md: "", base: "50px" }}
          onClick={() => {
            router.push("/drones");
          }}
        >
          Drones
        </Button>
      </Flex>
      <Flex direction={{ base: "row", md: "column" }}>
        <Pilot></Pilot>
        {NDZPilots.length === 0 && (
          <Flex justify="center" marginTop="50px">
            <Spinner size="xl" thickness="4px" speed="0.8s" />
          </Flex>
        )}
        {NDZPilots.sort(
          (DaP1, DaP2) =>
            getTimeDiffms(DaP1.timestamp) - getTimeDiffms(DaP2.timestamp)
        ).map((droneAndPilot) => (
          <Pilot
            droneAndPilot={droneAndPilot}
            key={droneAndPilot.droneData.serialNumber}
          ></Pilot>
        ))}
      </Flex>
    </Flex>
  );
}
