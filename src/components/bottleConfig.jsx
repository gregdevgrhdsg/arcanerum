import { RumA, Flamboyance, RumB, RumC, RumD } from './Canvas/GenericBottle';

export const bottlesConfig = (t) => [
  {
    id: 0,
    name: t("ourRums.arcaneExtraroma.title"),
    description: t("ourRums.arcaneExtraroma.description_a"),
    thumbnail: "assets/thumbnail/arcaneExtraroma.webp",
    externalLink: "https://www.example.com/extraroma",
    component: RumA,
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      medium: { x: 1.4, y: -0.9, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      medium: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0 },
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      medium: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
  {
    id: 1,
    name: t("ourRums.arcaneFlamboyance.title"),
    description: t("ourRums.arcaneFlamboyance.description_a"),
    thumbnail: "assets/thumbnail/arcaneFlamboyance.webp",
    externalLink: "https://www.example.com/flamboyance",
    component: Flamboyance,
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0 },
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
  {
    id: 2,
    name: t("ourRums.arcaneAnanasRoti.title"),
    description: t("ourRums.arcaneAnanasRoti.description_a"),
    thumbnail: "assets/thumbnail/arcaneArrangeAnanas.webp",
    externalLink: "https://www.example.com/ananas-roti",
    component: RumB,
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0 },
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
  {
    id: 3,
    name: t("ourRums.arcaneVanilleDesIles.title"),
    description: t("ourRums.arcaneVanilleDesIles.description_a"),
    thumbnail: "assets/thumbnail/arcaneArrangeVanille.webp",
    externalLink: "https://www.example.com/vanille-des-iles",
    component: RumC,
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0 },
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
  {
    id: 4,
    name: t("ourRums.arcaneBananeFlambee.title"),
    description: t("ourRums.arcaneBananeFlambee.description_a"),
    thumbnail: "assets/thumbnail/arcaneArrangeBanane.webp",
    externalLink: "https://www.example.com/banane-flambee",
    component: RumD,
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0 },
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
];
export default bottlesConfig;