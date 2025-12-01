import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout";
import { Dashboard } from "../components/Dashboard";
import { Learn } from "../components/Learn";
import { Marketplace } from "../components/Marketplace";
import { Gaming } from "../components/Gaming";
import { KidsWallet } from "../components/KidsWallet";
import { Invest } from "../components/Invest";
import { Chat } from "../components/Chat";
import { Stats } from "../components/Stats";
import { Settings } from "../components/Settings";
import { MintingEarning } from "../components/MintingEarning";
import { Transactions } from "../components/Transactions";
import { Trading } from "../components/Trading";
import { AgisWeb } from "../components/AgisWeb";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "invest", Component: Invest },
      { path: "learn", Component: Learn },
      { path: "marketplace", Component: Marketplace },
      { path: "gaming", Component: Gaming },
      { path: "kids-wallet", Component: KidsWallet },
      { path: "chat", Component: Chat },
      { path: "stats", Component: Stats },
      { path: "settings", Component: Settings },
      { path: "mint-earn", Component: MintingEarning },
      { path: "transactions", Component: Transactions },
      { path: "trading", Component: Trading },
      { path: "agis-web", Component: AgisWeb },
    ],
  },
]);
