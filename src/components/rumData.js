import { useTranslation } from "react-i18next";

const rumData = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      image: "/assets/thumbnail/arcaneExtraroma.webp",
      title: t("ourRums.arcaneExtraroma.title"),
      subtitle: t("ourRums.arcaneExtraroma.subtitle"),
      description_a: t("ourRums.arcaneExtraroma.description_a"),
      description: t("ourRums.arcaneExtraroma.description"),
      button: t("ourRums.arcaneExtraroma.button"),
      tastingNotes: {
        title: t("ourRums.arcaneFlamboyance.tastingNotes.title"),
        titleA: t("ourRums.arcaneFlamboyance.tastingNotes.titleA"),
        titleB: t("ourRums.arcaneFlamboyance.tastingNotes.titleB"),
        titleC: t("ourRums.arcaneFlamboyance.tastingNotes.titleC"),
        color: t("ourRums.arcaneExtraroma.tastingNotes.color"),
        nose: t("ourRums.arcaneExtraroma.tastingNotes.nose"),
        palate: t("ourRums.arcaneExtraroma.tastingNotes.palate"),
      },
      logisticInfo: {
        title: t("ourRums.arcaneExtraroma.logisticInfo.title"),
        volume: t("ourRums.arcaneExtraroma.logisticInfo.volume"),
        alcohol: t("ourRums.arcaneExtraroma.logisticInfo.alcohol"),
      },
      pattern: "/assets/paterns/paternExtraroma.webp",
      gradient: "radial-gradient(circle, #1D6D69, #002C29, #002A27)",
    },
    {
      id: 2,
      image: "/assets/thumbnail/arcaneFlamboyance.webp",
      title: t("ourRums.arcaneFlamboyance.title"),
      subtitle: t("ourRums.arcaneFlamboyance.subtitle"),
      description_a: t("ourRums.arcaneFlamboyance.description_a"),
      description: t("ourRums.arcaneFlamboyance.description"),
      button: t("ourRums.arcaneFlamboyance.button"),
      tastingNotes: {
        title: t("ourRums.arcaneFlamboyance.tastingNotes.title"),
        titleA: t("ourRums.arcaneFlamboyance.tastingNotes.titleA"),
        titleB: t("ourRums.arcaneFlamboyance.tastingNotes.titleB"),
        titleC: t("ourRums.arcaneFlamboyance.tastingNotes.titleC"),
        color: t("ourRums.arcaneFlamboyance.tastingNotes.color"),
        nose: t("ourRums.arcaneFlamboyance.tastingNotes.nose"),
        palate: t("ourRums.arcaneFlamboyance.tastingNotes.palate"),
      },
      logisticInfo: {
        title: t("ourRums.arcaneFlamboyance.logisticInfo.title"),
        volume: t("ourRums.arcaneFlamboyance.logisticInfo.volume"),
        alcohol: t("ourRums.arcaneFlamboyance.logisticInfo.alcohol"),
      },
      pattern: "/assets/paterns/paternFlamboyance.webp",
      gradient: "radial-gradient(circle, #0D3F61, #152138, #141B30)",
    },
    {
      id: 3,
      image: "/assets/thumbnail/arcaneArrangeAnanas.webp",
      title: t("ourRums.arcaneAnanasRoti.title"),
      subtitle: t("ourRums.arcaneAnanasRoti.subtitle"),
      description_a: t("ourRums.arcaneAnanasRoti.description_a"),
      description: t("ourRums.arcaneAnanasRoti.description"),
      button: t("ourRums.arcaneAnanasRoti.button"),
      waysToEnjoy: {
        title: t("ourRums.arcaneAnanasRoti.waysToEnjoy.title"),
        description: t("ourRums.arcaneAnanasRoti.waysToEnjoy.description"),
        signatureShot: t("ourRums.arcaneAnanasRoti.waysToEnjoy.signatureShot"),
      },
      logisticInfo: {
        title: t("ourRums.arcaneAnanasRoti.logisticInfo.title"),
        volume: t("ourRums.arcaneAnanasRoti.logisticInfo.volume"),
        alcohol: t("ourRums.arcaneAnanasRoti.logisticInfo.alcohol"),
      },
      pattern: "/assets/paterns/paternAnanas.webp",
      gradient: "radial-gradient(circle, #996723, #774712, #5E340E)",
    },
    {
      id: 4,
      image: "/assets/thumbnail/arcaneArrangeVanille.webp",
      title: t("ourRums.arcaneVanilleDesIles.title"),
      subtitle: t("ourRums.arcaneVanilleDesIles.subtitle"),
      description_a: t("ourRums.arcaneVanilleDesIles.description_a"),
      description: t("ourRums.arcaneVanilleDesIles.description"),
      button: t("ourRums.arcaneVanilleDesIles.button"),
      waysToEnjoy: {
        title: t("ourRums.arcaneVanilleDesIles.waysToEnjoy.title"),
        description: t("ourRums.arcaneVanilleDesIles.waysToEnjoy.description"),
        signatureShot: t("ourRums.arcaneVanilleDesIles.waysToEnjoy.signatureShot"),
      },
      logisticInfo: {
        title: t("ourRums.arcaneVanilleDesIles.logisticInfo.title"),
        volume: t("ourRums.arcaneVanilleDesIles.logisticInfo.volume"),
        alcohol: t("ourRums.arcaneVanilleDesIles.logisticInfo.alcohol"),
      },
      pattern: "/assets/paterns/paternVanille.webp",
      gradient: "radial-gradient(circle, #348891, #1E616E, #0B3D42)",
    },
    {
      id: 5,
      image: "/assets/thumbnail/arcaneArrangeBanane.webp",
      title: t("ourRums.arcaneBananeFlambee.title"),
      subtitle: t("ourRums.arcaneBananeFlambee.subtitle"),
      description_a: t("ourRums.arcaneBananeFlambee.description_a"),
      description: t("ourRums.arcaneBananeFlambee.description"),
      button: t("ourRums.arcaneBananeFlambee.button"),
      waysToEnjoy: {
        title: t("ourRums.arcaneBananeFlambee.waysToEnjoy.title"),
        description: t("ourRums.arcaneBananeFlambee.waysToEnjoy.description"),
        signatureShot: t("ourRums.arcaneBananeFlambee.waysToEnjoy.signatureShot"),
      },
      logisticInfo: {
        title: t("ourRums.arcaneBananeFlambee.logisticInfo.title"),
        volume: t("ourRums.arcaneBananeFlambee.logisticInfo.volume"),
        alcohol: t("ourRums.arcaneBananeFlambee.logisticInfo.alcohol"),
      },
      pattern: "/assets/paterns/paternBanane.webp",
      gradient: "radial-gradient(circle, #A1524C, #682317, #491713)",
    },
  ];
};

export default rumData;