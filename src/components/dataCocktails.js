const cocktails = [
  {
    id: 0,
    name: { fr: "Bunker Pants", en: "Bunker Pants" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 45, unit: "ml" },
          { name: { fr: "Sirop de curry framboise", en: "Raspberry Curry Syrup" }, qty: 45, unit: "ml" },
          { name: { fr: "Liqueur Cartron Triple Sec", en: "Cartron Triple Sec Liqueur" }, qty: 15, unit: "ml" },
          { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 22.5, unit: "ml" },
          { name: { fr: "Blanc d’œuf", en: "Egg White" }, qty: 1, unit: "unité" },
        ],
        method: [
          { fr: "Sans glaçons, shakez tous les ingrédients.", en: "Dry-shake all ingredients." },
          { fr: "Filtrez dans un verre Nick & Nora bien frais.", en: "Strain into a chilled Nick & Nora glass." },
          { fr: "Servez sans topping.", en: "Serve without garnish." },
        ],
      },
      {
        title: { fr: "SIROP CURRY FRAMBOISE", en: "RASPBERRY CURRY SYRUP" },
        ingredients: [
          { name: { fr: "Oranges entières", en: "Whole Oranges" }, qty: 2, unit: "unités" },
          // … (ajoutez tous les autres ingrédients)
        ],
        method: [
          { fr: "Assemblez tous les ingrédients dans une casserole et portez à ébullition à feu vif.", en: "Combine all ingredients in a medium saucepan, and bring to a boil over high heat." },
          // … (ajoutez toutes les étapes)
        ],
      },
    ],
    garnish: { fr: "Aucun", en: "None" },
    image: "/assets/cocktails/bankerPants.webp",
    imageB: "/assets/cocktails/vignettes/bankerPants-1.webp",
  },
  {
    id: 1,
    name: { fr: "Day At The Peach", en: "Day At The Peach" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Sorbet à la pêche", en: "Peach Sorbet" }, qty: 1, unit: "scoop" },
          { name: { fr: "Base de Day At The Peach", en: "Day At The Peach Base" }, qty: 90, unit: "ml" },
          { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 15, unit: "ml" },
          { name: { fr: "Vin pétillant sec", en: "Dry Sparkling Wine" }, qty: 30, unit: "ml" },
        ],
        method: [
          { fr: "Déposez une belle portion de sorbet à la pêche dans un verre.", en: "Place 1 large scoop of peach sorbet into a medium serving glass." },
          { fr: "Shakez les autres ingrédients (sauf le vin pétillant).", en: "Shake the other ingredients (except the sparkling wine)." },
          { fr: "Complétez avec du vin pétillant brut et servez.", en: "Top with dry sparkling wine and serve." },
        ],
      },
      {
        title: { fr: "BASE + COCKTAIL", en: "COCKTAIL + BASE" },
        ingredients: [
          { name: { fr: "Pistaches infusées The Arcane", en: "Pistachios Infused The Arcane" }, qty: 276, unit: "ml" },
          { name: { fr: "Joseph Cartron Pêche de Vigne", en: "Joseph Cartron Pêche de Vigne" }, qty: 102, unit: "ml" },
          { name: { fr: "Sirop de pistache", en: "Pistachio Syrup" }, qty: 156, unit: "ml" },
          { name: { fr: "Sirop simple", en: "Simple Syrup" }, qty: 48, unit: "ml" },
          { name: { fr: "Sel kasher", en: "Kosher Salt" }, qty: 1, unit: "g" },
        ],
        method: [
          { fr: "Mélangez tous les ingrédients dans un saladier.", en: "Combine all ingredients thoroughly in a mixing bowl." },
          { fr: "Transvasez dans un récipient hermétique et réfrigérez jusqu’à ce qu’il soit bien frais.", en: "Transfer to an airtight container and refrigerate until chilled." },
        ],
      },
      {
        title: { fr: "SIROP DE PISTACHE", en: "PISTACHIOS SYRUP" },
        ingredients: [
          { name: { fr: "Pistaches décortiquées non salées", en: "Pistachio Kernels Unsalted" }, qty: 85, unit: "g" },
          { name: { fr: "Eau", en: "Water" }, qty: 105, unit: "ml" },
          { name: { fr: "Sucre", en: "Sugar" }, qty: 70, unit: "ml" },
        ],
        method: [
          { fr: "Préchauffez le four à 175°C et étalez les pistaches sur une plaque de cuisson.", en: "Preheat an oven to 175°C and spread the pistachios on a cookie sheet." },
          { fr: "Faites griller les pistaches pendant 10 à 12 minutes jusqu'à ce qu'elles dégagent leur parfum.", en: "Toast the pistachios for 10-12 minutes until fragrant, stirring occasionally." },
          { fr: "Laissez refroidir complètement et pesez 35g pour le sirop.", en: "Cool completely and measure 35g for the syrup." },
          { fr: "Mélangez l'eau et le sucre dans une casserole, portez à ébullition, puis laissez infuser les pistaches grillées pendant la nuit.", en: "Combine water and sugar in a saucepan, bring to a boil, and steep the toasted pistachios overnight." },
          { fr: "Filtrez le mélange et réservez le sirop dans un récipient hermétique.", en: "Strain the mixture and reserve the syrup in an airtight container." },
        ],
      },
      {
        title: { fr: "RHUM PISTACHE", en: "PISTACHIOS RUM" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 300, unit: "ml" },
          { name: { fr: "Pistaches grillées réservées", en: "Reserved Toasted Pistachios" }, qty: 50, unit: "g" },
        ],
        method: [
          { fr: "Mélangez le rhum et les pistaches dans un récipient hermétique.", en: "Combine rum and pistachios in an airtight container." },
          { fr: "Laissez macérer pendant au moins 24 heures en secouant fréquemment le récipient.", en: "Steep for at least 24 hours, shaking the container frequently." },
          { fr: "Filtrez le mélange et réservez le liquide dans un récipient hermétique.", en: "Strain the mixture and reserve the liquid in an airtight container." },
        ],
      },
      {
        title: { fr: "SIROP SIMPLE", en: "SIMPLE SYRUP" },
        ingredients: [
          { name: { fr: "Sucre", en: "Sugar" }, qty: 100, unit: "g" },
          { name: { fr: "Eau chaude", en: "Hot Water" }, qty: 100, unit: "ml" },
        ],
        method: [
          { fr: "Mélangez le sucre et l'eau chaude dans un bol.", en: "Combine sugar and hot water in a bowl." },
          { fr: "Remuez avec une spatule jusqu'à ce que le sucre soit complètement dissous.", en: "Stir with a spatula until the sugar is completely dissolved." },
          { fr: "Transférez dans une bouteille en verre et réfrigérez.", en: "Transfer to a glass bottle and refrigerate." },
        ],
      },
    ],
    garnish: { fr: "Aucun", en: "None" },
    image: "/assets/cocktails/dayAtTheBeach.webp",
    imageB: "/assets/cocktails/vignettes/dayAtTheBeach.webp" // Remplacez par le chemin réel si disponible
  },
  {
    id: 2,
    name: { fr: "Dull The Pain", en: "Dull The Pain" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 125, unit: "ml" },
          { name: { fr: "Liqueur d'ananas Cartron", en: "Cartron Pineapple Liqueur" }, qty: 50, unit: "ml" },
          { name: { fr: "Liqueur Cartron Cocody", en: "Cartron Cocody Liqueur" }, qty: 15, unit: "ml" },
          { name: { fr: "Coco Lopez", en: "Coco Lopez" }, qty: 400, unit: "ml" },
          { name: { fr: "Quartiers d'ananas congelés", en: "Frozen Pineapple Wedges" }, qty: 600, unit: "g" },
          { name: { fr: "Glace aux agrumes", en: "Citrus Ice" }, qty: 325, unit: "g" },
        ],
        method: [
          { fr: "Mixez tous les ingrédients jusqu'à obtenir une exture fluide.", en: "Blend all ingredients until smooth." },
          { fr: "Servez dans un verre Pineapple Gold garni de noix de muscade râpée.", en: "Serve in a Pineapple Gold Glass with a grated nutmeg garnish." },
        ],
      },
      {
        title: { fr: "ANANAS CONGELÉS", en: "FROZEN PINNEAPPLE" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 125, unit: "ml" },
          { name: { fr: "Liqueur d'ananas Cartron", en: "Cartron Pineapple Liqueur" }, qty: 50, unit: "ml" },
          { name: { fr: "Liqueur Cartron Cocody", en: "Cartron Cocody Liqueur" }, qty: 15, unit: "ml" },
          { name: { fr: "Coco Lopez", en: "Coco Lopez" }, qty: 400, unit: "ml" },
          { name: { fr: "Quartiers d'ananas congelés", en: "Frozen Pineapple Wedges" }, qty: 600, unit: "g" },
          { name: { fr: "Glace aux agrumes", en: "Citrus Ice" }, qty: 325, unit: "g" },
          { name: { fr: "Ananas entier", en: "Whole Pineapple" }, qty: 1, unit: "unité" },
        ],
        method: [
          { fr: "À l'aide d'un couteau bien aiguisé, retirez les feuilles et la peau de l'ananas.", en: "Using a sharp knife, remove the leaves and peel from the pineapple." },
          { fr: "Coupez l'ananas en quatre dans le sens de la longueur et retirez le cœur de chaque quartier.", en: "Cut the pineapple lengthwise into quarters and remove the core from each quarter." },
          { fr: "Découpez chaque morceau en quartier d’environ 1,27 cm d'épaisseur.", en: "Slice each quarter into wedges about 1.27 cm thick." },
          { fr: "Tapissez une plaque de cuisson de papier sulfurisé et disposez les quartiers en une seule couche.", en: "Line a sheet tray with parchment and arrange the wedges on the tray in one layer." },
          { fr: "Couvrez la plaque de film plastique et congelez jusqu'à complète solidification.", en: "Cover the tray with plastic wrap and freeze until completely solid." },
          { fr: "Conservez les quartiers dans un récipient hermétique au congélateur.", en: "Reserve the wedges in an airtight container in the freezer." },
        ],
      },
      {
        title: { fr: "GLACONS AUX AGRUMES", en: "CITRUS ICE" },
        ingredients: [
          { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 100, unit: "ml" },
          { name: { fr: "Jus d'orange frais", en: "Fresh Orange Juice" }, qty: 225, unit: "ml" },
        ],
        method: [
          { fr: "Combinez les deux jus dans un petit bol.", en: "Combine both juices in a small bowl." },
          { fr: "Remplissez un bac à glaçons carré de 3,2 cm avec le mélange.", en: "Fill a 3.2 cm square ice mold with the mixture." },
          { fr: "Congelez jusqu'à ce que le mélange soit complètement solide, puis conservez au congélateur.", en: "Freeze until completely solid and reserve in the freezer." },
        ],
      },
    ],
    garnish: { fr: "Noix de muscade fraîche râpée", en: "Grated Fresh Nutmeg" },
    image: "/assets/cocktails/dullThepain.webp",
    imageB: "/assets/cocktails/vignettes/dullThepain.webp" // Remplacez par le chemin réel si disponible
  },
  {
    id: 3,
    name: { fr: "Hazelnut Mint Julep", en: "Hazelnut Mint Julep" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 30, unit: "ml" },
          { name: { fr: "Liqueur de noisette Frangelico", en: "Frangelico Hazelnut Liqueur" }, qty: 30, unit: "ml" },
          { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 22.5, unit: "ml" },
          { name: { fr: "Sirop de Demerara", en: "Demerara Syrup" }, qty: 22.5, unit: "ml" },
          { name: { fr: "Ginger Beer", en: "Ginger Beer" }, qty: 60, unit: "ml" },
          { name: { fr: "Branche de menthe fraîche", en: "Fresh Mint Sprig" }, qty: 1, unit: "unité" },
        ],
        method: [
          { fr: "Combinez tous les ingrédients directement dans un verre julep rempli de glace pilée.", en: "Combine all ingredients directly into a julep cup filled with crushed ice." },
          { fr: "Remuez doucement pour mélanger.", en: "Stir gently to combine." },
          { fr: "Décorez avec une branche de menthe fraîche et des noisettes séchées.", en: "Garnish with a fresh mint sprig and dried hazelnut." },
        ],
      },
    ],
    garnish: { fr: "Branche de menthe fraîche et noisettes séchées", en: "Fresh Mint Sprig and Dried Hazelnut" },
    image: "/assets/cocktails/hazeluntMintJulep.webp",
    imageB: "/assets/cocktails/vignettes/hazeluntMintJulep.webp",
  },
  {
    id: 4,
    name: { fr: "Mango Milk Punch", en: "Mango Milk Punch" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 360, unit: "ml" },
          { name: { fr: "Sirop de mangue maison", en: "Homemade Mango Syrup" }, qty: 180, unit: "ml" },
          { name: { fr: "Liqueur Cartron Triple Sec", en: "Cartron Triple Sec Liqueur" }, qty: 90, unit: "ml" },
          { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 135, unit: "ml" },
          { name: { fr: "Lait entier", en: "Whole Milk" }, qty: 180, unit: "ml" },
        ],
        method: [
          { fr: "Combinez tous les ingrédients dans un bol, puis les mélanger", en: "Combine all ingredients in a medium bowl and mix thoroughly." },
          { fr: "Transvasez le mélange dans un récipient hermétique et laissez reposer à température ambiante pendant la nuit.", en: "Transfer the mixture to an airtight container and reserve at room temperature overnight." },
          { fr: "Filtrez le mélange à travers un chinois et un filtre à café pendant la nuit.", en: "Strain the mixture through chinois and a coffee filter overnight." },
          { fr: "Servez dans un verre Old Fashioned avec un bloc de glace claire.", en: "Serve in an Old Fashioned glass with clear ice block." },
        ],
      },
      {
        title: { fr: "SIROP DE MANGUE", en: "MANGO SYRUP" },
        ingredients: [
          { name: { fr: "Sucre", en: "Sugar" }, qty: 450, unit: "g" },
          { name: { fr: "Nectar de mangue", en: "Mango Nectar" }, qty: 450, unit: "ml" },
        ],
        method: [
          { fr: "Combinez tous les ingrédients dans un bol, puis les mélanger", en: "Combine sugar and mango nectar in a medium bowl." },
          { fr: "Remuez avec une spatule jusqu'à ce que le sucre soit complètement dissous.", en: "Stir with a spatula to completely dissolve the sugar." },
          { fr: "Versez le mélange dans une bouteille en verre ou dans un récipient hermétique, puis réfrigérez.", en: "Transfer to a glass bottle or other airtight container and reserve in the refrigerator." },
        ],
      },
    ],
    garnish: { fr: "Tranche de mangue séchée", en: "Dried Mango Slice" },
    image: "/assets/cocktails/mangoMilPunch.webp",
    imageB: "/assets/cocktails/vignettes/mangoMilPunch.webp" // Remplacez par le chemin réel si nécessaire
  },
  {
    id: 5,
    name: { fr: "Passion Fruit Milk Punch", en: "Passion Fruit Milk Punch" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 360, unit: "ml" },
          { name: { fr: "Sirop de fruit de la passion maison", en: "Homemade Passion Fruit Syrup" }, qty: 180, unit: "ml" },
          { name: { fr: "Liqueur Cartron Triple Sec", en: "Cartron Triple Sec Liqueur" }, qty: 90, unit: "ml" },
          { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 135, unit: "ml" },
          { name: { fr: "Lait entier", en: "Whole Milk" }, qty: 180, unit: "ml" },
          { name: { fr: "Base de Passion Fruit Milk Punch", en: "Passion Fruit Milk Punch Base Batch" }, qty: 160, unit: "ml" },
        ],
        method: [
          { fr: "Combinez tous les ingrédients dans un bol, puis les mélanger", en: "Combine all ingredients in a bowl, stirring to mix thoroughly." },
          { fr: "Transvasez dans un récipient hermétique et laissez reposer à température ambiante pendant la nuit.", en: "Transfer to an airtight container and reserve at room temperature overnight." },
          { fr: "Filtrez le mélange à l'aide d'un chinois et d'un filtre à café pendant la nuit.", en: "Strain the mixture through chinois and a coffee filter overnight." },
          { fr: "Réservez au réfrigérateur.", en: "Reserve in the refrigerator." },
          { fr: "Servez dans un verre Old Fashioned avec un bloc de glace claire et décorez avec du fruit de la passion frais.", en: "Serve in an Old Fashioned glass with a clear ice block and garnish with fresh passion fruit." },
        ],
      },
      {
        title: { fr: "SIROP DE FRUIT DE LA PASSION", en: "PASSION FRUIT SYRUP" },
        ingredients: [
          { name: { fr: "Sucre", en: "Sugar" }, qty: 450, unit: "g" },
          { name: { fr: "Nectar de fruit de la passion", en: "Passion Fruit Nectar" }, qty: 450, unit: "ML" },
        ],
        method: [
          { fr: "Combinez le sucre et le nectar de fruit de la passion dans un bol moyen.", en: "Combine sugar and passion fruit nectar in a medium bowl." },
          { fr: "Remuez avec une spatule jusqu'à ce que le sucre soit complètement dissous.", en: "Stir with a spatula to completely dissolve the sugar." },
          { fr: "Versez dans une bouteille en verre ou un autre récipient hermétique et réfrigérez.", en: "Transfer to a glass bottle or other airtight container and reserve in the refrigerator." },
        ],
      },
    ],
    garnish: { fr: "Fruit de la passion frais", en: "Fresh Passion Fruit" },
    image: "/assets/cocktails/passionFruitMilkPunch.webp",
    imageB: "/assets/cocktails/vignettes/passionFruitMilkPunch.webp" // Remplacez par le chemin réel si disponible
  },
  {
    id: 6,
    name: { fr: "Peach Rum Punch", en: "Peach Rum Punch" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Base de Peach Rum Punch", en: "Peach Rum Punch Base Batch" }, qty: 120, unit: "ml" },
          { name: { fr: "Zeste de citron frais", en: "Fresh Lemon Peel" }, qty: 1, unit: "unité" },
        ],
        method: [
          { fr: "Placez 2 glaçons Peach & Elderflower dans un verre à punch.", en: "Place 2 Peach & Elderflower ice cubes into a punch glass." },
          { fr: "Servez le punch du bol dans le verre sur de la glace.", en: "Ladle punch from the bowl into the glass over ice." },
          { fr: "Décorez avec un zeste de citron frais et de la muscade fraîche râpée, puis servez.", en: "Garnish with fresh lemon peel and grated fresh nutmeg, then serve." },
        ],
      },
      {
        title: { fr: "BASE + COCKTAIL", en: "COCKTAIL + BASE" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 208, unit: "ml" },
          { name: { fr: "Eau", en: "Water" }, qty: 500, unit: "ml" },
          { name: { fr: "Pisco", en: "Pisco" }, qty: 216, unit: "ml" },
          { name: { fr: "Cartron Pêche de Vigne", en: "Cartron Pêche de Vigne" }, qty: 32, unit: "ml" },
          { name: { fr: "Citrons", en: "Lemons" }, qty: 2, unit: "unités" },
          { name: { fr: "Sucre", en: "Sugar" }, qty: 130, unit: "g" },
          { name: { fr: "Thé chai", en: "Chai Tea" }, qty: 8, unit: "g" },
        ],
        method: [
          { fr: "Épluchez les citrons avec un économe en veillant à retirer le moins possible de partie blanche.", en: "Peel the lemons using a vegetable peeler, taking care to remove as little pith as possible." },
          { fr: "Mélangez les zestes et le sucre dans un petit bol et écrasez-les.", en: "Combine the lemon peels and sugar in a small bowl and muddle." },
          { fr: "Laissez reposer pendant 30 minutes en remuant légèrement.", en: "Let sit for 30 minutes, stirring periodically." },
          { fr: "Dans une petite casserole, portez l'eau à ébullition légère et ajoutez le thé chai au mélange citron-sucre.", en: "In a small saucepan, bring water to a simmer and add chai tea to the lemon-sugar mixture." },
          { fr: " Laissez infuser pendant 4 minutes.", en: "Steep for 4 minutes." },
          { fr: "Filtrez le mélange et combinez-le avec les autres ingrédients.", en: "Strain the mixture and combine with the remaining ingredients." },
          { fr: "Versez dans une bouteille en verre et laissez refroidir complètement au réfrigérateur.", en: "Transfer to a glass bottle and chill thoroughly in the refrigerator." },
        ],
      },
      {
        title: { fr: "GLAÇONS PECHE & ELDERFLOWER", en: "PEACH & ELDERFLOWER ICE CUBE" },
        ingredients: [
          { name: { fr: "Citrons", en: "Lemons" }, qty: 5, unit: "unités" },
          { name: { fr: "Oranges", en: "Oranges" }, qty: 2, unit: "unités" },
          { name: { fr: "Nectar de pêche", en: "Peach Nectar" }, qty: 450, unit: "ml" },
          { name: { fr: "Sucre", en: "Sugar" }, qty: 80, unit: "g" },
          { name: { fr: "Liqueur de fleur de Sureau Joseph Cartron", en: "liquor of fleur de Sureau Joseph Cartron" }, qty: 60, unit: "ml" },
          { name: { fr: "Eau", en: "Water" }, qty: 100, unit: "ml" },
        ],
        method: [
          { fr: "Épluchez les citrons et les oranges avec un économe, en réservant les épluchures pour le jus.", en: "Peel the lemons and oranges using a vegetable peeler, reserving the peeled fruit for juicing." },
          { fr: "Mélangez les épluchures et le sucre dans un bol en écrasant légèrement", en: "Combine the peels and sugar in a bowl, muddling periodically." },
          { fr: "Pressez les fruits, filtrez pour retirer la pulpe et les pépins.", en: "Juice the lemons and oranges, strain to remove pulp and seeds." },
          { fr: "Mélangez les jus avec le nectar de pêche, l'eau et le St-Germain.", en: "Mix the juices with peach nectar, water, and St-Germain." },
          { fr: "Versez dans un moule à glaçons carré de 3,2 cm et congelez jusqu'à solidification complète.", en: "Pour the mixture into a 3.2 cm square ice mold and freeze until completely solid." },
          { fr: "Réservez les glaçons pour le cocktail.", en: "Reserve the ice cubes for use in the cocktail." },
        ],
      },
    ],
    garnish: { fr: "Zeste de citron frais & Muscade fraîche râpée", en: "Fresh Lemon Peel & Grated Fresh Nutmeg" },
    image: "/assets/cocktails/peachPunchRum.webp",
    imageB: "/assets/cocktails/vignettes/peachPunchRum.webp" // Remplacez par le chemin réel si disponible
  },
  {
    id: 7,
    name: { fr: "Smoked Banana Sazerac", en: "Smoked Banana Sazerac" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 284, unit: "ml" },
          { name: { fr: "Liqueur de piment Ancho Reyes", en: "Ancho Reyes Chile Liqueur" }, qty: 38, unit: "ml" },
          { name: { fr: "Liqueur de banane Cartron", en: "Cartron Banana Liqueur" }, qty: 62, unit: "ml" },
          { name: { fr: "Liqueur au chocolat de Bob's", en: "Bob's Chocolate Liqueur" }, qty: 18, unit: "ml" },
          { name: { fr: "Single Malt Laphroaig Selection", en: "Laphroaig Select Single Malt" }, qty: 33, unit: "ml" }
        ],
        method: [
          { fr: "Combinez tous les ingrédients dans un bol en remuant soigneusement pour bien mélanger.", en: "Combine all ingredients in a large bowl, stirring thoroughly to mix." },
          { fr: "Transférez le mélange dans un récipient hermétique et réservez.", en: "Transfer the mixture to an airtight container and reserve for use." }
        ]
      },
      {
        title: { fr: "BASE + COCKTAIL", en: "COCKTAIL + BASE" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 284, unit: "ml" },
          { name: { fr: "Liqueur de piment Ancho Reyes", en: "Ancho Reyes Chile Liqueur" }, qty: 38, unit: "ml" },
          { name: { fr: "Liqueur de banane Cartron", en: "Cartron Banana Liqueur" }, qty: 62, unit: "ml" },
          { name: { fr: "Liqueur au chocolat de Bob's", en: "Bob's Chocolate Liqueur" }, qty: 18, unit: "ml" },
          { name: { fr: "Single Malt Laphroaig Selection", en: "Laphroaig Select Single Malt" }, qty: 33, unit: "ml" }
        ],
        method: [
          { fr: "Remplissez un verre Old Fashioned de glaçons et ajoutez-y l'absinthe.", en: "Fill an Old Fashioned glass with ice and add the absinthe." },
          { fr: "Inclinez et faites pivoter le verre pour enrober l'intérieur d'absinth.", en: "Tilt and rotate the glass to coat the interior with absinthe and chill it." },
          { fr: "Videz l’absinthe", en: "Discard the contents of the absinthe-rinsed glass." },
          { fr: "Mélangez la portion de cocktail avec des glaçons dans un verre à mélange et remuez jusqu'à ce qu'il soit bien frais et dilué.", en: "Combine the cocktail portion with ice in a mixing glass and stir until chilled and diluted." },
          { fr: "Filtrez le cocktail refroidi dans le verre préparé.", en: "Strain the chilled cocktail into the prepared glass." },
          { fr: "Exprimez légèrement le zeste d'orange sur la boisson à l'aide d'un briquet ou d'une allumette, puis éteignez la flamme.", en: "Lightly express the orange peel oil over the drink using a lighter or match, and extinguish the flame." },
          { fr: "Servez immédiatement.", en: "Serve immediately." }
        ]
      }
    ],
    garnish: { fr: "Zeste d'orange frais et briquet ou allumette", en: "Fresh Orange Peel & Lighter or Match" },
    image: "/assets/cocktails/SmokedBanana.webp",
    imageB: "/assets/cocktails/vignettes/smokedBanana.webp"
  },
  {
    id: 8,
    name: { fr: "Tropic Thunder", en: "Tropic Thunder" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL PRINCIPAL", en: "MAIN COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 175, unit: "ml" },
          { name: { fr: "Base tropicale", en: "Tropical Stock" }, qty: 1000, unit: "ml" },
          { name: { fr: "Champagne Brut", en: "Brut Champagne" }, qty: 750, unit: "ml" },
          { name: { fr: "Sirop simple", en: "Simple Syrup" }, qty: 200, unit: "ml" },
          { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 200, unit: "g" },
          { name: { fr: "Feuilles de menthe fraîches", en: "Fresh Mint Leaves" }, qty: 25, unit: "g" },
          { name: { fr: "Feuilles de basilic fraîches", en: "Fresh Basil Leaves" }, qty: 50, unit: "g" },
        ],
        method: [
          { fr: "Dans un grand bol, combinez le sirop simple, le jus de citron vert, le basilic et la menthe.", en: "In a large mixing bowl, combine simple syrup, lime juice, basil, and mint leaves." },
          { fr: "Écrasez légèrement les herbes et laissez infuser pendant 10 minutes.", en: "Muddle the herb leaves and allow the mixture to steep for 10 minutes." },
          { fr: "Ajoutez la base tropicale et le rhum, écrasez à nouveau et laissez infuser pendant 10 minutes supplémentaires.", en: "Add the tropical stock and rum, muddle again, and allow to steep for another 10 minutes." },
          { fr: "Placez 3 disques d'ananas grillé congelés dans un grand bol à punch.", en: "Place 3 frozen grilled pineapple discs into a large punch bowl." },
          { fr: "Filtrez le mélange tropical à travers une passoire fine dans le bol à punch sur la glace d'ananas, en éliminant les solides.", en: "Strain the tropical mixture through a fine mesh strainer into the punch bowl over the pineapple ice, discarding solids." },
          { fr: "Ajoutez délicatement le champagne et remuez soigneusement pour homogénéiser.", en: "Gently add champagne and stir carefully to homogenize." },
          { fr: "Pour servir, remplissez de petits verres à punch de glace, puis versez le punch du bol dans les verres et décorez d'une branche de basilic ou de menthe ou d'un fin quartier d'ananas.", en: "To serve, fill small punch glasses with ice, ladle punch from the bowl into glasses, and garnish with a sprig of basil or mint or a thin wedge of pineapple." },
        ],
      },
      {
        title: { fr: "TROPICAL STOCK", en: "TROPICAL STOCK" },
        ingredients: [
          { name: { fr: "Eau", en: "Water" }, qty: 800, unit: "g" },
          { name: { fr: "Sucre", en: "Sugar" }, qty: 175, unit: "g" },
          { name: { fr: "Chartreuse Jaune", en: "Yellow Chartreuse" }, qty: 200, unit: "g" },
          { name: { fr: "Clous de girofle entiers", en: "Whole Cloves" }, qty: 16, unit: "unités" },
          { name: { fr: "Bâtons de cannelle", en: "Cinnamon Sticks" }, qty: 4, unit: "unités" },
          { name: { fr: "Fraises fraîches", en: "Fresh Strawberries" }, qty: 1, unit: "pint" },
          { name: { fr: "Ananas entier", en: "Whole Pineapple" }, qty: 1, unit: "unité" },
          { name: { fr: "Orange entière", en: "Whole Orange" }, qty: 1, unit: "unité" },
          { name: { fr: "Banane (avec peau)", en: "Banana (including peel)" }, qty: 1, unit: "unité" },
          { name: { fr: "Sel kasher", en: "Kosher Salt" }, qty: 1, unit: "g" },
        ],
        method: [
          { fr: "Faites griller les clous de girofle et les bâtons de cannelle dans une casserole à feu vif jusqu'à ce qu'ils dégagent leur parfum.", en: "Toast cloves and cinnamon sticks in a medium saucepan over high heat until fragrant." },
          { fr: "Ajoutez l'eau, le sucre et la Chartreuse Jaune, puis portez à ébullition.", en: "Add water, sugar, and yellow Chartreuse, and bring to a boil." },
          { fr: "Réduisez le feu et laissez mijoter pendant 3 minutes. Retirez du feu, couvrez et laissez refroidir complètement.", en: "Lower heat and simmer for 3 minutes. Remove from heat, cover, and allow to cool completely." },
          { fr: "Filtrez le mélange à travers une passoire fine, en prenant soin de ne pas presser les solides.", en: "Strain the mixture through a fine mesh strainer, taking care not to press solids." },
          { fr: "Transférez le liquide dans un récipient hermétique et réfrigérez.", en: "Transfer the liquid to an airtight container and reserve in the refrigerator." },
        ],
      },
      {
        title: { fr: "ANANAS GRILLÉ", en: "GRILLED PINEAPPLE" },
        category: { fr: "Créations", en: "Creations" },
        ingredients: [
          { name: { fr: "Ananas entier", en: "Whole Pineapple" }, qty: 1, unit: "unité" },
        ],
        method: [
          { fr: "Préchauffez votre four en mode grill à haute température", en: "Preheat a charcoal or gas grill to high heat." },
          { fr: "Coupez l'ananas en tranches d'environ 1,27 cm d'épaisseur.", en: "Slice the pineapple into discs about 1.27 cm thick." },
          { fr: "Faites griller les tranches d'ananas sur le grill pendant environ 90 secondes de chaque côté pour obtenir un motif en quadrillage.", en: "Sear the pineapple discs on the grill for about 90 seconds per side to create a crosshatch pattern." },
          { fr: "Retirez les tranches du grill, laissez refroidir complètement, puis congelez-les toute la nuit sur une plaque.", en: "Remove the slices from the grill, cool completely, and freeze overnight on a sheet tray." },
          { fr: "Réservez les tranches d'ananas congelées pour le punch.", en: "Reserve the frozen pineapple slices for the punch." },
        ]
      },
    ],
    garnish: { fr: "Brin de menthe fraîche ou de basilic et quartier fin d'ananas", en: "Sprig of Fresh Mint or Basil and Fresh Pineapple Wedge" },
    image: "/assets/cocktails/tropicThunder.webp",
    imageB: "/assets/cocktails/vignettes/tropicThunder.webp"
  },
  {
    id: 9,
    name: { fr: "Unbelievable Old Fashioned", en: "Unbelievable Old Fashioned" },
    category: { fr: "Créations", en: "Creations" },
    sections: [
      {
        title: { fr: "COCKTAIL", en: "COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 60, unit: "ml" },
          { name: { fr: "Liqueur de banane Joseph Cartron", en: "Joseph Cartron Banana Liqueur" }, qty: 15, unit: "ml" },
          { name: { fr: "Bitters miel & orange", en: "Honey & Orange Bitters" }, qty: 3, unit: "gouttes" },
        ],
        method: [
          { fr: "Mélangez tous les ingrédients dans un verre à mélange avec des glaçons.", en: "Combine all ingredients in a mixing glass with ice." },
          { fr: "Remuez jusqu'à refroidissement.", en: "Stir until chilled." },
          { fr: "Filtrez dans un verre Old Fashioned sur un glaçon enrobé de chocolat ", en: "Strain into an Old Fashioned glass over a chocolate clear ice block." },
          { fr: "Décorez avec une tranche de banane séchée et une fleur comestible.", en: "Garnish with a dried banana slice and an edible flower." },
        ],
      },
      {
        title: { fr: "BITTERS MIEL & ORANGE", en: "Honey & Orange Bitters" },
        ingredients: [
          { name: { fr: "Miel", en: "Honey" }, qty: 25, unit: "g" },
          { name: { fr: "Regan's Orange Bitters", en: "Regan's Orange Bitters" }, qty: 25, unit: "ml" },
        ],
        method: [
          { fr: "Mélangez tous les ingrédients dans un bol moyen avec une spatule.", en: "Combine all ingredients in a medium bowl and mix using a spatula." },
          { fr: "Transférez le mélange dans une bouteille de bitters et conservez à température ambiante.", en: "Transfer the mixture to a bitters bottle and store at room temperature." },
        ],
      },
    ],
    garnish: { fr: "Tranche de banane séchée & Fleur comestible", en: "Dried Banana Slice & Edible Flower" },
    image: "/assets/cocktails/unbelievableOldFashion.webp",
    imageB: "/assets/cocktails/vignettes/unbelievableOldFashion.webp",
},
{
  id: 10,
  name: { fr: "Extra Martini", en: "Extra Martini" },
  category: { fr: "Revisités", en: "Twists" },
  sections: [
    {
      title: { fr: "COCKTAIL", en: "COCKTAIL" },
      ingredients: [
        { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 60, unit: "ml" },
        { name: { fr: "Vermouth Rouge de Joseph Cartron ", en: "Dry Vermouth by Joseph Cartron" }, qty: 15, unit: "ml" },
        { name: { fr: "Glaçons", en: "Ice Cubes" }, qty: null, unit: "" },
      ],
      method: [
        { fr: "Versez les ingrédients dans un shaker rempli de glaçons.", en: "Mix it." },
        { fr: "Shakez vigoureusement.", en: "Mix it." },
        { fr: "Versez les ingrédients dans un shaker rempli de glaçons.", en: "Mix it." },
      ],
    },
  ],
  garnish: { fr: "Un brin de menthe fraîche et un zeste de citron vert.", en: "A sprig of fresh mint and a twist of lime." },
  image: "/assets/cocktails/classic2.webp", // Remplacez par le chemin réel si disponible
  imageB: "/assets/cocktails/vignettes/classic2Vignette.webp", // Remplacez par le chemin réel si disponible
},
{
    id: 11,
    name: { fr: "Banana Daiquiri", en: "Banana Daiquiri" },
    category: { fr: "Revisités", en: "Twists" },
    sections: [
      {
        title: { fr: "COCKTAIL", en: "COCKTAIL" },
        ingredients: [
          { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 60, unit: "ml" },
          { name: { fr: "Banane mûre", en: "Ripe Banana" }, qty: 1, unit: "unité" },
          { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 30, unit: "ml" },
          { name: { fr: "Sirop simple", en: "Simple Syrup" }, qty: 15, unit: "ml" },
          { name: { fr: "Glaçons", en: "Ice Cubes" }, qty: null, unit: "" },
        ],
        method: [
          { fr: "Mixez au blender.", en: "Blend it." },
        ],
      },
    ],
    garnish: { fr: "Une tranche de banane ou un zeste de citron vert.", en: "A slice of banana or lime zest." },
    image: "/assets/cocktails/classic1.webp", // Remplacez par le chemin réel si disponible
    imageB: "/assets/cocktails/vignettes/classic1Vignette.webp", // Remplacez par le chemin réel si disponible
},
{
  id: 12,
  name: { fr: "Old Mauritian", en: "Old Mauritian" },
  category: { fr: "Revisités", en: "Twists" },
  sections: [
    {
      title: { fr: "COCKTAIL", en: "COCKTAIL" },
      ingredients: [
        { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 45, unit: "ml" },
        { name: { fr: "Champagne ou Prosecco", en: "Champagne or Prosecco" }, qty: 30, unit: "ml" },
        { name: { fr: "Sirop simple", en: "Simple Syrup" }, qty: 15, unit: "ml" },
        { name: { fr: "Feuilles de menthe fraîches", en: "Fresh Mint Leaves" }, qty: 10, unit: "unités" },
        { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 15, unit: "ml" },
        { name: { fr: "Glaçons", en: "Ice Cubes" }, qty: null, unit: "" },
      ],
      method: [
        { fr: "Secouez au shaker.", en: "Shake it." },
      ],
    },
  ],
  garnish: { fr: "Une feuille de menthe fraîche.", en: "A fresh mint leaf." },
  image: "/assets/cocktails/classic3.webp", // Remplacez par le chemin réel si disponible
  imageB: "/assets/cocktails/vignettes/classic3Vignette.webp", // Remplacez par le chemin réel si disponible
},
{
  id: 13,
  name: { fr: "Arcane Mai Tai", en: "Arcane Mai Tai" },
  category: { fr: "Revisités", en: "Twists" },
  sections: [
    {
      title: { fr: "COCKTAIL", en: "COCKTAIL" },
      ingredients: [
        { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 45, unit: "ml" },
        { name: { fr: "Rhum Blanc", en: "White Rum" }, qty: 15, unit: "ml" },
        { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 30, unit: "ml" },
        { name: { fr: "Sirop d'orgeat", en: "Orgeat Syrup" }, qty: 15, unit: "ml" },
        { name: { fr: "Liqueur d'orange", en: "Orange Liqueur" }, qty: 15, unit: "ml" },
        { name: { fr: "Glaçons", en: "Ice Cubes" }, qty: null, unit: "" },
      ],
      method: [
        { fr: "Shaker.", en: "Shake it." },
      ],
    },
  ],
  garnish: { fr: "Un brin de menthe fraîche et un zeste de citron vert.", en: "A sprig of fresh mint and a twist of lime." },
  image: "/assets/cocktails/classic4.webp", // Remplacez par le chemin réel si disponible
  imageB: "/assets/cocktails/vignettes/classic5Vignette.png", // Remplacez par le chemin réel si disponible
},
{
  id: 14,
  name: { fr: "Extra'n'Stormy", en: "Extra'n'Stormy" },
  category: { fr: "Revisités", en: "Twists" },
  sections: [
    {
      title: { fr: "COCKTAIL", en: "COCKTAIL" },
      ingredients: [
        { name: { fr: "Arcane Extraroma", en: "Arcane Extraroma" }, qty: 60, unit: "ml" },
        { name: { fr: "Ginger Beer", en: "Ginger Beer" }, qty: 120, unit: "ml" },
        { name: { fr: "Jus de citron vert frais", en: "Fresh Lime Juice" }, qty: 15, unit: "ml" },
        { name: { fr: "Glaçons", en: "Ice Cubes" }, qty: null, unit: "" },
      ],
      method: [
        { fr: "Directement dans le verre.", en: "On the glass." },
      ],
    },
  ],
  garnish: { fr: "Une tranche de citron vert.", en: "A slice of lime." },
  image: "/assets/cocktails/classic5.webp", // Remplacez par le chemin réel si disponible
  imageB: "/assets/cocktails/vignettes/classic4Vignette.webp", // Remplacez par le chemin réel si disponible
},
];
export default cocktails;