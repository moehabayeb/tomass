-- ============================================================================
-- B2 LEVEL MODULES 151-160 MIGRATION
-- Description: Adds 10 advanced B2 modules with 404 Q&A pairs
-- Date: 2026-01-01
-- ============================================================================

-- Insert Module 151: Future Perfect Continuous
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  151,
  'Future Perfect Continuous (will have been doing)',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  jsonb_build_array(
    'Understand and form sentences using the Future Perfect Continuous tense.',
    'Use the tense to describe actions that will be in progress for a duration up to a point in the future.',
    'Respond fluently to related questions.'
  ),
  'The Future Perfect Continuous tense is used to describe an action that will be in progress for a length of time before a certain point in the future.',
  jsonb_build_array('Subject + will have been + verb(-ing)'),
  jsonb_build_array(
    'By next year, I will have been working here for a decade.',
    'Positive: She will have been studying for 3 hours.',
    'Negative: She won''t have been studying for 3 hours.',
    'Question: Will she have been studying for 3 hours?'
  ),
  jsonb_build_array('for', 'by', 'by the time', 'when', 'before', 'until')
);

-- Insert Module 152: Passive Voice – Past Perfect and Future Perfect
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  152,
  'Passive Voice – Past Perfect and Future Perfect',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  jsonb_build_array(
    'Recognize and form passive structures in the Past Perfect and Future Perfect tenses.',
    'Use the passive voice to emphasize the action or the result rather than the doer.',
    'Respond fluently using passive voice in different time references.'
  ),
  'We use the Passive Voice when the focus is on the action or when the subject is unknown or unimportant.
PAST PERFECT PASSIVE: Subject + had been + past participle (V3)
FUTURE PERFECT PASSIVE: Subject + will have been + past participle (V3)
We often use passive voice in formal writing, reports, or when we want to highlight the action itself.',
  jsonb_build_array(
    'Past Perfect Passive: Subject + had been + V3',
    'Future Perfect Passive: Subject + will have been + V3'
  ),
  '[]'::jsonb,
  '[]'::jsonb
);

-- Insert Module 153: Reported Speech – Mixed Tenses
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  153,
  'Reported Speech – Mixed Tenses',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  jsonb_build_array(
    'Understand how to convert direct speech to reported speech using different tenses.',
    'Recognize tense changes and pronoun shifts in reported speech.',
    'Respond accurately and fluently using reported speech.'
  ),
  'Reported Speech is used to express what someone said without quoting their exact words. When we report speech, we usually change the tense of the original sentence (backshift), pronouns, time expressions, and word order if necessary.',
  jsonb_build_array('He/She said (that) + subject + verb (with backshift as needed)'),
  jsonb_build_array(
    'Present Simple → Past Simple: "I work here." → He said he worked there.',
    'Present Continuous → Past Continuous',
    'Present Perfect → Past Perfect',
    'Past Simple → Past Perfect',
    'Future Simple (will) → would',
    '"I''m tired." → He said (that) he was tired.'
  ),
  '[]'::jsonb
);

-- Insert Module 154: Inversion for Emphasis
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  154,
  'Inversion for Emphasis (Never have I…)',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  jsonb_build_array(
    'Understand how and when to use inversion for emphasis in English.',
    'Form sentences using negative adverbials followed by inversion.',
    'Practice speaking using formal and emphatic sentence structures.'
  ),
  'Inversion is a formal structure used for emphasis. It often places an auxiliary verb before the subject after negative or limiting adverbials like Never, Rarely, Hardly, Scarcely, Seldom, No sooner, Only after, Not until, Under no circumstances.',
  jsonb_build_array('[Negative/limiting adverbial] + [Auxiliary verb] + [Subject] + [Main verb]'),
  jsonb_build_array(
    'Never have I seen such a beautiful sunset.',
    'Seldom does he go out after midnight.',
    'Only after the meeting did she realize the mistake.',
    'Not until I read the letter did I understand the truth.'
  ),
  '[]'::jsonb
);

-- Insert Module 155: Ellipsis and Substitution
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  155,
  'Ellipsis and Substitution (so, do, one)',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  '[]'::jsonb,
  'Ellipsis means leaving out words that are understood from context. Substitution replaces a word or phrase with another to avoid repetition (do/does/did, so/neither, one/ones).',
  '[]'::jsonb,
  jsonb_build_array(
    'A: Do you want tea or coffee? B: Coffee. (Ellipsis of ''I want'')',
    'A: She can play the guitar, and I can [ ] too. (Ellipsis of ''play the guitar'')',
    'A: He sings well. B: Yes, he does. (Substitution with ''does'')',
    'A: I''m tired. B: So am I. (Agreement with ''so'')',
    'A: I don''t like sushi. B: Neither do I. (Agreement with ''neither'')',
    'A: Which hat do you want? B: The red one. (Substitution with ''one'')'
  ),
  '[]'::jsonb
);

-- Insert Module 156: Nominalisation
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  156,
  'Nominalisation (changing verbs to nouns)',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  '[]'::jsonb,
  '',
  '[]'::jsonb,
  jsonb_build_array(
    'decide → decision',
    'explain → explanation',
    'investigate → investigation',
    'Original: The manager decided to reduce costs. → Nominalised: The manager made a decision to reduce costs.'
  ),
  '[]'::jsonb
);

-- Insert Module 157: Advanced Linking Words
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  157,
  'Advanced Linking Words (nonetheless, furthermore)',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  '[]'::jsonb,
  '',
  '[]'::jsonb,
  jsonb_build_array(
    'The weather was terrible. Nonetheless, we decided to go hiking.',
    'The report was comprehensive. Furthermore, it provided practical recommendations.',
    'The team worked hard. As a result, they finished the project early.'
  ),
  '[]'::jsonb
);

-- Insert Module 158: Complex Conditionals
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  158,
  'Complex Conditionals (if…were to, if…should)',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  '[]'::jsonb,
  '',
  '[]'::jsonb,
  jsonb_build_array(
    'If + subject + were to + base verb (hypothetical): If I were to move abroad, I''d choose Canada.',
    'If + subject + should + base verb (possibility/polite): If you should need any help, don''t hesitate to ask.'
  ),
  '[]'::jsonb
);

-- Insert Module 159: Unreal Past for Present
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  159,
  'Unreal Past for Present (I wish I knew)',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  '[]'::jsonb,
  '',
  '[]'::jsonb,
  jsonb_build_array(
    'I wish + subject + past simple (present regret): I wish I knew the answer.',
    'If only + subject + past simple (stronger): If only I had more time.'
  ),
  '[]'::jsonb
);

-- Insert Module 160: Unreal Past for Past
insert into public.modules (
  module_number, title, level, lesson_type, lesson_objectives,
  topic_explanation, structures, examples, time_expressions
) values (
  160,
  'Unreal Past for Past (I wish I had known)',
  'B2',
  'AI Teacher-Led Speaking Lesson',
  '[]'::jsonb,
  '',
  '[]'::jsonb,
  jsonb_build_array(
    'I wish + subject + had + past participle: I wish I had known about the meeting.',
    'If only + subject + had + past participle: If only I had studied harder.'
  ),
  '[]'::jsonb
);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 151 (40 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 151),
  unnest(array[
    'How long will you have been living in this city by the end of the year?',
    'Will you have been studying English for a long time by next summer?',
    'What will you have been doing at 8 p.m. tonight?',
    'By the time she arrives, how long will you have been waiting?',
    'Will your friends have been working at the same company for a decade by 2030?',
    'What will your teacher have been doing when the class starts?',
    'Will you have been using this computer for more than two years by next month?',
    'By 9 o''clock, how long will the children have been playing?',
    'Will your team have been training all week by Friday?',
    'What will the company have been developing for the past six months?',
    'By next June, how long will they have been dating?',
    'Will he have been driving for five hours when they stop for a break?',
    'What will she have been doing in the kitchen for such a long time?',
    'How long will your neighbor have been renovating their house by August?',
    'Will you have been saving money for your trip by this winter?',
    'What will you have been doing before the meeting starts?',
    'Will the cat have been sleeping on the couch all day?',
    'How long will your sister have been working as a nurse by the end of the year?',
    'By the time you reach the mountain, how long will you have been hiking?',
    'Will you have been waiting long before the movie begins?',
    'By 2026, how long will you have been teaching English?',
    'Will your parents have been living abroad by the time you graduate?',
    'What will the workers have been doing all morning?',
    'How long will you have been using social media by the end of this year?',
    'Will you have been learning Spanish for long before visiting Spain?',
    'What will your friends have been planning for the weekend?',
    'By the time your boss arrives, how long will you have been waiting?',
    'Will you have been working on this project all week?',
    'What will they have been building on that land?',
    'By next winter, how long will the snow have been falling?',
    'Will your team have been rehearsing before the big event?',
    'How long will the musicians have been playing when the audience arrives?',
    'How long will the concert have been going on when we arrive?',
    'Will she have been living in Berlin for long by the time of the reunion?',
    'What will you have been doing when the guests come?',
    'How long will you have been watching the series by the end of this week?',
    'Will the workers have been painting the building for several days?',
    'What will your parents have been discussing with the lawyer?',
    'By the end of the day, how long will you have been reading that book?',
    'Will the guests have been waiting outside for a long time?'
  ]),
  unnest(array[
    'I will have been living in this city for five years by the end of the year.',
    'Yes, I will have been studying English for almost three years by next summer.',
    'I will have been preparing dinner for my family at 8 p.m.',
    'I will have been waiting for at least forty minutes.',
    'Yes, they will have been working there for ten years by 2030.',
    'She will have been organizing the materials and preparing her slides.',
    'Yes, I will have been using it for over two years.',
    'They will have been playing for nearly three hours.',
    'Yes, they will have been training every day this week.',
    'It will have been developing a new software product.',
    'They will have been dating for exactly four years by then.',
    'Yes, he will have been driving non-stop for five hours.',
    'She will have been baking a cake and preparing dinner.',
    'They will have been renovating for about three months.',
    'Yes, I will have been saving money since last summer.',
    'I will have been reviewing the reports and taking notes.',
    'Yes, it will have been sleeping there since morning.',
    'She will have been working for almost ten years.',
    'I will have been hiking for over five hours.',
    'Yes, I will have been waiting for more than 30 minutes.',
    'I will have been teaching English for 12 years by 2026.',
    'Yes, they will have been living in Canada for two years.',
    'They will have been cleaning and organizing the warehouse.',
    'I will have been using it for over a decade.',
    'Yes, I will have been learning it for six months.',
    'They will have been planning a surprise party.',
    'I will have been waiting in his office for 45 minutes.',
    'Yes, I will have been working day and night.',
    'They will have been building a new hospital.',
    'It will have been falling for several days.',
    'Yes, they will have been rehearsing for over a month.',
    'They will have been playing for about 30 minutes.',
    'It will have been going on for nearly an hour.',
    'Yes, she will have been living there for five years.',
    'I will have been cleaning the house and setting the table.',
    'I will have been watching it for two weeks straight.',
    'Yes, they will have been painting it since Monday.',
    'They will have been discussing the details of the contract.',
    'I will have been reading it for more than six hours.',
    'Yes, they will have been waiting for at least twenty minutes.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 152 (40 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 152),
  unnest(array[
    'Had the letter been sent before she arrived?',
    'What had been done before the meeting started?',
    'Had the room been cleaned before the guests came?',
    'Why had the files been deleted?',
    'Had the dishes been washed before you got home?',
    'What had been prepared for the visitors?',
    'Had the tickets been booked in advance?',
    'How had the mistake been discovered?',
    'Had the emails been answered by the assistant?',
    'Why had the project been delayed?',
    'Had the decision been made before the announcement?',
    'What had been stolen from the office?',
    'Had the package been delivered before noon?',
    'How many jobs had been created by the program?',
    'Had the article been edited before publishing?',
    'Had the flight been canceled because of the storm?',
    'Why had the painting been removed from the gallery?',
    'Had the students been warned about the test?',
    'Had the homework been submitted on time?',
    'What had been discussed during the meeting?',
    'Will the contract have been signed by next week?',
    'What will have been completed by the end of the day?',
    'Will the repairs have been finished before the guests arrive?',
    'Why will the decision have been postponed?',
    'Will the museum have been renovated by 2026?',
    'What will have been achieved by the end of the year?',
    'Will the application have been processed by next month?',
    'How many books will have been read by the students?',
    'Will the documents have been reviewed before the meeting?',
    'Will the bridge have been constructed by the deadline?',
    'What will have been discussed during the summit?',
    'Will the machine have been tested before use?',
    'Will the data have been analyzed by tomorrow?',
    'Why will the event have been cancelled?',
    'Will the task have been delegated to someone else?',
    'Will the materials have been shipped by Friday?',
    'Will the complaint have been handled professionally?',
    'What changes will have been made by the manager?',
    'Will the forms have been filled out correctly?',
    'What will have been planned by the organizers?'
  ]),
  unnest(array[
    'Yes, the letter had been sent before she arrived.',
    'The reports had been printed and arranged on the table.',
    'Yes, it had been cleaned thoroughly.',
    'They had been deleted by mistake during the update.',
    'No, they hadn''t been washed yet.',
    'Snacks and drinks had been prepared.',
    'Yes, they had been booked a week ago.',
    'It had been discovered during the audit.',
    'Yes, they had all been answered on time.',
    'It had been delayed due to unexpected issues.',
    'Yes, it had already been made.',
    'Some laptops and files had been stolen.',
    'Yes, it had been delivered at 11 AM.',
    'Over 500 jobs had been created.',
    'Yes, it had been carefully edited.',
    'Yes, it had been canceled for safety reasons.',
    'It had been removed for restoration.',
    'Yes, they had been warned earlier.',
    'Yes, it had been submitted through email.',
    'Budget cuts had been discussed.',
    'Yes, it will have been signed by then.',
    'All the reports will have been completed.',
    'Yes, they will have been finished by noon.',
    'It will have been postponed due to lack of data.',
    'Yes, it will have been fully renovated by then.',
    'Major goals will have been achieved.',
    'Yes, it will have been processed in time.',
    'More than 30 books will have been read.',
    'Yes, they will have been reviewed carefully.',
    'Yes, it will have been completed ahead of schedule.',
    'Climate change policies will have been discussed.',
    'Yes, it will have been tested multiple times.',
    'Yes, it will have been analyzed overnight.',
    'It will have been cancelled due to low attendance.',
    'Yes, it will have been delegated to another team member.',
    'Yes, they will have been shipped this evening.',
    'Yes, it will have been handled with care.',
    'New policies will have been introduced.',
    'Yes, they will have been completed by HR.',
    'A full day of activities will have been planned.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 153 (40 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 153),
  unnest(array[
    'She said, ''I am watching a movie.''',
    'He said, ''I have finished my homework.''',
    'They said, ''We will call you tomorrow.''',
    'I said, ''I can help you.''',
    'She said, ''I went to Paris last year.''',
    'He said, ''I am going to start a new job.''',
    'They said, ''We are meeting her today.''',
    'John said, ''I may be late.''',
    'She said, ''I had already eaten.''',
    'He said, ''I was reading when you called.''',
    'She said, ''I don''t like this dress.''',
    'They said, ''We must leave now.''',
    'He said, ''I could swim when I was five.''',
    'I said, ''I should study more.''',
    'She said, ''I would love to join the team.''',
    'They said, ''We had been living there for two years.''',
    'He said, ''I was going to tell you the truth.''',
    'She said, ''You need to work harder.''',
    'I said, ''I''ve been waiting for hours.''',
    'He said, ''The train arrives at 6 PM.''',
    'She said, ''I must finish this report today.''',
    'They said, ''We are happy with the result.''',
    'He said, ''I will help you with your homework.''',
    'She said, ''I can''t go out tonight.''',
    'I said, ''We have been here before.''',
    'They said, ''We should leave now.''',
    'He said, ''I was working all day yesterday.''',
    'She said, ''I may not attend the meeting.''',
    'John said, ''I need to go now.''',
    'They said, ''We are going to visit our parents.''',
    'He said, ''I would be busy next week.''',
    'She said, ''I don''t have time today.''',
    'I said, ''I had already seen the movie.''',
    'He said, ''I can drive.''',
    'She said, ''We are flying to Rome next week.''',
    'They said, ''The boss has arrived.''',
    'He said, ''I should go home early.''',
    'She said, ''I might join you later.''',
    'I said, ''I am tired.''',
    'They said, ''We had won the game.'''
  ]),
  unnest(array[
    'She said that she was watching a movie.',
    'He said that he had finished his homework.',
    'They said that they would call me the next day.',
    'I said that I could help him.',
    'She said that she had gone to Paris the year before.',
    'He said that he was going to start a new job.',
    'They said that they were meeting her that day.',
    'John said that he might be late.',
    'She said that she had already eaten.',
    'He said that he had been reading when I had called.',
    'She said that she didn''t like that dress.',
    'They said that they had to leave then.',
    'He said that he could swim when he was five.',
    'I said that I should study more.',
    'She said that she would love to join the team.',
    'They said that they had been living there for two years.',
    'He said that he had been going to tell me the truth.',
    'She said that I needed to work harder.',
    'I said that I had been waiting for hours.',
    'He said that the train arrived at 6 PM.',
    'She said that she had to finish that report that day.',
    'They said that they were happy with the result.',
    'He said that he would help me with my homework.',
    'She said that she couldn''t go out that night.',
    'I said that we had been there before.',
    'They said that they should leave then.',
    'He said that he had been working all day the day before.',
    'She said that she might not attend the meeting.',
    'John said that he needed to go then.',
    'They said that they were going to visit their parents.',
    'He said that he would be busy the following week.',
    'She said that she didn''t have time that day.',
    'I said that I had already seen the movie.',
    'He said that he could drive.',
    'She said that they were flying to Rome the following week.',
    'They said that the boss had arrived.',
    'He said that he should go home early.',
    'She said that she might join us later.',
    'I said that I was tired.',
    'They said that they had won the game.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 154 (40 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 154),
  unnest(array[
    'Have you ever seen such a beautiful painting?',
    'Do they rarely visit their grandparents?',
    'Did she understand the topic only after reading it twice?',
    'Did he realize the truth not until he spoke to her?',
    'Do we seldom watch TV during weekdays?',
    'Did she leave the house only after finishing breakfast?',
    'Have you ever met someone so rude?',
    'Do they hardly ever complain about their jobs?',
    'Did the manager arrive only after the guests had left?',
    'Did he speak the truth not until he was questioned?',
    'Does she rarely go shopping alone?',
    'Have I ever been this exhausted?',
    'Did we understand the situation only after it was explained?',
    'Did the truth become clear not until the end of the film?',
    'Do I seldom travel during winter?',
    'Have they ever complained about the service?',
    'Did she realize her mistake only after submitting the form?',
    'Did he apologize not until his friend forgave him?',
    'Do we rarely go to the cinema these days?',
    'Have you ever experienced such fear?',
    'Did he start working only after he finished his studies?',
    'Did she cry not until she was alone?',
    'Do I hardly have time to relax?',
    'Have you ever eaten something this spicy?',
    'Did the audience cheer only after the final scene?',
    'Did the truth come out not until she confessed?',
    'Do they seldom eat out?',
    'Have we ever had such a great time?',
    'Did she understand the joke only after reading it again?',
    'Did the teacher explain the rule not until the test?',
    'Do I rarely get time off work?',
    'Did he respond only after being asked twice?',
    'Did she realize the cost not until she checked her bank account?',
    'Do they hardly ever take vacations?',
    'Have I ever seen such chaos?',
    'Did they leave only after we arrived?',
    'Did the problem become obvious not until we ran the test?',
    'Do we seldom get visitors here?',
    'Did she come back only after sunset?',
    'Did he speak honestly not until the trial?'
  ]),
  unnest(array[
    'Never have I seen such a beautiful painting.',
    'Rarely do they visit their grandparents.',
    'Only after reading it twice did she understand the topic.',
    'Not until he spoke to her did he realize the truth.',
    'Seldom do we watch TV during weekdays.',
    'Only after finishing breakfast did she leave the house.',
    'Never have I met someone so rude.',
    'Hardly ever do they complain about their jobs.',
    'Only after the guests had left did the manager arrive.',
    'Not until he was questioned did he speak the truth.',
    'Rarely does she go shopping alone.',
    'Never have I been this exhausted.',
    'Only after it was explained did we understand the situation.',
    'Not until the end of the film did the truth become clear.',
    'Seldom do I travel during winter.',
    'Never have they complained about the service.',
    'Only after submitting the form did she realize her mistake.',
    'Not until his friend forgave him did he apologize.',
    'Rarely do we go to the cinema these days.',
    'Never have I experienced such fear.',
    'Only after he finished his studies did he start working.',
    'Not until she was alone did she cry.',
    'Hardly do I have time to relax.',
    'Never have I eaten something this spicy.',
    'Only after the final scene did the audience cheer.',
    'Not until she confessed did the truth come out.',
    'Seldom do they eat out.',
    'Never have we had such a great time.',
    'Only after reading it again did she understand the joke.',
    'Not until the test did the teacher explain the rule.',
    'Rarely do I get time off work.',
    'Only after being asked twice did he respond.',
    'Not until she checked her bank account did she realize the cost.',
    'Hardly ever do they take vacations.',
    'Never have I seen such chaos.',
    'Only after we arrived did they leave.',
    'Not until we ran the test did the problem become obvious.',
    'Seldom do we get visitors here.',
    'Only after sunset did she come back.',
    'Not until the trial did he speak honestly.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 155 (40 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 155),
  unnest(array[
    'Do you like jazz music?',
    'I think the new teacher is great. What about you?',
    'I don''t like eating too late.',
    'Which phone did you buy?',
    'Do you think Tom will attend the meeting?',
    'I can''t swim very well.',
    'I enjoyed the concert last night.',
    'Are you going to the party tonight?',
    'I''ve been to Italy twice.',
    'She didn''t finish her assignment on time.',
    'Which shoes did you choose?',
    'He said he''d call me, but he didn''t.',
    'I always get nervous before presentations.',
    'I wouldn''t go skydiving.',
    'Do you like action movies?',
    'I can''t stand horror films.',
    'I think she handled the situation well.',
    'Did you go to the meeting yesterday?',
    'He never listens during lectures.',
    'I''m going to try the new restaurant.',
    'Which laptop would you recommend?',
    'I haven''t seen the new movie yet.',
    'She always arrives on time.',
    'I forgot to bring my book today.',
    'I don''t enjoy long meetings.',
    'Do you think we should postpone the trip?',
    'I worked late last night.',
    'I won''t attend the conference.',
    'She bought the same dress as mine.',
    'Are you going to apply for the job?',
    'Have you read the latest report?',
    'I feel exhausted after the gym.',
    'I didn''t finish the project.',
    'I love classical music.',
    'Which bag is yours?',
    'Do you think she''s right?',
    'I can''t understand this math problem.',
    'I''m planning a holiday in Spain.',
    'I don''t usually eat breakfast.',
    'Which coffee did you get?'
  ]),
  unnest(array[
    'Yes, I do. I listen to it often.',
    'So do I. She''s very engaging.',
    'Neither do I. It gives me heartburn.',
    'I bought the latest one. It has a great camera.',
    'I hope so. He said he would.',
    'Neither can I. I''m still learning.',
    'So did I. The band was amazing.',
    'Yes, I am. Are you?',
    'So have I. It''s a beautiful country.',
    'Neither did I. It was too difficult.',
    'The black ones. They''re more comfortable.',
    'He didn''t? He said he would!',
    'So do I. My hands start shaking.',
    'Neither would I. It''s too risky for me.',
    'I do. My brother does too.',
    'Neither can I. I get scared easily.',
    'So do I. She was very professional.',
    'I did, but I didn''t stay long.',
    'No, he doesn''t. It''s frustrating.',
    'So am I. I''ve heard good things.',
    'The lighter one. It''s easier to carry.',
    'Neither have I. Let''s go this weekend.',
    'So does my boss. It sets a good example.',
    'So did I. Let''s share one.',
    'Neither do I. They drain my energy.',
    'I think so. The weather looks terrible.',
    'So did I. It was a tough day.',
    'Neither will I. It conflicts with my schedule.',
    'Really? I saw one like that yesterday.',
    'I might. I know Anna is.',
    'I haven''t, but James has.',
    'So do I. My legs are killing me.',
    'Neither did I. I''ll work on it tonight.',
    'So do I. It helps me focus.',
    'The blue one on the chair.',
    'I think so. She made some good points.',
    'Neither can I. It''s really tricky.',
    'So am I! Maybe we''ll meet there.',
    'Neither do I. I prefer coffee in the morning.',
    'The strong one. I needed the caffeine.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 156 (41 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 156),
  unnest(array[
    'What was the final decision about the project?',
    'Can you give an explanation for the delay?',
    'What was his reaction to the news?',
    'What''s your recommendation for improving the system?',
    'Do you think the investigation was successful?',
    'What was the reason for the cancellation?',
    'Have you read the latest analysis?',
    'Did the negotiation lead to an agreement?',
    'What''s your opinion on the new policy?',
    'Was there any improvement after the changes?',
    'How was the presentation?',
    'What do you think of their behaviour?',
    'Was there an increase in customer satisfaction?',
    'Do you support the proposal?',
    'What''s the main conclusion of the report?',
    'Did he give a justification for his actions?',
    'Do you have any suggestions?',
    'What''s your assessment of the situation?',
    'How was the implementation of the plan?',
    'What''s your interpretation of the data?',
    'Did they submit an application?',
    'What was the outcome of the discussion?',
    'What are your expectations for this project?',
    'Did you receive confirmation of the order?',
    'Was the modification necessary?',
    'What''s your evaluation of the training?',
    'How would you describe the transition?',
    'What is the implication of the new law?',
    'Did you attend the demonstration?',
    'Was there any resistance to the plan?',
    'How did they react to the announcement?',
    'What''s your observation about the students?',
    'What''s the purpose of the inspection?',
    'What led to the resignation?',
    'What kind of preparation did it require?',
    'Was there an alteration to the schedule?',
    'What was the recommendation?',
    'Did they offer a solution?',
    'What''s your explanation for the mistake?',
    'Was the organisation of the event good?',
    'What was the result of the evaluation?'
  ]),
  unnest(array[
    'The final decision was to postpone the launch until next month.',
    'The explanation is that the software needs more testing.',
    'His reaction was surprisingly calm.',
    'My recommendation is to invest in better training.',
    'Yes, the investigation revealed the root cause of the issue.',
    'The reason was low ticket sales.',
    'Yes, the analysis shows a significant drop in revenue.',
    'Yes, the negotiation ended in a mutual agreement.',
    'My opinion is that it''s too strict.',
    'Yes, there was noticeable improvement in performance.',
    'The presentation was clear and informative.',
    'Their behaviour was unacceptable.',
    'Yes, we saw a 15% increase in satisfaction.',
    'Yes, I believe the proposal will benefit the team.',
    'The conclusion is that we need a new strategy.',
    'Yes, his justification was based on safety concerns.',
    'Yes, I have two suggestions for improving workflow.',
    'My assessment is that we need immediate action.',
    'The implementation was smooth and effective.',
    'My interpretation is that sales will increase next quarter.',
    'Yes, the application was submitted last Friday.',
    'The outcome was a decision to expand.',
    'My expectations are quite high.',
    'Yes, I received the confirmation email today.',
    'Yes, the modification helped fix the issue.',
    'The evaluation was generally positive.',
    'The transition was challenging but successful.',
    'The implication is more paperwork.',
    'Yes, the demonstration was very informative.',
    'Yes, there was some resistance from staff.',
    'Their reaction was mixed.',
    'My observation is that they are more engaged.',
    'The purpose is to ensure safety.',
    'The resignation was due to personal reasons.',
    'It required a lot of preparation and teamwork.',
    'Yes, there was a slight alteration.',
    'The recommendation was to increase security.',
    'Yes, their solution was quite practical.',
    'My explanation is that it was an oversight.',
    'Yes, the organisation was excellent.',
    'The result was better than expected.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 157 (41 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 157),
  unnest(array[
    'Why did you continue working despite the challenges?',
    'Can you give me more reasons to support the idea?',
    'Did the company perform well last year?',
    'Was the weather good during your trip?',
    'Do you think the new policy is effective?',
    'What do you think of her plan?',
    'Why should we invest in this product?',
    'Did he accept the offer?',
    'Is the project completed?',
    'Did the presentation go well?',
    'Do you support the decision?',
    'Was the solution effective?',
    'How did the audience respond?',
    'Why is she considered the best candidate?',
    'Did you agree with the criticism?',
    'Is the app user-friendly?',
    'How did the students react?',
    'Is this a common problem?',
    'Did the plan work?',
    'Why is this topic important?',
    'Was the data accurate?',
    'What else do you suggest?',
    'Did they enjoy the event?',
    'Is this method reliable?',
    'Why should we choose this supplier?',
    'Was there any resistance?',
    'Do you think this idea will work?',
    'How do you evaluate the results?',
    'Did she manage to complete the report?',
    'What are the advantages?',
    'How was the test?',
    'Do you agree with the rules?',
    'Did the software update help?',
    'Why did the project fail?',
    'What''s your opinion on remote work?',
    'Was the speech convincing?',
    'Did you get good feedback?',
    'Is the evidence strong?',
    'Do you recommend the book?',
    'Was the result expected?',
    'Did the experiment prove the theory?'
  ]),
  unnest(array[
    'It was difficult; nonetheless, I was determined to finish.',
    'Yes, furthermore, it will save both time and money.',
    'Yes, they made a huge profit. Furthermore, they expanded to two new markets.',
    'No, it rained every day. Nonetheless, we had a great time.',
    'It has some issues. Nonetheless, it''s a step in the right direction.',
    'It seems risky. Nevertheless, it might actually work.',
    'It has proven results. Furthermore, the demand is growing.',
    'No, he refused. Even so, he appreciated the gesture.',
    'Yes. Furthermore, we finished it ahead of schedule.',
    'There were technical issues. Nonetheless, the message was clear.',
    'Yes, and furthermore, I think it will benefit everyone.',
    'It didn''t solve everything. Nevertheless, it helped a lot.',
    'Some were confused. Even so, most of them stayed until the end.',
    'She has the most experience. Furthermore, she communicates well.',
    'Some of it was fair. Nonetheless, I found it too harsh.',
    'Yes, and furthermore, it''s compatible with all devices.',
    'Some were disappointed. Even so, they understood the reason.',
    'Yes, and furthermore, it''s getting worse.',
    'It faced many obstacles. Nevertheless, it succeeded.',
    'It affects everyone. Furthermore, it''s often misunderstood.',
    'Some errors were found. Nonetheless, the overall result was valid.',
    'We should improve communication. Furthermore, we need better tools.',
    'There were issues with the venue. Even so, they had fun.',
    'It has limitations. Nevertheless, it''s widely used.',
    'They offer better prices. Furthermore, their delivery is fast.',
    'Yes, especially at first. Nonetheless, the team adapted.',
    'It''s not perfect. Even so, it''s worth trying.',
    'They are impressive. Furthermore, they exceed expectations.',
    'She faced many delays. Nevertheless, she submitted it.',
    'It''s cost-effective. Furthermore, it''s easy to maintain.',
    'It was difficult. Even so, I think I passed.',
    'Some of them are strict. Nonetheless, they''re necessary.',
    'Yes, and furthermore, it fixed the previous bugs.',
    'There were communication issues. Nevertheless, we learned a lot.',
    'It has benefits. Furthermore, it increases flexibility.',
    'It lacked evidence. Even so, it was passionate.',
    'Yes, and furthermore, they asked for more sessions.',
    'It has weaknesses. Nonetheless, it supports the argument.',
    'Yes, and furthermore, it''s suitable for beginners.',
    'Not really. Even so, it wasn''t disappointing.',
    'There were flaws. Nevertheless, it was insightful.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 158 (40 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 158),
  unnest(array[
    'If you were to live in another country, where would you go?',
    'If you should win the lottery, what would you do first?',
    'If he were to offer you a job, would you accept it?',
    'If you should see Anna, can you give her this book?',
    'If they were to cancel the event, how would you react?',
    'If you should need help with your project, just call me.',
    'If your boss were to leave the company, would things change?',
    'If it should snow tomorrow, what will happen to the match?',
    'If you were to take a year off, what would you do?',
    'If someone should ask about the report, what should I say?',
    'If she were to become manager, how would the team feel?',
    'If you should decide to join us, we''d be delighted.',
    'If they were to change the policy, would it affect you?',
    'If I should lose my job, I''ll start freelancing.',
    'If the economy were to collapse, what would happen?',
    'If she should fail the test, can she retake it?',
    'If we were to invest more in marketing, could sales improve?',
    'If they should forget their passports, they won''t be allowed in.',
    'If he were to move to New York, how would you feel?',
    'If you should experience any issues, please contact support.',
    'If I were to start a business, I''d open a café.',
    'If the system should crash again, we''ll lose valuable data.',
    'If your car were to break down, who would you call?',
    'If she should hear the news, she''ll be shocked.',
    'If we were to double production, could we meet demand?',
    'If I should forget your birthday, I apologize in advance.',
    'If their leader were to resign, what would happen?',
    'If you should decide against it, we''ll understand.',
    'If this strategy were to fail, what''s plan B?',
    'If the weather should clear up, we''ll go hiking.',
    'If I were to write a novel, it''d be about space travel.',
    'If she should arrive early, can you greet her?',
    'If the power were to go out, how would we manage?',
    'If you should change your mind, let me know.',
    'If he were to propose, would she say yes?',
    'If we should meet again, what would you say?',
    'If I were to move to another field, it''d be psychology.',
    'If they should offer a discount, would you buy it?',
    'If our flight were to be delayed, what''s our backup?',
    'If she should disagree, how will you handle it?'
  ]),
  unnest(array[
    'If I were to live abroad, I''d probably choose Japan.',
    'If I should win, I''d buy a house for my family.',
    'Yes, if he were to offer me a job, I''d accept it without hesitation.',
    'Sure, if I should see her, I''ll give it to her.',
    'If they were to cancel it, I''d be really disappointed.',
    'Thanks! If I should need it, I definitely will.',
    'Yes, if he were to leave, the dynamics would shift completely.',
    'If it should snow, the match might be postponed.',
    'If I were to take a year off, I''d travel the world.',
    'If someone should ask, just tell them it''s being reviewed.',
    'If she were to become manager, I think the team would be happy.',
    'Thanks! If I should decide, I''ll let you know soon.',
    'Yes, if they were to change it, it would impact our budget.',
    'That''s a smart backup plan.',
    'If it were to collapse, there''d be mass unemployment.',
    'Yes, if she should fail, there''s a retake option.',
    'Yes, if we were to do that, sales would likely go up.',
    'Exactly, if they should forget, they''ll have a problem.',
    'If he were to move, I''d definitely miss him.',
    'Got it. If I should, I''ll call them.',
    'That sounds like a great idea.',
    'Yes, if it should crash, it''ll be a serious problem.',
    'If it were to break down, I''d call roadside assistance.',
    'Yes, if she should hear, she might panic.',
    'If we were to double it, I think we could.',
    'No worries, if you should forget, I''ll remind you.',
    'If he were to resign, there''d likely be a power struggle.',
    'Thanks, if I should, I''ll explain why.',
    'If it were to fail, we''ll shift to digital marketing.',
    'Sounds good, if it should, let''s do it.',
    'That sounds fascinating.',
    'Sure, if she should, I''ll be there.',
    'If it were to go out, we''d use the backup generator.',
    'Absolutely, if I should, I''ll call you.',
    'If he were to propose, I think she would.',
    'If we should meet, I''d thank you for everything.',
    'That would suit you.',
    'Yes, if they should, I''ll grab it.',
    'If it were to be delayed, we''ll book another.',
    'If she should, I''ll try to explain my point calmly.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 159 (41 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 159),
  unnest(array[
    'What do you wish you could do better?',
    'Is there something you wish you were doing now?',
    'Do you ever wish you lived somewhere else?',
    'What''s something you wish you understood?',
    'Do you wish you had more free time?',
    'Is there anything about your job you wish you could change?',
    'Do you ever wish you had a different skill?',
    'Is there a language you wish you knew?',
    'Do you wish you were taller?',
    'Is there a talent you wish you had?',
    'Do you ever wish you were someone else?',
    'Do you wish your daily routine were different?',
    'Is there anything about your personality you wish you could change?',
    'Do you wish you had a different job?',
    'Do you wish your English were better?',
    'Do you wish your city were quieter?',
    'Do you wish you had more energy during the day?',
    'Do you wish you didn''t have any responsibilities today?',
    'Do you wish you knew how to cook?',
    'Do you wish your home were bigger?',
    'Do you wish your internet connection were faster?',
    'Do you wish you had more friends?',
    'Do you wish your parents were more supportive?',
    'Do you wish you had more patience?',
    'Do you wish your handwriting were neater?',
    'Do you wish your life were more exciting?',
    'Do you wish you knew how to dance?',
    'Do you wish your room were cleaner?',
    'Do you wish your boss were nicer?',
    'Do you wish your school had better facilities?',
    'Do you wish you lived closer to nature?',
    'Do you wish your country were more peaceful?',
    'Do you wish you didn''t have to wake up early?',
    'Do you wish your job were more exciting?',
    'Do you wish your phone battery lasted longer?',
    'Do you wish you weren''t afraid of heights?',
    'Do you wish your friends were more punctual?',
    'Do you wish you had a better memory?',
    'Do you wish you had more time for hobbies?',
    'Do you wish you were more athletic?',
    'Do you wish it were warmer today?'
  ]),
  unnest(array[
    'I wish I spoke Spanish fluently.',
    'Yes, I wish I were traveling the world.',
    'I wish I lived by the sea.',
    'I wish I understood advanced math.',
    'Absolutely, I wish I had more time to relax.',
    'Yes, I wish I worked fewer hours.',
    'I wish I knew how to play the piano.',
    'I wish I knew Japanese.',
    'Sometimes, I wish I were a bit taller.',
    'I wish I could paint beautifully.',
    'Not really, but I wish I were more confident.',
    'Yes, I wish I didn''t have to commute so far.',
    'I wish I weren''t so shy.',
    'Yes, I wish I worked in a more creative field.',
    'Yes, I wish I spoke more fluently.',
    'Definitely, I wish it weren''t so noisy.',
    'Yes, I wish I didn''t feel so tired all the time.',
    'I wish I were free all day.',
    'Yes, I wish I were a better cook.',
    'Yes, I wish I had more space.',
    'Absolutely, I wish it didn''t lag so much.',
    'Sometimes, I wish I were more social.',
    'Yes, I wish they understood me better.',
    'Definitely, I wish I didn''t lose my temper so quickly.',
    'Yes, I wish people could read it easily.',
    'Yes, I wish something new happened every day.',
    'I wish I weren''t so clumsy on the dance floor.',
    'Yes, I wish I weren''t so messy.',
    'Definitely, I wish he were more understanding.',
    'Yes, I wish it had a larger library.',
    'I wish I lived near a forest or mountains.',
    'Absolutely, I wish there were no conflicts.',
    'Yes, I wish I could sleep in every day.',
    'Yes, I wish it were more challenging.',
    'I wish I didn''t need to charge it so often.',
    'Yes, I wish I could climb mountains.',
    'Definitely, I wish they arrived on time.',
    'Yes, I wish I remembered things more easily.',
    'I wish I weren''t so busy with work.',
    'Yes, I wish I could run faster.',
    'Yes, I wish the weather were nicer.'
  ]);

-- ============================================================================
-- INSERT Q&A PAIRS FOR MODULE 160 (41 pairs)
-- ============================================================================

insert into public.speaking_qa (module_id, question, answer)
select
  (select id from public.modules where module_number = 160),
  unnest(array[
    'Is there something you wish you had done differently in school?',
    'Do you wish you had taken a different job?',
    'Is there a decision you regret?',
    'Do you wish you had said something to someone?',
    'Is there a missed opportunity you regret?',
    'Do you wish you had spent more time with someone?',
    'Do you wish you had been more careful?',
    'Is there something you wish you hadn''t done?',
    'Do you wish you had saved more money?',
    'Do you wish you had studied a different subject?',
    'Do you wish you had traveled more last year?',
    'Do you wish you hadn''t said something in anger?',
    'Do you wish you had taken better care of your health?',
    'Do you wish you had spent less time online?',
    'Do you wish you had started exercising earlier?',
    'Do you wish you had learned a musical instrument?',
    'Do you wish you had met someone earlier?',
    'Do you wish you hadn''t trusted someone?',
    'Do you wish you had handled a situation differently?',
    'Do you wish you had taken more risks?',
    'Do you wish you had apologized to someone?',
    'Do you wish you had asked for help?',
    'Do you wish you had been more honest?',
    'Do you wish you had taken a photo of something?',
    'Do you wish you had attended an event?',
    'Do you wish you hadn''t wasted your time on something?',
    'Do you wish you had said goodbye?',
    'Do you wish you had prepared more for a test?',
    'Do you wish you had been kinder?',
    'Do you wish you had learned to swim earlier?',
    'Do you wish you had written something down?',
    'Do you wish you had spoken up in a meeting?',
    'Do you wish you had accepted someone''s invitation?',
    'Do you wish you had listened to someone''s advice?',
    'Do you wish you had reacted differently in a situation?',
    'Do you wish you had completed a project earlier?',
    'Do you wish you had made a different financial decision?',
    'Do you wish you had kept in touch with someone?',
    'Do you wish you had apologized sooner?',
    'Do you wish you had eaten something different?',
    'Do you wish you had been more patient?'
  ]),
  unnest(array[
    'Yes, I wish I had studied more consistently.',
    'I wish I had accepted the offer from that tech company.',
    'Yes, I wish I had listened to my parents'' advice.',
    'I wish I had told her how I felt.',
    'Yes, I wish I had applied for that scholarship.',
    'I wish I had visited my grandfather more often.',
    'Yes, I wish I had double-checked everything.',
    'I wish I hadn''t quit that course.',
    'I definitely wish I had saved instead of spending so much.',
    'Yes, I wish I had studied computer science.',
    'I wish I had taken that trip to Greece.',
    'Yes, I wish I hadn''t yelled at my friend.',
    'I wish I had eaten healthier in my twenties.',
    'Yes, I wish I had focused more on hobbies.',
    'I wish I had started going to the gym years ago.',
    'Yes, I wish I had learned to play the guitar.',
    'I wish I had met my best friend sooner.',
    'Yes, I wish I hadn''t shared so much with him.',
    'I wish I had stayed calm during the argument.',
    'Yes, I wish I had been more adventurous.',
    'I wish I had said sorry to my teacher.',
    'Yes, I wish I had asked my mentor sooner.',
    'I wish I had told the truth from the start.',
    'I wish I had captured that sunset.',
    'I wish I had gone to the concert with my friends.',
    'Yes, I wish I hadn''t spent hours on that show.',
    'I wish I had said goodbye before he left.',
    'Yes, I wish I had studied more.',
    'I wish I had treated her better.',
    'Yes, I wish I had started as a child.',
    'I wish I had taken notes during the meeting.',
    'I wish I had shared my idea.',
    'I wish I had gone to the dinner.',
    'Yes, I wish I had followed my father''s advice.',
    'I wish I had stayed calm and listened.',
    'Yes, I wish I had finished it last week.',
    'I wish I had invested earlier.',
    'Yes, I wish I had stayed in contact with my roommate.',
    'I wish I had said sorry right away.',
    'Yes, I wish I had chosen the salad instead.',
    'I wish I had waited a bit longer before responding.'
  ]);

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index for module_number lookups (if not already exists)
create index if not exists idx_modules_module_number on public.modules(module_number);

-- Index for level filtering
create index if not exists idx_modules_level on public.modules(level);

-- Index for Q&A module lookup
create index if not exists idx_speaking_qa_module_id on public.speaking_qa(module_id);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify all modules inserted
-- Expected: 10 rows (modules 151-160)
-- Uncomment to run:
-- select module_number, title, level from public.modules where module_number between 151 and 160 order by module_number;

-- Verify Q&A counts
-- Expected: Module 151-155,158: 40 each; Module 156,157,159,160: 41 each
-- Uncomment to run:
-- select
--   m.module_number,
--   m.title,
--   count(qa.id) as qa_count
-- from public.modules m
-- left join public.speaking_qa qa on qa.module_id = m.id
-- where m.module_number between 151 and 160
-- group by m.module_number, m.title
-- order by m.module_number;
