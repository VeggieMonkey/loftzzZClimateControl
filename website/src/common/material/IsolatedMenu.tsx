import React from "react";
import styled from "styled-components";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useStyles } from "./theme";

const IconWrapper = styled.div`
  margin-right: 10px;
  margin-top: 5px;
`;

export interface MenuAction {
  name: string;
  action: (rowId: number) => void;
  renderIcon?: () => React.ReactElement;
}

export const IsolatedMenu = (
  { actions, row }: { actions: MenuAction[]; row: number } = {
    actions: [],
    row: -1,
  }
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event?: any) => {
    if (event) {
      if ("stopPropagation" in event) {
        event.stopPropagation();
      }
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actions.map(({ renderIcon, action, name }) => {
          return (
            <MenuItem
              key={`action-${name}`}
              onClick={(event) => {
                event.stopPropagation();
                action(row);
                handleClose();
              }}
              className={classes.menuItem}
            >
              <>
                {renderIcon && (
                  <IconWrapper>{renderIcon && renderIcon()}</IconWrapper>
                )}
                {name}
              </>
            </MenuItem>
          );
        })}
      </Menu>
      <TableCell align="right" style={{ width: "20px" }}>
        <Button
          aria-controls="user-session-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
        >
          <MoreVertIcon />
        </Button>
      </TableCell>
    </>
  );
};
