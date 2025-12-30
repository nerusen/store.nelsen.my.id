import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import Button from "../../elements/Button";
import Breakline from "../../elements/Breakline";

const SmartTalkUserInfo = () => {
  const t = useTranslations("SmartTalkUserInfo");

  return (
    <motion.div
      className="flex flex-col space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Breakline />
      <div className="px-4 py-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          {t("description")}
        </p>
        <Button
          className="w-full text-sm"
          onClick={() => {
            // Handle smart talk action
          }}
        >
          {t("button")}
        </Button>
      </div>
    </motion.div>
  );
};

export default SmartTalkUserInfo;
