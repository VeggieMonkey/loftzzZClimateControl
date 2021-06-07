import React from "react";
import {
  makeStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { TableCellProps } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import { KeyboardArrowDownIcon, KeyboardArrowRightIcon } from "./icons";
import { useStyles } from "./theme";
import { MenuAction, IsolatedMenu } from "./IsolatedMenu";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#555",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const useRowStyles = makeStyles({
  rowRoot: {
    "& > *": {
      borderBottom: "unset",
    },
    "&:hover": {
      backgroundColor: "#777",
    },
  },
});

// this is actually a TableCell
export interface TableRow {
  id?: string;
  data: string;
  align?: TableCellProps["align"];
}
// export type TableRows = TableRow[][];
export type TableRows = TableRow[][];
export type TableActions = MenuAction[];
export type Options = {
  expandable?: boolean;
  expandableContent?: (row: TableRow[], rowIndex: number) => React.ReactElement;
};
interface Props {
  columns: { name: string; align?: string }[];
  data: TableRows;
  handleRowClick?: (row: number) => void;
  actions?: TableActions;
  options?: Options;
}
export const Table: React.FC<Props> = ({
  columns,
  data,
  handleRowClick,
  actions = [],
  options = { expandable: false },
}) => {
  const classes = useStyles();
  const { rowRoot } = useRowStyles();
  const [openRows, setOpenRows] = React.useState<{
    [openRowId: number]: boolean;
  }>({});

  const _handleRowClick = (row: number) => {
    if (handleRowClick) {
      return () => handleRowClick(row);
    }
  };

  const toggleRow = (row: number) => {
    setOpenRows({
      ...openRows,
      [row]: openRows[row] === undefined ? true : !openRows[row],
    });
  };

  return (
    <TableContainer component={Paper}>
      <MaterialTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {options.expandable && (
              <StyledTableCell align="right"></StyledTableCell>
            )}
            {columns.map(({ name, align }) => (
              <StyledTableCell
                key={`head-cell-${name}`}
                align={align as TableCellProps["align"]}
              >
                {name}
              </StyledTableCell>
            ))}
            {actions && <StyledTableCell align="right">Action</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`}>
              <TableRow className={rowRoot} onClick={_handleRowClick(rowIndex)}>
                <>
                  {options.expandable && (
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => toggleRow(rowIndex)}
                      >
                        {openRows[rowIndex] ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowRightIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  )}
                  {row.map((cell, index) => {
                    if (index === 0) {
                      return (
                        <TableCell
                          key={`cell-${cell.id || index}`}
                          component="th"
                          scope="row"
                        >
                          {cell.data}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={`cell-${cell.id || index}`} align="right">
                        {cell.data}
                      </TableCell>
                    );
                  })}
                  <IsolatedMenu
                    key={`actions-${rowIndex}`}
                    row={rowIndex}
                    actions={actions}
                  />
                </>
              </TableRow>
              {options.expandable && (
                <TableRow key={`row-expand-${rowIndex}`}>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRows[rowIndex]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        {options.expandableContent &&
                          options.expandableContent(row, rowIndex)}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};
