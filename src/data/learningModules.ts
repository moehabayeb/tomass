export interface LearningPrompt {
  id: string;
  text: string;
  sampleAnswers: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prompts: LearningPrompt[];
  completed?: boolean;
}

export const learningModules: LearningModule[] = [
  // BEGINNER LEVEL
  {
    id: 'daily-life',
    title: 'Daily Life',
    description: 'Talk about your everyday activities and routines',
    level: 'beginner',
    prompts: [
      {
        id: 'daily-routine',
        text: 'Describe your typical morning routine.',
        sampleAnswers: [
          'I wake up at 7 AM, brush my teeth, and have breakfast.',
          'My morning starts with coffee and checking my phone.',
          'I usually exercise before getting ready for work.'
        ]
      },
      {
        id: 'weekend-plans',
        text: 'What do you like to do on weekends?',
        sampleAnswers: [
          'I enjoy sleeping in and watching movies.',
          'I like to meet friends and go shopping.',
          'I usually clean my house and cook special meals.'
        ]
      },
      {
        id: 'favorite-hobby',
        text: 'Tell me about your favorite hobby.',
        sampleAnswers: [
          'I love reading books, especially mystery novels.',
          'I enjoy playing guitar and learning new songs.',
          'I like gardening and growing vegetables.'
        ]
      },
      {
        id: 'daily-transport',
        text: 'How do you usually get to work or school?',
        sampleAnswers: [
          'I take the bus every morning at 8 AM.',
          'I drive my car because it\'s faster.',
          'I walk because I live very close.'
        ]
      },
      {
        id: 'evening-routine',
        text: 'What do you do to relax after a long day?',
        sampleAnswers: [
          'I watch TV shows and have dinner.',
          'I take a hot bath and read a book.',
          'I call my family and talk about my day.'
        ]
      }
    ]
  },
  {
    id: 'greetings-introductions',
    title: 'Greetings & Introductions',
    description: 'Learn to introduce yourself and greet others confidently',
    level: 'beginner',
    prompts: [
      {
        id: 'self-introduction',
        text: 'Introduce yourself to someone new.',
        sampleAnswers: [
          'Hi, I\'m Maria. I\'m from Spain and I work as a teacher.',
          'Hello, my name is John. Nice to meet you!',
          'Hi there! I\'m Sarah. I\'m studying English here.'
        ]
      },
      {
        id: 'small-talk-weather',
        text: 'Make small talk about the weather.',
        sampleAnswers: [
          'It\'s such a beautiful day today, isn\'t it?',
          'The weather has been really cold lately.',
          'I hope it doesn\'t rain this weekend.'
        ]
      },
      {
        id: 'asking-about-work',
        text: 'Ask someone about their job politely.',
        sampleAnswers: [
          'What do you do for work?',
          'Do you enjoy your job?',
          'How long have you been working there?'
        ]
      },
      {
        id: 'saying-goodbye',
        text: 'Say goodbye in different situations.',
        sampleAnswers: [
          'It was nice meeting you. See you later!',
          'I have to go now. Have a great day!',
          'Thanks for the chat. Take care!'
        ]
      }
    ]
  },
  {
    id: 'food-drink',
    title: 'Food & Drink',
    description: 'Express your food preferences and dining experiences',
    level: 'beginner',
    prompts: [
      {
        id: 'favorite-food',
        text: 'What\'s your favorite food and why?',
        sampleAnswers: [
          'I love pizza because it\'s delicious and easy to eat.',
          'My favorite food is sushi. It\'s healthy and fresh.',
          'I really enjoy pasta with tomato sauce.'
        ]
      },
      {
        id: 'cooking-experience',
        text: 'Do you like to cook? Describe a dish you make.',
        sampleAnswers: [
          'I love cooking! I make great fried rice with vegetables.',
          'I\'m not a good cook, but I can make simple sandwiches.',
          'I enjoy baking cakes and cookies for my family.'
        ]
      },
      {
        id: 'restaurant-experience',
        text: 'Describe your last restaurant experience.',
        sampleAnswers: [
          'Last week I went to an Italian restaurant. The food was amazing!',
          'I had dinner at a local café. The service was very friendly.',
          'We tried a new Chinese restaurant. The noodles were delicious.'
        ]
      },
      {
        id: 'ordering-food',
        text: 'How would you order your favorite drink?',
        sampleAnswers: [
          'I\'d like a large coffee with milk, please.',
          'Can I have an orange juice, no ice?',
          'I\'ll take a green tea with honey.'
        ]
      }
    ]
  },
  {
    id: 'family-friends',
    title: 'Family & Friends',
    description: 'Talk about your relationships and social connections',
    level: 'beginner',
    prompts: [
      {
        id: 'family-description',
        text: 'Tell me about your family.',
        sampleAnswers: [
          'I have two brothers and one sister. We\'re very close.',
          'I live with my parents and my grandmother.',
          'My family is small - just me, my mom, and my dad.'
        ]
      },
      {
        id: 'best-friend',
        text: 'Describe your best friend.',
        sampleAnswers: [
          'My best friend is very funny and always makes me laugh.',
          'She\'s been my friend since high school. We do everything together.',
          'He\'s very kind and always helps me when I need it.'
        ]
      },
      {
        id: 'family-traditions',
        text: 'What traditions does your family have?',
        sampleAnswers: [
          'We always have a big dinner on Sunday with everyone.',
          'Every Christmas we exchange gifts and tell stories.',
          'We celebrate birthdays with homemade cake and songs.'
        ]
      },
      {
        id: 'friend-activities',
        text: 'What do you like to do with your friends?',
        sampleAnswers: [
          'We love going to movies and trying new restaurants.',
          'We often play sports together on weekends.',
          'We enjoy shopping and talking about our lives.'
        ]
      }
    ]
  },

  // INTERMEDIATE LEVEL
  {
    id: 'making-plans',
    title: 'Making Plans',
    description: 'Learn to organize activities and make arrangements',
    level: 'intermediate',
    prompts: [
      {
        id: 'weekend-plans',
        text: 'Suggest plans for this weekend with a friend.',
        sampleAnswers: [
          'How about we go to the park and have a picnic?',
          'Would you like to see a movie or try that new restaurant?',
          'Maybe we could visit the museum and then get coffee?'
        ]
      },
      {
        id: 'scheduling-meeting',
        text: 'Arrange a time to meet someone next week.',
        sampleAnswers: [
          'Are you free Tuesday afternoon? We could meet at 3 PM.',
          'What about Thursday evening? I finish work at 6.',
          'Would Monday morning work for you? Around 10 AM?'
        ]
      },
      {
        id: 'changing-plans',
        text: 'You need to cancel or change your plans. Explain why.',
        sampleAnswers: [
          'I\'m sorry, I need to reschedule. Something urgent came up at work.',
          'Can we meet an hour later? Traffic is really bad today.',
          'I\'m not feeling well. Could we postpone until tomorrow?'
        ]
      },
      {
        id: 'group-activity',
        text: 'Organize a group activity for several friends.',
        sampleAnswers: [
          'Let\'s all meet at the beach on Saturday and bring food to share.',
          'How about a game night at my place? Everyone can bring snacks.',
          'We could go hiking together and have lunch at the top.'
        ]
      }
    ]
  },
  {
    id: 'shopping-services',
    title: 'Shopping & Services',
    description: 'Navigate shopping situations and service interactions',
    level: 'intermediate',
    prompts: [
      {
        id: 'shopping-experience',
        text: 'Describe a recent shopping trip that didn\'t go as planned.',
        sampleAnswers: [
          'I went to buy shoes, but they didn\'t have my size in the color I wanted.',
          'The store was so crowded I couldn\'t find what I needed.',
          'I forgot my wallet and had to go back home to get it.'
        ]
      },
      {
        id: 'comparing-products',
        text: 'Compare two products you\'re considering buying.',
        sampleAnswers: [
          'This phone has a better camera, but the other one has longer battery life.',
          'The expensive jacket looks nicer, but the cheaper one is more practical.',
          'Both laptops are good, but this one is lighter for traveling.'
        ]
      },
      {
        id: 'customer-service',
        text: 'You received poor service. How would you complain politely?',
        sampleAnswers: [
          'Excuse me, I\'ve been waiting for 20 minutes. Could someone help me?',
          'I\'m not satisfied with this product. Could I speak to a manager?',
          'The service was slow and my order was wrong. Can you fix this?'
        ]
      },
      {
        id: 'online-vs-store',
        text: 'Compare online shopping with shopping in stores.',
        sampleAnswers: [
          'Online is convenient, but I like to see products before buying.',
          'Stores let you try things on, but online has better prices.',
          'I prefer online for books, but stores for clothes and shoes.'
        ]
      }
    ]
  },
  {
    id: 'work-conversations',
    title: 'Work Conversations',
    description: 'Professional communication and workplace interactions',
    level: 'intermediate',
    prompts: [
      {
        id: 'typical-workday',
        text: 'Describe what a typical workday looks like for you.',
        sampleAnswers: [
          'I start with checking emails, then attend meetings, and work on projects.',
          'Most of my day involves helping customers and solving their problems.',
          'I spend time teaching students and preparing lessons for tomorrow.'
        ]
      },
      {
        id: 'workplace-challenge',
        text: 'Describe a challenge you face at work and how you handle it.',
        sampleAnswers: [
          'Sometimes deadlines are tight, so I prioritize tasks and ask for help.',
          'Difficult customers can be stressful, but I stay calm and listen carefully.',
          'New technology is challenging, but I take time to learn and practice.'
        ]
      },
      {
        id: 'colleague-interaction',
        text: 'How do you build good relationships with your coworkers?',
        sampleAnswers: [
          'I try to be helpful and offer assistance when they need it.',
          'We have lunch together sometimes and talk about our interests.',
          'I listen to their ideas and share my knowledge when it\'s useful.'
        ]
      },
      {
        id: 'career-goals',
        text: 'What are your career goals for the next few years?',
        sampleAnswers: [
          'I want to learn new skills and possibly get promoted to manager.',
          'I\'d like to improve my English and work with international clients.',
          'My goal is to start my own business in the next five years.'
        ]
      }
    ]
  },
  {
    id: 'travel-experiences',
    title: 'Travel Experiences',
    description: 'Share travel stories and discuss different places',
    level: 'intermediate',
    prompts: [
      {
        id: 'memorable-trip',
        text: 'Tell me about your most memorable travel experience.',
        sampleAnswers: [
          'I went to Japan and was amazed by the culture and food.',
          'My trip to the mountains was beautiful, but the weather was challenging.',
          'Visiting my grandparents\' village showed me a different way of life.'
        ]
      },
      {
        id: 'travel-preferences',
        text: 'Do you prefer planned trips or spontaneous adventures? Why?',
        sampleAnswers: [
          'I like planning because I don\'t want to miss important attractions.',
          'Spontaneous trips are more exciting and lead to unexpected discoveries.',
          'I prefer a mix - plan the basics but leave time for surprises.'
        ]
      },
      {
        id: 'cultural-differences',
        text: 'Describe an interesting cultural difference you\'ve experienced.',
        sampleAnswers: [
          'In some countries, people eat with their hands, which was new for me.',
          'I was surprised how early shops close in some European cities.',
          'The way people greet each other varies so much between cultures.'
        ]
      },
      {
        id: 'dream-destination',
        text: 'Where would you most like to travel and why?',
        sampleAnswers: [
          'I\'d love to visit New Zealand for the incredible nature and landscapes.',
          'Egypt fascinates me because of the ancient history and pyramids.',
          'I want to go to Brazil for the beaches, music, and friendly people.'
        ]
      }
    ]
  },

  // ADVANCED LEVEL
  {
    id: 'giving-opinions',
    title: 'Giving Opinions',
    description: 'Express and defend your viewpoints on various topics',
    level: 'advanced',
    prompts: [
      {
        id: 'social-media-impact',
        text: 'What\'s your opinion on social media\'s impact on society?',
        sampleAnswers: [
          'I think social media connects people globally but can also create addiction.',
          'It\'s a powerful tool for sharing information, but fake news is a serious problem.',
          'Social media helps businesses reach customers, but privacy concerns are growing.'
        ]
      },
      {
        id: 'work-life-balance',
        text: 'How important is work-life balance in today\'s world?',
        sampleAnswers: [
          'It\'s crucial for mental health, though some careers make it very difficult.',
          'Balance varies by life stage - young people might prioritize career growth.',
          'Technology makes it harder to disconnect, but we must set boundaries.'
        ]
      },
      {
        id: 'environmental-responsibility',
        text: 'Should individuals or governments lead environmental change?',
        sampleAnswers: [
          'Both are important, but governments have more power to create systemic change.',
          'Individual actions add up, but we need policy changes for real impact.',
          'Education is key - when people understand the issues, they\'ll demand change.'
        ]
      },
      {
        id: 'technology-privacy',
        text: 'How much privacy should we sacrifice for convenience?',
        sampleAnswers: [
          'Some privacy trade-offs are worth it, but companies should be transparent.',
          'We\'ve already given up too much - we need stronger privacy laws.',
          'It depends on the benefit - health apps might be worth it, advertising isn\'t.'
        ]
      }
    ]
  },
  {
    id: 'debating-ideas',
    title: 'Debating Ideas',
    description: 'Engage in thoughtful discussions and consider different perspectives',
    level: 'advanced',
    prompts: [
      {
        id: 'education-methods',
        text: 'Traditional classroom vs. online learning - which is more effective?',
        sampleAnswers: [
          'Classroom learning provides social interaction, but online offers flexibility.',
          'It depends on the subject - practical skills need hands-on experience.',
          'Hybrid approaches might combine the best of both methods.'
        ]
      },
      {
        id: 'artificial-intelligence',
        text: 'Will AI mostly help or harm humanity in the next 20 years?',
        sampleAnswers: [
          'AI will revolutionize medicine and science, but job displacement is concerning.',
          'The benefits outweigh risks if we develop AI responsibly with proper oversight.',
          'History shows technology creates new opportunities even as it eliminates old jobs.'
        ]
      },
      {
        id: 'urban-vs-rural',
        text: 'Are cities or rural areas better for quality of life?',
        sampleAnswers: [
          'Cities offer opportunities and culture, but rural areas provide peace and nature.',
          'It depends on personality - some people thrive on city energy, others need space.',
          'Both have advantages, but climate change might make rural areas more appealing.'
        ]
      },
      {
        id: 'globalization-effects',
        text: 'Has globalization been more beneficial or harmful overall?',
        sampleAnswers: [
          'Globalization reduced poverty globally but increased inequality within countries.',
          'Cultural exchange enriches us, but local traditions and businesses suffer.',
          'Economic benefits are clear, but we need better policies to share them fairly.'
        ]
      }
    ]
  },
  {
    id: 'abstract-thinking',
    title: 'Abstract Thinking',
    description: 'Explore complex concepts and philosophical ideas',
    level: 'advanced',
    prompts: [
      {
        id: 'success-definition',
        text: 'How would you define success, and has your definition changed over time?',
        sampleAnswers: [
          'Success used to mean money and status, now it\'s about fulfillment and relationships.',
          'I think success is making a positive impact, not just personal achievement.',
          'Success is having choices and the freedom to pursue what matters to you.'
        ]
      },
      {
        id: 'happiness-pursuit',
        text: 'Is the pursuit of happiness a worthwhile life goal?',
        sampleAnswers: [
          'Happiness as a byproduct of meaningful work is better than chasing it directly.',
          'Some suffering teaches important lessons - constant happiness might be shallow.',
          'Balance is key - pursue happiness but accept that difficult times have value too.'
        ]
      },
      {
        id: 'time-perception',
        text: 'Why does time seem to move faster as we get older?',
        sampleAnswers: [
          'New experiences make time feel longer, but routines make it fly by.',
          'Each year becomes a smaller fraction of our total life experience.',
          'Children live more in the moment, while adults focus on future and past.'
        ]
      },
      {
        id: 'creativity-vs-logic',
        text: 'Is creativity or logical thinking more important for solving problems?',
        sampleAnswers: [
          'Creativity identifies possibilities, logic evaluates which ones work.',
          'Different problems need different approaches - art needs creativity, engineering needs logic.',
          'The best solutions often combine creative insights with logical implementation.'
        ]
      }
    ]
  },
  {
    id: 'storytelling',
    title: 'Storytelling',
    description: 'Craft engaging narratives and share experiences effectively',
    level: 'advanced',
    prompts: [
      {
        id: 'life-changing-moment',
        text: 'Tell a story about a moment that changed your perspective on life.',
        sampleAnswers: [
          'When I volunteered abroad, I realized how privileged my life had been.',
          'Losing my job forced me to discover strengths I didn\'t know I had.',
          'Meeting someone from a completely different culture opened my mind.'
        ]
      },
      {
        id: 'overcoming-fear',
        text: 'Describe a time you faced a fear and what you learned.',
        sampleAnswers: [
          'I was terrified of public speaking, but joining a debate club changed everything.',
          'Learning to drive at 30 taught me it\'s never too late to try new things.',
          'Moving to a new country alone was scary but made me more independent.'
        ]
      },
      {
        id: 'unexpected-kindness',
        text: 'Share a story about unexpected kindness from a stranger.',
        sampleAnswers: [
          'When my car broke down, a stranger not only helped but refused payment.',
          'A shop owner let me take groceries when I forgot my wallet, trusting I\'d return.',
          'During a difficult time, a neighbor I barely knew brought me homemade soup.'
        ]
      },
      {
        id: 'lesson-learned',
        text: 'Tell about a mistake that taught you an important lesson.',
        sampleAnswers: [
          'I once gossiped about a colleague and learned the importance of discretion.',
          'Procrastinating on a major project taught me the value of time management.',
          'Judging someone too quickly showed me how assumptions can be wrong.'
        ]
      }
    ]
  }
];

export const getLevelModules = (level: 'beginner' | 'intermediate' | 'advanced') => {
  return learningModules.filter(module => module.level === level);
};

export const getModuleById = (id: string) => {
  return learningModules.find(module => module.id === id);
};