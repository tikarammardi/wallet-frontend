import React from "react";

import {
  TextField,
  FormLabel,
  Grid,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TRANSACTION_TYPE } from "../../utils/constants";

function WalletComponent(props) {
  const {
    name,
    handleNameChange,
    handleInitialBalanceChange,
    initialBalance,
    handleCreateWallet,
    walletData,
    loading,
    handleTransactionTypeChange,
    transactionType,
    transactionAmount,
    transactionDescription,
    handleWalletTransactionClick,
    handleTransactionAmountChange,
    handleTransactionDescriptionChange,
  } = props;

  return !loading ? (
    walletData?.id ? (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6} sx={{ width: "700px" }}>
          <Card sx={{}}>
            <React.Fragment>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Your Wallet
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Name: {walletData?.name}
                </Typography>
                <Typography variant="body2">
                  Balance: {walletData?.balance}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </React.Fragment>
          </Card>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <TextField
            sx={{ mr: 2 }}
            size="small"
            id="outlined-amount"
            label="amount"
            value={transactionAmount}
            onChange={handleTransactionAmountChange}
          />

          <TextField
            sx={{ mr: 2 }}
            size="small"
            id="outlined-description"
            label="description"
            value={transactionDescription}
            onChange={handleTransactionDescriptionChange}
          />

          <ToggleButtonGroup
            sx={{}}
            color="primary"
            value={transactionType}
            exclusive
            onChange={handleTransactionTypeChange}
          >
            <ToggleButton value={TRANSACTION_TYPE.CREDIT} size="small">
              CREDIT
            </ToggleButton>
            <ToggleButton value={TRANSACTION_TYPE.DEBIT} size="small">
              DEBIT
            </ToggleButton>
          </ToggleButtonGroup>

          <LoadingButton
            disabled={
              !!Number(transactionAmount === 0) ||
              !!(
                walletData?.balance === 0 &&
                TRANSACTION_TYPE.DEBIT === transactionType
              )
            }
            loading={loading}
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleWalletTransactionClick}
          >
            {transactionType}
          </LoadingButton>
        </Grid>
      </Grid>
    ) : (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <TextField
            id="outlined-name"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={3} sx={{ my: 2 }}>
          <TextField
            id="outlined-balance"
            label="Balance"
            value={initialBalance}
            onChange={handleInitialBalanceChange}
          />
        </Grid>
        <Grid item xs={3}>
          <LoadingButton
            disabled={!!Number(initialBalance === 0)}
            loading={loading}
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleCreateWallet}
          >
            Create Wallet
          </LoadingButton>
        </Grid>
      </Grid>
    )
  ) : (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Grid>
  );
}

export default WalletComponent;
