import axios from "axios";
const WALLET_API = process.env.REACT_APP_WALLET_API_BASE_URL;

export const createWallet = async (payload) => {
  try {
    const data = {
      name: payload?.name,
      balance: Number(payload?.balance),
    };

    const URL = `${WALLET_API}/setup`;
    const response = await axios.post(URL, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getWallet = async (payload) => {
  try {
    const URL = `${WALLET_API}/wallet/${payload?.wallet_id}`;
    const response = await axios.get(URL);
    return response;
  } catch (error) {
    return error;
  }
};

export const initiateWalletTransaction = async (payload) => {
  try {
    const data = {
      amount: payload?.amount,
      description: payload?.description,
      type: payload?.type,
    };

    const URL = `${WALLET_API}/transact/${payload?.wallet_id}`;
    const response = await axios.post(URL, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getWalletTransaction = async (payload) => {
  try {
    const URL = `${WALLET_API}/transactions/?walletId=${payload?.wallet_id}&skip=${payload?.skip}&limit=${payload?.limit}`;
    const response = await axios.get(URL);
    return response;
  } catch (error) {
    return error;
  }
};
