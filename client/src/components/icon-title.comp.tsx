import { Typography, Avatar, styled } from "@mui/material";
import React, { FC } from "react";

type IconTitleProps = {
  title: string;
  Icon: React.ElementType;
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
}));

const IconTitle: FC<IconTitleProps> = ({ title, Icon }) => {
  return (
    <>
      <StyledAvatar>
        <Icon />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
    </>
  );
};

export default IconTitle;
