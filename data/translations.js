/**
 * NutriCare – data/translations.js
 * ============================================================
 * Bilingual translation dictionary: Vietnamese (vi) & English (en)
 *
 * HOW IT WORKS:
 *  1. Each key maps to a string in both languages.
 *  2. HTML elements carry a  data-i18n="some.key"  attribute.
 *  3. main.js reads the saved language, looks up each key here,
 *     and sets the element's textContent to the correct string.
 *
 * HOW TO ADD A NEW PAGE:
 *  1. Add a new namespace object, e.g.  calculator: { ... }
 *  2. Put data-i18n="calculator.someKey" on your HTML elements.
 *  3. The same applyTranslations() call in main.js handles it.
 * ============================================================
 */

const translations = {

  /* ----------------------------------------------------------
     VIETNAMESE – Default language
  ---------------------------------------------------------- */
  vi: {

    /* Page meta (used by JS to update <title> and <html lang>) */
    meta: {
      lang:        'vi',
      title:       'NutriCare – Trợ lý dinh dưỡng cá nhân',
      description: 'NutriCare – Khám phá thông tin dinh dưỡng cá nhân hóa, những bữa ăn lành mạnh và hướng dẫn thực tế.'
    },

    /* Navigation */
    nav: {
      home:          'Trang chủ',
      dashboard:     'Tổng quan',
      calculator:    'Tính toán',
      foods:         'Thực phẩm',
      meals:         'Món ăn',
      guide:         'Cẩm nang dinh dưỡng',
      myMeals:       'Món ăn của tôi',
      exercises:     'Bài tập',
      grocery:       'Mua sắm',
      order:         'Đặt món',
      langLabel:     'Chọn ngôn ngữ'
    },

    /* Hero section */
    hero: {
      badge:       '🌿 Trợ lý dinh dưỡng cá nhân',
      title:       'Ăn uống tốt hơn.\nSống khỏe hơn.',
      subtitle:    'Khám phá thông tin dinh dưỡng cá nhân hóa, những bữa ăn lành mạnh và hướng dẫn thực tế phù hợp với lối sống của bạn.',
      btnCalculate:'Tính nhu cầu dinh dưỡng',
      btnMeals:    'Khám phá món ăn',
      trustFree:   '✅ Miễn phí sử dụng',
      trustNoAcct: '✅ Không cần tài khoản',
      trustScience:'✅ Dựa trên cơ sở khoa học'
    },

    /* Hero nutrition card */
    card: {
      label:          'Dinh dưỡng hôm nay',
      date:           'Tổng quan dinh dưỡng trong ngày',
      badge:          'Đang theo dõi tốt',
      caloriesTitle:  'Lượng calo đã tiêu thụ',
      caloriesGoal:   'Mục tiêu: 2.000 kcal',
      caloriesLeft:   '580 kcal còn lại',
      protein:        'Chất đạm',
      carbs:          'Carbohydrate',
      fat:            'Chất béo',
      water:          'Nước',
      burned:         '🔥 Đã đốt cháy 320 kcal',
      progress:       '⚡ Tiến bộ rất tốt!'
    },

    /* Benefits / Quick Stats section */
    benefits: {
      sectionTitle:    'Tất cả trong một nơi',
      sectionSubtitle: 'NutriCare cung cấp các công cụ giúp bạn hiểu và cải thiện dinh dưỡng—đơn giản và hiệu quả.',
      bmiTitle:        'Tính chỉ số BMI',
      bmiDesc:         'Tính ngay chỉ số khối cơ thể và hiểu ý nghĩa của nó với mục tiêu sức khỏe của bạn.',
      caloriesTitle:   'Calo hàng ngày',
      caloriesDesc:    'Tính tổng nhu cầu năng lượng hàng ngày (TDEE) và đặt mục tiêu calo phù hợp.',
      mealTitle:       'Lên kế hoạch bữa ăn',
      mealDesc:        'Duyệt qua các bữa ăn lành mạnh được chọn lọc, phù hợp với ngân sách calo và sở thích của bạn.',
      waterTitle:      'Theo dõi nước uống',
      waterDesc:       'Theo dõi lượng nước uống hàng ngày và nhận nhắc nhở để giữ cơ thể đủ nước suốt ngày.'
    },

    /* How NutriCare Helps section */
    steps: {
      sectionTitle:    'NutriCare giúp bạn thế nào?',
      sectionSubtitle: 'Bốn bước đơn giản để có lối sống lành mạnh và cân bằng hơn.',
      step1Title:      'Cho chúng tôi biết về bạn',
      step1Desc:       'Nhập tuổi, cân nặng, chiều cao và mức độ hoạt động để cá nhân hóa hành trình dinh dưỡng.',
      step2Title:      'Hiểu nhu cầu dinh dưỡng của bạn',
      step2Desc:       'Nhận ngay mục tiêu calo hàng ngày và tỷ lệ đa lượng dinh dưỡng được khuyến nghị.',
      step3Title:      'Khám phá các món ăn phù hợp',
      step3Desc:       'Duyệt thư viện thực phẩm phong phú và tìm bữa ăn phù hợp với ngân sách calo và khẩu vị.',
      step4Title:      'Tự nấu hoặc đặt món',
      step4Desc:       'Chọn tự nấu theo công thức tại nhà hoặc tìm nhà hàng gần bạn phục vụ bữa ăn hoàn hảo đó.'
    },

    /* Cook or Order section */
    cookOrder: {
      sectionTitle:    'Tự nấu hay đặt món?',
      sectionSubtitle: 'Khám phá bữa ăn lành mạnh và chọn xem bạn muốn tự chế biến hay tìm nhà hàng gần đó.',
      cookTitle:       'Tự nấu tại nhà',
      cookDesc:        'Tự chuẩn bị bữa ăn từ đầu với những hướng dẫn đơn giản, dễ thực hiện.',
      cookFeat1:       'Danh sách nguyên liệu đầy đủ',
      cookFeat2:       'Hướng dẫn nấu ăn từng bước',
      cookFeat3:       'Kiểm soát hoàn toàn những gì bạn ăn',
      cookBtn:         'Xem công thức',
      orderTitle:      'Đặt món gần đây',
      orderDesc:       'Tìm các nhà hàng gần bạn phục vụ bữa ăn lành mạnh bạn chọn.',
      orderFeat1:      'Tìm nhà hàng gần đây',
      orderFeat2:      'So sánh khoảng cách và lựa chọn',
      orderFeat3:      'Nhanh chóng và tiện lợi',
      orderBtn:        'Tìm nhà hàng',
      comingSoon:      'Sắp ra mắt'
    },

    /* Featured Meal section */
    meal: {
      sectionTitle:    'Món ăn nổi bật hôm nay',
      sectionSubtitle: 'Một bữa ăn ngon, cân bằng để khởi động hành trình dinh dưỡng của bạn.',
      tag:             'Giàu Đạm',
      name:            'Cơm gà teriyaki',
      time:            '⏱ 25 phút',
      description:     'Gà nướng mềm được phủ sốt teriyaki ngọt thanh, ăn kèm cơm gạo thơm và rau củ tươi.',
      labelCalories:   'Calo',
      labelProtein:    'Đạm',
      labelCarbs:      'Carbs',
      labelFat:        'Chất béo',
      viewBtn:         'Xem món ăn →'
    },

    /* CTA section */
    cta: {
      title:  'Bắt đầu xây dựng thói quen lành mạnh hơn ngay hôm nay.',
      desc:   'Hành trình dinh dưỡng của bạn bắt đầu từ một bước. Dùng NutriCare để tìm nhu cầu calo lý tưởng và khám phá những bữa ăn bạn thực sự thích.',
      btn:    'Bắt đầu ngay →'
    },

    /* Footer */
    footer: {
      desc:           'Trợ lý dinh dưỡng cá nhân của bạn. Giúp bạn ăn thông minh hơn, sống tốt hơn và xây dựng thói quen lành mạnh lâu dài.',
      navTitle:       'Điều hướng',
      toolsTitle:     'Công cụ',
      linkHome:       'Trang chủ',
      linkCalculator: 'Tính toán',
      linkFoods:      'Thực phẩm',
      linkMeals:      'Món ăn',
      linkGuide:      'Cẩm nang dinh dưỡng',
      linkBmi:        'Tính BMI',
      linkCalorie:    'Tính Calo',
      linkPlanner:    'Lên kế hoạch bữa ăn',
      copy:           '© 2026 NutriCare. Đã bảo lưu mọi quyền. Xây dựng cho mục đích học tập.'
    },

    /* ── Exercise Center ── */
    exercises: {
      /* Page meta */
      metaTitle:       'NutriCare – Trung tâm bài tập',
      metaDesc:        'Khám phá các bài tập phù hợp với mục tiêu sức khỏe của bạn và ước tính lượng calo tiêu hao.',

      /* Hero */
      heroBadge:       '💪 Trung tâm bài tập',
      heroTitle:       'Vận động tốt hơn.\nSống khỏe hơn.',
      heroSubtitle:    'Khám phá các bài tập phù hợp với mục tiêu, lối sống và mức độ thể chất của bạn.',
      heroCta:         'Khám phá bài tập',

      /* Filter section */
      filterTitle:     'Tìm bài tập',
      searchPlaceholder: 'Tìm kiếm bài tập...',
      filterGoal:      'Mục tiêu',
      filterCategory:  'Loại bài tập',
      filterDifficulty:'Độ khó',
      filterAll:       'Tất cả',
      filterLoseWeight:'Giảm cân',
      filterBuildMuscle:'Tăng cơ',
      filterFitness:   'Cải thiện thể lực',
      filterActive:    'Duy trì vận động',
      filterCardio:    'Cardio',
      filterStrength:  'Sức mạnh',
      filterFlexibility:'Linh hoạt',
      filterFullBody:  'Toàn thân',
      filterBeginner:  'Mới bắt đầu',
      filterIntermediate:'Trung bình',
      filterAdvanced:  'Nâng cao',
      noResults:       'Không tìm thấy bài tập nào phù hợp.',

      /* Exercise card */
      viewDetails:     'Xem chi tiết',
      estCalories:     'Ước tính',
      perMinLabel:     'kcal/phút (60 kg)',

      /* Detail modal */
      modalHow:        'Cách thực hiện',
      modalMuscles:    'Cơ bắp mục tiêu',
      modalEquipment:  'Dụng cụ',
      modalDifficulty: 'Độ khó',
      modalDuration:   'Thời gian khuyến nghị',
      modalCalBurn:    'Ước tính calo tiêu hao',
      modalSafety:     '⚠️ Lưu ý an toàn: Đây là thông tin giáo dục tổng quát, không phải tư vấn y tế. Hãy tham khảo chuyên gia sức khỏe trước khi bắt đầu chương trình tập luyện mới.',
      modalClose:      'Đóng',
      modalMin:        'phút',
      modalCalPerMin:  'kcal/phút',

      /* Calorie burn calculator */
      calcTitle:       'Tính calories tiêu hao',
      calcSubtitle:    'Ước tính lượng calo bạn đốt cháy dựa trên cân nặng, bài tập và thời gian.',
      calcWeight:      'Cân nặng (kg)',
      calcWeightPh:    'Nhập cân nặng...',
      calcExercise:    'Bài tập',
      calcSelectEx:    'Chọn bài tập',
      calcDuration:    'Thời gian (phút)',
      calcDurationPh:  'Nhập số phút...',
      calcBtn:         'Tính toán',
      calcResult:      'Ước tính lượng calo tiêu hao:',
      calcDisclaimer:  'Đây là mức ước tính. Lượng năng lượng tiêu hao thực tế có thể khác nhau tùy từng người.',
      calcErrorWeight: 'Vui lòng nhập cân nặng hợp lệ (1–300 kg).',
      calcErrorDuration:'Vui lòng nhập thời gian hợp lệ (1–600 phút).',
      calcErrorExercise:'Vui lòng chọn một bài tập.',

      /* Goal-based recommendation */
      recTitle:        'Tìm bài tập theo mục tiêu',
      recSubtitle:     'Chọn mục tiêu của bạn để xem các bài tập phù hợp.',
      recLoseWeight:   '🔥 Giảm cân',
      recBuildMuscle:  '💪 Tăng cơ',
      recFitness:      '❤️ Cải thiện thể lực',
      recActive:       '🚶 Duy trì vận động',

      /* Weekly planner */
      planTitle:       'Kế hoạch tập luyện hàng tuần',
      planSubtitle:    'Tổ chức lịch tập luyện của bạn trong tuần.',
      planMon:         'Thứ Hai',
      planTue:         'Thứ Ba',
      planWed:         'Thứ Tư',
      planThu:         'Thứ Năm',
      planFri:         'Thứ Sáu',
      planSat:         'Thứ Bảy',
      planSun:         'Chủ Nhật',
      planReset:       'Đặt lại kế hoạch',
      planSaved:       '✅ Kế hoạch đã được lưu!',
      planEmpty:       'Chưa có bài tập nào được thêm.',
      planAdd:         'Thêm bài tập',
      planRemove:      'Xóa',
      planSelectEx:    'Chọn bài tập...',
      planSelectDur:   'Chọn thời gian...',
      planMin:         'phút',
      planSaveBtn:     'Lưu kế hoạch',

      /* Nutrition connection */
      nutTitle:        'Dinh dưỡng + Vận động',
      nutSubtitle:     'Dinh dưỡng và vận động có mối liên hệ với nhau. Sử dụng công cụ tính nhu cầu dinh dưỡng của NutriCare để hiểu nhu cầu năng lượng hằng ngày, sau đó khám phá các hoạt động thể chất phù hợp.',
      nutBtn:          'Tính nhu cầu dinh dưỡng',

      /* Difficulty labels */
      diffBeginner:    'Mới bắt đầu',
      diffIntermediate:'Trung bình',
      diffAdvanced:    'Nâng cao',

      /* Category labels */
      catCardio:       'Cardio',
      catStrength:     'Sức mạnh',
      catFlexibility:  'Linh hoạt',
      catFullBody:     'Toàn thân',

      /* Muscle group labels */
      muscleLegs:         'Chân',
      muscleGlutes:       'Mông',
      muscleCore:         'Cơ lõi',
      muscleChest:        'Ngực',
      muscleShoulders:    'Vai',
      muscleTriceps:      'Cơ tam đầu',
      muscleBack:         'Lưng',
      muscleBiceps:       'Cơ nhị đầu',
      muscleQuadriceps:   'Đùi trước',
      muscleHamstrings:   'Đùi sau',
      muscleCalves:       'Bắp chân',
      muscleLungs:        'Phổi',
      muscleCardiovascular:'Tim mạch',
      muscleLowerBack:    'Lưng dưới',
      muscleFullBody:     'Toàn thân',

      /* Exercise names */
      ex1Name:  'Đi bộ',
      ex2Name:  'Đi bộ nhanh',
      ex3Name:  'Chạy bộ nhẹ',
      ex4Name:  'Chạy bộ',
      ex5Name:  'Đạp xe',
      ex6Name:  'Bơi lội',
      ex7Name:  'Nhảy dây',
      ex8Name:  'Squat',
      ex9Name:  'Chống đẩy',
      ex10Name: 'Lunge',
      ex11Name: 'Plank',
      ex12Name: 'Mountain Climbers',
      ex13Name: 'Burpees',
      ex14Name: 'Glute Bridge',
      ex15Name: 'Dumbbell Row',

      /* Exercise short descriptions */
      ex1Desc:  'Bài tập nhẹ nhàng, dễ thực hiện, phù hợp với mọi lứa tuổi và mức độ thể lực.',
      ex2Desc:  'Tăng cường nhịp tim và đốt cháy calo nhiều hơn đi bộ thông thường.',
      ex3Desc:  'Tốc độ chạy nhẹ giúp cải thiện sức bền tim mạch.',
      ex4Desc:  'Bài tập cardio cường độ cao đốt cháy nhiều calo trong thời gian ngắn.',
      ex5Desc:  'Bài tập cardio thân thiện với khớp, phù hợp với nhiều mục tiêu.',
      ex6Desc:  'Bài tập toàn thân nhẹ nhàng với khớp, rất hiệu quả cho tim mạch.',
      ex7Desc:  'Bài tập cardio cường độ cao, đốt cháy nhiều calo và cải thiện sự phối hợp.',
      ex8Desc:  'Bài tập sức mạnh cơ bản cho đùi, mông và cơ lõi.',
      ex9Desc:  'Bài tập kinh điển giúp tăng cường sức mạnh phần thân trên.',
      ex10Desc: 'Bài tập đơn chân tăng cường cơ đùi, mông và cải thiện thăng bằng.',
      ex11Desc: 'Bài tập tĩnh giúp tăng cường cơ lõi và cải thiện sự ổn định.',
      ex12Desc: 'Bài tập cardio cường độ cao kết hợp sức mạnh cơ lõi.',
      ex13Desc: 'Bài tập toàn thân cường độ cao kết hợp squat, chống đẩy và nhảy.',
      ex14Desc: 'Bài tập đơn giản tập trung vào mông và đùi sau.',
      ex15Desc: 'Bài tập lưng với tạ đơn giúp tăng cường cơ lưng và tay.',

      /* Exercise step-by-step instructions */
      ex1Steps:  '1. Mặc giày thoải mái và đứng thẳng.|2. Bước đi với tốc độ thoải mái, tay vung tự nhiên.|3. Giữ lưng thẳng và nhìn về phía trước.|4. Hít thở đều và thư giãn vai.',
      ex2Steps:  '1. Đứng thẳng, chuẩn bị tư thế.|2. Bước đi nhanh với cánh tay vung nhẹ nhàng.|3. Giữ nhịp thở ổn định.|4. Duy trì tốc độ đủ để cảm thấy hơi thở nhanh hơn bình thường.',
      ex3Steps:  '1. Khởi động bằng 5 phút đi bộ.|2. Tăng dần tốc độ lên nhịp chạy nhẹ.|3. Giữ tư thế thẳng, đặt chân nhẹ nhàng.|4. Hít thở theo nhịp chạy.|5. Hạ dần tốc độ khi kết thúc.',
      ex4Steps:  '1. Khởi động kỹ trước khi chạy.|2. Chạy với tốc độ bạn có thể duy trì.|3. Giữ thân người hơi ngả về phía trước.|4. Đặt chân ở giữa bàn chân, không quá gót.|5. Hít thở đều và nhịp nhàng.',
      ex5Steps:  '1. Điều chỉnh yên xe phù hợp với chiều cao.|2. Đặt tay thoải mái trên tay lái.|3. Đạp với nhịp đều, không quá gắng sức.|4. Giữ lưng thẳng, không cúi quá nhiều.|5. Tăng dần cường độ nếu muốn thách thức hơn.',
      ex6Steps:  '1. Khởi động bằng bơi chậm 2-3 vòng.|2. Chọn kiểu bơi phù hợp (tự do, bướm, ếch).|3. Duy trì kỹ thuật thở đúng cho từng kiểu bơi.|4. Nghỉ ngắn giữa các vòng nếu cần.|5. Hạ dần cường độ ở những vòng cuối.',
      ex7Steps:  '1. Giữ tay lái ở hai bên hông, cổ tay linh hoạt.|2. Nhảy nhẹ nhàng trên đầu ngón chân.|3. Giữ khuỷu tay gần người khi quay dây.|4. Nhìn thẳng về phía trước.|5. Bắt đầu chậm rồi tăng dần tốc độ.',
      ex8Steps:  '1. Đứng rộng bằng vai, mũi chân hơi hướng ra ngoài.|2. Hạ người xuống như đang ngồi ghế.|3. Giữ ngực thẳng và gối không vượt quá mũi chân.|4. Đẩy gót chân xuống để đứng dậy.|5. Giữ cơ bụng căng trong suốt động tác.',
      ex9Steps:  '1. Nằm sấp, tay rộng hơn vai một chút.|2. Giữ người thẳng từ đầu đến gót chân.|3. Hạ ngực xuống gần sàn bằng cách gập khuỷu.|4. Đẩy người lên về vị trí ban đầu.|5. Thở ra khi đẩy lên, hít vào khi hạ xuống.',
      ex10Steps: '1. Đứng thẳng, tay trên hông hoặc tay trước.|2. Bước một chân lớn về phía trước.|3. Hạ gối sau gần chạm sàn.|4. Gối trước không vượt quá mũi chân.|5. Đẩy chân trước để trở về vị trí ban đầu.',
      ex11Steps: '1. Nằm sấp, chống trên khuỷu tay và ngón chân.|2. Giữ người thành một đường thẳng.|3. Siết cơ bụng và giữ mông không nhô lên.|4. Hít thở đều, không nín thở.|5. Giữ tư thế càng lâu càng tốt.',
      ex12Steps: '1. Bắt đầu ở tư thế plank cao (tay thẳng).|2. Nhanh chóng kéo đầu gối phải về ngực.|3. Trả về và kéo đầu gối trái về ngực.|4. Thực hiện luân phiên nhanh như chạy tại chỗ.|5. Giữ hông không nhô lên và cơ bụng căng.',
      ex13Steps: '1. Đứng thẳng, sau đó squat xuống và đặt tay xuống sàn.|2. Bật chân ra sau về tư thế chống đẩy.|3. Thực hiện một lần chống đẩy.|4. Bật chân về tư thế squat.|5. Bật nhảy lên cao, tay chạm trên đầu.',
      ex14Steps: '1. Nằm ngửa, gối gập, bàn chân phẳng trên sàn.|2. Đặt tay xuôi theo người, lòng bàn tay úp.|3. Siết cơ mông và đẩy hông lên cao.|4. Giữ vai và bàn chân chạm sàn.|5. Hạ hông xuống chậm rãi về vị trí ban đầu.',
      ex15Steps: '1. Cầm tạ đơn ở cả hai tay hoặc một tay.|2. Đứng rộng bằng vai, hơi khuỵu gối.|3. Cúi người về phía trước khoảng 45 độ.|4. Kéo tạ lên phía hông, khuỷu tay sát người.|5. Hạ tạ xuống chậm rãi về vị trí ban đầu.',

      /* Recommended duration & calorie context per exercise */
      ex1Duration:  '20–60 phút',
      ex2Duration:  '20–45 phút',
      ex3Duration:  '20–40 phút',
      ex4Duration:  '20–60 phút',
      ex5Duration:  '30–60 phút',
      ex6Duration:  '20–45 phút',
      ex7Duration:  '10–20 phút',
      ex8Duration:  '15–30 phút',
      ex9Duration:  '10–20 phút',
      ex10Duration: '15–30 phút',
      ex11Duration: '10–20 phút (tổng thời gian giữ)',
      ex12Duration: '10–20 phút',
      ex13Duration: '10–20 phút',
      ex14Duration: '15–25 phút',
      ex15Duration: '15–30 phút'
    },

    /* ── Dashboard ── */
    dashboard: {
      metaTitle: 'NutriCare – Tổng quan sức khỏe',
      metaDesc: 'Theo dõi dinh dưỡng, lượng nước, vận động và tiến độ của bạn tại một nơi.',
      heroTitle: 'Dashboard sức khỏe hằng ngày',
      heroSubtitle: 'Theo dõi dinh dưỡng, lượng nước, vận động và tiến độ của bạn tại một nơi.',
      
      dailyNutrition: 'Dinh dưỡng hôm nay',
      caloriesConsumed: 'Calo đã tiêu thụ',
      caloriesTarget: 'Mục tiêu',
      caloriesRemaining: 'Còn lại',
      updateNutrition: 'Cập nhật dinh dưỡng',
      
      waterIntake: 'Lượng nước',
      waterAdd250: '+250 ml',
      waterAdd500: '+500 ml',
      waterAdd750: '+750 ml',
      waterReset: 'Làm lại',
      
      weightProgress: 'Tiến độ cân nặng',
      weightStart: 'Bắt đầu',
      weightCurrent: 'Hiện tại',
      weightGoal: 'Mục tiêu',
      weightLost: 'Đã giảm',
      weightRemaining: 'Còn lại',
      weightAddRecord: 'Ghi cân nặng mới',
      weightHistoryTitle: 'Lịch sử cân nặng',
      weightClearAll: 'Xóa lịch sử',
      weightChartEmpty: 'Hãy thêm ít nhất hai lần ghi cân nặng để xem tiến độ.',
      
      todayActivity: 'Hoạt động hôm nay',
      activityCalories: 'Calo tiêu hao',
      activityTime: 'Thời gian',
      activityCount: 'Số bài tập',
      activityEmpty: 'Chưa có hoạt động nào được ghi nhận hôm nay.',
      exploreExercises: 'Khám phá bài tập',
      
      yourGoal: 'Mục tiêu của bạn',
      goalSetup: 'Thiết lập nhu cầu dinh dưỡng',
      
      quickActions: 'Thao tác nhanh',
      actionCalc: 'Tính dinh dưỡng',
      actionWater: 'Ghi lượng nước',
      actionWeight: 'Ghi cân nặng',
      actionExercise: 'Khám phá bài tập',

      summaryCalories: 'Calo',
      summaryProtein: 'Đạm',
      summaryWater: 'Nước',
      summaryExercise: 'Vận động',

      energyBalance: 'Cân bằng năng lượng',
      bmrLabel: 'Calo cơ bản (BMR)',
      tdeeLabel: 'Calo tiêu hao (TDEE)',
      targetPercent: 'mục tiêu',
      exceededTarget: 'Vượt mục tiêu!',
      noData: 'Chưa có dữ liệu',

      /* Goal Recommendations */
      goalSectionTitle: 'Mục tiêu của bạn',
      goalLose: 'Bạn muốn giảm {diff} kg',
      goalGain: 'Bạn muốn tăng {diff} kg',
      goalMaintain: 'Mục tiêu duy trì cân nặng',
      goalArrow: '→',
      recSectionTitle: 'Đề xuất cho bạn',
      recExerciseTitle: '🏃 Bài tập đề xuất',
      recMealTitle: '🍽️ Món ăn đề xuất',
      recViewExercise: 'Xem bài tập',
      recViewMeals: 'Xem kế hoạch',
      recCookThis: 'Nấu món này',
      recViewAllExercises: 'Khám phá tất cả bài tập',
      recViewMealPlanner: 'Mở kế hoạch bữa ăn',
      recGroceryBtn: 'Danh sách mua sắm',
      recLogWeight: 'Ghi cân nặng',
      recSetGoal: 'Đặt mục tiêu',
      goalNoWeight: 'Thêm cân nặng hiện tại để nhận đề xuất cá nhân hóa.',
      goalNoTarget: 'Bạn chưa đặt mục tiêu cân nặng.',
      goalInputPlaceholder: 'Mục tiêu (kg)',
      goalSaveBtn: 'Lưu mục tiêu',
      goalSetBtn: 'Đặt mục tiêu',
      goalTitleLose: '🎯 Giảm cân',
      goalTitleGain: '🎯 Tăng cân',
      goalTitleMaintain: '🎯 Duy trì cân nặng',
      goalTargetText: 'Mục tiêu: {target} kg',
      recCalPerServing: 'kcal/phần',
      trendTitle: 'Tiến độ 7 ngày',
      trendCalories: 'Calories',
      trendProtein: 'Protein',
      trendWater: 'Water',
      trendWeight: 'Weight',
      trendEmpty: 'Chưa đủ dữ liệu để hiển thị xu hướng. Hãy tiếp tục theo dõi trong những ngày tới.',
      statusOver: 'Vượt mục tiêu'
    },

    /* ── Calculator ── */
    calculator: {
      /* Page meta */
      metaTitle:       'NutriCare – Tính toán dinh dưỡng',
      metaDesc:        'Tính chỉ số BMI, BMR, TDEE và nhu cầu calo hàng ngày dựa trên thông số cá nhân của bạn.',

      /* Hero */
      heroBadge:       '⚖️ Tính toán dinh dưỡng',
      heroTitle:       'Hiểu nhu cầu\ndinh dưỡng của bạn.',
      heroSubtitle:    'Tính chỉ số BMI, nhu cầu calo và phân bổ đa lượng dinh dưỡng cá nhân hóa chỉ trong vài giây.',

      /* Form panel */
      formTitle:       'Thông tin cá nhân',
      formSubtitle:    'Nhập thông tin của bạn để nhận kết quả cá nhân hóa.',

      /* Labels */
      labelGender:     'Giới tính',
      labelAge:        'Tuổi',
      labelHeight:     'Chiều cao',
      labelWeight:     'Cân nặng',
      labelActivity:   'Mức độ vận động',
      labelGoal:       'Mục tiêu',
      unitYears:       'tuổi',
      unitCm:          'cm',
      unitKg:          'kg',

      /* Gender options */
      genderMale:      '♂ Nam',
      genderFemale:    '♀ Nữ',

      /* Placeholder */
      phAge:           'vd. 25',
      phHeight:        'vd. 170',
      phWeight:        'vd. 65',

      /* Activity levels */
      actSelect:       'Chọn mức độ vận động',
      actSedentary:    'Ít vận động (Ngồi nhiều, không tập)',
      actLight:        'Vận động nhẹ (Tập 1–3 ngày/tuần)',
      actModerate:     'Vận động vừa (Tập 3–5 ngày/tuần)',
      actVery:         'Vận động nhiều (Tập 6–7 ngày/tuần)',
      actExtreme:      'Vận động cực cao (Tập nặng 2 lần/ngày)',

      /* Goals */
      goalSelect:      'Chọn mục tiêu',
      goalLose:        'Giảm cân',
      goalMaintain:    'Duy trì cân nặng',
      goalGain:        'Tăng cân / Tăng cơ',

      /* Button */
      calcBtn:         'Tính toán →',

      /* Disclaimer */
      disclaimer:      '⚠️ Kết quả chỉ mang tính ước tính. Không phải tư vấn y tế.',

      /* Empty state */
      emptyTitle:      'Kết quả sẽ hiển thị ở đây',
      emptyText:       'Hãy điền thông tin bên trái và nhấn Tính toán để xem chỉ số BMI, BMR, TDEE và mục tiêu calo của bạn.',

      /* BMI results */
      bmiTitle:        'Chỉ số BMI',
      bmiUnderweight:  'Thiếu cân',
      bmiNormal:       'Bình thường',
      bmiOverweight:   'Thừa cân',
      bmiObese:        'Béo phì',
      bmiScaleUnder:   'Thiếu cân',
      bmiScaleNormal:  'Bình thường',
      bmiScaleOver:    'Thừa cân',
      bmiScaleObese:   'Béo phì',

      /* Stat cards */
      statBmr:         'BMR',
      statBmrLabel:    'Calo cơ bản/ngày',
      statTdee:        'TDEE',
      statTdeeLabel:   'Calo tiêu hao/ngày',
      statCalTarget:   'Mục tiêu',
      statCalLabel:    'Calo mục tiêu/ngày',

      /* Calorie target card */
      calTargetTitle:  '🎯 Mục tiêu calo hàng ngày',
      calGoalLose:     'Giảm cân (-300–500 kcal)',
      calGoalMaintain: 'Duy trì cân nặng',
      calGoalGain:     'Tăng cân (+300–500 kcal)',
      calAdjMin:       'Tối thiểu',
      calAdjMax:       'Tối đa',

      /* Macros card */
      macrosTitle:     '🥗 Phân bổ đa lượng dinh dưỡng',
      macrosSubtitle:  'Ước tính phân bổ dựa trên mục tiêu của bạn. Đây chỉ là tham khảo.',
      macroProtein:    'Chất đạm',
      macroCarbs:      'Carbohydrate',
      macroFat:        'Chất béo',

      /* Saved notice */
      savedNotice:     'Đã lưu vào Dashboard & Kế hoạch bữa ăn.',

      /* Validation */
      errGender:       'Vui lòng chọn giới tính.',
      errAge:          'Tuổi phải từ 10 đến 100.',
      errHeight:       'Chiều cao phải từ 50 đến 250 cm.',
      errWeight:       'Cân nặng phải từ 20 đến 300 kg.',
      errActivity:     'Vui lòng chọn mức độ vận động.',
      errGoal:         'Vui lòng chọn mục tiêu.',

      /* Info section */
      infoTitle:       'Các chỉ số được sử dụng',
      infoSubtitle:    'Hiểu rõ hơn về các chỉ số dinh dưỡng quan trọng.',
      infoBmiTitle:    'BMI là gì?',
      infoBmiText:     'Chỉ số khối cơ thể (BMI) là tỷ lệ giữa cân nặng và chiều cao. Dùng để phân loại tình trạng cân nặng theo tiêu chuẩn WHO.',
      infoBmrTitle:    'BMR là gì?',
      infoBmrText:     'Tỷ lệ trao đổi chất cơ bản (BMR) là lượng calo cơ thể tiêu hao khi nghỉ ngơi hoàn toàn. Tính theo phương trình Mifflin-St Jeor.',
      infoTdeeTitle:   'TDEE là gì?',
      infoTdeeText:    'Tổng lượng năng lượng tiêu hao hàng ngày (TDEE) bằng BMR nhân với hệ số hoạt động. Đây là lượng calo cần thiết để duy trì cân nặng hiện tại.'
    },

    /* ── Foods ── */
    foods: {
      metaTitle:       'NutriCare – Thực phẩm',
      metaDesc:        'Khám phá cơ sở dữ liệu thực phẩm, tìm hiểu thành phần dinh dưỡng.',
      heroBadge:       '🍎 Dữ liệu Thực phẩm',
      heroTitle:       'Khám phá\nDinh dưỡng.',
      heroSubtitle:    'Tra cứu thành phần dinh dưỡng, tính toán khẩu phần và lưu lại các thực phẩm yêu thích của bạn.',
      searchPlaceholder: 'Tìm kiếm thực phẩm...',
      filterCat:       'Tất cả danh mục',
      filterHighProtein: 'Giàu đạm',
      filterLowCal:    'Ít calo',
      filterHighFiber: 'Nhiều chất xơ',
      noResults:       'Không tìm thấy thực phẩm nào phù hợp.',
      viewDetails:     'Xem chi tiết',
      per100g:         'trên 100g',
      modalNutrPer100g: 'Thành phần dinh dưỡng (trên 100g)',
      modalServingCalc: 'Tính toán khẩu phần',
      modalEnterGrams: 'Nhập số gram...',
      btnCalc:         'Tính',
      catGrains:       'Ngũ cốc',
      catProtein:      'Đạm',
      catDairy:        'Sữa',
      catFruits:       'Trái cây',
      catVegetables:   'Rau củ',
      catNutsSeeds:    'Các loại hạt',
      catLegumes:      'Các loại đậu',
      tabAll:          'Tất cả',
      tabFavs:         'Yêu thích'
    },

    /* ── Meals ── */
    meals: {
      metaTitle:       'NutriCare – Kế hoạch bữa ăn',
      metaDesc:        'Tạo kế hoạch bữa ăn thông minh dựa trên mục tiêu dinh dưỡng cá nhân của bạn.',
      heroBadge:       '📅 Kế hoạch Bữa ăn Thông minh',
      heroTitle:       'Thực đơn\ncủa bạn.',
      heroSubtitle:    'Tự động tạo kế hoạch hoặc tùy chỉnh từng bữa ăn để đạt mục tiêu dinh dưỡng mỗi ngày.',
      noGoalTitle:     'Chưa thiết lập mục tiêu',
      noGoalText:      'Bạn chưa thiết lập mục tiêu dinh dưỡng. Hãy sử dụng Máy tính dinh dưỡng trước để có kết quả chính xác nhất.',
      btnGoCalc:       'Đi tới Máy tính',
      btnUpdateGoal:   'Cập nhật mục tiêu từ Calculator',
      btnGenerate:     'Tạo kế hoạch',
      btnReset:        'Đặt lại kế hoạch',
      confirmReset:    'Bạn có chắc chắn muốn xóa toàn bộ thực đơn hôm nay?',
      summaryTitle:    'Tổng quan Dinh dưỡng',
      lblTarget:       'Mục tiêu',
      lblActual:       'Thực tế',
      lblRemain:       'Còn lại',
      mealBreakfast:   'Bữa sáng',
      mealLunch:       'Bữa trưa',
      mealDinner:      'Bữa tối',
      mealSnack:       'Bữa phụ',
      btnAddFood:      'Thêm Thực phẩm',
      btnChange:       'Thay đổi',
      btnRemove:       'Xóa',
      totalMealKcal:   'Tổng calo:',
      emptyMeal:       'Chưa có thực phẩm nào. Hãy thêm để đạt mục tiêu.',
      modalTitle:      'Chọn Thực phẩm',
      modalSearchPh:   'Tìm kiếm...',
      modalGrams:      'Khối lượng (g):',
      btnSaveFood:     'Lưu',
      recTitle:        'Gợi ý Dinh dưỡng',
      recGood:         'Tuyệt vời! Bạn đang theo rất sát mục tiêu.',
      recLowCal:       'Calo đang thấp: Hãy thêm các thực phẩm giàu năng lượng.',
      recHighCal:      'Calo đang cao: Cân nhắc giảm khẩu phần hoặc chọn thực phẩm ít calo.',
      recLowPro:       'Đạm đang thấp: Hãy thêm thịt nạc, cá, trứng hoặc đậu.',
      recHighFat:      'Chất béo đang cao: Cân nhắc chọn các thực phẩm ít béo hơn.',
      recLowCarb:      'Carbs đang thấp: Hãy thêm ngũ cốc hoặc khoai lang.'
    },

    /* ── Cook ── */
    cook: {
      btnCook:         'Nấu món này',
      btnCookShort:    'Nấu',
      noRecipe:        'Chưa có công thức cho món này.',
      prep:            'Chuẩn bị',
      cook:            'Nấu',
      total:           'Tổng',
      servings:        'Khẩu phần',
      serving:         'phần',
      difficulty:      'Độ khó',
      easy:            'Dễ',
      medium:          'Vừa',
      hard:            'Khó',
      ingredients:     'Nguyên liệu',
      adjustServing:   'Điều chỉnh khẩu phần:',
      steps:           'Cách làm',
      viewAll:         'Xem tất cả các bước',
      viewStep:        'Từng bước',
      stepOf:          'Bước',
      prev:            'Trước',
      next:            'Tiếp theo',
      nutrition:       'Dinh dưỡng mỗi phần',
      timer:           'Hẹn giờ nấu ăn',
      timerMin:        'phút',
      timerStart:      'Bắt đầu',
      timerPause:      'Tạm dừng',
      timerResume:     'Tiếp tục',
      timerReset:      'Đặt lại',
      timerDone:       'Hết giờ!',
      btnDone:         'Đã nấu xong',
      doneTitle:       'Hoàn thành!',
      doneText:        'Bữa ăn của bạn đã sẵn sàng. Chúc bạn ngon miệng!',
      doneBtn:         'Nấu lại',
      min:             'ph'
    },

    /* ── Grocery ── */
    grocery: {
      metaTitle:       'NutriCare – Danh sách món ăn',
      metaDesc:        'Tạo và quản lý danh sách mua sắm thực phẩm dựa trên kế hoạch bữa ăn của bạn.',
      heroBadge:       '🛒 Danh sách Mua sắm',
      heroTitle:       'Danh sách\nMón ăn.',
      heroSubtitle:    'Tự động tạo từ kế hoạch bữa ăn và công thức nấu ăn. Chẹn từng món khi mua xong.',
      fromPlan:        'Từ Kế hoạch Bữa ăn',
      fromRecipe:      'Từ Công thức',
      btnImportPlan:   'Nhập từ Kế hoạch',
      btnAddRecipe:    'Chọn Công thức',
      btnAddCustom:    'Thêm thủ công',
      btnClearAll:     'Xóa tất cả',
      btnClearDone:    'Xóa đã mua',
      customPlaceholder: 'Tên sản phẩm...',
      customQty:       'Số lượng',
      customUnit:      'Đơn vị (g, ml, cái...)',
      btnSaveCustom:   'Thêm vào danh sách',
      emptyTitle:      'Danh sách trống',
      emptyText:       'Nhập từ kế hoạch bữa ăn hoặc công thức, hoặc thêm thủ công.',
      summary:         'Tóm tắt:',
      summaryTotal:    'Tổng món',
      summaryDone:     'Đã mua',
      summaryLeft:     'Còn lại',
      itemBought:      'Đã mua',
      selectRecipeTitle: 'Chọn Công thức',
      confirmClearAll: 'Bạn có chắc chắn muốn xóa toàn bộ danh sách?',
      confirmClearDone:'Xóa tất cả món đã mua khỏi danh sách?',
      noMealPlan:      'Không tìm thấy kế hoạch bữa ăn. Hãy dùng Smart Meal Planner trước.',
      importedFrom:    'Nhập từ:',
      catGrains:       'Ngũ cốc',
      catProtein:      'Đạm',
      catDairy:        'Sữa',
      catFruits:       'Trái cây',
      catVegetables:   'Rau củ',
      catNutsSeeds:    'Các loại hạt',
      catLegumes:      'Các loại đậu',
      catCustom:       'Khác'
    },

    /* ── Guide ── */
    guide: {
      metaTitle:       'NutriCare – Hướng dẫn dinh dưỡng',
      metaDesc:        'Kiến thức dinh dưỡng đơn giản để xây dựng lối sống khỏe mạnh.',
      heroBadge:       '📚 Kiến thức dinh dưỡng',
      heroTitle:       'Hướng dẫn dinh dưỡng.',
      heroSubtitle:    'Kiến thức đơn giản để xây dựng lối sống khỏe mạnh.',
      disclaimer:      '⚠️ Thông tin trong hướng dẫn chỉ nhằm mục đích giáo dục, không thay thế tư vấn y tế hoặc chuyên gia dinh dưỡng.',
      searchPh:        'Tìm kiếm bài viết...',
      filterCat:       'Chủ đề',
      filterAll:       'Tất cả',
      catBasics:       'Cơ bản',
      catMacros:       'Dinh dưỡng đa lượng',
      catHydration:    'Nước',
      catMealPlanning: 'Lập kế hoạch bữa ăn',
      catHabits:       'Thói quen lành mạnh',
      featuredTitle:   'Chủ đề nổi bật',
      btnReadMore:     'Đọc thêm',
      btnClose:        'Đóng',
      noResults:       'Không tìm thấy bài viết phù hợp.',
      ctxCalories:     'Tính toán nhu cầu calo của bạn →',
      ctxProtein:      'Khám phá thực phẩm giàu protein →',
      ctxWater:        'Theo dõi lượng nước uống →',
      ctxMeals:        'Xây dựng kế hoạch bữa ăn →'
    },

    /* ── Order ── */
    order: {
      metaTitle:       'NutriCare – Đặt món lành mạnh',
      metaDesc:        'Khám phá và đặt món ăn lành mạnh từ các nhà cung cấp mẫu.',
      heroBadge:       '🛍️ Đặt món lành mạnh',
      heroTitle:       'Đặt món\nlành mạnh.',
      heroSubtitle:    'Dữ liệu minh họa – không phải đơn hàng thực tế',
      demoDisclaimer:  '⚠️ Đây là trang minh họa. Tất cả nhà cung cấp, giá, đánh giá và thời gian giao hàng đều là dữ liệu mẫu.',
      searchPh:        'Tìm kiếm món ăn...',
      filterCat:       'Danh mục',
      filterAll:       'Tất cả',
      filterCal:       'Lọc calo',
      filterCalAll:    'Tất cả mức calo',
      filterCalLow:    'Dưới 400 kcal',
      filterCalMid:    '400–600 kcal',
      filterCalHigh:   'Trên 600 kcal',
      sortBy:          'Sắp xếp',
      sortDefault:     'Mặc định',
      sortPriceLow:    'Giá tăng dần',
      sortPriceHigh:   'Giá giảm dần',
      sortCalLow:      'Calo tăng dần',
      sortCalHigh:     'Calo giảm dần',
      filterHighPro:   'Giàu Protein',
      btnAddOrder:     'Thêm vào giỏ',
      btnViewDetail:   'Xem chi tiết',
      btnClose:        'Đóng',
      labelCal:        'Calo',
      labelProtein:    'Protein',
      labelCarbs:      'Carbs',
      labelFat:        'Chất béo',
      labelPrice:      'Giá',
      labelRating:     'Đánh giá',
      labelDelivery:   'Giao hàng',
      labelProvider:   'Nhà cung cấp (Mẫu)',
      catBalanced:     'Bữa ăn cân bằng',
      catHighProtein:  'Giàu protein',
      catLowCal:       'Ít calo',
      catSalad:        'Salad',
      catDrink:        'Đồ uống lành mạnh',
      cartTitle:       'Giỏ hàng (Demo)',
      cartEmpty:       'Chưa có món nào trong giỏ.',
      labelSubtotal:   'Tạm tính',
      labelDeliveryFee:'Phí giao hàng',
      labelTotal:      'Tổng cộng',
      btnCheckout:     'Thanh toán (Demo)',
      btnBackMeals:    'Quay lại',
      checkoutTitle:   'Xác nhập đơn hàng (Demo)',
      checkoutDisclaimer: 'Đây là tính năng mô phỏng. Không có đơn hàng hoặc thanh toán thực tế được thực hiện.',
      checkoutSummary: 'Tóm tắt đơn hàng',
      btnNewOrder:     'Đặt món mới',
      goalTitle:       'Dựa trên mục tiêu dinh dưỡng của bạn',
      goalNoGoal:      'Hãy thiết lập mục tiêu dinh dưỡng trong Máy tính.',
      goalBtnCalc:     'Đi tới Máy tính',
      goalSuggest:     'Gợi ý phù hợp với mục tiêu của bạn:',
      noResults:       'Không tìm thấy món ăn phù hợp.',
      unitMin:         'phút',
      unitVND:         '₫',
      btnOrderAt:      '🛒 Đặt hàng tại',
      msgNoExtLink:    'Chưa có liên kết đặt hàng bên ngoài'
    }
  },

  /* ----------------------------------------------------------
     ENGLISH
  ---------------------------------------------------------- */
  en: {

    /* Page meta */
    meta: {
      lang:        'en',
      title:       'NutriCare – Your Personal Nutrition Assistant',
      description: 'NutriCare – Discover personalized nutrition insights, healthy meals, and practical guidance designed around your lifestyle.'
    },

    /* Navigation */
    nav: {
      home:          'Home',
      dashboard:     'Dashboard',
      calculator:    'Calculator',
      foods:         'Foods',
      meals:         'Meals',
      guide:         'Nutrition Guide',
      myMeals:       'My Meals',
      exercises:     'Exercises',
      grocery:       'Grocery List',
      order:         'Order',
      langLabel:     'Language selection'
    },

    /* Hero section */
    hero: {
      badge:       '🌿 Personal Nutrition Assistant',
      title:       'Eat Better.\nLive Better.',
      subtitle:    'Discover personalized nutrition insights, healthy meals, and practical guidance designed around your lifestyle.',
      btnCalculate:'Calculate My Needs',
      btnMeals:    'Explore Meals',
      trustFree:   '✅ Free to use',
      trustNoAcct: '✅ No account needed',
      trustScience:'✅ Science-based'
    },

    /* Hero nutrition card */
    card: {
      label:          "Today's Nutrition",
      date:           'Your daily overview',
      badge:          'On track',
      caloriesTitle:  'Calories consumed',
      caloriesGoal:   'Goal: 2,000 kcal',
      caloriesLeft:   '580 kcal remaining',
      protein:        'Protein',
      carbs:          'Carbs',
      fat:            'Fat',
      water:          'Water',
      burned:         '🔥 320 kcal burned',
      progress:       '⚡ Great progress!'
    },

    /* Benefits / Quick Stats section */
    benefits: {
      sectionTitle:    'Everything You Need in One Place',
      sectionSubtitle: 'NutriCare gives you the tools to understand and improve your nutrition—simply and effectively.',
      bmiTitle:        'BMI Calculator',
      bmiDesc:         'Find out your Body Mass Index instantly and understand what it means for your health goals.',
      caloriesTitle:   'Daily Calories',
      caloriesDesc:    'Calculate your Total Daily Energy Expenditure (TDEE) and set realistic calorie targets.',
      mealTitle:       'Meal Planning',
      mealDesc:        'Browse curated healthy meals matched to your calorie budget, preferences and goals.',
      waterTitle:      'Hydration',
      waterDesc:       'Track your daily water intake and get reminders to stay properly hydrated throughout the day.'
    },

    /* How NutriCare Helps section */
    steps: {
      sectionTitle:    'How NutriCare Helps You',
      sectionSubtitle: 'Four simple steps to a healthier, more balanced lifestyle.',
      step1Title:      'Tell us about yourself',
      step1Desc:       'Enter your age, weight, height, and activity level to personalise your nutrition journey.',
      step2Title:      'Understand your nutrition needs',
      step2Desc:       'Get your daily calorie target and recommended macronutrient breakdown instantly.',
      step3Title:      'Discover suitable meals',
      step3Desc:       'Browse a curated food library and find meals that fit your calorie budget and taste.',
      step4Title:      'Cook or Order',
      step4Desc:       'Choose to follow a recipe at home or find a nearby restaurant serving your perfect meal.'
    },

    /* Cook or Order section */
    cookOrder: {
      sectionTitle:    'Cook it or Order it?',
      sectionSubtitle: 'Discover a healthy meal and choose whether you want to prepare it yourself or find a nearby restaurant.',
      cookTitle:       'Cook at Home',
      cookDesc:        'Prepare your meal from scratch with simple, easy-to-follow instructions.',
      cookFeat1:       'Get a full ingredient list',
      cookFeat2:       'Step-by-step cooking instructions',
      cookFeat3:       "Know exactly what you're eating",
      cookBtn:         'View Recipes',
      orderTitle:      'Order Nearby',
      orderDesc:       'Find restaurants near you that serve your chosen healthy meal.',
      orderFeat1:      'Find nearby restaurants',
      orderFeat2:      'Compare distance and options',
      orderFeat3:      'Quick and convenient',
      orderBtn:        'Find Restaurants',
      comingSoon:      'Coming Soon'
    },

    /* Featured Meal section */
    meal: {
      sectionTitle:    'Featured Meal of the Day',
      sectionSubtitle: 'A delicious, balanced meal to get you started on your nutrition journey.',
      tag:             'High Protein',
      name:            'Chicken Teriyaki Rice Bowl',
      time:            '⏱ 25 min',
      description:     'Tender grilled chicken glazed in a sweet teriyaki sauce, served over steamed jasmine rice with fresh vegetables.',
      labelCalories:   'Calories',
      labelProtein:    'Protein',
      labelCarbs:      'Carbs',
      labelFat:        'Fat',
      viewBtn:         'View Meal →'
    },

    /* CTA section */
    cta: {
      title:  'Start building healthier habits today.',
      desc:   "Your nutrition journey begins with one step. Use NutriCare to find your ideal calorie needs and discover meals you'll actually enjoy.",
      btn:    'Get Started →'
    },

    /* Footer */
    footer: {
      desc:           'Your personal nutrition assistant. Helping you eat smarter, live better, and build lasting healthy habits.',
      navTitle:       'Navigation',
      toolsTitle:     'Tools',
      linkHome:       'Home',
      linkCalculator: 'Calculator',
      linkFoods:      'Foods',
      linkMeals:      'Meals',
      linkGuide:      'Nutrition Guide',
      linkBmi:        'BMI Calculator',
      linkCalorie:    'Calorie Calculator',
      linkPlanner:    'Meal Planner',
      copy:           '© 2026 NutriCare. All rights reserved. Built for educational purposes.'
    },

    /* ── Exercise Center ── */
    exercises: {
      /* Page meta */
      metaTitle:       'NutriCare – Exercise Center',
      metaDesc:        'Discover exercises suited to your health goals and estimate calories burned.',

      /* Hero */
      heroBadge:       '💪 Exercise Center',
      heroTitle:       'Move Better.\nFeel Better.',
      heroSubtitle:    'Discover exercises that fit your goals, lifestyle, and fitness level.',
      heroCta:         'Explore Exercises',

      /* Filter section */
      filterTitle:     'Find Exercises',
      searchPlaceholder: 'Search exercises...',
      filterGoal:      'Goal',
      filterCategory:  'Category',
      filterDifficulty:'Difficulty',
      filterAll:       'All',
      filterLoseWeight:'Lose Weight',
      filterBuildMuscle:'Build Muscle',
      filterFitness:   'Improve Fitness',
      filterActive:    'Stay Active',
      filterCardio:    'Cardio',
      filterStrength:  'Strength',
      filterFlexibility:'Flexibility',
      filterFullBody:  'Full Body',
      filterBeginner:  'Beginner',
      filterIntermediate:'Intermediate',
      filterAdvanced:  'Advanced',
      noResults:       'No exercises found matching your filters.',

      /* Exercise card */
      viewDetails:     'View Details',
      estCalories:     'Est.',
      perMinLabel:     'kcal/min (60 kg)',

      /* Detail modal */
      modalHow:        'How to perform',
      modalMuscles:    'Target muscles',
      modalEquipment:  'Equipment',
      modalDifficulty: 'Difficulty',
      modalDuration:   'Recommended duration',
      modalCalBurn:    'Estimated calorie burn',
      modalSafety:     '⚠️ Safety note: This is general educational information, not medical advice. Please consult a healthcare professional before starting a new exercise programme.',
      modalClose:      'Close',
      modalMin:        'min',
      modalCalPerMin:  'kcal/min',

      /* Calorie burn calculator */
      calcTitle:       'Calorie Burn Calculator',
      calcSubtitle:    'Estimate the calories you burn based on your weight, exercise, and duration.',
      calcWeight:      'Weight (kg)',
      calcWeightPh:    'Enter weight...',
      calcExercise:    'Exercise',
      calcSelectEx:    'Select an exercise',
      calcDuration:    'Duration (minutes)',
      calcDurationPh:  'Enter minutes...',
      calcBtn:         'Calculate',
      calcResult:      'Estimated calories burned:',
      calcDisclaimer:  'This is an estimate. Actual energy expenditure varies between individuals.',
      calcErrorWeight: 'Please enter a valid weight (1–300 kg).',
      calcErrorDuration:'Please enter a valid duration (1–600 minutes).',
      calcErrorExercise:'Please select an exercise.',

      /* Goal-based recommendation */
      recTitle:        'Find Exercises for Your Goal',
      recSubtitle:     'Select your goal to see suitable exercises.',
      recLoseWeight:   '🔥 Lose Weight',
      recBuildMuscle:  '💪 Build Muscle',
      recFitness:      '❤️ Improve Fitness',
      recActive:       '🚶 Stay Active',

      /* Weekly planner */
      planTitle:       'Weekly Exercise Plan',
      planSubtitle:    'Organise your exercise schedule for the week.',
      planMon:         'Monday',
      planTue:         'Tuesday',
      planWed:         'Wednesday',
      planThu:         'Thursday',
      planFri:         'Friday',
      planSat:         'Saturday',
      planSun:         'Sunday',
      planReset:       'Reset Plan',
      planSaved:       '✅ Plan saved!',
      planEmpty:       'No exercises added yet.',
      planAdd:         'Add Exercise',
      planRemove:      'Remove',
      planSelectEx:    'Select exercise...',
      planSelectDur:   'Select duration...',
      planMin:         'min',
      planSaveBtn:     'Save Plan',

      /* Nutrition connection */
      nutTitle:        'Nutrition + Exercise',
      nutSubtitle:     'Your nutrition and activity work together. Use NutriCare\'s nutrition calculator to understand your daily energy needs, then use the Exercise Center to explore physical activities.',
      nutBtn:          'Calculate My Nutrition Needs',

      /* Difficulty labels */
      diffBeginner:    'Beginner',
      diffIntermediate:'Intermediate',
      diffAdvanced:    'Advanced',

      /* Category labels */
      catCardio:       'Cardio',
      catStrength:     'Strength',
      catFlexibility:  'Flexibility',
      catFullBody:     'Full Body',

      /* Muscle group labels */
      muscleLegs:          'Legs',
      muscleGlutes:        'Glutes',
      muscleCore:          'Core',
      muscleChest:         'Chest',
      muscleShoulders:     'Shoulders',
      muscleTriceps:       'Triceps',
      muscleBack:          'Back',
      muscleBiceps:        'Biceps',
      muscleQuadriceps:    'Quadriceps',
      muscleHamstrings:    'Hamstrings',
      muscleCalves:        'Calves',
      muscleLungs:         'Lungs',
      muscleCardiovascular:'Cardiovascular',
      muscleLowerBack:     'Lower Back',
      muscleFullBody:      'Full Body',

      /* Exercise names */
      ex1Name:  'Walking',
      ex2Name:  'Brisk Walking',
      ex3Name:  'Jogging',
      ex4Name:  'Running',
      ex5Name:  'Cycling',
      ex6Name:  'Swimming',
      ex7Name:  'Jump Rope',
      ex8Name:  'Squats',
      ex9Name:  'Push-ups',
      ex10Name: 'Lunges',
      ex11Name: 'Plank',
      ex12Name: 'Mountain Climbers',
      ex13Name: 'Burpees',
      ex14Name: 'Glute Bridge',
      ex15Name: 'Dumbbell Row',

      /* Exercise short descriptions */
      ex1Desc:  'A gentle, accessible exercise suitable for all ages and fitness levels.',
      ex2Desc:  'Elevates heart rate and burns more calories than regular walking.',
      ex3Desc:  'A light running pace that improves cardiovascular endurance.',
      ex4Desc:  'A high-intensity cardio exercise that burns significant calories in a short time.',
      ex5Desc:  'A joint-friendly cardio exercise suitable for many fitness goals.',
      ex6Desc:  'A full-body, low-impact exercise that is excellent for cardiovascular health.',
      ex7Desc:  'A high-intensity cardio exercise that burns many calories and improves coordination.',
      ex8Desc:  'A fundamental strength exercise targeting the thighs, glutes, and core.',
      ex9Desc:  'A classic exercise that builds upper body strength and core stability.',
      ex10Desc: 'A single-leg exercise that strengthens the thighs, glutes, and improves balance.',
      ex11Desc: 'A static exercise that strengthens the core and improves stability.',
      ex12Desc: 'A high-intensity cardio exercise that also engages core strength.',
      ex13Desc: 'A high-intensity full-body exercise combining a squat, push-up, and jump.',
      ex14Desc: 'A simple exercise that targets the glutes and hamstrings.',
      ex15Desc: 'A dumbbell exercise that strengthens the back and arms.',

      /* Exercise step-by-step instructions */
      ex1Steps:  '1. Wear comfortable shoes and stand tall.|2. Walk at a comfortable pace with a natural arm swing.|3. Keep your back straight and look ahead.|4. Breathe steadily and relax your shoulders.',
      ex2Steps:  '1. Stand tall and prepare your posture.|2. Walk quickly with a gentle arm swing.|3. Maintain a steady breathing rhythm.|4. Keep a pace where you feel slightly breathless.',
      ex3Steps:  '1. Warm up with 5 minutes of walking.|2. Gradually increase your speed to a light jog.|3. Keep your posture upright and land lightly.|4. Breathe in rhythm with your stride.|5. Slow down gradually at the end.',
      ex4Steps:  '1. Warm up thoroughly before running.|2. Run at a pace you can sustain.|3. Lean your body slightly forward.|4. Land on the mid-foot, not the heel.|5. Breathe steadily and rhythmically.',
      ex5Steps:  '1. Adjust the seat to your height.|2. Place your hands comfortably on the handlebars.|3. Pedal at a steady rhythm without overexertion.|4. Keep your back straight.|5. Gradually increase intensity if desired.',
      ex6Steps:  '1. Warm up with 2-3 slow laps.|2. Choose a stroke that suits you (freestyle, breaststroke).|3. Maintain proper breathing technique for your chosen stroke.|4. Rest briefly between laps if needed.|5. Cool down with slower laps at the end.',
      ex7Steps:  '1. Hold the handles at your sides with flexible wrists.|2. Jump lightly on the balls of your feet.|3. Keep your elbows close to your body while turning the rope.|4. Look straight ahead.|5. Start slowly and increase speed gradually.',
      ex8Steps:  '1. Stand shoulder-width apart, toes slightly turned out.|2. Lower your body as if sitting in a chair.|3. Keep your chest up and knees behind your toes.|4. Push through your heels to stand up.|5. Keep your core engaged throughout.',
      ex9Steps:  '1. Lie face down with hands slightly wider than shoulder-width.|2. Keep your body in a straight line from head to heels.|3. Lower your chest toward the floor by bending your elbows.|4. Push back up to the starting position.|5. Exhale as you push up, inhale as you lower down.',
      ex10Steps: '1. Stand tall with hands on hips or extended in front.|2. Step one foot forward in a large stride.|3. Lower your back knee toward the floor.|4. Keep your front knee above your ankle, not over your toes.|5. Push off your front foot to return to the start.',
      ex11Steps: '1. Lie face down and prop up on your forearms and toes.|2. Keep your body in a straight line.|3. Engage your core and keep your hips level.|4. Breathe steadily; do not hold your breath.|5. Hold the position for as long as possible with good form.',
      ex12Steps: '1. Start in a high plank position (arms straight).|2. Quickly drive your right knee toward your chest.|3. Return and drive your left knee toward your chest.|4. Alternate rapidly as if running in place.|5. Keep your hips level and core tight.',
      ex13Steps: '1. Stand upright, then squat down and place your hands on the floor.|2. Jump your feet back into a push-up position.|3. Perform one push-up.|4. Jump your feet back to the squat position.|5. Explode upward with a jump, arms overhead.',
      ex14Steps: '1. Lie on your back with knees bent and feet flat on the floor.|2. Place your arms alongside your body, palms facing down.|3. Squeeze your glutes and lift your hips toward the ceiling.|4. Keep your shoulders and feet on the floor.|5. Lower your hips slowly back to the starting position.',
      ex15Steps: '1. Hold a dumbbell in each hand or one hand.|2. Stand shoulder-width apart with a slight knee bend.|3. Hinge forward about 45 degrees.|4. Pull the dumbbell(s) up toward your hips, elbows close to your body.|5. Lower the weight slowly back to the starting position.',

      /* Recommended duration per exercise */
      ex1Duration:  '20–60 min',
      ex2Duration:  '20–45 min',
      ex3Duration:  '20–40 min',
      ex4Duration:  '20–60 min',
      ex5Duration:  '30–60 min',
      ex6Duration:  '20–45 min',
      ex7Duration:  '10–20 min',
      ex8Duration:  '15–30 min',
      ex9Duration:  '10–20 min',
      ex10Duration: '15–30 min',
      ex11Duration: '10–20 min (total hold)',
      ex12Duration: '10–20 min',
      ex13Duration: '10–20 min',
      ex14Duration: '15–25 min',
      ex15Duration: '15–30 min'
    },

    /* ── Dashboard ── */
    dashboard: {
      metaTitle: 'NutriCare – Health Dashboard',
      metaDesc: 'Track your nutrition, hydration, exercise and progress in one place.',
      heroTitle: 'Your Daily Health Dashboard',
      heroSubtitle: 'Track your nutrition, hydration, exercise and progress in one place.',
      
      dailyNutrition: "Today's Nutrition",
      caloriesConsumed: 'Calories consumed',
      caloriesTarget: 'Target',
      caloriesRemaining: 'Remaining',
      updateNutrition: 'Update Nutrition',
      
      waterIntake: 'Water Intake',
      waterAdd250: '+250 ml',
      waterAdd500: '+500 ml',
      waterAdd750: '+750 ml',
      waterReset: 'Reset',
      
      weightProgress: 'Weight Progress',
      weightStart: 'Starting',
      weightCurrent: 'Current',
      weightGoal: 'Goal',
      weightLost: 'Lost',
      weightRemaining: 'Remaining',
      weightAddRecord: 'Add Record',
      weightHistoryTitle: 'Weight History',
      weightClearAll: 'Clear History',
      weightChartEmpty: 'Add at least two weight records to see your progress.',
      
      todayActivity: "Today's Activity",
      activityCalories: 'Calories burned',
      activityTime: 'Time',
      activityCount: 'Activities',
      activityEmpty: 'No exercise recorded today.',
      exploreExercises: 'Explore Exercises',
      
      yourGoal: 'Your Goal',
      goalSetup: 'Set Up My Nutrition',
      
      quickActions: 'Quick Actions',
      actionCalc: 'Calculate Nutrition',
      actionWater: 'Log Water',
      actionWeight: 'Log Weight',
      actionExercise: 'Explore Exercises',

      summaryCalories: 'Calories',
      summaryProtein: 'Protein',
      summaryWater: 'Water',
      summaryExercise: 'Exercise',

      energyBalance: 'Energy Balance',
      bmrLabel: 'Base Calories (BMR)',
      tdeeLabel: 'Total Expenditure (TDEE)',
      targetPercent: 'of target',
      exceededTarget: 'Target exceeded!',
      noData: 'No data yet',

      /* Goal Recommendations */
      goalSectionTitle: 'Your Goal',
      goalLose: 'You want to lose {diff} kg',
      goalGain: 'You want to gain {diff} kg',
      goalMaintain: 'Maintain current weight',
      goalArrow: '→',
      recSectionTitle: 'Recommendations for You',
      recExerciseTitle: '🏃 Exercise Recommendations',
      recMealTitle: '🍽️ Meal Recommendations',
      recViewExercise: 'View Exercise',
      recViewMeals: 'View Plan',
      recCookThis: 'Cook This',
      recViewAllExercises: 'Explore All Exercises',
      recViewMealPlanner: 'Open Meal Planner',
      recGroceryBtn: 'Grocery List',
      recLogWeight: 'Log Weight',
      recSetGoal: 'Set Goal',
      goalNoWeight: 'Add your current weight to get personalized recommendations.',
      goalNoTarget: 'You have not set a weight goal.',
      goalInputPlaceholder: 'Goal (kg)',
      goalSaveBtn: 'Save Goal',
      goalSetBtn: 'Set Goal',
      goalTitleLose: '🎯 Lose Weight',
      goalTitleGain: '🎯 Gain Weight',
      goalTitleMaintain: '🎯 Maintain Weight',
      goalTargetText: 'Target: {target} kg',
      recCalPerServing: 'kcal/serving',
      trendTitle: '7-Day Trend',
      trendCalories: 'Calories',
      trendProtein: 'Protein',
      trendWater: 'Water',
      trendWeight: 'Weight',
      trendEmpty: 'Not enough data to display a trend. Keep tracking in the coming days.',
      statusOver: 'Over target'
    },

    /* ── Calculator ── */
    calculator: {
      /* Page meta */
      metaTitle:       'NutriCare – Nutrition Calculator',
      metaDesc:        'Calculate your BMI, BMR, TDEE and personalized daily calorie needs.',

      /* Hero */
      heroBadge:       '⚖️ Nutrition Calculator',
      heroTitle:       'Understand Your\nNutrition Needs.',
      heroSubtitle:    'Calculate your personalized BMI, calorie needs, and macronutrient targets in seconds.',

      /* Form panel */
      formTitle:       'Your Details',
      formSubtitle:    'Enter your information to receive personalized results.',

      /* Labels */
      labelGender:     'Gender',
      labelAge:        'Age',
      labelHeight:     'Height',
      labelWeight:     'Weight',
      labelActivity:   'Activity Level',
      labelGoal:       'Goal',
      unitYears:       'yrs',
      unitCm:          'cm',
      unitKg:          'kg',

      /* Gender options */
      genderMale:      '♂ Male',
      genderFemale:    '♀ Female',

      /* Placeholder */
      phAge:           'e.g. 25',
      phHeight:        'e.g. 170',
      phWeight:        'e.g. 65',

      /* Activity levels */
      actSelect:       'Select activity level',
      actSedentary:    'Sedentary (Little or no exercise)',
      actLight:        'Lightly Active (Exercise 1–3 days/week)',
      actModerate:     'Moderately Active (Exercise 3–5 days/week)',
      actVery:         'Very Active (Exercise 6–7 days/week)',
      actExtreme:      'Extremely Active (Very intense exercise, twice a day)',

      /* Goals */
      goalSelect:      'Select your goal',
      goalLose:        'Lose Weight',
      goalMaintain:    'Maintain Weight',
      goalGain:        'Gain Weight / Build Muscle',

      /* Button */
      calcBtn:         'Calculate →',

      /* Disclaimer */
      disclaimer:      '⚠️ Results are estimates only. Not medical advice.',

      /* Empty state */
      emptyTitle:      'Your results will appear here',
      emptyText:       'Fill in your details on the left and click Calculate to see your BMI, BMR, TDEE and calorie targets.',

      /* BMI results */
      bmiTitle:        'BMI Score',
      bmiUnderweight:  'Underweight',
      bmiNormal:       'Normal',
      bmiOverweight:   'Overweight',
      bmiObese:        'Obesity',
      bmiScaleUnder:   'Underweight',
      bmiScaleNormal:  'Normal',
      bmiScaleOver:    'Overweight',
      bmiScaleObese:   'Obesity',

      /* Stat cards */
      statBmr:         'BMR',
      statBmrLabel:    'Base calories/day',
      statTdee:        'TDEE',
      statTdeeLabel:   'Total calories/day',
      statCalTarget:   'Target',
      statCalLabel:    'Goal calories/day',

      /* Calorie target card */
      calTargetTitle:  '🎯 Daily Calorie Target',
      calGoalLose:     'Lose Weight (-300–500 kcal)',
      calGoalMaintain: 'Maintain Weight',
      calGoalGain:     'Gain Weight (+300–500 kcal)',
      calAdjMin:       'Minimum',
      calAdjMax:       'Maximum',

      /* Macros card */
      macrosTitle:     '🥗 Macronutrient Breakdown',
      macrosSubtitle:  'Estimated distribution based on your goal. For reference only.',
      macroProtein:    'Protein',
      macroCarbs:      'Carbohydrates',
      macroFat:        'Fat',

      /* Saved notice */
      savedNotice:     'Saved to Dashboard & Meal Planner.',

      /* Validation */
      errGender:       'Please select your gender.',
      errAge:          'Age must be between 10 and 100.',
      errHeight:       'Height must be between 50 and 250 cm.',
      errWeight:       'Weight must be between 20 and 300 kg.',
      errActivity:     'Please select your activity level.',
      errGoal:         'Please select your goal.',

      /* Info section */
      infoTitle:       'About These Metrics',
      infoSubtitle:    'Understand the key nutrition metrics used in your results.',
      infoBmiTitle:    'What is BMI?',
      infoBmiText:     'Body Mass Index (BMI) is a ratio of weight to height used to classify weight status according to WHO standards.',
      infoBmrTitle:    'What is BMR?',
      infoBmrText:     'Basal Metabolic Rate (BMR) is the number of calories your body burns at complete rest. Calculated using the Mifflin-St Jeor equation.',
      infoTdeeTitle:   'What is TDEE?',
      infoTdeeText:    'Total Daily Energy Expenditure (TDEE) equals your BMR multiplied by your activity factor. This is how many calories you need to maintain your current weight.'
    },

    /* ── Foods ── */
    foods: {
      metaTitle:       'NutriCare – Foods',
      metaDesc:        'Explore our food database and learn about nutrition facts.',
      heroBadge:       '🍎 Food Database',
      heroTitle:       'Discover\nNutrition.',
      heroSubtitle:    'Search nutrition facts, calculate serving sizes, and save your favorite foods.',
      searchPlaceholder: 'Search for foods...',
      filterCat:       'All Categories',
      filterHighProtein: 'High Protein',
      filterLowCal:    'Low Calorie',
      filterHighFiber: 'High Fiber',
      noResults:       'No matching foods found.',
      viewDetails:     'View Details',
      per100g:         'per 100g',
      modalNutrPer100g: 'Nutrition Facts (per 100g)',
      modalServingCalc: 'Serving Calculator',
      modalEnterGrams: 'Enter grams...',
      btnCalc:         'Calculate',
      catGrains:       'Grains',
      catProtein:      'Protein',
      catDairy:        'Dairy',
      catFruits:       'Fruits',
      catVegetables:   'Vegetables',
      catNutsSeeds:    'Nuts & Seeds',
      catLegumes:      'Legumes',
      tabAll:          'All Foods',
      tabFavs:         'Favorites'
    },

    /* ── Meals ── */
    meals: {
      metaTitle:       'NutriCare – Meal Planner',
      metaDesc:        'Create a smart meal plan based on your personal nutrition goals.',
      heroBadge:       '📅 Smart Meal Planner',
      heroTitle:       'Your Daily\nMenu.',
      heroSubtitle:    'Auto-generate a plan or customize each meal to hit your daily nutrition targets.',
      noGoalTitle:     'No Goals Set',
      noGoalText:      'You haven\'t set your nutrition goals yet. Please use the Nutrition Calculator first for accurate results.',
      btnGoCalc:       'Go to Calculator',
      btnUpdateGoal:   'Update goals from Calculator',
      btnGenerate:     'Generate Plan',
      btnReset:        'Reset Plan',
      confirmReset:    'Are you sure you want to clear today\'s entire menu?',
      summaryTitle:    'Daily Nutrition Summary',
      lblTarget:       'Target',
      lblActual:       'Actual',
      lblRemain:       'Remaining',
      mealBreakfast:   'Breakfast',
      mealLunch:       'Lunch',
      mealDinner:      'Dinner',
      mealSnack:       'Snack',
      btnAddFood:      'Add Food',
      btnChange:       'Change',
      btnRemove:       'Remove',
      totalMealKcal:   'Meal Total:',
      emptyMeal:       'No foods added yet. Add some to reach your goals.',
      modalTitle:      'Select Food',
      modalSearchPh:   'Search...',
      modalGrams:      'Amount (g):',
      btnSaveFood:     'Save',
      recTitle:        'Nutrition Insights',
      recGood:         'Great job! You are very close to your goals.',
      recLowCal:       'Calories are low: Consider adding calorie-dense foods.',
      recHighCal:      'Calories are high: Consider reducing portions or choosing lower-calorie foods.',
      recLowPro:       'Protein is low: Consider adding lean meat, fish, eggs, or legumes.',
      recHighFat:      'Fat is high: Consider choosing lower-fat alternatives.',
      recLowCarb:      'Carbs are low: Consider adding grains or sweet potatoes.'
    },

    /* ── Cook ── */
    cook: {
      btnCook:         'Cook this meal',
      btnCookShort:    'Cook',
      noRecipe:        'No recipe is available for this food yet.',
      prep:            'Prep',
      cook:            'Cook',
      total:           'Total',
      servings:        'Servings',
      serving:         'serving',
      difficulty:      'Difficulty',
      easy:            'Easy',
      medium:          'Medium',
      hard:            'Hard',
      ingredients:     'Ingredients',
      adjustServing:   'Adjust servings:',
      steps:           'Instructions',
      viewAll:         'View All Steps',
      viewStep:        'Step by Step',
      stepOf:          'Step',
      prev:            'Previous',
      next:            'Next',
      nutrition:       'Nutrition per Serving',
      timer:           'Cooking Timer',
      timerMin:        'min',
      timerStart:      'Start',
      timerPause:      'Pause',
      timerResume:     'Resume',
      timerReset:      'Reset',
      timerDone:       'Time\'s Up!',
      btnDone:         'Finished Cooking',
      doneTitle:       'Well Done!',
      doneText:        'Your meal is ready. Enjoy your food!',
      doneBtn:         'Cook Again',
      min:             'min'
    },

    /* ── Grocery ── */
    grocery: {
      metaTitle:       'NutriCare – Grocery List',
      metaDesc:        'Create and manage your grocery shopping list based on your meal plan.',
      heroBadge:       '🛒 Grocery List',
      heroTitle:       'Your\nShopping List.',
      heroSubtitle:    'Auto-generated from your meal plan and recipes. Check off items as you shop.',
      fromPlan:        'From Meal Plan',
      fromRecipe:      'From Recipe',
      btnImportPlan:   'Import from Plan',
      btnAddRecipe:    'Add from Recipe',
      btnAddCustom:    'Add Custom Item',
      btnClearAll:     'Clear All',
      btnClearDone:    'Clear Bought',
      customPlaceholder: 'Item name...',
      customQty:       'Qty',
      customUnit:      'Unit (g, ml, pcs...)',
      btnSaveCustom:   'Add to List',
      emptyTitle:      'Your list is empty',
      emptyText:       'Import from your meal plan or recipes, or add items manually.',
      summary:         'Summary:',
      summaryTotal:    'Total items',
      summaryDone:     'Bought',
      summaryLeft:     'Remaining',
      itemBought:      'Bought',
      selectRecipeTitle: 'Select a Recipe',
      confirmClearAll: 'Are you sure you want to clear the entire list?',
      confirmClearDone:'Remove all bought items from the list?',
      noMealPlan:      'No meal plan found. Please use the Smart Meal Planner first.',
      importedFrom:    'Imported from:',
      catGrains:       'Grains',
      catProtein:      'Protein',
      catDairy:        'Dairy',
      catFruits:       'Fruits',
      catVegetables:   'Vegetables',
      catNutsSeeds:    'Nuts & Seeds',
      catLegumes:      'Legumes',
      catCustom:       'Other'
    },

    /* ── Guide ── */
    guide: {
      metaTitle:       'NutriCare – Nutrition Guide',
      metaDesc:        'Simple nutrition knowledge for building healthier habits.',
      heroBadge:       '📚 Nutrition Knowledge',
      heroTitle:       'Nutrition Guide.',
      heroSubtitle:    'Simple nutrition knowledge for building healthier habits.',
      disclaimer:      '⚠️ Information in this guide is for educational purposes only and does not replace medical or professional nutrition advice.',
      searchPh:        'Search articles...',
      filterCat:       'Topic',
      filterAll:       'All',
      catBasics:       'Basics',
      catMacros:       'Macros',
      catHydration:    'Hydration',
      catMealPlanning: 'Meal Planning',
      catHabits:       'Healthy Habits',
      featuredTitle:   'Featured Topics',
      btnReadMore:     'Read More',
      btnClose:        'Close',
      noResults:       'No articles found matching your filters.',
      ctxCalories:     'Calculate your calorie needs →',
      ctxProtein:      'Explore high-protein foods →',
      ctxWater:        'Track your water intake →',
      ctxMeals:        'Build your meal plan →'
    },

    /* ── Order ── */
    order: {
      metaTitle:       'NutriCare – Order Healthy Food',
      metaDesc:        'Explore and order healthy meals from sample providers.',
      heroBadge:       '🛍️ Order Healthy Food',
      heroTitle:       'Order\nHealthy Food.',
      heroSubtitle:    'Demo data – not a real order',
      demoDisclaimer:  '⚠️ This is a demo page. All providers, prices, ratings and delivery times are sample data.',
      searchPh:        'Search meals...',
      filterCat:       'Category',
      filterAll:       'All',
      filterCal:       'Calories',
      filterCalAll:    'All calories',
      filterCalLow:    'Under 400 kcal',
      filterCalMid:    '400–600 kcal',
      filterCalHigh:   'Over 600 kcal',
      sortBy:          'Sort by',
      sortDefault:     'Default',
      sortPriceLow:    'Price: Low to High',
      sortPriceHigh:   'Price: High to Low',
      sortCalLow:      'Calories: Low to High',
      sortCalHigh:     'Calories: High to Low',
      filterHighPro:   'High Protein',
      btnAddOrder:     'Add to Cart',
      btnViewDetail:   'View Details',
      btnClose:        'Close',
      labelCal:        'Calories',
      labelProtein:    'Protein',
      labelCarbs:      'Carbs',
      labelFat:        'Fat',
      labelPrice:      'Price',
      labelRating:     'Rating',
      labelDelivery:   'Delivery',
      labelProvider:   'Provider (Sample)',
      catBalanced:     'Balanced Meal',
      catHighProtein:  'High Protein',
      catLowCal:       'Low Calorie',
      catSalad:        'Salad',
      catDrink:        'Healthy Drink',
      cartTitle:       'Cart (Demo)',
      cartEmpty:       'Your cart is empty.',
      labelSubtotal:   'Subtotal',
      labelDeliveryFee:'Delivery',
      labelTotal:      'Total',
      btnCheckout:     'Checkout (Demo)',
      btnBackMeals:    'Back to Meals',
      checkoutTitle:   'Order Confirmation (Demo)',
      checkoutDisclaimer: 'This is a demo feature. No real order or payment has been processed.',
      checkoutSummary: 'Order Summary',
      btnNewOrder:     'Place New Order',
      goalTitle:       'Based on your nutrition goal',
      goalNoGoal:      'Set your nutrition goal in Calculator.',
      goalBtnCalc:     'Go to Calculator',
      goalSuggest:     'Meals matching your goal:',
      noResults:       'No meals found matching your filters.',
      unitMin:         'min',
      unitVND:         '₫',
      btnOrderAt:      '🛒 Order at',
      msgNoExtLink:    'No external order link available'
    }
  }
};
