import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Transaksi from "@/modules/transaksi/components/Transaksi";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Transaksi ${METADATA.exTitle}`,
  description: `Riwayat transaksi Anda`,
  alternates: {
    canonical: `${process.env.DOMAIN}/transaksi`,
  },
};

const TransaksiPage = () => {
  const t = useTranslations("TransaksiPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Transaksi />
    </Container>
  );
};

export default TransaksiPage;
