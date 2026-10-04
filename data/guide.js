/**
 * NutriCare - data/guide.js
 * ============================================================
 * Educational content for the Nutrition Guide module.
 * Categories: basics, macros, hydration, meal-planning, habits
 * ============================================================
 */

const guideArticles = [
  {
    id: 'g1',
    category: 'basics',
    titleVI: 'Dinh dưỡng cơ bản: Calo là gì?',
    titleEN: 'Nutrition Basics: What are Calories?',
    summaryVI: 'Hiểu về nguyên lý cân bằng năng lượng để kiểm soát cân nặng.',
    summaryEN: 'Understand the principle of energy balance for weight management.',
    contentVI: `
      <p>Calo là đơn vị đo năng lượng. Cơ thể chúng ta cần năng lượng từ thực phẩm để duy trì sự sống và hoạt động.</p>
      <p><strong>Nguyên lý cân bằng năng lượng:</strong></p>
      <ul>
        <li><strong>Giữ cân:</strong> Calo nạp vào = Calo tiêu thụ.</li>
        <li><strong>Giảm cân:</strong> Calo nạp vào < Calo tiêu thụ (Thâm hụt calo).</li>
        <li><strong>Tăng cân:</strong> Calo nạp vào > Calo tiêu thụ (Dư thừa calo).</li>
      </ul>
      <p>Tuy nhiên, chất lượng calo cũng quan trọng. 100 calo từ rau củ sẽ cung cấp nhiều vitamin và giúp no lâu hơn 100 calo từ kẹo ngọt.</p>
    `,
    contentEN: `
      <p>A calorie is a unit of energy. Our bodies need energy from food to sustain life and physical activity.</p>
      <p><strong>The principle of energy balance:</strong></p>
      <ul>
        <li><strong>Maintain weight:</strong> Calories in = Calories out.</li>
        <li><strong>Lose weight:</strong> Calories in < Calories out (Calorie deficit).</li>
        <li><strong>Gain weight:</strong> Calories in > Calories out (Calorie surplus).</li>
      </ul>
      <p>However, calorie quality matters. 100 calories from vegetables provide more vitamins and keep you full longer than 100 calories from candy.</p>
    `,
    keyPointsVI: ['Calo là năng lượng', 'Thâm hụt calo giúp giảm cân', 'Chất lượng thực phẩm rất quan trọng'],
    keyPointsEN: ['Calories equal energy', 'Calorie deficit leads to weight loss', 'Food quality is crucial'],
    tags: ['calories', 'basics', 'weight']
  },
  {
    id: 'g2',
    category: 'macros',
    titleVI: 'Tầm quan trọng của Protein',
    titleEN: 'The Importance of Protein',
    summaryVI: 'Tại sao protein lại cần thiết cho cơ bắp và sức khỏe tổng thể.',
    summaryEN: 'Why protein is essential for muscles and overall health.',
    contentVI: `
      <p>Protein (chất đạm) là nền tảng xây dựng cơ thể, giúp phục hồi cơ bắp, sản xuất hormone và enzyme.</p>
      <p><strong>Nguồn protein tốt:</strong></p>
      <ul>
        <li>Thịt nạc (ức gà, thịt bò nạc).</li>
        <li>Cá và hải sản.</li>
        <li>Trứng và sữa.</li>
        <li>Thực vật: Đậu nành, đậu gà, đậu lăng, hạt diêm mạch (quinoa).</li>
      </ul>
      <p>Việc nạp đủ protein mỗi ngày không chỉ dành cho người tập gym mà còn giúp bạn no lâu hơn, hỗ trợ quá trình kiểm soát cân nặng.</p>
    `,
    contentEN: `
      <p>Protein is the building block of the body, helping repair muscles and produce hormones and enzymes.</p>
      <p><strong>Good sources of protein:</strong></p>
      <ul>
        <li>Lean meats (chicken breast, lean beef).</li>
        <li>Fish and seafood.</li>
        <li>Eggs and dairy.</li>
        <li>Plant-based: Soy, chickpeas, lentils, quinoa.</li>
      </ul>
      <p>Eating enough protein every day isn't just for bodybuilders; it also keeps you full longer, supporting weight management.</p>
    `,
    keyPointsVI: ['Xây dựng và phục hồi cơ bắp', 'Giúp no lâu', 'Có trong thịt, cá, trứng và các loại đậu'],
    keyPointsEN: ['Builds and repairs muscles', 'Increases satiety', 'Found in meat, fish, eggs, and legumes'],
    tags: ['protein', 'macros', 'muscle']
  },
  {
    id: 'g3',
    category: 'macros',
    titleVI: 'Carbohydrate: Không phải kẻ thù của bạn',
    titleEN: 'Carbohydrates: Not Your Enemy',
    summaryVI: 'Phân biệt tinh bột tốt và tinh bột xấu.',
    summaryEN: 'Differentiate between good carbs and bad carbs.',
    contentVI: `
      <p>Carbohydrate (Carbs / Tinh bột) là nguồn cung cấp năng lượng chính cho não và cơ thể hoạt động.</p>
      <p>Thay vì cắt bỏ hoàn toàn carbs, hãy chọn đúng loại:</p>
      <ul>
        <li><strong>Carbs phức tạp (Khuyên dùng):</strong> Tiêu hóa chậm, giàu chất xơ, giúp đường huyết ổn định. Ví dụ: Yến mạch, khoai lang, gạo lứt, ngũ cốc nguyên cám.</li>
        <li><strong>Carbs đơn giản (Hạn chế):</strong> Hấp thụ nhanh, gây tăng đột biến đường huyết. Ví dụ: Đường tinh luyện, bánh kẹo, nước ngọt, bánh mì trắng.</li>
      </ul>
    `,
    contentEN: `
      <p>Carbohydrates are the main source of energy for your brain and body.</p>
      <p>Instead of cutting out carbs completely, choose the right ones:</p>
      <ul>
        <li><strong>Complex Carbs (Recommended):</strong> Digest slowly, high in fiber, keep blood sugar stable. Examples: Oats, sweet potatoes, brown rice, whole grains.</li>
        <li><strong>Simple Carbs (Limit):</strong> Absorb quickly, cause blood sugar spikes. Examples: Refined sugar, sweets, soda, white bread.</li>
      </ul>
    `,
    keyPointsVI: ['Là nguồn năng lượng chính', 'Ưu tiên carbs phức tạp giàu chất xơ', 'Hạn chế đường tinh luyện'],
    keyPointsEN: ['Primary energy source', 'Prioritize complex, high-fiber carbs', 'Limit refined sugars'],
    tags: ['carbs', 'energy', 'macros']
  },
  {
    id: 'g4',
    category: 'macros',
    titleVI: 'Chất béo lành mạnh',
    titleEN: 'Healthy Fats',
    summaryVI: 'Chất béo rất cần thiết cho não bộ và việc hấp thụ vitamin.',
    summaryEN: 'Fats are essential for brain health and vitamin absorption.',
    contentVI: `
      <p>Nhiều người sợ chất béo vì nghĩ rằng ăn chất béo sẽ làm tăng mỡ thừa. Thực tế, chất béo tốt rất cần thiết cho sự phát triển của não bộ và giúp cơ thể hấp thụ các vitamin A, D, E, K.</p>
      <p><strong>Các loại chất béo tốt:</strong></p>
      <ul>
        <li>Quả bơ (Avocado).</li>
        <li>Các loại hạt (hạnh nhân, óc chó, hạt điều).</li>
        <li>Dầu oliu nguyên chất.</li>
        <li>Cá béo (cá hồi, cá trích) giàu Omega-3.</li>
      </ul>
      <p>Nên hạn chế chất béo chuyển hóa (trans fat) có trong đồ chiên rán ngập dầu và thức ăn nhanh.</p>
    `,
    contentEN: `
      <p>Many people fear fat, thinking it automatically translates to body fat. In reality, good fats are essential for brain development and helping the body absorb vitamins A, D, E, and K.</p>
      <p><strong>Good sources of fat:</strong></p>
      <ul>
        <li>Avocados.</li>
        <li>Nuts and seeds (almonds, walnuts, cashews).</li>
        <li>Extra virgin olive oil.</li>
        <li>Fatty fish (salmon, herring) rich in Omega-3.</li>
      </ul>
      <p>You should limit trans fats found in deep-fried foods and fast food.</p>
    `,
    keyPointsVI: ['Hỗ trợ hấp thụ vitamin', 'Tốt cho não và tim mạch', 'Chọn bơ, dầu oliu và hạt'],
    keyPointsEN: ['Supports vitamin absorption', 'Good for brain and heart', 'Choose avocados, olive oil, and nuts'],
    tags: ['fat', 'omega3', 'macros']
  },
  {
    id: 'g5',
    category: 'hydration',
    titleVI: 'Tầm quan trọng của việc uống đủ nước',
    titleEN: 'The Importance of Hydration',
    summaryVI: 'Tại sao nước lại quyết định hiệu suất học tập và làm việc của bạn.',
    summaryEN: 'Why water determines your academic and work performance.',
    contentVI: `
      <p>Cơ thể chúng ta chiếm hơn 60% là nước. Thiếu nước dù chỉ 2% có thể gây suy giảm sự tập trung, mệt mỏi và đau đầu.</p>
      <p><strong>Lợi ích của việc uống đủ nước:</strong></p>
      <ul>
        <li>Bôi trơn khớp xương.</li>
        <li>Thải độc và làm đẹp da.</li>
        <li>Hỗ trợ tiêu hóa và hấp thụ dưỡng chất.</li>
        <li>Duy trì nhiệt độ cơ thể.</li>
      </ul>
      <p><strong>Mẹo nhỏ:</strong> Hãy mang theo một bình nước cá nhân khi đi học/đi làm và đặt mục tiêu uống ít nhất 2 lít nước mỗi ngày (có thể điều chỉnh tùy theo cường độ vận động).</p>
    `,
    contentEN: `
      <p>Our bodies are made up of over 60% water. Even mild dehydration (2%) can cause a drop in concentration, fatigue, and headaches.</p>
      <p><strong>Benefits of staying hydrated:</strong></p>
      <ul>
        <li>Lubricates joints.</li>
        <li>Detoxifies and clears skin.</li>
        <li>Supports digestion and nutrient absorption.</li>
        <li>Regulates body temperature.</li>
      </ul>
      <p><strong>Pro Tip:</strong> Carry a personal water bottle to work/school and aim for at least 2 liters a day (adjust based on physical activity).</p>
    `,
    keyPointsVI: ['Cơ thể chiếm 60% là nước', 'Ngăn ngừa mệt mỏi và đau đầu', 'Uống ít nhất 2 lít mỗi ngày'],
    keyPointsEN: ['Body is 60% water', 'Prevents fatigue and headaches', 'Drink at least 2 liters daily'],
    tags: ['water', 'hydration', 'health']
  },
  {
    id: 'g6',
    category: 'meal-planning',
    titleVI: 'Xây dựng một bữa ăn cân bằng',
    titleEN: 'Building a Balanced Meal',
    summaryVI: 'Quy tắc Đĩa thức ăn (The Plate Method) để có bữa ăn khỏe mạnh.',
    summaryEN: 'The Plate Method for a healthy meal.',
    contentVI: `
      <p>Không cần phải tính toán calo quá khắt khe, bạn có thể áp dụng <strong>Quy tắc chiếc đĩa (The Plate Method)</strong> để có một bữa ăn đủ chất:</p>
      <ul>
        <li><strong>1/2 đĩa: Rau củ quả.</strong> Cung cấp vitamin, khoáng chất và chất xơ. Ưu tiên rau xanh đậm.</li>
        <li><strong>1/4 đĩa: Protein nạc.</strong> Thịt, cá, trứng, đậu phụ giúp no lâu và duy trì cơ bắp.</li>
        <li><strong>1/4 đĩa: Carbohydrate phức tạp.</strong> Cơm gạo lứt, khoai lang, yến mạch cung cấp năng lượng.</li>
        <li><strong>Một phần nhỏ: Chất béo tốt.</strong> Vài giọt dầu oliu hoặc một ít hạt/bơ tươi.</li>
      </ul>
    `,
    contentEN: `
      <p>You don't always need to strictly count calories. You can use <strong>The Plate Method</strong> to build a nutritious meal:</p>
      <ul>
        <li><strong>1/2 of your plate: Vegetables and fruits.</strong> Provides vitamins, minerals, and fiber. Prioritize dark leafy greens.</li>
        <li><strong>1/4 of your plate: Lean protein.</strong> Meat, fish, eggs, tofu keep you full and maintain muscle.</li>
        <li><strong>1/4 of your plate: Complex carbohydrates.</strong> Brown rice, sweet potatoes, oats provide energy.</li>
        <li><strong>A small portion: Healthy fats.</strong> A drizzle of olive oil, or some nuts/avocado.</li>
      </ul>
    `,
    keyPointsVI: ['1/2 đĩa là rau xanh', '1/4 đĩa là protein', '1/4 đĩa là tinh bột tốt'],
    keyPointsEN: ['1/2 plate vegetables', '1/4 plate protein', '1/4 plate complex carbs'],
    tags: ['meal-prep', 'balanced', 'planning']
  },
  {
    id: 'g7',
    category: 'basics',
    titleVI: 'Chất xơ: Vị cứu tinh của hệ tiêu hóa',
    titleEN: 'Fiber: The Digestive Savior',
    summaryVI: 'Lợi ích của chất xơ và cách bổ sung đủ chất xơ mỗi ngày.',
    summaryEN: 'Benefits of fiber and how to get enough every day.',
    contentVI: `
      <p>Chất xơ không cung cấp calo nhưng lại đóng vai trò cực kỳ quan trọng đối với sức khỏe đường ruột.</p>
      <ul>
        <li><strong>Chất xơ hòa tan:</strong> Giúp giảm cholesterol, ổn định đường huyết (có trong yến mạch, các loại đậu, táo).</li>
        <li><strong>Chất xơ không hòa tan:</strong> Giúp hệ tiêu hóa hoạt động trơn tru, ngăn ngừa táo bón (có trong rau xanh, ngũ cốc nguyên cám).</li>
      </ul>
      <p>Người trưởng thành nên tiêu thụ khoảng 25-30g chất xơ mỗi ngày. Hãy ăn trái cây nguyên quả thay vì chỉ ép lấy nước để giữ lại lượng chất xơ quý giá này.</p>
    `,
    contentEN: `
      <p>Fiber provides no calories but plays an incredibly crucial role in gut health.</p>
      <ul>
        <li><strong>Soluble fiber:</strong> Helps lower cholesterol and stabilize blood sugar (found in oats, beans, apples).</li>
        <li><strong>Insoluble fiber:</strong> Keeps the digestive system running smoothly, preventing constipation (found in leafy greens, whole grains).</li>
      </ul>
      <p>Adults should consume about 25-30g of fiber daily. Eat whole fruits instead of just drinking the juice to retain this valuable nutrient.</p>
    `,
    keyPointsVI: ['Hỗ trợ hệ tiêu hóa', 'Giúp no lâu, kiểm soát đường huyết', 'Ăn trái cây nguyên quả thay vì ép nước'],
    keyPointsEN: ['Supports digestion', 'Increases satiety, controls blood sugar', 'Eat whole fruits instead of juice'],
    tags: ['fiber', 'digestion', 'health']
  },
  {
    id: 'g8',
    category: 'habits',
    titleVI: 'Đọc hiểu Nhãn dinh dưỡng',
    titleEN: 'Reading Nutrition Labels',
    summaryVI: 'Cách nhận biết thành phần thực sự trong thực phẩm đóng gói.',
    summaryEN: 'How to understand what is actually in packaged foods.',
    contentVI: `
      <p>Khi mua thực phẩm đóng gói, đừng chỉ nhìn vào mặt trước của sản phẩm. Hãy lật ra mặt sau và kiểm tra <strong>Bảng thành phần dinh dưỡng (Nutrition Facts)</strong>:</p>
      <ol>
        <li><strong>Khẩu phần (Serving Size):</strong> Mọi thông số bên dưới đều tính cho 1 khẩu phần này. Một gói bánh có thể chứa 2-3 khẩu phần!</li>
        <li><strong>Calo:</strong> Đừng quên nhân với số khẩu phần bạn thực sự ăn.</li>
        <li><strong>Đường bổ sung (Added Sugars):</strong> Nên giữ ở mức càng thấp càng tốt.</li>
        <li><strong>Danh sách thành phần:</strong> Được liệt kê theo thứ tự trọng lượng giảm dần. Nếu "Đường" nằm ở vị trí đầu tiên, đó chủ yếu là một sản phẩm chứa đường.</li>
      </ol>
    `,
    contentEN: `
      <p>When buying packaged foods, don't just look at the front marketing. Flip it over and check the <strong>Nutrition Facts label</strong>:</p>
      <ol>
        <li><strong>Serving Size:</strong> All numbers below are based on ONE serving. A single package might contain 2-3 servings!</li>
        <li><strong>Calories:</strong> Don't forget to multiply by the number of servings you actually eat.</li>
        <li><strong>Added Sugars:</strong> Keep this as low as possible.</li>
        <li><strong>Ingredients List:</strong> Listed in descending order by weight. If "Sugar" is the first ingredient, it's mostly a sugar product.</li>
      </ol>
    `,
    keyPointsVI: ['Chú ý Kích thước khẩu phần (Serving Size)', 'Hạn chế đường bổ sung', 'Thành phần đầu tiên chiếm tỷ trọng cao nhất'],
    keyPointsEN: ['Pay attention to Serving Size', 'Limit added sugars', 'First ingredient is the most prominent'],
    tags: ['labels', 'shopping', 'habits']
  },
  {
    id: 'g9',
    category: 'meal-planning',
    titleVI: 'Dinh dưỡng Trước và Sau khi tập luyện',
    titleEN: 'Pre and Post-Workout Nutrition',
    summaryVI: 'Ăn gì để tối ưu hóa buổi tập và phục hồi cơ bắp.',
    summaryEN: 'What to eat to optimize your workout and recover muscles.',
    contentVI: `
      <p>Dinh dưỡng xung quanh buổi tập quyết định hiệu suất và khả năng phục hồi của bạn.</p>
      <p><strong>Trước khi tập (1-2 tiếng):</strong></p>
      <ul>
        <li>Mục tiêu: Cung cấp năng lượng nhanh.</li>
        <li>Nên ăn: Carbs dễ tiêu hóa và một ít protein. (Ví dụ: 1 quả chuối, bánh mì bơ đậu phộng, sữa chua).</li>
      </ul>
      <p><strong>Sau khi tập (Trong vòng 1 tiếng):</strong></p>
      <ul>
        <li>Mục tiêu: Phục hồi cơ và bổ sung glycogen.</li>
        <li>Nên ăn: Protein chất lượng cao và Carbs. (Ví dụ: Whey protein, cơm gà, trứng luộc).</li>
      </ul>
    `,
    contentEN: `
      <p>Nutrition around your workout determines your performance and recovery capability.</p>
      <p><strong>Pre-workout (1-2 hours before):</strong></p>
      <ul>
        <li>Goal: Provide quick energy.</li>
        <li>Eat: Easily digestible carbs and a little protein. (E.g., A banana, peanut butter toast, yogurt).</li>
      </ul>
      <p><strong>Post-workout (Within 1 hour after):</strong></p>
      <ul>
        <li>Goal: Muscle repair and glycogen replenishment.</li>
        <li>Eat: High-quality protein and carbs. (E.g., Whey protein shake, chicken and rice, boiled eggs).</li>
      </ul>
    `,
    keyPointsVI: ['Trước tập: Carbs dễ tiêu (chuối, yến mạch)', 'Sau tập: Protein để phục hồi (thịt, trứng, whey)', 'Đừng quên uống đủ nước'],
    keyPointsEN: ['Pre: Easy carbs (banana, oats)', 'Post: Protein for recovery (meat, eggs, whey)', 'Don\'t forget to hydrate'],
    tags: ['workout', 'fitness', 'macros']
  },
  {
    id: 'g10',
    category: 'habits',
    titleVI: 'Kiểm soát phần ăn (Portion Control)',
    titleEN: 'Portion Control',
    summaryVI: 'Cách ước lượng phần ăn bằng tay mà không cần cân tiểu ly.',
    summaryEN: 'How to estimate portions using your hands without a scale.',
    contentVI: `
      <p>Nếu bạn không có thời gian cân đo từng gram thức ăn, hãy sử dụng chính bàn tay của mình để ước lượng:</p>
      <ul>
        <li><strong>Lòng bàn tay:</strong> Lượng Protein (thịt, cá) cho mỗi bữa.</li>
        <li><strong>Nắm đấm:</strong> Lượng Rau củ quả.</li>
        <li><strong>Khum bàn tay:</strong> Lượng Tinh bột (cơm, khoai).</li>
        <li><strong>Ngón cái:</strong> Lượng Chất béo (dầu ăn, bơ đậu phộng).</li>
      </ul>
      <p>Đây là phương pháp cực kỳ tiện lợi khi đi ăn ngoài hoặc ở căn tin trường đại học!</p>
    `,
    contentEN: `
      <p>If you don't have time to weigh every gram of food, use your own hands to estimate portions:</p>
      <ul>
        <li><strong>Palm:</strong> Amount of Protein (meat, fish) per meal.</li>
        <li><strong>Fist:</strong> Amount of Vegetables.</li>
        <li><strong>Cupped hand:</strong> Amount of Carbohydrates (rice, potatoes).</li>
        <li><strong>Thumb:</strong> Amount of Fats (oil, peanut butter).</li>
      </ul>
      <p>This is an incredibly convenient method when eating out or at the university cafeteria!</p>
    `,
    keyPointsVI: ['Lòng bàn tay = Protein', 'Khum bàn tay = Tinh bột', 'Nắm đấm = Rau xanh'],
    keyPointsEN: ['Palm = Protein', 'Cupped hand = Carbs', 'Fist = Vegetables'],
    tags: ['portion', 'habits', 'tips']
  }
];
