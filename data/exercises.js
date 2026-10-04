/**
 * NutriCare – data/exercises.js
 * ============================================================
 * Exercise database with 15 exercises.
 *
 * Each exercise has:
 *  - id          : unique identifier
 *  - nameKey     : translation key for the exercise name (exercises.ex<id>.name)
 *  - category    : 'Cardio' | 'Strength' | 'Flexibility' | 'Full Body'
 *  - goal        : array of matching goals
 *  - difficulty  : 'Beginner' | 'Intermediate' | 'Advanced'
 *  - intensity   : 'Low' | 'Moderate' | 'High'
 *  - muscleGroups: array of primary muscles targeted
 *  - equipment   : required equipment (or 'None')
 *  - met         : Metabolic Equivalent of Task value (used for calorie calc)
 *  - emoji       : visual icon for the card
 *
 * Translated fields (name, description, instructions) live in
 * data/translations.js under the  exercises  namespace.
 *
 * ⚠️ DISCLAIMER: All calorie estimates are for general educational
 *    purposes only and are not medical advice. Actual expenditure
 *    varies between individuals.
 * ============================================================
 */

const exercisesData = [
  {
    id: 1,
    category:    'Cardio',
    goal:        ['lose-weight', 'stay-active'],
    difficulty:  'Beginner',
    intensity:   'Low',
    muscleGroups:['Legs', 'Core'],
    equipment:   'None',
    met:         3.5,
    emoji:       '🚶'
  },
  {
    id: 2,
    category:    'Cardio',
    goal:        ['lose-weight', 'stay-active', 'improve-fitness'],
    difficulty:  'Beginner',
    intensity:   'Moderate',
    muscleGroups:['Legs', 'Glutes', 'Core'],
    equipment:   'None',
    met:         4.3,
    emoji:       '🚶‍♂️'
  },
  {
    id: 3,
    category:    'Cardio',
    goal:        ['lose-weight', 'improve-fitness'],
    difficulty:  'Intermediate',
    intensity:   'Moderate',
    muscleGroups:['Legs', 'Glutes', 'Core', 'Lungs'],
    equipment:   'None',
    met:         7.0,
    emoji:       '🏃'
  },
  {
    id: 4,
    category:    'Cardio',
    goal:        ['lose-weight', 'improve-fitness'],
    difficulty:  'Advanced',
    intensity:   'High',
    muscleGroups:['Legs', 'Glutes', 'Core', 'Cardiovascular'],
    equipment:   'None',
    met:         11.0,
    emoji:       '🏃‍♂️'
  },
  {
    id: 5,
    category:    'Cardio',
    goal:        ['lose-weight', 'improve-fitness', 'stay-active'],
    difficulty:  'Beginner',
    intensity:   'Moderate',
    muscleGroups:['Legs', 'Glutes', 'Cardiovascular'],
    equipment:   'Bicycle',
    met:         8.0,
    emoji:       '🚴'
  },
  {
    id: 6,
    category:    'Full Body',
    goal:        ['lose-weight', 'improve-fitness', 'build-muscle'],
    difficulty:  'Intermediate',
    intensity:   'High',
    muscleGroups:['Full Body', 'Cardiovascular'],
    equipment:   'Pool',
    met:         8.0,
    emoji:       '🏊'
  },
  {
    id: 7,
    category:    'Cardio',
    goal:        ['lose-weight', 'improve-fitness'],
    difficulty:  'Intermediate',
    intensity:   'High',
    muscleGroups:['Legs', 'Calves', 'Core', 'Shoulders'],
    equipment:   'Jump Rope',
    met:         11.8,
    emoji:       '⚡'
  },
  {
    id: 8,
    category:    'Strength',
    goal:        ['build-muscle', 'lose-weight', 'improve-fitness'],
    difficulty:  'Beginner',
    intensity:   'Moderate',
    muscleGroups:['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    equipment:   'None',
    met:         5.0,
    emoji:       '🏋️'
  },
  {
    id: 9,
    category:    'Strength',
    goal:        ['build-muscle', 'improve-fitness'],
    difficulty:  'Beginner',
    intensity:   'Moderate',
    muscleGroups:['Chest', 'Shoulders', 'Triceps', 'Core'],
    equipment:   'None',
    met:         4.0,
    emoji:       '💪'
  },
  {
    id: 10,
    category:    'Strength',
    goal:        ['build-muscle', 'lose-weight'],
    difficulty:  'Beginner',
    intensity:   'Moderate',
    muscleGroups:['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    equipment:   'None',
    met:         4.5,
    emoji:       '🦵'
  },
  {
    id: 11,
    category:    'Strength',
    goal:        ['build-muscle', 'improve-fitness', 'stay-active'],
    difficulty:  'Beginner',
    intensity:   'Low',
    muscleGroups:['Core', 'Shoulders', 'Back'],
    equipment:   'None',
    met:         3.5,
    emoji:       '🧘'
  },
  {
    id: 12,
    category:    'Full Body',
    goal:        ['lose-weight', 'improve-fitness', 'build-muscle'],
    difficulty:  'Intermediate',
    intensity:   'High',
    muscleGroups:['Core', 'Shoulders', 'Legs', 'Cardiovascular'],
    equipment:   'None',
    met:         8.0,
    emoji:       '⛰️'
  },
  {
    id: 13,
    category:    'Full Body',
    goal:        ['lose-weight', 'improve-fitness'],
    difficulty:  'Advanced',
    intensity:   'High',
    muscleGroups:['Full Body', 'Cardiovascular'],
    equipment:   'None',
    met:         10.0,
    emoji:       '🔥'
  },
  {
    id: 14,
    category:    'Strength',
    goal:        ['build-muscle', 'lose-weight', 'stay-active'],
    difficulty:  'Beginner',
    intensity:   'Low',
    muscleGroups:['Glutes', 'Hamstrings', 'Lower Back'],
    equipment:   'None',
    met:         3.5,
    emoji:       '🍑'
  },
  {
    id: 15,
    category:    'Strength',
    goal:        ['build-muscle', 'improve-fitness'],
    difficulty:  'Intermediate',
    intensity:   'Moderate',
    muscleGroups:['Back', 'Biceps', 'Core'],
    equipment:   'Dumbbells',
    met:         5.0,
    emoji:       '🏋️‍♀️'
  }
];
