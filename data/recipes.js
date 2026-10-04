/**
 * NutriCare - data/recipes.js
 * ============================================================
 * Recipe database (15 healthy recipes).
 * Ingredients reference foodsData IDs from data/foods.js.
 * Nutrition values are dynamically calculated from foodsData
 * at runtime in js/cook.js — do not duplicate them here.
 *
 * Food ID reference (from data/foods.js):
 *  1  White Rice (cooked)      11 Lean Beef
 *  2  Brown Rice (cooked)      12 Shrimp (boiled)
 *  3  Oatmeal                  13 Tofu
 *  4  Whole Wheat Bread        14 Whole Milk
 *  5  Sweet Potato (boiled)    15 Greek Yogurt
 *  6  Potato (boiled)          16 Banana
 *  7  Chicken Egg (boiled)     17 Apple
 *  8  Chicken Breast (cooked)  18 Orange
 *  9  Salmon                   19 Avocado
 * 10  Tuna                     20 Broccoli
 *                              21 Spinach
 *                              22 Carrot
 *                              23 Tomato
 *                              24 Cucumber
 *                              25 Almonds
 *                              26 Peanuts
 *                              27 Peanut Butter
 *                              28 Black Beans
 *                              29 Lentils
 *                              30 Mung Beans
 *
 * Future Grocery List: iterate recipe.ingredients[] and read
 *   { foodId, quantity, unit, optional } for each item.
 * ============================================================
 */

const recipesData = [

  /* ── 1. Chicken Rice Bowl ─────────────────────────────── */
  {
    id: 1,
    nameVI: 'Cơm gà',
    nameEN: 'Chicken Rice Bowl',
    descriptionVI: 'Bữa ăn cân bằng protein và carbohydrate với ức gà nấu chín và cơm trắng, rau củ tươi.',
    descriptionEN: 'A well-balanced protein and carb meal with cooked chicken breast and white rice with fresh vegetables.',
    servings: 1,
    prepTime: 10,
    cookTime: 20,
    difficulty: 'easy',
    mealTags: ['breakfast', 'lunch', 'dinner'],
    ingredients: [
      { foodId: 8,  quantity: 150, unit: 'g' },
      { foodId: 1,  quantity: 200, unit: 'g' },
      { foodId: 20, quantity: 80,  unit: 'g' },
      { foodId: 23, quantity: 60,  unit: 'g' },
      { foodId: 22, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Rửa sạch ức gà, để ráo nước.',
      'Đun nước sôi, cho gà vào luộc hoặc áp chảo 15–20 phút cho đến khi chín.',
      'Nấu cơm trắng theo tỉ lệ 1:1.5 (gạo:nước).',
      'Trong khi nấu cơm, blanch bông cải xanh trong nước sôi 3 phút.',
      'Cắt cà chua và cà rốt thành miếng nhỏ.',
      'Xếp cơm vào tô, đặt gà lên trên và xung quanh là rau.',
      'Có thể thêm xì dầu nhẹ hoặc gia vị tùy khẩu vị.'
    ],
    stepsEN: [
      'Wash the chicken breast and pat dry.',
      'Boil water and cook chicken for 15–20 minutes until fully cooked, or pan-sear until done.',
      'Cook white rice using a 1:1.5 ratio (rice:water).',
      'While the rice cooks, blanch broccoli in boiling water for 3 minutes.',
      'Slice the tomato and carrot into small pieces.',
      'Arrange the rice in a bowl, top with chicken, and add vegetables around the sides.',
      'Add a light drizzle of soy sauce or seasoning to taste.'
    ]
  },

  /* ── 2. Grilled Chicken & Vegetables ─────────────────── */
  {
    id: 2,
    nameVI: 'Gà áp chảo rau củ',
    nameEN: 'Grilled Chicken & Vegetables',
    descriptionVI: 'Gà áp chảo giòn thơm kết hợp rau củ tươi, món ăn ít carb phù hợp cho mọi bữa ăn.',
    descriptionEN: 'Crispy pan-grilled chicken with fresh vegetables. A low-carb meal suitable for any time of day.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 8,  quantity: 200, unit: 'g' },
      { foodId: 20, quantity: 100, unit: 'g' },
      { foodId: 21, quantity: 60,  unit: 'g' },
      { foodId: 22, quantity: 80,  unit: 'g' },
      { foodId: 23, quantity: 80,  unit: 'g' }
    ],
    stepsVI: [
      'Ướp gà với muối, tiêu và tỏi băm 5–10 phút.',
      'Làm nóng chảo với một ít dầu ô liu ở lửa vừa.',
      'Cho gà vào áp chảo 6–7 phút mỗi mặt cho đến khi vàng đều.',
      'Trong chảo khác, xào bông cải, cà rốt và cà chua với ít muối.',
      'Trải rau bina lên đĩa làm nền.',
      'Đặt gà áp chảo và rau xào lên trên.',
      'Dùng ngay khi còn nóng.'
    ],
    stepsEN: [
      'Marinate chicken with salt, pepper and minced garlic for 5–10 minutes.',
      'Heat a pan with a little olive oil over medium heat.',
      'Cook chicken 6–7 minutes per side until golden brown and cooked through.',
      'In another pan, sauté broccoli, carrot and tomato with a pinch of salt.',
      'Lay spinach leaves on a plate as a base.',
      'Place the grilled chicken and sautéed vegetables on top.',
      'Serve immediately while hot.'
    ]
  },

  /* ── 3. Salmon Rice Bowl ──────────────────────────────── */
  {
    id: 3,
    nameVI: 'Cơm cá hồi',
    nameEN: 'Salmon Rice Bowl',
    descriptionVI: 'Cá hồi giàu Omega-3 phủ trên cơm lứt cùng rau xanh, bữa ăn bổ dưỡng tuyệt vời.',
    descriptionEN: 'Omega-3-rich salmon over brown rice with greens — a wonderfully nutritious meal.',
    servings: 1,
    prepTime: 10,
    cookTime: 20,
    difficulty: 'medium',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 9,  quantity: 150, unit: 'g' },
      { foodId: 2,  quantity: 180, unit: 'g' },
      { foodId: 21, quantity: 60,  unit: 'g' },
      { foodId: 19, quantity: 50,  unit: 'g' },
      { foodId: 24, quantity: 60,  unit: 'g' }
    ],
    stepsVI: [
      'Ướp cá hồi với muối, tiêu và nước cốt chanh 5 phút.',
      'Nấu cơm lứt theo tỉ lệ 1:2 (gạo:nước), khoảng 25 phút.',
      'Làm nóng chảo chống dính, áp cá hồi 4 phút mỗi mặt cho đến khi cá có màu vàng đẹp.',
      'Rửa sạch rau bina và dưa chuột, thái lát mỏng dưa chuột.',
      'Thái bơ thành lát dày.',
      'Xếp cơm lứt vào bát, đặt cá hồi và rau lên.',
      'Thêm lát bơ và dùng ngay.'
    ],
    stepsEN: [
      'Season salmon with salt, pepper and lemon juice and let sit 5 minutes.',
      'Cook brown rice using a 1:2 ratio (rice:water), approximately 25 minutes.',
      'Heat a non-stick pan and cook salmon 4 minutes per side until golden.',
      'Rinse spinach and thinly slice the cucumber.',
      'Slice the avocado into thick slices.',
      'Arrange brown rice in a bowl, top with salmon and vegetables.',
      'Add avocado slices and serve immediately.'
    ]
  },

  /* ── 4. Tuna Sandwich ─────────────────────────────────── */
  {
    id: 4,
    nameVI: 'Bánh mì cá ngừ',
    nameEN: 'Tuna Sandwich',
    descriptionVI: 'Bánh mì ngũ cốc với cá ngừ giàu đạm và rau tươi, bữa ăn nhanh gọn và bổ dưỡng.',
    descriptionEN: 'Whole-grain bread with protein-rich tuna and fresh vegetables — a quick and nutritious meal.',
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    mealTags: ['breakfast', 'lunch', 'snack'],
    ingredients: [
      { foodId: 10, quantity: 100, unit: 'g' },
      { foodId: 4,  quantity: 60,  unit: 'g' },
      { foodId: 23, quantity: 50,  unit: 'g' },
      { foodId: 24, quantity: 50,  unit: 'g' },
      { foodId: 21, quantity: 20,  unit: 'g' }
    ],
    stepsVI: [
      'Lấy cá ngừ ra khỏi hộp, để ráo nước.',
      'Trộn cá ngừ với một ít muối và tiêu theo khẩu vị.',
      'Thái cà chua và dưa chuột thành lát mỏng.',
      'Nướng bánh mì nhẹ trong 1–2 phút nếu muốn.',
      'Phủ rau bina lên một lát bánh mì.',
      'Cho cá ngừ lên trên, sau đó thêm cà chua và dưa chuột.',
      'Đậy lát bánh mì còn lại và dùng ngay.'
    ],
    stepsEN: [
      'Drain the tuna from the can.',
      'Mix tuna with a little salt and pepper to taste.',
      'Slice the tomato and cucumber into thin slices.',
      'Lightly toast the bread for 1–2 minutes if desired.',
      'Layer spinach leaves on one slice of bread.',
      'Add the tuna on top, then add tomato and cucumber slices.',
      'Close with the second slice of bread and serve immediately.'
    ]
  },

  /* ── 5. Egg & Avocado Toast ───────────────────────────── */
  {
    id: 5,
    nameVI: 'Bánh mì trứng & bơ',
    nameEN: 'Egg & Avocado Toast',
    descriptionVI: 'Bánh mì với trứng và bơ béo ngậy — bữa sáng lý tưởng giàu chất béo tốt và đạm.',
    descriptionEN: 'Toast topped with egg and creamy avocado — an ideal breakfast rich in good fats and protein.',
    servings: 1,
    prepTime: 5,
    cookTime: 8,
    difficulty: 'easy',
    mealTags: ['breakfast', 'snack'],
    ingredients: [
      { foodId: 4,  quantity: 60,  unit: 'g' },
      { foodId: 7,  quantity: 100, unit: 'g' },
      { foodId: 19, quantity: 80,  unit: 'g' },
      { foodId: 23, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Nướng bánh mì cho đến khi vàng và giòn.',
      'Bổ đôi quả bơ, lấy phần thịt và nghiền nhuyễn với muối và tiêu.',
      'Đun sôi nước, thả trứng vào luộc 6–7 phút cho trứng chín vừa.',
      'Bóc vỏ trứng và cắt đôi.',
      'Phết bơ nghiền lên bánh mì nướng.',
      'Đặt trứng và lát cà chua lên trên.',
      'Thêm chút muối biển hoặc ớt vảy tùy khẩu vị.'
    ],
    stepsEN: [
      'Toast the bread until golden and crispy.',
      'Halve the avocado, scoop the flesh and mash with salt and pepper.',
      'Bring water to a boil and cook eggs for 6–7 minutes for a medium-boiled result.',
      'Peel and halve the eggs.',
      'Spread the mashed avocado onto the toast.',
      'Place the eggs and tomato slices on top.',
      'Add a pinch of sea salt or chili flakes to taste.'
    ]
  },

  /* ── 6. Oatmeal Banana Bowl ───────────────────────────── */
  {
    id: 6,
    nameVI: 'Yến mạch chuối',
    nameEN: 'Oatmeal Banana Bowl',
    descriptionVI: 'Yến mạch ấm với chuối tươi và sữa, bữa sáng no lâu, giàu chất xơ và năng lượng bền vững.',
    descriptionEN: 'Warm oatmeal with fresh banana and milk — a filling breakfast rich in fiber and sustained energy.',
    servings: 1,
    prepTime: 2,
    cookTime: 5,
    difficulty: 'easy',
    mealTags: ['breakfast', 'snack'],
    ingredients: [
      { foodId: 3,  quantity: 80,  unit: 'g' },
      { foodId: 14, quantity: 200, unit: 'ml' },
      { foodId: 16, quantity: 100, unit: 'g' },
      { foodId: 25, quantity: 15,  unit: 'g', optional: true }
    ],
    stepsVI: [
      'Đong yến mạch và sữa tươi vào nồi nhỏ.',
      'Đun ở lửa vừa, khuấy đều liên tục khoảng 4–5 phút cho đến khi yến mạch mềm và sánh.',
      'Trong khi nấu, cắt chuối thành lát tròn.',
      'Đổ yến mạch ra tô.',
      'Xếp lát chuối lên trên.',
      'Nếu thích, rắc hạnh nhân lên để tăng độ giòn và protein.'
    ],
    stepsEN: [
      'Measure oatmeal and milk into a small saucepan.',
      'Cook over medium heat, stirring constantly for 4–5 minutes until thick and creamy.',
      'While cooking, slice the banana into rounds.',
      'Pour the oatmeal into a bowl.',
      'Arrange banana slices on top.',
      'Optionally, sprinkle almonds for added crunch and protein.'
    ]
  },

  /* ── 7. Greek Yogurt Fruit Bowl ───────────────────────── */
  {
    id: 7,
    nameVI: 'Sữa chua Hy Lạp hoa quả',
    nameEN: 'Greek Yogurt Fruit Bowl',
    descriptionVI: 'Sữa chua Hy Lạp béo mịn kết hợp các loại trái cây tươi, bữa ăn nhẹ bổ dưỡng và thơm ngon.',
    descriptionEN: 'Creamy Greek yogurt topped with fresh fruits — a nutritious and delicious light meal.',
    servings: 1,
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    mealTags: ['breakfast', 'snack'],
    ingredients: [
      { foodId: 15, quantity: 200, unit: 'g' },
      { foodId: 16, quantity: 80,  unit: 'g' },
      { foodId: 17, quantity: 80,  unit: 'g' },
      { foodId: 25, quantity: 15,  unit: 'g', optional: true }
    ],
    stepsVI: [
      'Lấy sữa chua Hy Lạp ra bát lớn.',
      'Rửa sạch táo và chuối.',
      'Thái táo thành miếng nhỏ vừa ăn và cắt chuối thành lát.',
      'Xếp táo và chuối lên trên sữa chua.',
      'Tùy chọn: rắc hạnh nhân thái lát để thêm độ giòn.'
    ],
    stepsEN: [
      'Spoon the Greek yogurt into a large bowl.',
      'Rinse the apple and banana.',
      'Dice the apple into bite-sized pieces and slice the banana.',
      'Arrange the apple and banana on top of the yogurt.',
      'Optional: sprinkle sliced almonds for added crunch.'
    ]
  },

  /* ── 8. Chicken Salad ─────────────────────────────────── */
  {
    id: 8,
    nameVI: 'Salad gà',
    nameEN: 'Chicken Salad',
    descriptionVI: 'Salad gà tươi mát, ít carb, nhiều đạm và rau xanh — phù hợp cho mục tiêu giảm cân.',
    descriptionEN: 'Refreshing chicken salad, low in carbs and high in protein and greens — ideal for weight-loss goals.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 8,  quantity: 150, unit: 'g' },
      { foodId: 21, quantity: 80,  unit: 'g' },
      { foodId: 23, quantity: 80,  unit: 'g' },
      { foodId: 24, quantity: 80,  unit: 'g' },
      { foodId: 22, quantity: 50,  unit: 'g' },
      { foodId: 19, quantity: 50,  unit: 'g', optional: true }
    ],
    stepsVI: [
      'Luộc hoặc áp chảo ức gà 15 phút đến khi chín. Để nguội.',
      'Xé hoặc thái gà thành sợi nhỏ.',
      'Rửa sạch rau bina, cà chua, dưa chuột và cà rốt.',
      'Thái cà chua, cà rốt và dưa chuột thành lát mỏng hoặc miếng nhỏ.',
      'Trộn tất cả rau vào tô lớn.',
      'Thêm gà vào và trộn đều.',
      'Tùy chọn: thêm lát bơ và nước sốt dầu giấm nhẹ.'
    ],
    stepsEN: [
      'Boil or pan-sear chicken breast for 15 minutes until cooked through. Let cool.',
      'Shred or slice the chicken into thin strips.',
      'Rinse spinach, tomato, cucumber and carrot.',
      'Slice tomato, carrot and cucumber into thin pieces.',
      'Combine all vegetables in a large bowl.',
      'Add chicken and toss to combine.',
      'Optional: add avocado slices and a light vinaigrette dressing.'
    ]
  },

  /* ── 9. Beef & Vegetable Bowl ─────────────────────────── */
  {
    id: 9,
    nameVI: 'Cơm thịt bò rau củ',
    nameEN: 'Beef & Vegetable Bowl',
    descriptionVI: 'Thịt bò nạc xào rau củ phủ lên cơm trắng, bữa ăn giàu protein và sắt.',
    descriptionEN: 'Lean beef stir-fried with vegetables over white rice — a protein and iron-rich meal.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'medium',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 11, quantity: 150, unit: 'g' },
      { foodId: 1,  quantity: 200, unit: 'g' },
      { foodId: 20, quantity: 80,  unit: 'g' },
      { foodId: 22, quantity: 60,  unit: 'g' },
      { foodId: 23, quantity: 60,  unit: 'g' }
    ],
    stepsVI: [
      'Thái mỏng thịt bò và ướp với xì dầu, tiêu và tỏi 10 phút.',
      'Nấu cơm trắng.',
      'Sơ chế bông cải, cà rốt và cà chua — rửa sạch và cắt miếng.',
      'Làm nóng chảo với dầu ăn ở lửa lớn.',
      'Xào thịt bò 3–4 phút đến khi chín, lấy ra đĩa.',
      'Xào rau củ trong cùng chảo 5 phút.',
      'Cho thịt bò trở lại chảo, trộn đều và đặt lên cơm.'
    ],
    stepsEN: [
      'Thinly slice the beef and marinate with soy sauce, pepper and garlic for 10 minutes.',
      'Cook the white rice.',
      'Prepare broccoli, carrot and tomato — wash and cut into pieces.',
      'Heat a wok or pan with oil over high heat.',
      'Stir-fry the beef for 3–4 minutes until cooked, then set aside.',
      'Stir-fry the vegetables in the same pan for 5 minutes.',
      'Return the beef to the pan, mix well and serve over rice.'
    ]
  },

  /* ── 10. Shrimp Rice Bowl ─────────────────────────────── */
  {
    id: 10,
    nameVI: 'Cơm tôm',
    nameEN: 'Shrimp Rice Bowl',
    descriptionVI: 'Tôm ít béo giàu đạm trên cơm trắng và rau xanh, bữa ăn nhẹ nhàng và ngon miệng.',
    descriptionEN: 'Low-fat, protein-rich shrimp over white rice and greens — a light yet satisfying meal.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 12, quantity: 150, unit: 'g' },
      { foodId: 1,  quantity: 180, unit: 'g' },
      { foodId: 20, quantity: 80,  unit: 'g' },
      { foodId: 21, quantity: 40,  unit: 'g' },
      { foodId: 22, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Làm sạch tôm, bóc vỏ và bỏ đầu.',
      'Ướp tôm với muối, tiêu, tỏi và ít dầu 5 phút.',
      'Nấu cơm trắng.',
      'Blanch bông cải và cà rốt trong nước sôi 3 phút.',
      'Xào tôm trong chảo nóng 3–4 phút đến khi chín hồng.',
      'Xếp cơm vào bát, đặt tôm và rau lên trên.',
      'Dùng ngay khi còn nóng.'
    ],
    stepsEN: [
      'Clean the shrimp, remove shells and heads.',
      'Marinate with salt, pepper, garlic and a little oil for 5 minutes.',
      'Cook the white rice.',
      'Blanch broccoli and carrot in boiling water for 3 minutes.',
      'Stir-fry the shrimp in a hot pan for 3–4 minutes until pink and cooked.',
      'Arrange rice in a bowl, top with shrimp and vegetables.',
      'Serve immediately while hot.'
    ]
  },

  /* ── 11. Tofu Vegetable Bowl ──────────────────────────── */
  {
    id: 11,
    nameVI: 'Đậu phụ xào rau củ',
    nameEN: 'Tofu Vegetable Bowl',
    descriptionVI: 'Đậu phụ chiên vàng xào rau củ đầy màu sắc, lựa chọn thuần chay bổ dưỡng.',
    descriptionEN: 'Golden pan-fried tofu stir-fried with colorful vegetables — a nutritious plant-based option.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 13, quantity: 200, unit: 'g' },
      { foodId: 2,  quantity: 180, unit: 'g' },
      { foodId: 20, quantity: 80,  unit: 'g' },
      { foodId: 22, quantity: 60,  unit: 'g' },
      { foodId: 21, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Cắt đậu phụ thành khối vuông 3cm. Thấm khô bằng khăn giấy.',
      'Nấu cơm lứt.',
      'Chiên đậu phụ trong dầu nóng 5–6 phút mỗi mặt đến khi vàng giòn.',
      'Lấy đậu phụ ra, dùng cùng chảo xào bông cải và cà rốt 5 phút.',
      'Cho đậu phụ trở lại, thêm xì dầu và đảo đều.',
      'Trải rau bina ra đĩa, xếp cơm lứt và đậu phụ xào lên trên.',
      'Dùng ngay khi còn nóng.'
    ],
    stepsEN: [
      'Cut tofu into 3cm cubes. Pat dry thoroughly with paper towels.',
      'Cook the brown rice.',
      'Pan-fry tofu in hot oil for 5–6 minutes per side until golden and crispy.',
      'Remove tofu and use the same pan to sauté broccoli and carrot for 5 minutes.',
      'Return tofu to the pan, add soy sauce and toss to combine.',
      'Spread spinach on a plate, then top with brown rice and the tofu stir-fry.',
      'Serve immediately while hot.'
    ]
  },

  /* ── 12. Sweet Potato Chicken Bowl ───────────────────── */
  {
    id: 12,
    nameVI: 'Khoai lang gà',
    nameEN: 'Sweet Potato Chicken Bowl',
    descriptionVI: 'Khoai lang và ức gà giàu vitamin A và đạm, bữa ăn no lâu và cân bằng dinh dưỡng.',
    descriptionEN: 'Sweet potato and chicken breast rich in vitamin A and protein — a filling and balanced meal.',
    servings: 1,
    prepTime: 10,
    cookTime: 25,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 8,  quantity: 150, unit: 'g' },
      { foodId: 5,  quantity: 200, unit: 'g' },
      { foodId: 20, quantity: 80,  unit: 'g' },
      { foodId: 21, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Gọt vỏ khoai lang và cắt thành khối vừa. Luộc hoặc hấp 15–20 phút đến khi mềm.',
      'Ướp gà với muối và tiêu, sau đó áp chảo hoặc nướng đến khi chín vàng.',
      'Blanch bông cải xanh trong nước sôi 3 phút.',
      'Sắp xếp rau bina ra đĩa, đặt khoai lang và bông cải xung quanh.',
      'Cắt gà thành lát và đặt lên giữa.',
      'Có thể drizzle dầu ô liu hoặc nước sốt nhẹ lên trên.'
    ],
    stepsEN: [
      'Peel the sweet potato and cut into medium chunks. Boil or steam for 15–20 minutes until tender.',
      'Season chicken with salt and pepper, then pan-sear or bake until golden and cooked through.',
      'Blanch broccoli in boiling water for 3 minutes.',
      'Arrange spinach on a plate, place sweet potato and broccoli around the edges.',
      'Slice the chicken and place in the center.',
      'Optionally drizzle with olive oil or a light dressing.'
    ]
  },

  /* ── 13. Egg Fried Rice ───────────────────────────────── */
  {
    id: 13,
    nameVI: 'Cơm chiên trứng',
    nameEN: 'Egg Fried Rice',
    descriptionVI: 'Cơm chiên trứng cổ điển với rau củ — bữa ăn nhanh, ngon và đủ chất.',
    descriptionEN: 'Classic egg fried rice with vegetables — a quick, tasty and nutritious meal.',
    servings: 1,
    prepTime: 5,
    cookTime: 10,
    difficulty: 'easy',
    mealTags: ['breakfast', 'lunch', 'dinner'],
    ingredients: [
      { foodId: 7,  quantity: 100, unit: 'g' },
      { foodId: 1,  quantity: 200, unit: 'g' },
      { foodId: 22, quantity: 50,  unit: 'g' },
      { foodId: 23, quantity: 50,  unit: 'g' },
      { foodId: 21, quantity: 40,  unit: 'g' }
    ],
    stepsVI: [
      'Nấu cơm từ tối hôm trước hoặc dùng cơm nguội (tốt hơn cho cơm chiên).',
      'Đập trứng vào bát, thêm chút muối và đánh đều.',
      'Thái nhỏ cà rốt, cà chua.',
      'Cho dầu ăn vào chảo nóng, xào cà rốt 2 phút.',
      'Cho cơm vào xào đều ở lửa lớn 3–4 phút.',
      'Đẩy cơm sang một bên, đổ trứng vào giữa chảo, đảo nhanh rồi trộn với cơm.',
      'Thêm cà chua và rau bina, nêm xì dầu và đảo đều. Dùng ngay.'
    ],
    stepsEN: [
      'Use day-old rice from the fridge (best for fried rice) or cook rice and let it cool.',
      'Crack eggs into a bowl, add a pinch of salt and beat well.',
      'Dice carrot and tomato into small pieces.',
      'Heat oil in a wok, stir-fry carrot for 2 minutes.',
      'Add rice and stir-fry over high heat for 3–4 minutes.',
      'Push rice aside, pour eggs into the center of the pan, scramble quickly then mix into rice.',
      'Add tomato and spinach, season with soy sauce and toss. Serve immediately.'
    ]
  },

  /* ── 14. Lentil & Vegetable Bowl ─────────────────────── */
  {
    id: 14,
    nameVI: 'Đậu lăng rau củ',
    nameEN: 'Lentil & Vegetable Bowl',
    descriptionVI: 'Đậu lăng giàu sắt và chất xơ nấu cùng rau củ, bữa ăn thuần chay bổ dưỡng.',
    descriptionEN: 'Iron and fiber-rich lentils cooked with vegetables — a hearty plant-based meal.',
    servings: 1,
    prepTime: 10,
    cookTime: 25,
    difficulty: 'medium',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 29, quantity: 100, unit: 'g' },
      { foodId: 22, quantity: 80,  unit: 'g' },
      { foodId: 23, quantity: 80,  unit: 'g' },
      { foodId: 21, quantity: 60,  unit: 'g' },
      { foodId: 20, quantity: 60,  unit: 'g' }
    ],
    stepsVI: [
      'Ngâm đậu lăng trong nước 30 phút (không bắt buộc), sau đó rửa sạch.',
      'Đun đậu lăng với 300ml nước ở lửa vừa 20–25 phút đến khi mềm.',
      'Trong lúc đó, thái cà rốt, cà chua và sơ chế bông cải.',
      'Xào cà rốt và bông cải trong chảo 5 phút với chút dầu và muối.',
      'Khi đậu lăng chín, cho rau bina vào khuấy đều.',
      'Nêm muối, tiêu và thêm cà chua vào.',
      'Đổ đậu lăng và rau xào vào bát. Dùng ngay.'
    ],
    stepsEN: [
      'Soak lentils in water for 30 minutes (optional), then rinse well.',
      'Simmer lentils with 300ml water over medium heat for 20–25 minutes until tender.',
      'Meanwhile, dice carrot, tomato and prepare broccoli.',
      'Sauté carrot and broccoli in a pan with a little oil and salt for 5 minutes.',
      'When lentils are cooked, stir in the spinach.',
      'Season with salt, pepper and add the tomato.',
      'Transfer to a bowl with the sautéed vegetables. Serve warm.'
    ]
  },

  /* ── 15. Peanut Butter Banana Oatmeal ─────────────────── */
  {
    id: 15,
    nameVI: 'Yến mạch bơ đậu phộng chuối',
    nameEN: 'Peanut Butter Banana Oatmeal',
    descriptionVI: 'Yến mạch béo ngậy với bơ đậu phộng và chuối — bữa sáng giàu năng lượng và protein thực vật.',
    descriptionEN: 'Creamy oatmeal with peanut butter and banana — a high-energy breakfast with plant protein.',
    servings: 1,
    prepTime: 2,
    cookTime: 5,
    difficulty: 'easy',
    mealTags: ['breakfast', 'snack'],
    ingredients: [
      { foodId: 3,  quantity: 80,  unit: 'g' },
      { foodId: 14, quantity: 200, unit: 'ml' },
      { foodId: 16, quantity: 100, unit: 'g' },
      { foodId: 27, quantity: 30,  unit: 'g' }
    ],
    stepsVI: [
      'Cho yến mạch và sữa vào nồi nhỏ.',
      'Đun ở lửa vừa, khuấy liên tục 4–5 phút đến khi sánh mịn.',
      'Tắt bếp, thêm bơ đậu phộng vào và khuấy đều cho tan chảy vào yến mạch.',
      'Cắt chuối thành lát mỏng.',
      'Đổ yến mạch ra tô, xếp lát chuối lên trên.',
      'Có thể thêm một ít bơ đậu phộng lên trên để trang trí và tăng hương vị.'
    ],
    stepsEN: [
      'Add oatmeal and milk to a small saucepan.',
      'Cook over medium heat, stirring constantly for 4–5 minutes until thick and creamy.',
      'Remove from heat, add peanut butter and stir well until it melts into the oatmeal.',
      'Slice the banana into thin rounds.',
      'Pour oatmeal into a bowl and arrange banana slices on top.',
      'Optionally add an extra drizzle of peanut butter on top for garnish and flavor.'
    ]
  }
  ,
  /* ── 16. Quinoa & Chicken Thigh Bowl ───────────────────────── */
  {
    id: 16,
    nameVI: 'Cơm Quinoa Đùi Gà',
    nameEN: 'Quinoa & Chicken Thigh Bowl',
    descriptionVI: 'Bữa ăn giàu đạm và chất xơ, sử dụng đùi gà mềm ngọt và quinoa.',
    descriptionEN: 'High protein and fiber meal using tender chicken thigh and quinoa.',
    servings: 1,
    prepTime: 10,
    cookTime: 25,
    difficulty: 'medium',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 43, quantity: 150, unit: 'g' },
      { foodId: 31, quantity: 150, unit: 'g' },
      { foodId: 48, quantity: 50,  unit: 'g' },
      { foodId: 52, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Rửa sạch quinoa, nấu chín với nước trong 15 phút.',
      'Đùi gà bỏ da, áp chảo hoặc nướng chín tới.',
      'Thái nhỏ ớt chuông và đậu cô ve, xào xơ qua.',
      'Xếp quinoa, đùi gà và rau củ ra tô, thưởng thức.'
    ],
    stepsEN: [
      'Rinse quinoa and cook in water for 15 minutes.',
      'Skinless chicken thigh, pan-fry or bake until done.',
      'Dice bell pepper and green beans, lightly stir-fry.',
      'Arrange quinoa, chicken, and vegetables in a bowl and enjoy.'
    ]
  },
  /* ── 17. Lean Pork & Bok Choy Rice Bowl ──────────────────── */
  {
    id: 17,
    nameVI: 'Cơm Thịt Lợn Nạc & Cải Thìa',
    nameEN: 'Lean Pork & Bok Choy Rice Bowl',
    descriptionVI: 'Thịt lợn nạc xào nấm kết hợp cải thìa thanh mát.',
    descriptionEN: 'Stir-fried lean pork with mushrooms and refreshing bok choy.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 1,  quantity: 150, unit: 'g' },
      { foodId: 32, quantity: 150, unit: 'g' },
      { foodId: 45, quantity: 100, unit: 'g' },
      { foodId: 51, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Nấu chín cơm trắng.',
      'Thịt lợn nạc thái mỏng, ướp gia vị nhẹ nhàng.',
      'Xào thịt lợn với nấm mỡ cho chín tới.',
      'Luộc sơ cải thìa.',
      'Dọn cơm ăn kèm thịt xào và rau luộc.'
    ],
    stepsEN: [
      'Cook white rice.',
      'Slice lean pork thinly and season lightly.',
      'Stir-fry pork with button mushrooms until cooked.',
      'Blanch bok choy.',
      'Serve rice with stir-fried pork and boiled vegetables.'
    ]
  },
  /* ── 18. Mackerel & Water Spinach with Rice ─────────────── */
  {
    id: 18,
    nameVI: 'Cơm Gạo Lứt Cá Thu Rau Muống',
    nameEN: 'Mackerel & Water Spinach with Brown Rice',
    descriptionVI: 'Bữa ăn dân dã, giàu Omega-3 từ cá thu.',
    descriptionEN: 'Traditional meal, rich in Omega-3 from mackerel.',
    servings: 1,
    prepTime: 5,
    cookTime: 20,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 2,  quantity: 150, unit: 'g' },
      { foodId: 33, quantity: 120, unit: 'g' },
      { foodId: 46, quantity: 100, unit: 'g' }
    ],
    stepsVI: [
      'Nấu chín cơm gạo lứt.',
      'Cá thu áp chảo hoặc kho nhạt với ít nước mắm và tiêu.',
      'Rau muống luộc hoặc xào tỏi.',
      'Thưởng thức cơm nóng với cá thu và rau muống.'
    ],
    stepsEN: [
      'Cook brown rice.',
      'Pan-fry or lightly braise mackerel with a little fish sauce and pepper.',
      'Boil or stir-fry water spinach with garlic.',
      'Enjoy hot rice with mackerel and water spinach.'
    ]
  },
  /* ── 19. Basa Fish & Asparagus ────────────────────────────── */
  {
    id: 19,
    nameVI: 'Cá Basa Nướng Măng Tây',
    nameEN: 'Basa Fish & Asparagus',
    descriptionVI: 'Bữa ăn ít calo (Low-carb) với cá basa mềm và măng tây giòn.',
    descriptionEN: 'Low-carb meal with tender basa fish and crispy asparagus.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 34, quantity: 200, unit: 'g' },
      { foodId: 53, quantity: 100, unit: 'g' },
      { foodId: 50, quantity: 100, unit: 'g' },
      { foodId: 44, quantity: 100, unit: 'g' }
    ],
    stepsVI: [
      'Ướp phi lê cá basa với muối, tiêu và thảo mộc.',
      'Cắt khúc măng tây, thái lát bí xanh và bông cải trắng.',
      'Cho cá và rau củ vào khay nướng.',
      'Nướng ở 200 độ C trong 12-15 phút đến khi cá chín mềm.'
    ],
    stepsEN: [
      'Marinate basa fillet with salt, pepper, and herbs.',
      'Cut asparagus into sections, slice zucchini and cauliflower.',
      'Place fish and vegetables on a baking tray.',
      'Bake at 200°C for 12-15 minutes until fish is tender.'
    ]
  },
  /* ── 20. Stir-Fried Squid & Cabbage ───────────────────────── */
  {
    id: 20,
    nameVI: 'Mực Xào Bắp Cải',
    nameEN: 'Stir-Fried Squid & Cabbage',
    descriptionVI: 'Mực tươi xào giòn cùng bắp cải và ớt chuông, ăn kèm cơm trắng.',
    descriptionEN: 'Fresh crispy squid stir-fried with cabbage and bell pepper, served with white rice.',
    servings: 1,
    prepTime: 15,
    cookTime: 10,
    difficulty: 'medium',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 35, quantity: 150, unit: 'g' },
      { foodId: 47, quantity: 150, unit: 'g' },
      { foodId: 48, quantity: 50,  unit: 'g' },
      { foodId: 1,  quantity: 150, unit: 'g' }
    ],
    stepsVI: [
      'Nấu chín cơm trắng.',
      'Làm sạch mực, khía vảy rồng và thái miếng vừa ăn.',
      'Thái nhỏ bắp cải và ớt chuông.',
      'Phi thơm tỏi, cho mực vào xào nhanh với lửa lớn rồi trút ra đĩa.',
      'Xào chín rau, đổ mực vào đảo đều nêm nếm vừa miệng.'
    ],
    stepsEN: [
      'Cook white rice.',
      'Clean squid, score the surface and cut into bite-sized pieces.',
      'Chop cabbage and bell pepper.',
      'Sauté garlic, quickly stir-fry squid over high heat and set aside.',
      'Stir-fry vegetables until cooked, add squid back, mix and season.'
    ]
  },
  /* ── 21. Chicken Pasta ────────────────────────────────────── */
  {
    id: 21,
    nameVI: 'Mì Ý Ức Gà Phô Mai',
    nameEN: 'Chicken Cheese Pasta',
    descriptionVI: 'Mì Ý kết hợp ức gà nướng và phô mai thơm lừng.',
    descriptionEN: 'Pasta combined with grilled chicken breast and aromatic cheese.',
    servings: 1,
    prepTime: 10,
    cookTime: 20,
    difficulty: 'medium',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 42, quantity: 150, unit: 'g' },
      { foodId: 8,  quantity: 150, unit: 'g' },
      { foodId: 23, quantity: 100, unit: 'g' },
      { foodId: 67, quantity: 30,  unit: 'g' }
    ],
    stepsVI: [
      'Luộc mì Ý theo hướng dẫn trên bao bì.',
      'Ức gà thái hạt lựu, áp chảo cho xém vàng.',
      'Xào cà chua nhuyễn làm sốt, nêm nếm gia vị.',
      'Trộn mì, gà và sốt cà chua, rắc phô mai lên trên cho tan chảy.'
    ],
    stepsEN: [
      'Boil pasta according to package instructions.',
      'Dice chicken breast, pan-fry until golden.',
      'Stir-fry tomatoes into a sauce, season to taste.',
      'Mix pasta, chicken, and tomato sauce, sprinkle cheese on top to melt.'
    ]
  },
  /* ── 22. Duck Egg & White Bread ───────────────────────────── */
  {
    id: 22,
    nameVI: 'Bánh Mì Kẹp Trứng Vịt',
    nameEN: 'Duck Egg & White Bread Sandwich',
    descriptionVI: 'Bữa sáng nhanh gọn, béo ngậy với trứng vịt.',
    descriptionEN: 'Quick and creamy breakfast with duck eggs.',
    servings: 1,
    prepTime: 5,
    cookTime: 5,
    difficulty: 'easy',
    mealTags: ['breakfast', 'snack'],
    ingredients: [
      { foodId: 36, quantity: 140, unit: 'g' },
      { foodId: 39, quantity: 60,  unit: 'g' },
      { foodId: 54, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Chiên hoặc ốp la trứng vịt vừa chín tới.',
      'Nướng sơ lát bánh mì trắng cho giòn.',
      'Kẹp trứng vịt và xà lách vào giữa 2 lát bánh mì.',
      'Thưởng thức ngay khi còn nóng.'
    ],
    stepsEN: [
      'Fry or cook duck eggs sunny-side up.',
      'Lightly toast the white bread slices.',
      'Sandwich the duck eggs and lettuce between bread slices.',
      'Enjoy immediately while hot.'
    ]
  },
  /* ── 23. Tempeh & Broccoli (Vegan) ────────────────────────── */
  {
    id: 23,
    nameVI: 'Tempeh Xào Bông Cải Xanh',
    nameEN: 'Tempeh & Broccoli Stir-fry',
    descriptionVI: 'Món ăn thuần chay giàu đạm từ tempeh lên men.',
    descriptionEN: 'High-protein vegan dish from fermented tempeh.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 37, quantity: 150, unit: 'g' },
      { foodId: 20, quantity: 100, unit: 'g' },
      { foodId: 22, quantity: 50,  unit: 'g' },
      { foodId: 2,  quantity: 150, unit: 'g' }
    ],
    stepsVI: [
      'Nấu chín cơm gạo lứt.',
      'Thái tempeh thành miếng vừa ăn, chiên sơ cho vàng giòn.',
      'Thái bông cải xanh và cà rốt, luộc sơ 1 phút.',
      'Xào chung tempeh và rau củ với sốt tương chua ngọt.'
    ],
    stepsEN: [
      'Cook brown rice.',
      'Slice tempeh into bite-sized pieces, lightly fry until golden crisp.',
      'Chop broccoli and carrots, blanch for 1 minute.',
      'Stir-fry tempeh and vegetables together with sweet and sour soy sauce.'
    ]
  },
  /* ── 24. Rice Noodle Chicken Soup (Phở Gà) ────────────────── */
  {
    id: 24,
    nameVI: 'Phở Gà (Nhanh)',
    nameEN: 'Quick Chicken Pho',
    descriptionVI: 'Món phở gà nhà làm đơn giản, nước dùng thanh ngọt.',
    descriptionEN: 'Simple homemade chicken pho with sweet clear broth.',
    servings: 1,
    prepTime: 15,
    cookTime: 30,
    difficulty: 'medium',
    mealTags: ['breakfast', 'lunch', 'dinner'],
    ingredients: [
      { foodId: 41, quantity: 150, unit: 'g' },
      { foodId: 8,  quantity: 100, unit: 'g' },
      { foodId: 31, quantity: 50,  unit: 'g' },
      { foodId: 45, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Luộc ức gà và đùi gà cùng với gừng và hành củ để làm nước dùng.',
      'Vớt thịt gà ra, xé nhỏ hoặc thái miếng.',
      'Chần bánh phở và cải thìa qua nước sôi.',
      'Cho phở, rau và thịt gà vào bát, chan nước dùng nóng hổi.'
    ],
    stepsEN: [
      'Boil chicken breast and thigh with ginger and onion to make broth.',
      'Remove chicken, shred or slice it.',
      'Blanch rice noodles and bok choy in boiling water.',
      'Place noodles, vegetables, and chicken in a bowl, pour hot broth over.'
    ]
  },
  /* ── 25. Chickpea & Quinoa Salad (Vegan) ──────────────────── */
  {
    id: 25,
    nameVI: 'Salad Đậu Gà & Quinoa',
    nameEN: 'Chickpea & Quinoa Salad',
    descriptionVI: 'Salad siêu dinh dưỡng, thanh mát nhẹ bụng.',
    descriptionEN: 'Super nutritious salad, light on the stomach.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner', 'snack'],
    ingredients: [
      { foodId: 76, quantity: 100, unit: 'g' },
      { foodId: 43, quantity: 100, unit: 'g' },
      { foodId: 54, quantity: 50,  unit: 'g' },
      { foodId: 24, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Nấu chín quinoa và luộc chín đậu gà.',
      'Xà lách thái nhỏ, dưa chuột thái hạt lựu.',
      'Trộn đều quinoa, đậu gà và rau củ.',
      'Thêm sốt chanh dây hoặc dầu olive, muối tiêu và thưởng thức.'
    ],
    stepsEN: [
      'Cook quinoa and boil chickpeas.',
      'Chop lettuce, dice cucumber.',
      'Mix quinoa, chickpeas, and vegetables evenly.',
      'Add passion fruit sauce or olive oil, salt, pepper and enjoy.'
    ]
  },
  /* ── 26. Sweet Corn & Duck Breast ─────────────────────────── */
  {
    id: 26,
    nameVI: 'Ức Vịt Áp Chảo & Bắp Ngọt',
    nameEN: 'Pan-seared Duck Breast & Sweet Corn',
    descriptionVI: 'Món ăn mang phong cách Âu, sang trọng và ngon miệng.',
    descriptionEN: 'European style dish, elegant and delicious.',
    servings: 1,
    prepTime: 10,
    cookTime: 20,
    difficulty: 'medium',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 78, quantity: 150, unit: 'g' },
      { foodId: 38, quantity: 100, unit: 'g' },
      { foodId: 49, quantity: 100, unit: 'g' }
    ],
    stepsVI: [
      'Ức vịt khía rãnh trên phần mỡ (nếu có), áp chảo cho ra bớt mỡ và chín vàng 2 mặt.',
      'Bí đỏ hấp chín, nghiền nhuyễn.',
      'Ngô ngọt tách hạt, xào bơ tỏi.',
      'Xếp bí đỏ nghiền làm nền, đặt ức vịt lên trên, ăn kèm ngô ngọt.'
    ],
    stepsEN: [
      'Score duck breast fat (if any), pan-sear to render fat and golden on both sides.',
      'Steam pumpkin, mash it.',
      'Separate sweet corn kernels, stir-fry with garlic butter.',
      'Use mashed pumpkin as base, place duck breast on top, serve with sweet corn.'
    ]
  },
  /* ── 27. Rice Vermicelli with Lean Pork ───────────────────── */
  {
    id: 27,
    nameVI: 'Bún Thịt Nạc Trộn',
    nameEN: 'Rice Vermicelli with Lean Pork',
    descriptionVI: 'Món bún trộn thanh mát, nêm nếm mặn ngọt dịu nhẹ.',
    descriptionEN: 'Refreshing mixed vermicelli dish, lightly seasoned.',
    servings: 1,
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    mealTags: ['lunch', 'dinner'],
    ingredients: [
      { foodId: 40, quantity: 150, unit: 'g' },
      { foodId: 32, quantity: 120, unit: 'g' },
      { foodId: 54, quantity: 50,  unit: 'g' },
      { foodId: 24, quantity: 50,  unit: 'g' }
    ],
    stepsVI: [
      'Luộc bún gạo cho chín mềm, xả qua nước lạnh cho đỡ dính.',
      'Thịt lợn nạc thái mỏng, xào chín tới với hành khô.',
      'Xà lách thái sợi, dưa chuột băm nhỏ.',
      'Cho bún, rau và thịt vào tô, chan nước mắm chua ngọt, trộn đều.'
    ],
    stepsEN: [
      'Boil rice vermicelli until soft, rinse with cold water to prevent sticking.',
      'Slice lean pork thinly, stir-fry with shallots until cooked.',
      'Shred lettuce, chop cucumber.',
      'Place vermicelli, vegetables, and pork in a bowl, pour sweet and sour fish sauce, mix well.'
    ]
  }
];
