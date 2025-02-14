/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Trash, Filter } from "lucide-react";
import { visuallyHidden } from "@mui/utils";

import { createTheme, Menu, MenuItem, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

function createData(
  id: number,
  name: string,
  score: number,
  grade: string,
  performanceLevel: string
): StudentTable {
  return {
    id,
    name,
    score,
    grade,
    performanceLevel,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof StudentData>(
  order: Order,
  orderBy: Key
): (a: StudentData, b: StudentData) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Student Name",
  },
  {
    id: "score",
    numeric: true,
    disablePadding: false,
    label: "Score(Avg)",
  },
  {
    id: "grade",
    numeric: true,
    disablePadding: false,
    label: "Grade",
  },
  {
    id: "performanceLevel",
    numeric: true,
    disablePadding: false,
    label: "Performance Level",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (property: keyof StudentData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof StudentData) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
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
interface EnhancedTableToolbarProps {
  numSelected: number;
  onFilterChange: (filterType: string, filterValue: string | null) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, onFilterChange } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (
    filterType: string,
    filterValue: string | null
  ) => {
    onFilterChange(filterType, filterValue);
    handleClose();
  };

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Student Performance
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Trash />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton onClick={handleFilterClick}>
              <Filter />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => handleFilterSelect("grade", "A")}>
              Filter by Grade: A
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("grade", "B")}>
              Filter by Grade: B
            </MenuItem>
            <MenuItem
              onClick={() => handleFilterSelect("performance", "Excellent")}
            >
              Filter by Performance: Excellent
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("performance", "Good")}>
              Filter by Performance: Good
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("clearAll", null)}>
              Clear Filters
            </MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  );
}

export default function TableComponent() {
  const theme = useTheme();

  const studentData = useSelector((state: any) => state.students.students);
  const rows = studentData.map((student: StudentData) => {
    const { id, name, score, grade, performanceLevel } = student;
    return createData(id, name, score, grade, performanceLevel);
  });
  // const [rows, setRows] = React.useState<StudentData[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof StudentData>("name");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [gradeFilter, setGradeFilter] = React.useState<string | null>(null);
  const [performanceFilter, setPerformanceFilter] = React.useState<
    string | null
  >(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [dense, setDense] = React.useState(false);

  const handleRequestSort = (property: keyof StudentData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFilterChange = (
    filterType: string,
    filterValue: string | null
  ) => {
    if (filterType === "clearAll") {
      // Reset all filters when clearAll is passed
      setGradeFilter(null);
      setPerformanceFilter(null);
    } else if (filterType === "grade") {
      setGradeFilter(filterValue);
    } else if (filterType === "performance") {
      setPerformanceFilter(filterValue);
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    let filteredRows = rows;

    // Apply grade filter
    if (gradeFilter) {
      filteredRows = filteredRows.filter(
        (row: any) => row.grade === gradeFilter
      );
    }

    // Apply performance filter
    if (performanceFilter) {
      filteredRows = filteredRows.filter(
        (row: any) => row.performanceLevel === performanceFilter
      );
    }

    // Sort and paginate
    return filteredRows
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, order, orderBy, page, rowsPerPage, gradeFilter, performanceFilter]);

  const customTheme = createTheme({
    palette: {
      mode: theme.theme === "dark" ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            backgroundColor: theme.theme === "dark" ? "#000" : "#fff",
          }}
        >
          <EnhancedTableToolbar
            numSelected={selected.length}
            onFilterChange={handleFilterChange}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row: any, index: any) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                      <TableCell align="right">{row.grade}</TableCell>
                      <TableCell align="right">
                        {row.performanceLevel}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={
                      {
                        // height: (dense ? 33 : 53) * emptyRows,
                      }
                    }
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </ThemeProvider>
  );
}
