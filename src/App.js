import { Routes, Route } from "react-router-dom";
// import english from "./mnemonic.json";

// Pages
import AddExistingWalletPage from "./pages/AddExistingWallet/AddExistingWalletPage";
import AddWalletPage from "./pages/AddWalletPage";
import LoginPage from "./pages/LoginPage";
import MainPageDesktop from "./pages/MainDesktopPage";
import NewWalletPage from "./pages/NewWalletPage";
import RecivePage from "./pages/RecivePage";
import RegisterPage from "./pages/RegisterPage";
import SendPage from "./pages/SendPage";
import NotFoundPage from "./pages/NotFoundPage";
import WalletInfoPageMobile from "./pages/WalletInfoPageMobile";
import WalletDetails from "./pages/WalletDetails/WalletDetails";
// import Scaner from "./pages/Scaner/Scaner";
// Components
import Layout from "./components/Layout/Layout";
import { BallTriangle } from "react-loader-spinner";
// HOC
import RequireAuth from "./hoc/RequireAuth";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { checkAuth } from "./redux/auth/auth-operations";

import { getIsAuthLoading, authCheking } from "./redux/auth/auth-selectors";
import { getIsWalletsLoading } from "./redux/wallets/wallets-selectors";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function App() {
  //========== root vars ==========
  const dispatch = useDispatch();
  const isAuthLoading = useSelector(getIsAuthLoading);
  const isWalletsLoading = useSelector(getIsWalletsLoading);
  const isAuthCheking = useSelector(authCheking);
  const isLoading = Object.values(isWalletsLoading).includes(true);

  //========= Cheking autorization ==========
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // console.log(isLoading);

  //========= State for leftPanel component ==========
  const [leftPanelIsOpen, setLeftPanelIsOpen] = useState(false);

  //========== LeftPanel state handler ==========
  const handleOpenLeftPanel = () => {
    setLeftPanelIsOpen(!leftPanelIsOpen);
  };

  return (
    <div className="App">
      {(isLoading && isAuthLoading) || isAuthCheking ? (
        <div style={style}>
          <BallTriangle
            height={200}
            width={200}
            radius={5}
            color="#fff"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Layout handleOpenLeftPanel={handleOpenLeftPanel} />}
          >
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route element={<RequireAuth />}>
              <Route
                index
                element={<MainPageDesktop leftPanelIsOpen={leftPanelIsOpen} />}
              />
              <Route path="add-wallet" element={<AddWalletPage />} />
              <Route path="new-wallet" element={<NewWalletPage />} />
              <Route
                path="add-existing-wallet"
                element={<AddExistingWalletPage />}
              />
              <Route path="wallet-details/:id" element={<WalletDetails />} />
              <Route path="send-from/:id" element={<SendPage />} />
              <Route path="recive/:id" element={<RecivePage />} />
              <Route path=":id" element={<WalletInfoPageMobile />} />
              {/* <Route path="/scaner" element={<Scaner />} /> */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
