import { Button, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import { droneAndPilot } from "../types";
import { getTimeDiffms } from "../util";
import { useRouter } from "next/router";
import axios from "axios";
import Pilot from "../components/Pilot";
import React, { useState, useEffect } from "react";

function removeDuplicates(fetchedNdzPilots: droneAndPilot[]): droneAndPilot[] {
  let fetchedNdzPilotsNoDuplicates: droneAndPilot[] = [];

  fetchedNdzPilots.forEach((ndzPilot: droneAndPilot) => {
    const serialNumbers: string[] = fetchedNdzPilotsNoDuplicates.map(
      (daP: droneAndPilot) => daP.serialNumber
    );

    if (!serialNumbers.includes(ndzPilot.serialNumber)) {
      fetchedNdzPilotsNoDuplicates.push(ndzPilot);
    } else {
      const previousNdzPilotIndex: number | undefined =
        fetchedNdzPilotsNoDuplicates.findIndex(
          (daP: droneAndPilot) => daP.serialNumber === ndzPilot.serialNumber
        );
      const previousNdzPilot =
        fetchedNdzPilotsNoDuplicates[previousNdzPilotIndex];

      if (
        previousNdzPilot?.distance &&
        previousNdzPilot?.distance > ndzPilot.distance
      ) {
        fetchedNdzPilotsNoDuplicates.splice(previousNdzPilotIndex, 1);
        fetchedNdzPilotsNoDuplicates.push(ndzPilot);
      }
    }
  });

  return fetchedNdzPilotsNoDuplicates;
}

export default function Home() {
  const [ndzPilots, setNdzPilots] = useState<droneAndPilot[]>([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://birdnest-flask-app.herokuapp.com/dronesandpilots")
        .then((response) => {
          const fetchedNdzPilots = response.data as droneAndPilot[];

          const fetchedNdzPilotsNoDuplicates: droneAndPilot[] =
            removeDuplicates(fetchedNdzPilots);
          setNdzPilots(fetchedNdzPilotsNoDuplicates);
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
        {ndzPilots.length === 0 && (
          <Flex justify="center" marginTop="50px">
            <Spinner size="xl" thickness="4px" speed="0.8s" />
          </Flex>
        )}
        {ndzPilots
          .sort(
            (DaP1, DaP2) =>
              getTimeDiffms(DaP1.timestamp) - getTimeDiffms(DaP2.timestamp)
          )
          .map((droneAndPilot) => (
            <Pilot
              droneAndPilot={droneAndPilot}
              key={droneAndPilot.droneData.serialNumber}
            ></Pilot>
          ))}
      </Flex>
    </Flex>
  );
}
