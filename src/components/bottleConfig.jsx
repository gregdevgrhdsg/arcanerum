// src/components/bottleConfig.jsx
import { RumA, Flamboyance, RumB, RumC, RumD } from './Canvas/GenericBottle';

export const bottlesConfig = [
  { 
    id: 0, 
    name: "Extraroma", 
    prix: "100€", 
    description: "Arcane Extraroma révèle de délicieux et délicats arômes de vanille Bourbon, de noix de coco, de chocolat, de caramel, de notes fumées et de banane", 
    thumbnail: "assets/thumbnail/arcaneExtraroma.webp",
    component: RumA, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0},
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
  { 
    id: 1, 
    name: "Flamboyance", 
    prix: "150€", 
    description: "Un assemblage de Rhums de pur jus de canne à sucre vieillis pendant 3 ans dans des fûts de chêne Français et Américain ayant bénéficié d’un affinage en fut ayant contenu du whisky Français tourbé.", 
    thumbnail: "assets/thumbnail/arcaneFlamboyance.webp",
    component: Flamboyance, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0},
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
  { 
    id: 2, 
    name: "Ananas Rotie", 
    prix: "150€", 
    description: "Description de Ananas", 
    thumbnail: "assets/thumbnail/arcaneArrangeAnanas.webp",
    component: RumB, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0},
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
  { 
    id: 3, 
    name: "ArcaneVanille", 
    prix: "200€", 
    description: "Description de Vanille", 
    thumbnail: "assets/thumbnail/arcaneArrangeVanille.webp",
    component: RumC, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0},
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
  { 
    id: 4, 
    name: "ArcaneBanane", 
    prix: "200€", 
    description: "Description de Vanille", 
    thumbnail: "assets/thumbnail/arcaneArrangeBanane.webp",
    component: RumD, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 0.8, y: -0.8, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0, y: 0, z: 0 },
      desktop: { x: 0, y: 0, z: 0},
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
];