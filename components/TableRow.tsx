import { Grid, GridProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface props extends GridProps {
  isTitle?: boolean
}

export default function TableRow(props: props) {
  const {isTitle} = props

  return <Grid
  templateColumns="20% 15% 15% 30% 20%"
  w="100%"
  backgroundColor={isTitle ? "" : "#eee"}
  borderRadius="4px"
  marginBottom={isTitle ? "10px" : "6px"}
  fontWeight={isTitle ? "700" : "600"}
  fontSize={isTitle ? "20" : "16"}
  textAlign="center"
  padding=".5rem"
  {...props}
>
  {props.children}
</Grid>

}