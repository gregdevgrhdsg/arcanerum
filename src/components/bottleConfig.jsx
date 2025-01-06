// src/components/bottleConfig.jsx
import { RumA, Flamboyance, RumB, RumC, RumD } from './Canvas/GenericBottle';

export const bottlesConfig = [
  { 
    id: 0, 
    name: "Extraroma", 
    prix: "100€", 
    description: "Arcane Extraroma révèle de délicieux et délicats arômes de vanille Bourbon, de noix de coco, de chocolat, de caramel, de notes fumées et de banane", 
    thumbnail: "assets/thumbnail/BouteilleArcane_Extraroma_Quart.png",
    component: RumA, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 1, y: -0.6, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0.1, y: 0.3, z: 0 },
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
    thumbnail: "assets/thumbnail/BouteilleArcane_Flamboyance_Quart.png",
    component: Flamboyance, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 1, y: -0.6, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0.1, y: 0.3, z: 0 },
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
    name: "ArcaneAnanas", 
    prix: "150€", 
    description: "Description de Ananas", 
    thumbnail: "assets/thumbnail/BouteilleArcane_Extraroma_Face.png",
    component: RumB, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 1, y: -0.6, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0.1, y: 0.3, z: 0 },
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
    thumbnail: "assets/thumbnail/BouteilleArcane_Extraroma_Face.png",
    component: RumC, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 1, y: -0.6, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0.1, y: 0.3, z: 0 },
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
    name: "ArcaneVanille", 
    prix: "200€", 
    description: "Description de Vanille", 
    thumbnail: "assets/thumbnail/BouteilleArcane_Extraroma_Face.png",
    component: RumD, 
    responsivePositions: {
      mobile: { x: 0, y: -0.8, z: 0.3 },
      tablet: { x: 1, y: -0.6, z: 0 },
      desktop: { x: 1.2, y: -0.8, z: 0 },
    },
    responsiveRotations: {
      mobile: { x: 0.2, y: -0.2, z: -0.2 },
      tablet: { x: 0.1, y: 0.3, z: 0 },
      desktop: { x: 0, y: 0, z: 0},
    },
    responsiveScales: {
      mobile: { x: 7, y: 7, z: 7 },
      tablet: { x: 7, y: 7, z: 7 },
      desktop: { x: 7, y: 7, z: 7 },
    },
  },
];