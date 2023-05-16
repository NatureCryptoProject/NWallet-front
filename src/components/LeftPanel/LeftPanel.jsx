import s from "./leftPanel.module.scss";
import WalletsList from "./WalletsList/WalletsList";
import { BallTriangle } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "40px",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const LeftPanel = ({
  isLoading,
  wallets,
  handleSelectWallet,
  leftPanelIsOpen,
}) => {
  return (
    <div className={leftPanelIsOpen ? s.leftPanel : s.leftPanelHidden}>
      {isLoading ? (
        <div style={style}>
          <BallTriangle
            height={60}
            width={60}
            radius={5}
            color="#fff"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <WalletsList
          wallets={wallets}
          handleSelectWallet={handleSelectWallet}
        />
      )}
    </div>
  );
};

export default LeftPanel;
