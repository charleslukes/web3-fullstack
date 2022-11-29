import { UserWalletTypes } from "../../utils/sharedTypes";

export type Props = {
  userAddress: string | null;
  setUserAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setWalletData: React.Dispatch<React.SetStateAction<UserWalletTypes | null>>
};