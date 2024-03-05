import React, { FC } from "react";
import { styled } from "@mui/material";
import Link from "next/link";

interface CustomLinkProps {
  text: string;
  link: string;
}

const StyledLink = styled(Link)({
  cursor: "pointer",
});

const CustomLink: FC<CustomLinkProps> = ({ text, link }) => {
  return <StyledLink href={link}>{text}</StyledLink>;
};

export default CustomLink;
