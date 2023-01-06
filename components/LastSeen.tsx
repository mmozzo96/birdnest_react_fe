import React from "react";
import { Box } from "@chakra-ui/react";
import { getTimeDiffms } from "../util";

export default function LastSeen(props: { timestamp: string }) {
  const { timestamp } = props;
  const lastSeenDifferencems: number = getTimeDiffms(timestamp)

  const diffLastSeenDifference: string = lastSeenDifferencems<60000 ?
    "<1min ago" : lastSeenDifferencems<120000 ?
      "1min ago" : (Math.floor(lastSeenDifferencems/60000)+"mins ago")

  return <Box>{diffLastSeenDifference}</Box>;
}
