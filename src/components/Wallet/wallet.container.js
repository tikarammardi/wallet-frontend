import React, { useState, useEffect } from "react";
import WalletComponent from "./wallet.component";
import {
  createWallet,
  getWallet,
  initiateWalletTransaction,
} from "../../service/wallet.service";
import { TRANSACTION_TYPE, WALLET_OBJECT } from "../../utils/constants";

function WalletContainer() {
  const [name, setName] = useState("Wallet A");
  const [initialBalance, setInitialBalance] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionType, setTransactionType] = useState(
    TRANSACTION_TYPE.CREDIT
  );

  const handleTransactionTypeChange = (event, tnxType) => {
    setTransactionType(tnxType);
  };
  const handleTransactionAmountChange = (event) => {
    setTransactionAmount(event.target.value);
  };
  const handleTransactionDescriptionChange = (event) => {
    setTransactionDescription(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleInitialBalanceChange = (event) => {
    setInitialBalance(event.target.value);
  };
  const handleCreateWallet = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name,
        balance: initialBalance,
      };
      const response = await createWallet(payload);

      const walletInfo = response?.data;
      setWalletData(walletInfo);
      localStorage.setItem(WALLET_OBJECT, JSON.stringify(walletInfo));
      setIsLoading(false);
    } catch (error) {
      console.log("error createing wallet", error);
      setIsLoading(false);
    }
  };

  const handleWalletTransactionClick = async () => {
    try {
      setIsLoading(true);
      let amount = Number(transactionAmount);

      if (amount === 0) {
        return;
      }
      if (transactionType === TRANSACTION_TYPE.DEBIT) {
        amount = Number(amount) * -1;
      }

      const payload = {
        wallet_id: walletData?.id,
        amount: amount,
        description: transactionDescription || transactionType,
        type: transactionType,
      };
      const response = await initiateWalletTransaction(payload);
      const data = response?.data;

      const walletInfo = JSON.parse(localStorage.getItem(WALLET_OBJECT));
      const newWalletInfo = {
        id: walletInfo?.id,
        name: walletInfo?.name,
        date: walletInfo?.date,
        balance: data?.balance,
      };
      localStorage.setItem(WALLET_OBJECT, JSON.stringify(newWalletInfo));
      setWalletData(newWalletInfo);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const walletInfo = JSON.parse(localStorage.getItem(WALLET_OBJECT));

    if (walletInfo) {
      setWalletData(walletInfo);
    }
  }, []);

  const getWalletData = async (data) => {
    try {
      setIsLoading(true);
      const response = await getWallet({ wallet_id: data?.id });
      const walletInfo = response?.data;
      setWalletData(walletInfo);
      localStorage.setItem(WALLET_OBJECT, JSON.stringify(walletInfo));
      setIsLoading(false);
    } catch (error) {
      console.log("error in getting wallet details", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    walletData?.id && getWalletData(walletData);
  }, []);

  return (
    <WalletComponent
      name={name}
      initialBalance={initialBalance}
      handleInitialBalanceChange={handleInitialBalanceChange}
      handleNameChange={handleNameChange}
      handleCreateWallet={handleCreateWallet}
      loading={loading}
      walletData={walletData}
      handleTransactionTypeChange={handleTransactionTypeChange}
      transactionType={transactionType}
      handleWalletTransactionClick={handleWalletTransactionClick}
      transactionAmount={transactionAmount}
      transactionDescription={transactionDescription}
      handleTransactionAmountChange={handleTransactionAmountChange}
      handleTransactionDescriptionChange={handleTransactionDescriptionChange}
    />
  );
}

export default WalletContainer;
