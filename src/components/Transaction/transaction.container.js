import React, { useState, useEffect } from "react";
import TransactionComponent from "./transaction.component";
import {
  createWallet,
  getWallet,
  initiateWalletTransaction,
  getWalletTransaction,
} from "../../service/wallet.service";
import { TRANSACTION_TYPE, WALLET_OBJECT } from "../../utils/constants";
import { useLocation } from "react-router-dom";
function TransactionContainer(props) {
  const location = useLocation();

  console.log("localtion", location);
  const state = location?.state;
  const [transactionData, setTransactionData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setIsLoading] = useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("amount");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const fetchWalletTransactionData = async () => {
    try {
      setIsLoading(true);
      const payload = {
        wallet_id: state?.id,
        skip: page,
        limit: rowsPerPage,
      };
      const response = await getWalletTransaction(payload);
      const data = response?.data;
      setTransactionData(data);
      setIsLoading(false);
    } catch (error) {
      console.log("error in fetching transaction", error);
      setIsLoading(false);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangePage = (event, newPage) => {
    console.log("new page", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("handle page change", event);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchWalletTransactionData();
  }, [rowsPerPage, page]);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - transactionData.length)
      : 0;

  return (
    <TransactionComponent
      limit={limit}
      loading={loading}
      setLimit={setLimit}
      transactionData={transactionData}
      order={order}
      setOrder={setOrder}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      selected={selected}
      setSelected={setSelected}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      handleRequestSort={handleRequestSort}
      handleClick={handleClick}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      emptyRows={emptyRows}
      rows={transactionData}
    />
  );
}

export default TransactionContainer;
