import {
  BiCategory as DashboardIcon,
  BiBook as TransaksiIcon,
  BiStar as PricelistIcon,
} from "react-icons/bi";
import { PiChatTeardropDotsBold as ChatRoomIcon } from "react-icons/pi";

import { MenuItemProps } from "../types/menu";

const iconSize = 20;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Dashboard",
  },
  {
    title: "Transaksi",
    href: "/transaksi",
    icon: <TransaksiIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Transaksi",
  },
  {
    title: "Chat Room",
    href: "/chat",
    icon: <ChatRoomIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Chat Room",
  },
  {
    title: "Pricelist",
    href: "/pricelist",
    icon: <PricelistIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Pricelist",
  },
];
