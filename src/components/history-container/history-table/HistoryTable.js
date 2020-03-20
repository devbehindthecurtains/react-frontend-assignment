import React from "react";
import Skeleton from "react-loading-skeleton";
import * as PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Typography,
  CircularProgress,
  TableSortLabel
} from "@material-ui/core";

const headerCells = [
  { label: "Date", key: uuidv4() },
  { label: "User ID", key: uuidv4() },
  { label: "Old Value", key: uuidv4() },
  { label: "New value", key: uuidv4() }
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "hidden",
    overFlowY: "hidden",
    paddingTop: 10,
    paddingBottom: 30,
    textAlign: "center",
    marginBottom: 50
  },
  table: {
    minWidth: 300
  },
  tableCell: {
    fontSize: 12
  },
  marginBottom: {
    marginBottom: 16
  },
  marginTop: {
    marginTop: 16
  },
  nowrap: {
    whiteSpace: "nowrap"
  },
  button: {
    marginTop: 16
  }
});

const LoadMoreButton = ({ onClick, isLoading, disabled, children }) => {
  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <CircularProgress className={classes.marginTop} color="primary" />
      ) : (
        <Button
          disabled={isLoading || disabled}
          onClick={onClick}
          align="center"
          className={classes.button}
          color="primary"
          variant="contained"
        >
          {children}
        </Button>
      )}
    </>
  );
};

LoadMoreButton.protoTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired.isRequired
};

/**
 * First of all, I think it is usually bad for user experience to show unmeaningful columns like user id
 *
 * in real life project, we should have a discussion if we need more generic/reusable table.
 * We could also map headerCells to bodyCells with key and sort them accordingly if they do not
 * come always in the right order.
 * Moreover, we could also add prioritization to columns so that we could hide lower priority columns
 * for mobile device / smaller screens etc.
 * But for this exercise, I think this is sufficient enough
 *
 * Using React.memo for performance optimization reasons,
 * This way projects table does not get update when user table's state changes and vice versa
 */
export const HistoryTable = React.memo(
  ({ state, header, loadMore, sortRows, reachedEnd }) => {
    const classes = useStyles();

    const { isLoading, error, tableRows, reverseChronological } = state;
    const buttonLabel = error ? "Retry" : "Load more";

    return (
      <>
        <Typography
          data-testid="history-table-header"
          className={classes.marginBottom}
          variant="h5"
          align="left"
          color="primary"
        >
          {header}
        </Typography>
        <Paper className={classes.root} data-testid="history-table-paper">
          <Table
            data-testid="history-table-table"
            color="primary"
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead data-testid="history-table-tableHead">
              <TableRow data-testid="history-table-tableRow">
                {headerCells.map((header, i) => (
                  <TableCell
                    data-testid="history-table-header-tableCell"
                    className={classes.tableCell}
                    align={Number(i) > 1 ? "right" : "left"}
                    key={header.key}
                  >
                    {header.label === "Date" ? (
                      <TableSortLabel
                        data-testid="history-table-header-tableCell-sortLabel"
                        active
                        direction={reverseChronological ? "asc" : "desc"}
                        onClick={sortRows}
                      >
                        <Typography data-testid="history-table-sortLabel-typography">
                          {header.label}
                        </Typography>
                      </TableSortLabel>
                    ) : (
                      <Typography data-testid="history-table-header-normal-typography">
                        {header.label}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody data-testid="history-table-body">
              {tableRows.map(row => (
                <TableRow data-testid="history-table-body-row" key={row.id}>
                  {Object.keys(row).map((cell, i) => (
                    <TableCell
                      data-testid="history-table-body-cell"
                      className={`${classes.tableCell} ${Number(i) === 0 &&
                        classes.nowrap}`}
                      key={uuidv4()}
                      align={Number(i) > 1 ? "right" : "left"}
                    >
                      <Typography>{row[cell]}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {tableRows.length === 0 && isLoading === true && (
            <Skeleton
              data-testid="history-table-skeleton"
              height={53}
              count={3}
            />
          )}

          {error && (
            <Typography
              data-testid="history-table-error"
              className={classes.marginTop}
              color="error"
            >
              We had problems fetching your data. Please try again.
            </Typography>
          )}

          {!error && reachedEnd && (
            <Typography
              data-testid="history-table-no-more-message"
              className={classes.marginTop}
            >
              No more history records.
            </Typography>
          )}

          {tableRows.length > 0 && (
            <LoadMoreButton
              data-testid="history-table-load-more-button"
              disabled={reachedEnd}
              onClick={loadMore}
              isLoading={isLoading}
            >
              {buttonLabel}
            </LoadMoreButton>
          )}
        </Paper>
      </>
    );
  }
);

HistoryTable.propTypes = {
  loadMore: PropTypes.func,
  header: PropTypes.string,
  reachedEnd: PropTypes.bool,
  state: PropTypes.shape({
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
    total: PropTypes.number,
    limit: PropTypes.number,
    tableRows: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        id: PropTypes.string,
        oldValue: PropTypes.string,
        newValue: PropTypes.string
      }).isRequired
    )
  })
};

HistoryTable.defaultProps = {
  loadMore: () => null,
  header: "",
  reachedEnd: false,
  state: {
    tableRows: []
  }
};
