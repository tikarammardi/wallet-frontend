import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Table, Chip } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { TRANSACTION_TYPE } from "../../utils/constants";
import { CSVLink } from "react-csv";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    alignHeaderRight: false,
    disablePadding: false,
    label: "Transaction Id",
  },
  {
    id: "amount",
    alignHeaderRight: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "balance",
    alignHeaderRight: true,
    disablePadding: false,
    label: "Balance",
  },
  {
    id: "description",
    alignHeaderRight: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "date",
    alignHeaderRight: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "type",
    alignHeaderRight: true,
    disablePadding: false,
    label: "CREDIT/DEBIT",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignHeaderRight ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Transaction Details
      </Typography>
    </Toolbar>
  );
};

export default function TransactionComponent(props) {
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleRequestSort,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
    rows,
  } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="gridcell"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.balance}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={row.type}
                          color={
                            row?.type === TRANSACTION_TYPE.CREDIT
                              ? "success"
                              : "warning"
                          }
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CSVLink
          data={rows}
          filename={`transaction_${page + 1}.csv`}
          className="btn btn-primary"
          target="_blank"
        >
          Download CSV
        </CSVLink>
      </Paper>
    </Box>
  );
}
