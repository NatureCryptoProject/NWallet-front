import { createSlice, current } from "@reduxjs/toolkit";
import {
  // setSelectedWallet,
  addWallet,
  getWallets,
  sendTransaction,
  updateWallet,
  getWalletsTransactions,
  deleteWallet,
} from "./wallets-operations";

const initialState = {
  selectedWallet: null,
  paypassValid: true,
  wallets: [],
  transactions: [],
  error: null,
  loading: {
    getWalletsLoading: false,
    addWalletLoading: false,
    deleteWalletLoading: false,
    updateWalletLoading: false,
    sendTransactionLoading: false,
    getTransactionsLoading: false,
  },
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(setSelectedWallet.fulfilled, (state, { payload }) => {
    //   state.selectedWallet = payload;
    // });
    builder.addCase(getWallets.pending, (state, { payload }) => {
      state.loading.getWalletsLoading = true;
      state.error = null;
    });
    builder.addCase(getWallets.fulfilled, (state, { payload }) => {
      if (!payload) {
        state.wallets = [];
      } else {
        state.wallets = payload;
      }

      state.loading.getWalletsLoading = false;
    });
    builder.addCase(getWallets.rejected, (state, { payload }) => {
      state.loading.getWalletsLoading = false;
      state.error = payload;
    });
    builder.addCase(addWallet.pending, (state, { payload }) => {
      state.loading.addWalletLoading = true;
      state.error = null;
    });
    builder.addCase(addWallet.fulfilled, (state, { payload }) => {
      if (payload.name === "AxiosError") {
        state.error = payload;
      } else {
        state.error = null;
      }
      // eslint-disable-next-line
      state.wallets = state.wallets;
      state.loading.addWalletLoading = false;
    });
    builder.addCase(addWallet.rejected, (state, { payload }) => {
      state.loading.addWalletLoading = false;
      state.error = payload;
    });

    builder.addCase(deleteWallet.pending, (state, { payload }) => {
      state.loading.deleteWalletLoading = true;
      state.error = null;
    });
    builder.addCase(deleteWallet.fulfilled, (state, { payload }) => {
      // const walletToDelete = current(
      //   state.wallets.find((el) => {
      //     return el.id === payload.id;
      //   })
      // );
      state.wallets = current(state.wallets).filter((el) => {
        return el._id !== payload._id;
      });

      state.loading.deleteWalletLoading = false;
      state.error = null;
    });
    builder.addCase(deleteWallet.rejected, (state, { payload }) => {
      state.loading.deleteWalletLoading = false;
      state.error = payload;
    });

    builder.addCase(updateWallet.pending, (state, { payload }) => {
      state.loading.updateWalletLoading = true;
      state.error = null;
    });
    builder.addCase(updateWallet.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line
      state.wallets = state.wallets;
      state.loading.updateWalletLoading = false;
      state.error = null;
    });
    builder.addCase(updateWallet.rejected, (state, { payload }) => {
      state.loading.updateWalletLoading = false;
      state.error = payload;
    });

    builder.addCase(getWalletsTransactions.pending, (state, { payload }) => {
      state.transactions = [];
      state.loading.getTransactionsLoading = true;
      state.error = null;
    });
    builder.addCase(getWalletsTransactions.fulfilled, (state, { payload }) => {
      state.loading.getTransactionsLoading = false;
      state.transactions = payload;
      state.error = null;
      // state.transactions = payload
    });
    builder.addCase(getWalletsTransactions.rejected, (state, { payload }) => {
      state.loading.getTransactionsLoading = false;
      state.error = payload;
    });

    builder.addCase(sendTransaction.pending, (state, { payload }) => {
      state.loading.sendTransactionLoading = true;
      state.error = null;
    });
    builder.addCase(sendTransaction.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line
      state.wallets = state.wallets;
      state.loading.sendTransactionLoading = false;
      state.error = null;
    });
    builder.addCase(sendTransaction.rejected, (state, { payload }) => {
      // console.log("Transaction got rejected");
      console.log(payload);
      if (
        payload === "Rejected Invalid address format!" ||
        "Insufficient funds"
      ) {
        state.loading.sendTransactionLoading = false;
        state.error = payload;
      } else {
        state.paypassValid = false;
        state.loading.sendTransactionLoading = false;
        state.error = payload;
      }
    });
  },
});

export default walletsSlice.reducer;
