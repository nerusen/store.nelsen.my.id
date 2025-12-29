import { Metadata } from "next";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Pricelist from "@/modules/pricelist/components/Pricelist";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Pricelist ${METADATA.exTitle}`,
  description: `Daftar harga produk`,
  alternates: {
    canonical: `${process.env.DOMAIN}/pricelist`,
  },
};

const PricelistPage = () => {
  const t = useTranslations("PricelistPage");

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Pricelist />
    </Container>
  );
};

export default PricelistPage;
