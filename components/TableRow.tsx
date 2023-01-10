import { Grid, GridProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface props extends GridProps {
  isTitle?: boolean;
}

export default function TableRow(props: props) {
  const { isTitle, ...rest } = props;

  return (
    <Grid
      templateColumns={{ md: "20% 15% 15% 30% 20%", base: "1fr" }}
      templateRows={{ md: "1fr", base: "repeat(5, 1fr)" }}
      w="100%"
      minW={{ md: "", base: isTitle ? "200px" : "" }}
      padding={{ md: ".5rem", base: "2rem 1rem" }}
      backgroundColor={isTitle ? "" : "#eee"}
      borderRadius="4px"
      marginBottom={isTitle ? "10px" : "6px"}
      marginRight={{ md: "", base: isTitle ? "14px" : "10px" }}
      fontWeight={isTitle ? "700" : "600"}
      fontSize={isTitle ? "20" : "16"}
      textAlign="center"
      {...rest}
    >
      {props.children}
    </Grid>
  );
}
