import { Flex, Grid } from "@chakra-ui/react";
import React from "react";
import { droneAndPilot } from "../types";
import { getTimeDiffms } from "../util";
import TableRow from "./TableRow";

function LastSeen(timestamp?: string): string {
  if (!timestamp) return "";
  const lastSeenDifferencems: number = getTimeDiffms(timestamp);

  const diffLastSeenDifference: string =
    lastSeenDifferencems < 60000
      ? "<1min ago"
      : lastSeenDifferencems < 120000
      ? "1min ago"
      : Math.floor(lastSeenDifferencems / 60000) + "mins ago";

  return diffLastSeenDifference;
}

export default function Pilot(props: { droneAndPilot?: droneAndPilot }) {
  const { droneAndPilot } = props;
  const isTitle: boolean = !droneAndPilot;
  const info = {
    "Pilot name":
      droneAndPilot?.pilot.firstName + " " + droneAndPilot?.pilot.lastName,
    "Closer distance to the nest": droneAndPilot?.distance
      ? Math.floor(droneAndPilot?.distance * 100) / 100 + " m"
      : "",
    "Last seen": LastSeen(droneAndPilot?.timestamp),
    Email: droneAndPilot?.pilot.email ?? "",
    "Phone number": droneAndPilot?.pilot.phoneNumber ?? "",
  };
  const infoArray: string[] = isTitle ? Object.keys(info) : Object.values(info);

  return (
    <TableRow isTitle={isTitle}>
      {infoArray.map((element: string) => (
        <Flex align="center" justify="center">
          {element}
        </Flex>
      ))}
    </TableRow>
  );
}
