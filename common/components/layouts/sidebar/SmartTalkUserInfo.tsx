"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import Button from "../../elements/Button";
import Breakline from "../../elements/Breakline";
import { useMenu } from "@/common/stores/menu";

const SmartTalkUserInfo = () => {
  const { data: session } = useSession();
  const { hideMenu } = useMenu();
  const t = useTranslations("Auth");
  const t = useTranslations("Auth");

  if (!session) {
    return (
      <motion.div
        className="flex flex-col space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Breakline />
        <div className="px-4 py-2">
          <Link href="/login" onClick={hideMenu}>
            <Button className="w-full text-sm">
              {t("login")}
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Breakline />
      <div className="px-4 py-2">
        <div className="flex items-center gap-3 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800 mb-2">
          <img
            src={session.user?.image || "/images/default-avatar.png"}
            width={40}
            height={40}
            alt={session.user?.name || "User"}
            className="rounded-full border-2 border-white dark:border-neutral-700"
          />
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {session.user?.name}
            </div>
            <div className="truncate text-xs text-neutral-600 dark:text-neutral-400">
              {session.user?.email}
            </div>
          </div>
        </div>
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-sm"
        >
          Logout
        </Button>
      </div>
    </motion.div>
  );
};

export default SmartTalkUserInfo;
