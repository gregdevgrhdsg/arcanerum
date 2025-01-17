const cocktails = [
  {
    id: 0,
    name: "Bunker Pants", // Nom du cocktail principal
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "The Arcane Extraroma 12 yo", qty: 45, unit: "ml" },
          { name: "Raspberry Curry Syrup", qty: 45, unit: "ml" },
          { name: "Cartron Triple Sec Liqueur", qty: 15, unit: "ml" },
          { name: "Fresh Lime Juice", qty: 22.5, unit: "ml" },
          { name: "Egg White", qty: 1, unit: "unité" },
        ],
        method: [
          "Dry-shake all ingredients.",
          "Strain into a chilled Nick & Nora glass.",
          "Serve without garnish.",
        ],
      },
      {
        title: "Raspberry Curry Syrup",
        ingredients: [
          { name: "Whole Oranges", qty: 2, unit: "unités" },
          { name: "Whole Lemons", qty: 2, unit: "unités" },
          { name: "Fresh Raspberries", qty: 530, unit: "g" },
          { name: "Water", qty: 190, unit: "g" },
          { name: "Sugar", qty: 130, unit: "g" },
          { name: "Fresh Lemongrass", qty: 80, unit: "g" },
          { name: "Green Curry Paste", qty: 8, unit: "g" },
        ],
        method: [
          "Combine all ingredients in a medium saucepan, and bring to a boil over high heat.",
          "Using a wooden spoon, crush berries as they heat.",
          "Boil the mixture for 1 minute. Remove from heat, cover, and allow to cool completely.",
          "Strain the mixture through a fine mesh strainer, discarding solids.",
          "Transfer to an airtight container and reserve in the refrigerator to chill thoroughly.",
        ],
      },
    ],
    garnish: "None",
    image: "/assets/cocktails/bankerPants.webp",
  },
  {
    id: 1,
    name: "Day At The Peach",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "Peach Sorbet", qty: 1, unit: "scoop" },
          { name: "Day At The Peach Base", qty: 90, unit: "ml" },
          { name: "Fresh Lime Juice", qty: 15, unit: "ml" },
          { name: "Dry Sparkling Wine", qty: 30, unit: "ml" },
        ],
        method: [
          "Place 1 large scoop of peach sorbet into a medium serving glass.",
          "Shake the other ingredients (except the sparkling wine).",
          "Top with dry sparkling wine and serve.",
        ],
      },
      {
        title: "Day At The Peach Base",
        ingredients: [
          { name: "Pistachios Infused The Arcane", qty: 276, unit: "g" },
          { name: "Joseph Cartron Pêche de Vigne", qty: 102, unit: "g" },
          { name: "Pistachio Syrup", qty: 156, unit: "g" },
          { name: "Simple Syrup", qty: 48, unit: "g" },
          { name: "Kosher Salt", qty: 1, unit: "g" },
        ],
        method: [
          "Combine all ingredients thoroughly in a mixing bowl.",
          "Transfer to an airtight container and refrigerate until chilled.",
        ],
      },
      {
        title: "Pistachio Syrup",
        ingredients: [
          { name: "Pistachio Kernels Unsalted", qty: 85, unit: "g" },
          { name: "Water", qty: 105, unit: "g" },
          { name: "Sugar", qty: 70, unit: "g" },
        ],
        method: [
          "Preheat an oven to 175°C and spread the pistachios on a cookie sheet.",
          "Toast the pistachios for 10-12 minutes until fragrant, stirring occasionally.",
          "Cool completely and measure 35g for the syrup.",
          "Combine water and sugar in a saucepan, bring to a boil, and steep the toasted pistachios overnight.",
          "Strain the mixture and reserve the syrup in an airtight container.",
        ],
      },
      {
        title: "Pistachio Rum",
        ingredients: [
          { name: "Reserved Toasted Pistachios", qty: 50, unit: "g" },
          { name: "The Arcane Extraroma 12yo", qty: 300, unit: "g" },
        ],
        method: [
          "Combine rum and pistachios in an airtight container.",
          "Steep for at least 24 hours, shaking the container frequently.",
          "Strain the mixture and reserve the liquid in an airtight container.",
        ],
      },
      {
        title: "Simple Syrup",
        ingredients: [
          { name: "Sugar", qty: 100, unit: "g" },
          { name: "Hot Water", qty: 100, unit: "g" },
        ],
        method: [
          "Combine sugar and hot water in a medium bowl.",
          "Stir with a spatula until the sugar is completely dissolved.",
          "Transfer to a glass bottle and refrigerate.",
        ],
      },
    ],
    garnish: "None",
    image: "/assets/cocktails/dayAtTheBeach.webp",
  },
  {
    id: 2,
    name: "Dull The Pain",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "The Arcane Extraroma 12 yo", qty: 125, unit: "g" },
          { name: "Cartron Pineapple Liqueur", qty: 50, unit: "g" },
          { name: "Cartron Cocody Liqueur", qty: 15, unit: "g" },
          { name: "Coco Lopez", qty: 400, unit: "g" },
          { name: "Frozen Pineapple Wedges", qty: 600, unit: "g" },
          { name: "Citrus Ice", qty: 325, unit: "g" },
        ],
        method: [
          "Blend all ingredients until smooth.",
          "Serve in a Pineapple Gold Glass with a grated fresh nutmeg garnish.",
        ],
      },
      {
        title: "Frozen Pineapple Wedges",
        ingredients: [
          { name: "Whole Pineapple", qty: 1, unit: "unité" },
        ],
        method: [
          "Using a sharp knife, remove the leaves and peel from the pineapple.",
          "Cut the pineapple lengthwise into quarters and remove the core from each quarter.",
          "Slice each quarter into wedges about 1.27 cm thick.",
          "Line a sheet tray with parchment and arrange the wedges on the tray in one layer.",
          "Cover the tray with plastic wrap and freeze until completely solid.",
          "Reserve the wedges in an airtight container in the freezer.",
        ],
      },
      {
        title: "Citrus Ice",
        ingredients: [
          { name: "Fresh Lime Juice", qty: 100, unit: "g" },
          { name: "Fresh Orange Juice", qty: 225, unit: "g" },
        ],
        method: [
          "Combine both juices in a small bowl.",
          "Fill a 3.2 cm square ice mold with the mixture.",
          "Freeze until completely solid and reserve in the freezer.",
        ],
      },
    ],
    garnish: "Grated Fresh Nutmeg",
    image: "/assets/cocktails/dullThepain.webp",
  },
  {
    id: 3,
    name: "Hazelnut Mint Julep",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "The Arcane Extraroma 12 yo", qty: 30, unit: "ml" },
          { name: "Frangelico Hazelnut Liqueur", qty: 30, unit: "ml" },
          { name: "Fresh Lime Juice", qty: 22.5, unit: "ml" },
          { name: "Demerara Syrup", qty: 22.5, unit: "ml" },
          { name: "Ginger Beer, Very Cold", qty: 60, unit: "ml" },
          { name: "Fresh Mint Sprig", qty: 1, unit: "unité" },
        ],
        method: [
          "Combine all ingredients directly into a julep cup filled with crushed ice.",
          "Stir gently to combine.",
          "Garnish with a fresh mint sprig and dried hazelnut.",
        ],
      },
    ],
    garnish: "Fresh Mint Sprig and Dried Hazelnut",
    image: "/assets/cocktails/hazeluntMintJulep.webp",
  },
  {
    id: 4,
    name: "Mango Milk Punch",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "The Arcane Extraroma 12 yo", qty: 360, unit: "g" },
          { name: "Homemade Mango Syrup", qty: 180, unit: "g" },
          { name: "Cartron Triple Sec Liqueur", qty: 90, unit: "g" },
          { name: "Fresh Lime Juice", qty: 135, unit: "g" },
          { name: "Whole Milk", qty: 180, unit: "g" },
          { name: "Mango Milk Punch Base Batch", qty: 160, unit: "ml" },
        ],
        method: [
          "Combine all ingredients in a medium bowl and mix thoroughly.",
          "Transfer the mixture to an airtight container and reserve at room temperature overnight.",
          "Strain the mixture through chinois and a coffee filter overnight.",
          "Serve in an Old Fashioned glass with clear ice block.",
        ],
      },
      {
        title: "Homemade Mango Syrup",
        ingredients: [
          { name: "Sugar", qty: 450, unit: "g" },
          { name: "Mango Nectar", qty: 450, unit: "g" },
        ],
        method: [
          "Combine sugar and mango nectar in a medium bowl.",
          "Stir with a spatula to completely dissolve the sugar.",
          "Transfer to a glass bottle or other airtight container and reserve in the refrigerator.",
        ],
      },
    ],
    garnish: "Dried Mango Slice",
    image: "/assets/cocktails/mangoMilPunch.webp",
  },
  {
    id: 5,
    name: "Passion Fruit Milk Punch",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "The Arcane Extraroma 12 yo", qty: 360, unit: "g" },
          { name: "Homemade Passion Fruit Syrup", qty: 180, unit: "g" },
          { name: "Cartron Triple Sec Liqueur", qty: 90, unit: "g" },
          { name: "Fresh Lime Juice", qty: 135, unit: "g" },
          { name: "Whole Milk", qty: 180, unit: "g" },
          { name: "Passion Fruit Milk Punch Base Batch", qty: 160, unit: "ml" },
        ],
        method: [
          "Combine all ingredients in a medium bowl, stirring to mix thoroughly.",
          "Transfer to an airtight container and reserve at room temperature overnight.",
          "Strain the mixture through chinois and a coffee filter overnight.",
          "Reserve in the refrigerator.",
          "Serve in an Old Fashioned glass with a clear ice block and garnish with fresh passion fruit.",
        ],
      },
      {
        title: "Homemade Passion Fruit Syrup",
        ingredients: [
          { name: "Sugar", qty: 450, unit: "g" },
          { name: "Passion Fruit Nectar", qty: 450, unit: "g" },
        ],
        method: [
          "Combine sugar and passion fruit nectar in a medium bowl.",
          "Stir with a spatula to completely dissolve the sugar.",
          "Transfer to a glass bottle or other airtight container and reserve in the refrigerator.",
        ],
      },
    ],
    garnish: "Fresh Passion Fruit",
    image: "/assets/cocktails/passionFruitMilkPunch.webp",
  },
  {
    id: 6,
    name: "Peach Rum Punch",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "Peach Rum Punch Base Batch", qty: 120, unit: "ml" },
          { name: "Fresh Lemon Peel", qty: 1, unit: "unité" },
        ],
        method: [
          "Place 2 Peach & Elderflower ice cubes into a punch glass.",
          "Ladle punch from the bowl into the glass over ice.",
          "Garnish with fresh lemon peel and grated fresh nutmeg, then serve.",
        ],
      },
      {
        title: "Peach Rum Punch Base Batch",
        ingredients: [
          { name: "Lemons", qty: 2, unit: "unités" },
          { name: "Water", qty: 500, unit: "g" },
          { name: "Sugar", qty: 130, unit: "g" },
          { name: "Pisco", qty: 216, unit: "g" },
          { name: "Chai Tea", qty: 8, unit: "g" },
          { name: "Cartron Pêche de Vigne", qty: 32, unit: "g" },
          { name: "The Arcane Extraroma 12 yo", qty: 208, unit: "g" },
        ],
        method: [
          "Peel the lemons using a vegetable peeler, taking care to remove as little pith as possible.",
          "Combine the lemon peels and sugar in a small bowl and muddle.",
          "Let sit for 30 minutes, stirring periodically.",
          "In a small saucepan, bring water to a simmer and add chai tea to the lemon-sugar mixture. Steep for 4 minutes.",
          "Strain the mixture and combine with the remaining ingredients.",
          "Transfer to a glass bottle and chill thoroughly in the refrigerator.",
        ],
      },
      {
        title: "Peach & Elderflower Ice Cubes",
        ingredients: [
          { name: "Lemons", qty: 5, unit: "unités" },
          { name: "Oranges", qty: 2, unit: "unités" },
          { name: "Peach Nectar", qty: 450, unit: "g" },
          { name: "Sugar", qty: 80, unit: "g" },
          { name: "St-Germain Elderflower", qty: 60, unit: "g" },
          { name: "Water", qty: 100, unit: "g" },
        ],
        method: [
          "Peel the lemons and oranges using a vegetable peeler, reserving the peeled fruit for juicing.",
          "Combine the peels and sugar in a bowl, muddling periodically.",
          "Juice the lemons and oranges, strain to remove pulp and seeds.",
          "Mix the juices with peach nectar, water, and St-Germain.",
          "Pour the mixture into a 3.2 cm square ice mold and freeze until completely solid.",
          "Reserve the ice cubes for use in the cocktail.",
        ],
      },
    ],
    garnish: "Fresh Lemon Peel & Grated Fresh Nutmeg",
    image: "/assets/cocktails/peachPunchRum.webp",
  },
  {
    id: 7,
    name: "Smoked Banana Sazerac",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "Smoked Banana Sazerac Batch", qty: 75, unit: "ml" },
          { name: "Green Absinthe", qty: 7.5, unit: "ml" },
          { name: "Fresh Orange Peel", qty: 1, unit: "unité" },
        ],
        method: [
          "Fill an Old Fashioned glass with ice and add the absinthe.",
          "Tilt and rotate the glass to coat the interior with absinthe and chill it.",
          "Discard the contents of the absinthe-rinsed glass.",
          "Combine the cocktail portion with ice in a mixing glass and stir until chilled and diluted.",
          "Strain the chilled cocktail into the prepared glass.",
          "Lightly express the orange peel oil over the drink using a lighter or match, and extinguish the flame.",
          "Serve immediately.",
        ],
      },
      {
        title: "Smoked Banana Sazerac Batch",
        ingredients: [
          { name: "The Arcane Extraroma 12 yo", qty: 284, unit: "g" },
          { name: "Ancho Reyes Chile Liqueur", qty: 38, unit: "g" },
          { name: "Cartron Banana Liqueur", qty: 62, unit: "g" },
          { name: "Bob's Chocolate Liqueur", qty: 18, unit: "g" },
          { name: "Laphroaig Select Single Malt", qty: 33, unit: "g" },
        ],
        method: [
          "Combine all ingredients in a large bowl, stirring thoroughly to mix.",
          "Transfer the mixture to an airtight container and reserve for use.",
        ],
      },
    ],
    garnish: "Fresh Orange Peel & Lighter or Match",
    image: "/assets/cocktails/smokedBanana.webp",
  },
  {
    id: 8,
    name: "Tropic Thunder",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "Tropical Stock", qty: 1000, unit: "g" },
          { name: "The Arcane Extraroma 12 yo", qty: 175, unit: "g" },
          { name: "Brut Champagne", qty: 750, unit: "ml" },
          { name: "Fresh Mint Leaves", qty: 25, unit: "g" },
          { name: "Fresh Basil Leaves", qty: 50, unit: "g" },
          { name: "Simple Syrup", qty: 200, unit: "g" },
          { name: "Fresh Lime Juice", qty: 200, unit: "g" },
        ],
        method: [
          "In a large mixing bowl, combine simple syrup, lime juice, basil, and mint leaves.",
          "Muddle the herb leaves and allow the mixture to steep for 10 minutes.",
          "Add the tropical stock and rum, muddle again, and allow to steep for another 10 minutes.",
          "Place 3 frozen grilled pineapple discs into a large punch bowl.",
          "Strain the tropical mixture through a fine mesh strainer into the punch bowl over the pineapple ice, discarding solids.",
          "Gently add champagne and stir carefully to homogenize.",
          "To serve, fill small punch glasses with ice, ladle punch from the bowl into glasses, and garnish with a sprig of basil or mint or a thin wedge of pineapple.",
        ],
      },
      {
        title: "Tropical Stock",
        ingredients: [
          { name: "Water", qty: 800, unit: "g" },
          { name: "Sugar", qty: 175, unit: "g" },
          { name: "Yellow Chartreuse", qty: 200, unit: "g" },
          { name: "Whole Cloves", qty: 16, unit: "unités" },
          { name: "Cinnamon Sticks", qty: 4, unit: "unités" },
          { name: "Fresh Strawberries", qty: 1, unit: "pint" },
          { name: "Whole Pineapple", qty: 1, unit: "unité" },
          { name: "Whole Orange", qty: 1, unit: "unité" },
          { name: "Banana (including peel)", qty: 1, unit: "unité" },
          { name: "Kosher Salt", qty: 1, unit: "g" },
        ],
        method: [
          "Toast cloves and cinnamon sticks in a medium saucepan over high heat until fragrant.",
          "Add water, sugar, and yellow Chartreuse, and bring to a boil.",
          "Lower heat and simmer for 3 minutes. Remove from heat, cover, and allow to cool completely.",
          "Strain the mixture through a fine mesh strainer, taking care not to press solids.",
          "Transfer the liquid to an airtight container and reserve in the refrigerator.",
        ],
      },
      {
        title: "Grilled Pineapple Ice",
        ingredients: [
          { name: "Whole Pineapple", qty: 1, unit: "unité" },
        ],
        method: [
          "Preheat a charcoal or gas grill to high heat.",
          "Slice the pineapple into discs about 1.27 cm thick.",
          "Sear the pineapple discs on the grill for about 90 seconds per side to create a crosshatch pattern.",
          "Remove the slices from the grill, cool completely, and freeze overnight on a sheet tray.",
          "Reserve the frozen pineapple slices for the punch.",
        ],
      },
    ],
    garnish: "Sprig of Fresh Mint or Basil and Fresh Pineapple Wedge",
    image: "/assets/cocktails/tropicThunder.webp",
  },
  {
    id: 9,
    name: "Unbelievable Old Fashioned",
    sections: [
      {
        title: "MAIN COCKTAIL",
        ingredients: [
          { name: "The Arcane Extraroma 12 yo", qty: 60, unit: "ml" },
          { name: "Joseph Cartron Banana Liqueur", qty: 15, unit: "ml" },
          { name: "Honey & Orange Bitters", qty: 3, unit: "drops" },
        ],
        method: [
          "Combine all ingredients in a mixing glass with ice.",
          "Stir until chilled and properly diluted.",
          "Strain into an Old Fashioned glass over a chocolate clear ice block.",
          "Garnish with a dried banana slice and an edible flower.",
        ],
      },
      {
        title: "Honey & Orange Bitters",
        ingredients: [
          { name: "Honey", qty: 25, unit: "g" },
          { name: "Regan's Orange Bitters", qty: 25, unit: "g" },
        ],
        method: [
          "Combine all ingredients in a medium bowl and mix using a spatula.",
          "Transfer the mixture to a bitters bottle and store at room temperature.",
        ],
      },
    ],
    garnish: "Dried Banana Slice & Edible Flower",
    image: "/assets/cocktails/unbelievableOldFashion.webp",
  },
];

export default cocktails;