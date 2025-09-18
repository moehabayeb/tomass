import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DIDAvatar from './DIDAvatar';
import { useAvatarState } from '@/hooks/useAvatarState';
import { supabase } from '@/integrations/supabase/client';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useProgressStore } from '@/hooks/useProgressStore';
import BookmarkButton from './BookmarkButton';
import { useToast } from '@/hooks/use-toast';
import { TTSManager, RobustTTSManager } from '@/services/TTSManager';
import { micOrchestrator } from '@/voice/micOrchestrator';
import { Play, Pause, MoreHorizontal, RotateCcw, Square } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AudioDebugOverlay } from './AudioDebugOverlay';
import AudioErrorBoundary from './AudioErrorBoundary';
import MicrophoneIndicator from './MicrophoneIndicator';

// Feature flags - keeping only ones actually used
const SPEAKING_HANDS_FREE = true;

// DIAMOND-GRADE ConversationManager with FIXED topic persistence and conversation memory
class ConversationManager {
  private conversationState = {
    topic: '',
    depth: 0,
    topicStartTime: Date.now(),
    questionsAsked: new Set<string>(),
    specificMentions: new Set<string>(),
    userPreferences: new Map<string, string>(),
    contextDetails: new Map<string, string>(),
    lastUserResponse: '',
    history: [] as Array<{user: string, ai: string}>
  };

  private isExplicitTopicChange(input: string): string | null {
    // Only detect EXPLICIT topic changes - not every user response
    const topicChangePatterns = [
      /(?:let's talk about|i want to talk about|can we discuss|talk about)\s+(.+?)(?:\.|!|\?|$)/i,
      /(?:change topic|new topic|different topic).+?about\s+(.+?)(?:\.|!|\?|$)/i
    ];

    for (const pattern of topicChangePatterns) {
      const match = input.match(pattern);
      if (match) {
        let newTopic = match[1].toLowerCase().trim();
        return this.mapToKnownTopic(newTopic);
      }
    }

    // Check for initial topic setting (first message)
    if (!this.conversationState.topic) {
      // More comprehensive initial topic detection
      const initialTopics = [
        'sports cars', 'cars', 'automobiles', 'ferrari', 'lamborghini',
        'candy', 'sweets', 'chocolate', 'treats',
        'apples', 'fruits', 'apple',
        'family', 'relatives', 'parents', 'siblings',
        'food', 'eating', 'cooking', 'meals',
        'music', 'songs', 'bands', 'artists',
        'movies', 'films', 'cinema',
        'games', 'gaming', 'video games',
        'travel', 'vacation', 'trip',
        'pets', 'dogs', 'cats', 'animals'
      ];

      const inputLower = input.toLowerCase();
      for (const topic of initialTopics) {
        if (inputLower.includes(topic)) {
          return this.mapToKnownTopic(topic);
        }
      }
    }

    return null;
  }

  private mapToKnownTopic(rawTopic: string): string {
    // Comprehensive topic mapping system
    const topicMappings = {
      'sports cars': ['sports cars', 'cars', 'automobiles', 'ferrari', 'lamborghini', 'vehicles', 'supercars', 'racing'],
      'candy': ['candy', 'sweets', 'chocolate', 'treats', 'sugar', 'dessert', 'gummy', 'lollipop'],
      'apples': ['apples', 'apple', 'fruit', 'fruits'],
      'family': ['family', 'relatives', 'parents', 'siblings', 'brother', 'sister', 'mom', 'dad'],
      'food': ['food', 'eating', 'cooking', 'meals', 'cuisine', 'restaurant', 'recipe'],
      'music': ['music', 'songs', 'bands', 'artists', 'concert', 'album', 'singing'],
      'movies': ['movies', 'films', 'cinema', 'actors', 'hollywood', 'director'],
      'games': ['games', 'gaming', 'video games', 'sports', 'play', 'xbox', 'playstation'],
      'travel': ['travel', 'vacation', 'trip', 'journey', 'traveling', 'adventure', 'explore'],
      'pets': ['pets', 'dogs', 'cats', 'animals', 'pet', 'puppy', 'kitten'],
      'books': ['books', 'reading', 'novel', 'author', 'story', 'literature'],
      'technology': ['technology', 'tech', 'computer', 'phone', 'internet', 'apps'],
      'nature': ['nature', 'outdoors', 'hiking', 'camping', 'mountains', 'forest']
    };

    // Find matching topic or return as-is for dynamic handling
    for (const [mainTopic, aliases] of Object.entries(topicMappings)) {
      if (aliases.some(alias => rawTopic.includes(alias))) {
        return mainTopic;
      }
    }

    // Return the raw topic for universal handling
    return rawTopic;
  }

  setTopic(input: string): void {
    // Store the user's response for context
    this.conversationState.lastUserResponse = input;

    // Only change topic if explicitly requested
    const newTopic = this.isExplicitTopicChange(input);

    if (newTopic && newTopic !== this.conversationState.topic) {
      console.log(`[ConversationManager] EXPLICIT topic change: ${this.conversationState.topic} → ${newTopic}`);

      // Reset for new topic
      this.conversationState.topic = newTopic;
      this.conversationState.depth = 0;
      this.conversationState.topicStartTime = Date.now();
      this.conversationState.questionsAsked.clear();
      this.conversationState.specificMentions.clear();
      this.conversationState.userPreferences.clear();
      this.conversationState.contextDetails.clear();
    }

    // ALWAYS extract mentions and preferences (even if same topic)
    this.extractSpecificMentions(input);
    this.extractUserPreferences(input);
  }

  private extractUserPreferences(input: string): void {
    const inputLower = input.toLowerCase();

    // Extract preferences
    if (inputLower.includes('i like') || inputLower.includes('i love')) {
      const preference = inputLower.replace(/.*?(i like|i love)\s+/, '').split(/[.!?]/)[0].trim();
      this.conversationState.userPreferences.set('likes', preference);
    }

    if (inputLower.includes('i prefer') || inputLower.includes('i choose')) {
      const preference = inputLower.replace(/.*?(i prefer|i choose)\s+/, '').split(/[.!?]/)[0].trim();
      this.conversationState.userPreferences.set('prefers', preference);
    }

    // Extract specific choices based on topic
    const topic = this.conversationState.topic;

    if (topic === 'sports cars') {
      if (inputLower.includes('ferrari')) this.conversationState.userPreferences.set('car_brand', 'ferrari');
      if (inputLower.includes('lamborghini')) this.conversationState.userPreferences.set('car_brand', 'lamborghini');
      if (inputLower.includes('red')) this.conversationState.contextDetails.set('color', 'red');
      if (inputLower.includes('speed')) this.conversationState.userPreferences.set('priority', 'speed');
      if (inputLower.includes('style')) this.conversationState.userPreferences.set('priority', 'style');
    }

    if (topic === 'candy') {
      if (inputLower.includes('chocolate')) this.conversationState.userPreferences.set('candy_type', 'chocolate');
      if (inputLower.includes('gummy') || inputLower.includes('gummies')) this.conversationState.userPreferences.set('candy_type', 'gummy');
      if (inputLower.includes('sour')) this.conversationState.userPreferences.set('candy_flavor', 'sour');
      if (inputLower.includes('sweet')) this.conversationState.userPreferences.set('candy_flavor', 'sweet');
      if (inputLower.includes('dark chocolate')) this.conversationState.contextDetails.set('chocolate_type', 'dark');
      if (inputLower.includes('milk chocolate')) this.conversationState.contextDetails.set('chocolate_type', 'milk');
      if (inputLower.includes('white chocolate')) this.conversationState.contextDetails.set('chocolate_type', 'white');
    }

    if (topic === 'apples') {
      if (inputLower.includes('red')) this.conversationState.contextDetails.set('type', 'red apples');
      if (inputLower.includes('green')) this.conversationState.contextDetails.set('type', 'green apples');
      if (inputLower.includes('sweet')) this.conversationState.userPreferences.set('taste', 'sweet');
      if (inputLower.includes('tart')) this.conversationState.userPreferences.set('taste', 'tart');
    }

    if (topic === 'music') {
      if (inputLower.includes('rock')) this.conversationState.userPreferences.set('genre', 'rock');
      if (inputLower.includes('pop')) this.conversationState.userPreferences.set('genre', 'pop');
      if (inputLower.includes('classical')) this.conversationState.userPreferences.set('genre', 'classical');
      if (inputLower.includes('jazz')) this.conversationState.userPreferences.set('genre', 'jazz');
    }

    if (topic === 'movies') {
      if (inputLower.includes('action')) this.conversationState.userPreferences.set('genre', 'action');
      if (inputLower.includes('comedy')) this.conversationState.userPreferences.set('genre', 'comedy');
      if (inputLower.includes('drama')) this.conversationState.userPreferences.set('genre', 'drama');
      if (inputLower.includes('horror')) this.conversationState.userPreferences.set('genre', 'horror');
    }
  }

  private extractSpecificMentions(input: string): void {
    const inputLower = input.toLowerCase();

    // Extract car brands and models
    const carBrands = ['ferrari', 'lamborghini', 'porsche', 'bmw', 'mercedes', 'audi', 'tesla', 'mclaren', 'bugatti', 'aston martin'];
    carBrands.forEach(brand => {
      if (inputLower.includes(brand)) {
        this.conversationState.specificMentions.add(brand);
      }
    });

    // Extract apple mentions
    const appleBrands = ['red delicious', 'granny smith', 'honeycrisp', 'gala', 'fuji', 'braeburn'];
    appleBrands.forEach(apple => {
      if (inputLower.includes(apple)) {
        this.conversationState.specificMentions.add(apple);
      }
    });

    // Extract color mentions
    const colors = ['red', 'green', 'yellow', 'blue', 'black', 'white', 'silver'];
    colors.forEach(color => {
      if (inputLower.includes(color)) {
        this.conversationState.specificMentions.add(color);
      }
    });
  }

  getCurrentTopic(): string {
    return this.conversationState.topic;
  }

  getTopicDepth(): number {
    return this.conversationState.depth;
  }

  incrementDepth(): void {
    this.conversationState.depth++;
    console.log(`[ConversationManager] Depth incremented to: ${this.conversationState.depth}`);
  }

  shouldContinueTopic(): boolean {
    const timeSinceStart = Date.now() - this.conversationState.topicStartTime;
    const maxTime = 5 * 60 * 1000; // 5 minutes
    return this.conversationState.depth < 7 && timeSinceStart < maxTime;
  }

  hasSpecificMention(item: string): boolean {
    return this.conversationState.specificMentions.has(item.toLowerCase());
  }

  getUserPreference(key: string): string | undefined {
    return this.conversationState.userPreferences.get(key);
  }

  getContextDetail(key: string): string | undefined {
    return this.conversationState.contextDetails.get(key);
  }

  hasAskedQuestion(question: string): boolean {
    return this.conversationState.questionsAsked.has(question);
  }

  markQuestionAsked(question: string): void {
    this.conversationState.questionsAsked.add(question);
  }

  resetTopic(): void {
    this.conversationState.topic = '';
    this.conversationState.depth = 0;
    this.conversationState.topicStartTime = Date.now();
    this.conversationState.questionsAsked.clear();
    this.conversationState.specificMentions.clear();
    this.conversationState.userPreferences.clear();
    this.conversationState.contextDetails.clear();
  }

  detectGrammarError(input: string): {hasError: boolean, correction: string, naturalCorrection: string} {
    // Enhanced grammar patterns including the critical "discovered ink" case
    const errorPatterns = [
      {pattern: /\bi\s+discovered\s+ink\b/i, correction: "I discovered it", naturalCorrection: "you discovered it"},
      {pattern: /\bi\s+likes?\b/i, correction: "I like", naturalCorrection: "you like"},
      {pattern: /\bhe\s+go\b/i, correction: "he goes", naturalCorrection: "he goes"},
      {pattern: /\bshe\s+have\b/i, correction: "she has", naturalCorrection: "she has"},
      {pattern: /\bthey\s+is\b/i, correction: "they are", naturalCorrection: "they are"},
      {pattern: /\bi\s+eated\b/i, correction: "I ate", naturalCorrection: "you ate"},
      {pattern: /\bi\s+goed\b/i, correction: "I went", naturalCorrection: "you went"},
      {pattern: /\bwe\s+was\b/i, correction: "we were", naturalCorrection: "we were"},
      {pattern: /\byou\s+was\b/i, correction: "you were", naturalCorrection: "you were"},
      {pattern: /\bi\s+am\s+go\b/i, correction: "I am going", naturalCorrection: "you're going"},
      {pattern: /\bthey\s+has\b/i, correction: "they have", naturalCorrection: "they have"},
      {pattern: /\bi\s+eats\b/i, correction: "I eat", naturalCorrection: "you eat"},
      {pattern: /\bi\s+don't\s+likes\b/i, correction: "I don't like", naturalCorrection: "you don't like"},
      {pattern: /\bi\s+doesn't\s+like\b/i, correction: "I don't like", naturalCorrection: "you don't like"}
    ];

    for (let error of errorPatterns) {
      if (error.pattern.test(input)) {
        const corrected = input.replace(error.pattern, error.correction);
        return {
          hasError: true,
          correction: corrected,
          naturalCorrection: error.naturalCorrection
        };
      }
    }

    return {hasError: false, correction: input, naturalCorrection: ''};
  }

  generateTopicResponse(userInput: string): string {
    const grammar = this.detectGrammarError(userInput);
    let grammarPrefix = '';

    // Natural grammar correction that flows in conversation
    if (grammar.hasError) {
      if (userInput.toLowerCase().includes('discovered ink')) {
        grammarPrefix = `You mean "discovered it" - `;
      } else if (userInput.toLowerCase().includes('i likes')) {
        grammarPrefix = `Oh, ${grammar.naturalCorrection} - `;
      } else {
        grammarPrefix = `Actually, ${grammar.naturalCorrection} - `;
      }
    }

    // Generate logical response based on conversation state
    const response = this.getLogicalResponse(userInput);
    this.markQuestionAsked(response);

    // CRITICAL: Increment depth AFTER generating response
    this.incrementDepth();

    return grammarPrefix + response;
  }

  private getLogicalResponse(userInput: string): string {
    const topic = this.conversationState.topic;
    const depth = this.conversationState.depth;

    // Handle all known topics with specific conversation flows
    switch(topic) {
      case 'sports cars':
      case 'cars':
        return this.getSportsCarResponse(userInput, depth);

      case 'candy':
      case 'sweets':
        return this.getCandyResponse(userInput, depth);

      case 'apples':
      case 'apple':
        return this.getAppleResponse(userInput, depth);

      case 'family':
        return this.getFamilyResponse(userInput, depth);

      case 'food':
      case 'eating':
        return this.getFoodResponse(userInput, depth);

      case 'music':
        return this.getMusicResponse(userInput, depth);

      case 'movies':
        return this.getMovieResponse(userInput, depth);

      case 'games':
        return this.getGamesResponse(userInput, depth);

      case 'travel':
        return this.getTravelResponse(userInput, depth);

      case 'pets':
        return this.getPetResponse(userInput, depth);

      default:
        // Universal topic handler for ANY topic not explicitly coded
        return this.getUniversalTopicResponse(topic, userInput, depth);
    }
  }

  private getSportsCarResponse(userInput: string, depth: number): string {
    const inputLower = userInput.toLowerCase();

    // Context-aware immediate responses
    if (inputLower.includes('fast') || inputLower.includes('speed')) {
      return "Speed is such a rush! I imagine hitting 200mph must feel like flying. What's the fastest you've ever experienced?";
    }

    if (inputLower.includes('sound') || inputLower.includes('engine')) {
      return "The sound is everything! A Ferrari V8 is like music, a Lamborghini V12 is like thunder. What's your favorite engine sound?";
    }

    // Logical progression based on what user has mentioned
    const hasFerrari = this.hasSpecificMention('ferrari');
    const hasLamborghini = this.hasSpecificMention('lamborghini');
    const hasBothCars = hasFerrari && hasLamborghini;
    const userCarBrand = this.getUserPreference('car_brand');
    const userColor = this.getContextDetail('color');
    const userPriority = this.getUserPreference('priority');

    // SMART PROGRESSION: Ask logical follow-ups based on what user shared
    if (depth === 0) {
      return "Sports cars are amazing! There's something about the sound of a powerful engine that gets me every time. What's your dream sports car?";
    }

    if (depth === 1) {
      if (hasBothCars) {
        return "Ferrari or Lamborghini - tough choice! I think Ferraris have that classic elegance, but Lamborghinis just scream power. Which would you choose?";
      } else if (hasFerrari) {
        return "Excellent choice! Ferraris are pure elegance - that prancing horse logo is iconic. Which Ferrari model makes your heart skip a beat?";
      } else if (hasLamborghini) {
        return "Lamborghini! Those scissor doors are so cool - pure drama. Which model gets your adrenaline pumping?";
      } else {
        return "I'm fascinated by how some prioritize speed while others focus on beauty. Do you lean toward speed demons or beautiful beasts?";
      }
    }

    if (depth === 2) {
      if (userCarBrand === 'ferrari') {
        return "Ferrari red is the perfect color for them - it's like they were born to be red! What color Ferrari would you want?";
      } else if (userCarBrand === 'lamborghini') {
        return "I love how bold Lamborghinis look - they're like supercars from the future! What color catches your eye most?";
      } else if (userPriority === 'speed') {
        return "Speed lovers unite! Have you ever been in something seriously fast that pinned you to your seat?";
      } else if (userPriority === 'style') {
        return "Style matters so much! What's the most beautiful car you've ever seen that just took your breath away?";
      } else {
        return "Both are incredible! What draws you to these brands - is it the sound, the looks, or something else?";
      }
    }

    if (depth === 3) {
      if (userColor === 'red') {
        return "Red is perfect for sports cars - it's like they were meant to be red! Have you seen one in person, or is this a dream for now?";
      } else {
        return "Great choice! Have you ever seen either Ferrari or Lamborghini in real life, or are these dream cars for now?";
      }
    }

    if (depth === 4) {
      return "I bet seeing one in real life is breathtaking! The curves and details look even better in person. What would be more exciting - hearing the engine or seeing the design up close?";
    }

    if (depth === 5) {
      return "Classic vs modern is always interesting! Would you rather have a vintage Ferrari with soul or a cutting-edge Lamborghini with all the tech?";
    }

    // Final question
    return "Car shows are like candy stores for car lovers! If you could attend any car event in the world, which would blow your mind the most?";
  }

  private getCandyResponse(userInput: string, depth: number): string {
    const inputLower = userInput.toLowerCase();

    // Context-aware immediate responses based on what user mentions
    if (inputLower.includes('chocolate')) {
      return "Chocolate is the best! I could live on it honestly. Dark, milk, or white chocolate - what's your weakness?";
    }

    if (inputLower.includes('sour')) {
      return "Sour candy is so fun! I love that face people make when they first taste something super sour. What's the sourest candy you've ever tried?";
    }

    if (inputLower.includes('gummy') || inputLower.includes('gummies')) {
      return "Gummy candy is amazing! I love how they come in every shape and flavor imaginable. Do you prefer bears, worms, or something else?";
    }

    // Logical progression based on user preferences
    const candyType = this.getUserPreference('candy_type');
    const candyFlavor = this.getUserPreference('candy_flavor');
    const chocolateType = this.getContextDetail('chocolate_type');

    if (depth === 0) {
      return "Candy is such a fun topic! I have a major sweet tooth - chocolate is my weakness. What's your favorite type of candy?";
    }

    if (depth === 1) {
      if (candyType === 'chocolate') {
        return "Chocolate lovers unite! I could eat it every day. Dark, milk, or white chocolate - what's your go-to?";
      } else if (candyType === 'gummy') {
        return "Gummy candy is so fun! I love how they're chewy and come in every shape imaginable. Do you prefer sour or sweet gummies?";
      } else if (candyFlavor === 'sour') {
        return "Sour candy is wild! I love watching people's faces when they try something super sour for the first time. What's your favorite sour candy?";
      } else {
        return "Sweet or sour - which way do you lean when you're craving candy?";
      }
    }

    if (depth === 2) {
      if (chocolateType === 'dark') {
        return "Dark chocolate is sophisticated! I love how rich and intense it is. Do you go for the super dark stuff or something milder?";
      } else if (chocolateType === 'milk') {
        return "Milk chocolate is classic comfort! It's like a warm hug in candy form. What's your favorite milk chocolate brand?";
      } else if (candyFlavor === 'sour') {
        return "Sour candy tolerance is a real skill! I remember building up to the really intense ones as a kid. How sour can you handle?";
      } else {
        return "I always grab candy at the movies - it's tradition! Do you have a go-to candy for special occasions like movies or holidays?";
      }
    }

    if (depth === 3) {
      return "Childhood candy memories are the best! I used to save my allowance for candy store trips - felt like being in Willy Wonka's factory. What candy reminds you of being a kid?";
    }

    if (depth === 4) {
      return "Candy preferences can be so personal! Some people are chocolate purists, others love the fruity stuff. Do you stick to favorites or like trying new candies?";
    }

    if (depth === 5) {
      return "Halloween must be your favorite holiday! All that candy variety in one night. Do you have a strategy for trick-or-treating or just grab everything?";
    }

    // Final candy question
    return "If you could create your own candy flavor, what would it taste like? I'd probably make some crazy chocolate-coffee-caramel combination!";
  }

  private getAppleResponse(userInput: string, depth: number): string {
    const inputLower = userInput.toLowerCase();

    // Context-aware immediate responses
    if (inputLower.includes('discovered it')) {
      return "That's exciting! Finding a new apple variety is like discovering treasure. I love trying new types at farmers markets. Where did you find it?";
    }

    if (inputLower.includes('sweet')) {
      return "I love sweet apples too! Gala and Fuji are perfect when you want that candy-like sweetness. What's your favorite sweet variety?";
    }

    // Logical progression for apples
    const userType = this.getContextDetail('type');
    const userTaste = this.getUserPreference('taste');

    if (depth === 0) {
      return "Perfect topic! I just had a Honeycrisp this morning - so crispy and sweet. They're my go-to snack. What's your favorite type of apple?";
    }

    if (depth === 1) {
      if (userType === 'red apples') {
        return "Red apples are classic! They always look so perfect and shiny. Red Delicious used to be my favorite as a kid. What kind of red apple do you like?";
      } else {
        return "I'm such an apple person! I love how different varieties have their own personality. Do you eat them fresh or use them for cooking?";
      }
    }

    if (depth === 2) {
      return "Apples are such a healthy habit! I try to have one every day - keeps the doctor away, right? How often do you enjoy them?";
    }

    if (depth === 3) {
      return "I love browsing the apple section at farmers markets - so many varieties! Where do you usually get yours?";
    }

    if (depth === 4) {
      return "Apple picking is the best fall activity! I went once and ate more than I picked. Have you ever been to an orchard?";
    }

    if (depth === 5) {
      return "The crunch is everything with apples! Honeycrisps win for me - that snap when you bite into them is so satisfying. What's the crunchiest apple you've ever had?";
    }

    return "Apples always remind me of childhood! My mom used to pack apple slices in my lunch every day. Do you have any special apple memories growing up?";
  }

  private getFamilyResponse(userInput: string, depth: number): string {
    if (depth === 0) {
      return "Family is everything! Mine's pretty close-knit - we're always texting in our group chat. How many people are in your family?";
    }

    if (depth === 1) {
      return "I love sibling dynamics! I'm closest to my sister - we're like best friends who happen to be related. Do you have any brothers or sisters?";
    }

    if (depth === 2) {
      return "Family relationships are so unique! I feel like I can tell my mom anything, but my dad and I bond over movies. Who are you closest to in your family?";
    }

    if (depth === 3) {
      return "Distance can be tough with family! Mine are scattered across different cities now, but we make it work with video calls. Do you all live near each other?";
    }

    if (depth === 4) {
      return "Family time is the best! We always end up playing board games and laughing until our stomachs hurt. What does your family love to do together?";
    }

    if (depth === 5) {
      return "I try to see my family at least once a month - life gets busy but they're worth the effort! How often do you get to spend time with yours?";
    }

    return "Family traditions are magical! We have this silly tradition where we watch old home videos every Christmas and laugh at our younger selves. What's your favorite family tradition?";
  }

  private getFoodResponse(userInput: string, depth: number): string {
    if (depth === 0) {
      return "Food is one of life's greatest pleasures! I'm always excited to try new flavors - lately I've been obsessed with Korean BBQ. What kind of food makes you happiest?";
    }

    if (depth === 1) {
      return "I love cooking, but I'm terrible at following recipes - I just throw things together and hope for the best! Are you a cook or do you prefer letting others handle the kitchen?";
    }

    if (depth === 2) {
      return "I'm definitely a breakfast person! There's something magical about starting the day with good food and coffee. What's your favorite meal of the day?";
    }

    if (depth === 3) {
      return "I just tried Ethiopian food for the first time last week - the spices were incredible! I love how food can transport you to different cultures. Have you discovered any new cuisines recently?";
    }

    if (depth === 4) {
      return "We all have those foods we just can't handle! I cannot deal with mushrooms - the texture gets me every time. What foods make you go 'absolutely not'?";
    }

    if (depth === 5) {
      return "The best meals are always with good company! I had this amazing pasta in a tiny restaurant with my friends last month - simple but perfect. What's been your most memorable meal?";
    }

    return "Comfort food hits different when you need it most! My go-to is my grandmother's recipe for mac and cheese - pure nostalgia in a bowl. Do you have any foods that instantly make you feel at home?";
  }

  private getMusicResponse(userInput: string, depth: number): string {
    if (depth === 0) {
      return "Music is life! I listen to everything from classical to hip-hop - there's something magical about how it can instantly change your mood. What kind of music speaks to your soul?";
    }

    const genre = this.getUserPreference('genre');
    if (depth === 1 && genre) {
      return `${genre} is awesome! I love how each genre has its own energy and vibe. What got you into ${genre}?`;
    }

    const responses = [
      "Do you play any instruments, or are you more of a listener?",
      "What's the best concert you've ever been to?",
      "Do you prefer discovering new artists or sticking with favorites?",
      "What song can you listen to on repeat and never get tired of?"
    ];

    return responses[Math.min(depth - 1, responses.length - 1)];
  }

  private getMovieResponse(userInput: string, depth: number): string {
    if (depth === 0) {
      return "Movies are amazing! I love how they can transport us to different worlds in just two hours. What kind of movies do you enjoy most?";
    }

    const responses = [
      "Do you prefer watching at home or the full cinema experience?",
      "What's the last movie that really blew your mind?",
      "Are you into classics or do you prefer newer films?",
      "Do you have any favorite actors or directors?"
    ];

    return responses[Math.min(depth - 1, responses.length - 1)];
  }

  private getGamesResponse(userInput: string, depth: number): string {
    if (depth === 0) {
      return "Games are so much fun! From board games to video games, I love how they bring people together. What type of games do you play?";
    }

    const responses = [
      "Do you prefer playing solo or with friends?",
      "What's the most addictive game you've ever played?",
      "Are you competitive or do you play just for fun?",
      "What got you into gaming in the first place?"
    ];

    return responses[Math.min(depth - 1, responses.length - 1)];
  }

  private getTravelResponse(userInput: string, depth: number): string {
    if (depth === 0) {
      return "Travel is the best education! I dream of seeing every corner of the world - there's something magical about experiencing new cultures. Where's the most amazing place you've been?";
    }

    const responses = [
      "Do you prefer adventure travel or relaxing vacations?",
      "What's on your travel bucket list?",
      "Do you like planning trips in detail or being spontaneous?",
      "What's the best food you've discovered while traveling?"
    ];

    return responses[Math.min(depth - 1, responses.length - 1)];
  }

  private getPetResponse(userInput: string, depth: number): string {
    if (depth === 0) {
      return "Pets make life better! They're like family members with fur, feathers, or scales. Do you have any pets?";
    }

    const responses = [
      "What's the funniest thing your pet has ever done?",
      "Do you prefer cats, dogs, or something more exotic?",
      "How did you choose your pet's name?",
      "What's the best part about having a pet?"
    ];

    return responses[Math.min(depth - 1, responses.length - 1)];
  }

  private getUniversalTopicResponse(topic: string, userInput: string, depth: number): string {
    // CRITICAL: Always acknowledge and relate to the actual topic - NEVER generic responses

    const topicCapitalized = topic.charAt(0).toUpperCase() + topic.slice(1);

    // First response MUST acknowledge the topic enthusiastically
    if (depth === 0) {
      const topicStarters = {
        'dinosaurs': "Dinosaurs - incredible creatures! I'm fascinated by how they ruled the Earth for millions of years. What's your favorite dinosaur?",
        'space': "Space is mind-blowing! The universe is so vast and mysterious - I love thinking about all the possibilities out there. What fascinates you most about space?",
        'art': "Art is so powerful! It can express emotions in ways words can't. What kind of art speaks to you?",
        'science': "Science is amazing! I love how it helps us understand the world around us. What area of science interests you most?",
        'history': "History is fascinating! Learning about the past helps us understand the present. What historical period interests you?",
        'photography': "Photography is such a cool art form! Capturing moments and emotions in a single frame. Do you take photos or just enjoy looking at them?",
        'cooking': "Cooking is like edible art! I love how you can create something delicious from simple ingredients. What's your favorite thing to cook?",
        'default': `${topicCapitalized} is really interesting! I find ${topic} fascinating - there's always so much to learn and discover. What specifically about ${topic} interests you most?`
      };

      return topicStarters[topic] || topicStarters['default'];
    }

    // Dynamic follow-ups that always reference the topic
    const dynamicResponses = [
      `What got you interested in ${topic} in the first place?`,
      `What's your favorite thing about ${topic}?`,
      `How long have you been into ${topic}?`,
      `What would you recommend to someone new to ${topic}?`,
      `What's the most interesting thing about ${topic} that most people don't know?`,
      `Do you have any ${topic}-related goals or dreams?`
    ];

    return dynamicResponses[Math.min(depth - 1, dynamicResponses.length - 1)];
  }

  getNaturalFollowUp(input: string): string {
    const inputLower = input.toLowerCase();

    // Enthusiastic reactions with AI personality sharing
    if (inputLower.includes('like') || inputLower.includes('love')) {
      const responses = [
        "I love that too! What is it about that that gets you excited?",
        "Same here! When did you first discover you were into that?",
        "That's awesome! I can totally relate - what makes it so special to you?",
        "I get that completely! There's something addictive about things we love, right? What draws you to it?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (inputLower.includes('yesterday') || inputLower.includes('today')) {
      const responses = [
        "That's so cool! How was that experience for you?",
        "Nice! I love when days turn out special like that. What made it memorable?",
        "Yesterday sounds like a good day! How did that go?",
        "Today's been great for me too! What made yours special?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (inputLower.includes('discovered') || inputLower.includes('found')) {
      const responses = [
        "That's exciting! I love discovering new things. Where did you find that?",
        "Discovery moments are the best! How did you stumble upon that?",
        "I'm always finding new stuff too! What led you to try that?",
        "Finding something new is like finding treasure! Where did you discover it?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (inputLower.includes("don't") || inputLower.includes('hate')) {
      const responses = [
        "I totally get having strong dislikes! What is it about that that bothers you?",
        "We all have those things that just don't work for us! Have you always felt that way?",
        "I understand that feeling! What would make it more appealing to you?",
        "Some things just don't click, right? What specifically puts you off about it?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (inputLower.includes('sometimes') || inputLower.includes('usually')) {
      const responses = [
        "I'm like that with some things too! How often would you say that happens?",
        "Patterns are interesting! When do you usually find yourself doing that?",
        "I notice I have routines like that too! What determines when you do it?",
        "That's a relatable habit! What makes you choose sometimes versus other times?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (inputLower.includes('amazing') || inputLower.includes('awesome') || inputLower.includes('great')) {
      const responses = [
        "That does sound amazing! I get excited hearing about things like that. What made it so special?",
        "I can hear the excitement in what you're saying! That sounds really cool. What was the best part?",
        "Wow, that's fantastic! I love when people are passionate about things. What got you so into it?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (inputLower.includes('hard') || inputLower.includes('difficult') || inputLower.includes('tough')) {
      const responses = [
        "That sounds challenging! I can relate to tough situations. How are you handling it?",
        "Difficult things can be so frustrating! What's making it particularly hard for you?",
        "I feel you on that - some things are just tough! What would make it easier?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Enhanced default responses with AI personality and enthusiasm
    const naturalResponses = [
      "That's really interesting! What got you started with that?",
      "I'm curious about that! How long have you been into it?",
      "That sounds cool! What's your favorite thing about it?",
      "I love learning about people's interests! When did you first try that?",
      "That's fascinating! How did you discover that was your thing?",
      "I can tell you're passionate about this! What keeps drawing you back to it?",
      "That sounds like something I'd enjoy too! What would you recommend to a beginner?",
      "I'm getting excited just hearing about it! What's the most fun part for you?"
    ];

    return naturalResponses[Math.floor(Math.random() * naturalResponses.length)];
  }

  addToHistory(user: string, ai: string): void {
    this.conversationState.history.push({user, ai});
    // Keep only last 10 exchanges for memory management
    if (this.conversationState.history.length > 10) {
      this.conversationState.history.shift();
    }
  }

  getConversationContext(): string {
    return this.conversationState.history.map(h => `User: ${h.user}\nAI: ${h.ai}`).join('\n');
  }
}

// Global conversation manager instance
const conversationManager = new ConversationManager();


// Premium XP Progress Bar component
const XPProgressBar = ({ current, max, className }: { current: number; max: number; className?: string }) => {
  const percentage = (current / max) * 100;
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full h-4 rounded-full overflow-hidden bg-black/20 backdrop-blur-sm"
        style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <div 
          className="h-full transition-all duration-700 ease-out rounded-full relative overflow-hidden"
          style={{ 
            width: `${percentage}%`,
            background: 'var(--gradient-xp)',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-white/90 text-sm font-medium">⚡ XP</span>
        <span className="text-white font-bold text-sm">
          {current} / {max}
        </span>
      </div>
    </div>
  );
};

// Premium Chat Bubble component
const ChatBubble = ({ 
  message, 
  isUser = false, 
  className 
}: { 
  message: string; 
  isUser?: boolean; 
  className?: string; 
}) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 ${className}`}>
    <div className="flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[85%]">
      <div 
        className={`conversation-bubble px-4 py-3 sm:px-5 sm:py-4 font-medium text-sm sm:text-base leading-relaxed flex-1 ${
          isUser 
            ? 'bg-gradient-to-br from-white/95 to-white/85 text-gray-800 border-l-4 border-orange-400' 
            : 'bg-gradient-to-br from-blue-50/90 to-blue-100/80 text-gray-800 border-l-4 border-blue-400'
        }`}
      >
        {message}
      </div>
      
      {/* Bookmark button for non-user messages (AI responses) */}
      {!isUser && (
        <BookmarkButton
          content={message}
          type="message"
          className="mt-2 sm:mt-3 opacity-60 hover:opacity-100 text-xs sm:text-sm pill-button"
        />
      )}
    </div>
  </div>
);

interface SpeakingAppProps {
  initialMessage?: string;
}

export default function SpeakingApp({ initialMessage }: SpeakingAppProps = {}) {
  // Initialize isSpeaking state first
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { avatarState, setAvatarState } = useAvatarState({ isSpeaking });
  const { incrementSpeakingSubmissions } = useBadgeSystem();
  const { toast } = useToast();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // G) Single source of truth: Speaking page sound state
  const [speakingSoundEnabled, setSpeakingSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('speaking.sound.enabled');
    return saved !== null ? saved === 'true' : true; // Default = true
  });
  const [audioContextResumed, setAudioContextResumed] = useState(false);
  
  // TTS listener authority state
  const [ttsListenerActive, setTtsListenerActive] = useState(false);

  // TTS debouncing state to prevent repetition
  const [lastTTSMessage, setLastTTSMessage] = useState<string>('');
  const [ttsDebounceTime, setTtsDebounceTime] = useState<number>(0);
  
  const { level, xp_current, next_threshold, awardXp } = useProgressStore();

  // 1) Helper to guarantee sound is ready
  const ensureSoundReady = async () => {
    const enabled = localStorage.getItem('speaking.sound.enabled') !== 'false';
    let resumed = false;
    if (enabled) {
      try {
        resumed = await enableAudioContext();
      } catch (error) {
        console.warn('Failed to enable audio context:', error);
        setErrorMessage("Could not enable audio. Please check your browser settings.");
        setTimeout(() => setErrorMessage(''), 5000); // Auto-hide after 5 seconds
        toast({
          title: "Audio Error",
          description: "Could not enable audio. Please check your browser settings.",
          variant: "destructive"
        });
        resumed = false;
      }
    }
    if (process.env.NODE_ENV === 'development') console.log('HF_SOUND', { enabled, resumed });
    return { enabled, resumed };
  };

  // Helper function to enable audio context for TTS (autoplay policy compliance)
  const enableAudioContext = async (): Promise<boolean> => {
    try {
      if (typeof window !== 'undefined' && window.AudioContext) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
          if (process.env.NODE_ENV === 'development') console.log('HF_SOUND: AudioContext resumed');
        }
        // Close the context to prevent memory leak
        audioContext.close();
        setAudioContextResumed(true);
        return true;
      }
      return false;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.warn('HF_SOUND: Failed to enable AudioContext:', error);
      return false;
    }
  };

  // Keep icon and engine in sync: Persist sound state changes
  const toggleSpeakingSound = () => {
    const newEnabled = !speakingSoundEnabled;
    if (process.env.NODE_ENV === 'development') console.log('HF_SOUND_TOGGLE', { enabled: newEnabled });
    
    setSpeakingSoundEnabled(newEnabled);
    localStorage.setItem('speaking.sound.enabled', newEnabled.toString());
    
    // Immediately sync with TTS manager
    if (!newEnabled && TTSManager.isSpeaking()) {
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }
  };

  // On mount, sync TTS manager with localStorage state and cleanup on unmount
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log('HF_SOUND: Initializing with state:', speakingSoundEnabled);

    // CRITICAL: Initialize RobustTTSManager on component mount for perfect TTS
    RobustTTSManager.initialize();

    // Ensure voices are loaded for optimal voice selection
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        RobustTTSManager.initialize();
      };
    }

    let isMounted = true;
    let errorTimeouts: NodeJS.Timeout[] = [];

    // Initialize mic orchestrator (lightweight, no permissions)
    const initOrchestrator = async () => {
      if (!isMounted) return;

      try {
        await micOrchestrator.init();

        if (!isMounted) return;

        // Set up orchestrator callbacks
        micOrchestrator.setCallbacks({
          onStateChange: (state) => {
            if (!isMounted) return;
            if (process.env.NODE_ENV === 'development') console.log('Mic state:', state);

            // Update recording state for visual feedback
            setActuallyRecording(state === 'recording' || state === 'listening');

            // Update flowState based on mic state
            switch (state) {
              case 'listening':
                setFlowState('LISTENING');
                break;
              case 'recording':
                setFlowState('PROCESSING');
                break;
              case 'error':
                setFlowState('PAUSED');
                setErrorMessage('Microphone error occurred. Please try again.');
                setActuallyRecording(false);
                break;
              default:
                setActuallyRecording(false);
                break;
            }
          },

          onRmsUpdate: (rms) => {
            if (!isMounted) return;
            // Convert RMS to a percentage (assuming -100 to 0 dB range)
            const normalizedRms = Math.max(0, (rms + 100) / 100);
            setMicRmsLevel(normalizedRms);
          },

          onTranscript: async (transcript) => {
            if (!isMounted) return;
            if (process.env.NODE_ENV === 'development') console.log('Transcript received:', transcript);

            // Add user message and process
            addChatBubble(transcript, 'user');
            setFlowState('PROCESSING');
            await executeTeacherLoop(transcript);
          },

          onError: (error) => {
            if (!isMounted) return;
            console.error('Mic orchestrator error:', error);
            setErrorMessage(error.message);
            const timeout = setTimeout(() => {
              if (isMounted) setErrorMessage('');
            }, 5000);
            errorTimeouts.push(timeout);

            toast({
              title: "Microphone Error",
              description: error.message,
              variant: "destructive"
            });
          },

          onVoiceStart: () => {
            if (!isMounted) return;
            // Handle barge-in
            if (TTSManager.isSpeaking()) {
              console.log('Barge-in detected, stopping TTS');
              TTSManager.forceStop();
            }
          }
        });

        // Set up TTS callbacks for orchestrator integration
        TTSManager.setOnStart(() => {
          if (isMounted) micOrchestrator.pauseForTTS();
        });

        TTSManager.setOnEnd(() => {
          if (isMounted) micOrchestrator.resumeAfterTTS();
        });

        console.log('[SpeakingApp] Orchestrator initialized (no permissions requested yet)');
      } catch (error) {
        if (!isMounted) return;
        console.error('Failed to initialize mic orchestrator:', error);
        setErrorMessage('Failed to initialize audio system. Please refresh the page.');
        const timeout = setTimeout(() => {
          if (isMounted) setErrorMessage('');
        }, 5000);
        errorTimeouts.push(timeout);
      }
    };

    initOrchestrator();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;

      // Clear all timeouts
      ttsCompletionTimeouts.forEach(clearTimeout);
      micReopenTimeouts.forEach(clearTimeout);
      errorTimeouts.forEach(clearTimeout);

      // Stop any ongoing TTS (both systems)
      if (TTSManager.isSpeaking()) {
        TTSManager.stop();
      }
      RobustTTSManager.stop();

      // Shutdown mic orchestrator
      micOrchestrator.shutdown();

      // Clear TTS callbacks
      TTSManager.setOnStart(null);
      TTSManager.setOnEnd(null);
    };
  }, []);
  
  // A) Authoritative flow (finite-state machine)
  // States: IDLE / READING / LISTENING / PROCESSING / PAUSED
  const [flowState, setFlowState] = useState<'IDLE' | 'READING' | 'LISTENING' | 'PROCESSING' | 'PAUSED'>('IDLE');
  
  // A) Stop duplicates at the source: NO default/initial assistant message seeded
  // Feed must come only from conversation store/back-end
  const [messages, setMessages] = useState<Array<{
    text: string;
    isUser: boolean;
    isSystem: boolean;
    id: string;
    role: 'user' | 'assistant';
    content: string;
    seq: number;
  }>>([]);

  // B) No-duplicate rules + messageKey deduplication system
  const [spokenKeys, setSpokenKeys] = useState<Set<string>>(new Set()); // Track spoken message keys
  const [lastSpokenSeq, setLastSpokenSeq] = useState(0);
  const [messageSeqCounter, setMessageSeqCounter] = useState(1); // Start from 1 (no initial message)
  
  // C) Guard rails: Turn token system for preventing stale events
  const [currentTurnToken, setCurrentTurnToken] = useState<string>('');
  const [lastPlayedMessageIds, setLastPlayedMessageIds] = useState<Set<string>>(new Set());
  const [replayCounter, setReplayCounter] = useState(0);
  const [ttsCompletionTimeouts, setTtsCompletionTimeouts] = useState<Set<NodeJS.Timeout>>(new Set());
  const [micReopenTimeouts, setMicReopenTimeouts] = useState<Set<NodeJS.Timeout>>(new Set());
  
  // C) Remember where we paused (for correct Resume)
  const [pausedFrom, setPausedFrom] = useState<'READING' | 'LISTENING' | 'PROCESSING' | null>(null);

  // Helper function to compute stable messageKey for deduplication (fix regression)
  const stableMessageKey = (text: string, serverId?: string) => {
    // Use server ID if available, otherwise hash ONLY the assistant text (no timestamps, no counters)
    if (serverId) {
      if (process.env.NODE_ENV === 'development') console.log('HF_KEY', { key: `server:${serverId}`, hasServerId: true, previewText: text.substring(0, 30) });
      return `server:${serverId}`;
    }
    
    // Hash only the content for stability
    const hash = text.substring(0, 200).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const key = `msg-${Math.abs(hash)}`;
    if (process.env.NODE_ENV === 'development') console.log('HF_KEY', { key, hasServerId: false, previewText: text.substring(0, 30) });
    return key;
  };

  // Helper for ephemeral keys (text-only, no server id)
  const stableKeyFromText = (text: string): string => {
    const hash = text.substring(0, 200).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const key = `msg-${Math.abs(hash)}`;
    if (process.env.NODE_ENV === 'development') console.log('HF_KEY', { key, source: 'ephemeral', previewText: text.substring(0, 30) });
    return key;
  };

  // Legacy computeMessageKey (deprecated - use stableMessageKey instead)
  const computeMessageKey = (level: string, module: string, qIndex: number, text: string, serverId?: string) => {
    // Redirect to stable version
    return stableMessageKey(text, serverId);
  };

  // Unread assistant detection
  const unreadAssistantExists = () => {
    const latestMessage = findLatestEligibleAssistantMessage();
    if (!latestMessage) return false;
    
    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
    const unread = !spokenKeys.has(messageKey);
    if (process.env.NODE_ENV === 'development') console.log('HF_PRIMARY', { action: 'check_unread', unread, messageKey, previewText: latestMessage.text.substring(0, 30) });
    return unread;
  };
  
  // Helper function to find newest eligible assistant message (B - Newest assistant only)
  const findLatestEligibleAssistantMessage = () => {
    // B) Eligible-to-speak filter: Only assistant messages (role=assistant), never user/meta
    const eligibleMessages = messages.filter(m => 
      m.role === 'assistant' && 
      !m.isUser && 
      !m.isSystem && 
      m.text.trim() &&
      !m.text.startsWith('💭 You said:') // Never speak echo messages
    );
    
    return eligibleMessages[eligibleMessages.length - 1]; // Latest only
  };

  // A) New state for ephemeral assistant ghost bubble and live captions
  const [ephemeralAssistant, setEphemeralAssistant] = useState<null | { key: string; text: string }>(null);
  const [interimCaption, setInterimCaption] = useState<string>(''); // live mic caption text
  const [speakingMessageKey, setSpeakingMessageKey] = useState<string | null>(null);

  // Helper to check if server bubble exists for a given key
  const hasServerAssistant = (key: string) =>
    messages.some(m => m.role === 'assistant' && stableMessageKey(m.text, m.id) === key);

  // Remove useSpeakingTTS hook - we'll use strict turn-taking logic instead
  
  const [micState, setMicState] = useState<'idle' | 'recording' | 'paused' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [history, setHistory] = useState<Array<{input: string; corrected: string; time: string}>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("What would you like to talk about today?");
  const [conversationContext, setConversationContext] = useState("");
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [isProcessingTranscript, setIsProcessingTranscript] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string>('');
  const [lastMessageTime, setLastMessageTime] = useState<number>();

  // Topic tracking for conversation continuity
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [topicTurnCount, setTopicTurnCount] = useState(0);
  
  // Hands-Free Mode state and logic
  const [hfEnabled, setHfEnabled] = useState(() => {
    // Enable by default for minimal UI
    return true;
  });

  // Debug overlay visibility
  const [showDebugOverlay, setShowDebugOverlay] = useState(() => {
    return new URLSearchParams(window.location.search).has('debugAudio');
  });

  // Permission state management
  const [permissionState, setPermissionState] = useState<'unknown' | 'requesting' | 'granted' | 'denied'>('unknown');
  const [micInitialized, setMicInitialized] = useState(false);

  // Microphone audio level for visual feedback
  const [micRmsLevel, setMicRmsLevel] = useState(0);
  const [actuallyRecording, setActuallyRecording] = useState(false);

  // Helper function to generate turn token (authoritative current turn)
  const generateTurnToken = useCallback(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const token = `turn-${timestamp}-${random}`;
    if (process.env.NODE_ENV === 'development') console.log('HF_TURN_TOKEN_GENERATED:', token);
    return token;
  }, []);

  // Helper function to compute messageId from turnToken + phase + text + replay
  const computeMessageId = useCallback((turnToken: string, phase: 'prompt' | 'feedback', text: string, replay = 0) => {
    const baseId = `${turnToken}-${phase}-${text.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '')}`;
    const hash = baseId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const replaySuffix = replay > 0 ? `-r${replay}` : '';
    return `msg-${Math.abs(hash)}-${phase}${replaySuffix}`;
  }, []);

  // Clear old state/timers on every new turn
  const cancelOldListeners = () => {
    // Clear TTS completion timeouts
    ttsCompletionTimeouts.forEach(clearTimeout);
    setTtsCompletionTimeouts(new Set());
    
    // Clear mic reopen timeouts
    micReopenTimeouts.forEach(clearTimeout);
    setMicReopenTimeouts(new Set());
    
    // Stop any current TTS (no coalesce)
    if (TTSManager.isSpeaking()) {
      console.log('HF_ADVANCE: stopping TTS for new turn');
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }
    
    // Stop mic if active with proper state sync
    if (micState === 'recording') {
      console.log('🎤 HF_ADVANCE: stopping mic for new turn');
      micOrchestrator.shutdown();
      setMicState('idle'); // Sync state
    }
  };

  // 2) When starting a turn, always pass a token and always call completion
  const startNewTurn = () => {
    const tok = `turn-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;
    cancelOldListeners();
    setCurrentTurnToken(tok);
    setReplayCounter(0);
    setFlowState('IDLE');
    if (process.env.NODE_ENV === 'development') console.log('HF_NEW_TURN', { newToken: tok });
    return tok;
  };

  // First-play / resume path (starter or latest assistant)
  const playAssistantOnce = async (text: string, messageKey: string) => {
    const token = startNewTurn();
    setFlowState('READING');
    setTtsListenerActive(true); // Enable TTS listener authority

    const { enabled } = await ensureSoundReady();

    let resolved = false;
    const watchdog = setTimeout(() => {
      if (!resolved && process.env.NODE_ENV === 'development') console.warn('HF_TTS_WATCHDOG: forcing completion');
    }, 12000);

    try {
      if (enabled) {
        await TTSManager.speak(text, { canSkip: false }).finally(() => {
          resolved = true; 
          clearTimeout(watchdog);
        });
      } else {
        if (process.env.NODE_ENV === 'development') console.log('HF_PROMPT_SKIP (muted)');
        resolved = true; 
        clearTimeout(watchdog);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') console.warn('HF_TTS_ERROR', e); 
      resolved = true; 
      clearTimeout(watchdog);
    } finally {
      await handleTTSCompletion(token);   // ← ALWAYS
    }
  };

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  // Append user/assistant messages (unified with sequence counter)
  const addChatBubble = (text: string, type: "user" | "bot" | "system", messageId?: string, messageKey?: string) => {
    const seq = messageSeqCounter;
    setMessageSeqCounter(prev => prev + 1);

    const id = messageId || `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newMessage = {
      id,
      text: text.trim(),
      isUser: type === "user",
      isSystem: type === "system",
      role: type === "user" ? "user" as const : "assistant" as const,
      content: text.trim(),
      seq
    };

    setMessages(prev => [...prev, newMessage]);
    setLastMessageTime(Date.now());
    scrollToBottom(); // Auto-scroll after adding message

    return { id, seq, messageKey };
  };

  // B) Separate "append" vs "speak": Only speak existing messages, never append when speaking
  type SpeakOpts = { token?: string };
  const speakExistingMessage = async (
    text: string, 
    messageKey: string, 
    phase: 'prompt' | 'feedback' = 'feedback', 
    isRepeat = false, 
    opts: SpeakOpts = {}
  ) => {
    if (process.env.NODE_ENV === 'development') console.log('[Speaking] Speaking existing message:', text.substring(0, 50) + '...', { flowState, messageKey });
    
    // Use ghost only when there's no server bubble; otherwise highlight the real bubble
    if (!hasServerAssistant(messageKey)) {
      setEphemeralAssistant({ key: messageKey, text });
      if (process.env.NODE_ENV === 'development') console.log('HF_GHOST', { key: messageKey, preview: text.slice(0, 40) });
    } else {
      setSpeakingMessageKey(messageKey);
      if (process.env.NODE_ENV === 'development') console.log('HF_SPEAKING', { key: messageKey });
    }
    
    // State machine: Only speak during READING state
    if (flowState !== 'READING' && !isRepeat) {
      if (process.env.NODE_ENV === 'development') console.log('HF_TTS_SKIP: not in READING state', { flowState });
      return messageKey;
    }
    
    // B) Deduplicate by messageKey: Only speak if messageKey not in spokenKeys  
    if (spokenKeys.has(messageKey) && !isRepeat) {
      if (process.env.NODE_ENV === 'development') console.log('HF_DROP_DUP: messageKey already spoken', { messageKey });
      return messageKey;
    }

    // Use explicit token or current turn token - NEVER mint a second token if one was given
    const turnToken = opts.token ?? currentTurnToken ?? startNewTurn();
    
    // Compute messageId for turn token events
    const replay = isRepeat ? replayCounter + 1 : 0;
    const messageId = computeMessageId(turnToken, phase, text, replay);
    
    // Check if already played by messageId (turn-level idempotency)
    if (lastPlayedMessageIds.has(messageId) && !isRepeat) {
      if (process.env.NODE_ENV === 'development') console.log('HF_DROP_STALE: messageId already played', { messageId, turnToken });
      await handleTTSCompletion(turnToken, messageId);
      return messageKey;
    }

    // D) One voice at a time: Stop any ongoing TTS before starting new one
    if (TTSManager.isSpeaking() && !isRepeat) {
      if (process.env.NODE_ENV === 'development') console.log('HF_TTS_COALESCE: stopping old TTS for newer message');
      TTSManager.stop();
      setIsSpeaking(false);
      setAvatarState('idle');
    }

    // Mark as spoken and played
    setSpokenKeys(prev => new Set([...prev, messageKey]));
    setLastPlayedMessageIds(prev => new Set([...prev, messageId]));
    if (isRepeat) {
      setReplayCounter(replay);
    }

    // C) Single authority: TTS can only be triggered by the hands-free controller when it has authority
    if (!ttsListenerActive) {
      if (process.env.NODE_ENV === 'development') console.log('HF_TTS_SKIP: no active TTS listener authority', { ttsListenerActive });
      return messageKey;
    }
    
    // Turn token guard: Ensure we're still on the correct turn
    if (turnToken !== currentTurnToken) {
      if (process.env.NODE_ENV === 'development') console.log('HF_DROP_STALE: turn token mismatch during TTS', { turnToken, currentTurnToken });
      return messageKey;
    }
    // D) Sound toggle compliance: Check if sound is enabled before TTS
    if (speakingSoundEnabled) {
      // On first Play: Autoplay policy compliance - resume AudioContext
      if (!audioContextResumed) {
        const resumed = await enableAudioContext();
        if (!resumed) {
          if (process.env.NODE_ENV === 'development') console.log('HF_SOUND_FAIL: AudioContext resume failed', { turnToken, messageId });
          // Show tooltip: "Tap Play to enable sound" but don't mark as complete
          setErrorMessage("Tap Play to enable sound");
          return messageKey;
        }
      }
      
      if (process.env.NODE_ENV === 'development') console.log('HF_PROMPT_PLAY', { turnToken, messageId, messageKey, phase, textHash: text.substring(0, 20), state: flowState });
      
      // A) State transition: Enter READING state for TTS
      setFlowState('READING');
      setIsSpeaking(true);
      setAvatarState('talking');

      // Wrap TTSManager.speak with watchdog and always-finally
      let resolved = false;
      const wd = setTimeout(() => {
        if (!resolved) {
          if (process.env.NODE_ENV === 'development') console.warn('HF_TTS_WD_FIRED');
          resolved = true;
          forceToListening('watchdog');
        }
      }, 7000); // 7s is enough for a short prompt

      try {
        await TTSManager.speak(text, { canSkip: true })
          .then(() => { if (process.env.NODE_ENV === 'development') console.log('HF_TTS_DONE'); })
          .catch(e => { if (process.env.NODE_ENV === 'development') console.warn('HF_TTS_ERR', e); })
          .finally(() => {
            resolved = true;
            clearTimeout(wd);
            forceToListening('tts-finally');
          });
      } catch (error) {
        if (process.env.NODE_ENV === 'development') console.warn('[Speaking] Failed to speak message:', error);
        resolved = true;
        clearTimeout(wd);
        forceToListening('tts-error');
      } finally {
        setIsSpeaking(false);
        setAvatarState('idle');
        
        // Clear speaking indicators
        setSpeakingMessageKey(null);
        setEphemeralAssistant(null);
      }
    } else {
      // When muted (we emit HF_PROMPT_SKIP) call forceToListening instead of setState-only
      if (process.env.NODE_ENV === 'development') console.log('HF_TTS_SKIP');
      
      // Clear speaking indicators  
      setSpeakingMessageKey(null);
      setEphemeralAssistant(null);
      
      // Force to listening with muted skip reason
      forceToListening('muted-skip');
    }
    
    return messageKey;
  };

  // B) Separate "append" vs "speak": NEVER append when only speaking existing messages
  const speakLatestAssistantMessage = async (isRepeat = false) => {
    if (process.env.NODE_ENV === 'development') console.log('[Speaking] Finding latest assistant message to speak', { flowState });
    
    // B) Find newest eligible assistant message only
    const latestMessage = findLatestEligibleAssistantMessage();
    
    if (!latestMessage) {
      if (process.env.NODE_ENV === 'development') console.log('HF_TTS_SKIP: no eligible assistant message found');
      setFlowState('IDLE');
      return;
    }
    
    // Generate messageKey for deduplication (fix regression - use stable key)
    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
    
    if (process.env.NODE_ENV === 'development') console.log('[Speaking] Latest assistant message found', { 
      messageKey, 
      text: latestMessage.text.substring(0, 50) + '...',
      spokenBefore: spokenKeys.has(messageKey)
    });
    
    // Speak without appending - this message already exists in chat
    const token = currentTurnToken || startNewTurn();
    await speakExistingMessage(latestMessage.text, messageKey, 'prompt', isRepeat, { token });
  };

  // Only append new messages from backend, never fabricate client-side
  const addAssistantMessage = async (message: string, phase: 'prompt' | 'feedback' = 'feedback') => {
    if (process.env.NODE_ENV === 'development') console.log('[Speaking] Adding new assistant message from backend:', message.substring(0, 50) + '...', { flowState });
    
    // Use current turn token or generate new one if missing
    const turnToken = currentTurnToken || startNewTurn();
    
    // Compute messageId for strict idempotency
    const messageId = computeMessageId(turnToken, phase, message, 0);
    
    // Add to chat and get sequence number - this is the ONLY place we append assistant messages
    const { id, seq } = addChatBubble(message, "bot", messageId);
    
    // Generate messageKey for this new message (use stable key)
    const messageKey = stableMessageKey(message, id);
    
    // Transition to READING state before speaking (FSM requirement)
    if (process.env.NODE_ENV === 'development') console.log('📖 Transitioning to READING state for new assistant message');
    setFlowState('READING');
    setTtsListenerActive(true); // Enable TTS authority so speakExistingMessage doesn't skip

    // FIXED: Use only ONE TTS system with debouncing to prevent repetition
    const currentTime = Date.now();
    const messageHash = message.substring(0, 100); // First 100 chars for comparison

    // Debounce: Skip if same message was spoken within last 3 seconds
    if (lastTTSMessage === messageHash && (currentTime - ttsDebounceTime) < 3000) {
      console.log('🔊 TTS: Skipping duplicate message (debounced):', messageHash.substring(0, 30));
      return messageId;
    }

    // Update debounce tracking
    setLastTTSMessage(messageHash);
    setTtsDebounceTime(currentTime);

    // Use RobustTTSManager for bulletproof speech (no duplicate calls)
    try {
      RobustTTSManager.speak(message);
      console.log('🔊 TTS: Speaking with RobustTTSManager:', message.substring(0, 50));
    } catch (error) {
      console.warn('🔊 TTS: RobustTTSManager failed, using fallback:', error);
      // Only use speakExistingMessage as fallback if RobustTTSManager fails
      await speakExistingMessage(message, messageKey, phase, false, { token: turnToken });
    }
    
    return messageId;
  };

  // 5) Append one user bubble on FINAL and move to PROCESSING
  const onUserFinalTranscript = (finalText: string, token: string) => {
    if (!finalText.trim() || token !== currentTurnToken) return;
    addChatBubble(finalText, 'user');     // restored
    setFlowState('PROCESSING');
    // existing evaluator/save path continues as before
  };

  // Helper: Force transition to LISTENING with mic activation (unconditional)
  const forceToListening = (reason: string) => {
    if (process.env.NODE_ENV === 'development') console.log('🔄 forceToListening called:', { reason, currentState: flowState, token: currentTurnToken });
    
    // Stop any lingering TTS state
    try { TTSManager.stop(); } catch {}
    setIsSpeaking(false);
    setAvatarState('idle');

    // Ensure we have a token; if missing, create a simple one
    if (!currentTurnToken) setCurrentTurnToken(`force-${Date.now()}`);

    // Enter LISTENING state first
    setFlowState('LISTENING');
    if (process.env.NODE_ENV === 'development') console.log('🎯 State set to LISTENING, starting mic in 50ms...');
    
    // Start mic with small delay to ensure state has updated (fix race condition)
    setTimeout(() => {
      if (process.env.NODE_ENV === 'development') console.log('🎤 Starting hands-free mic capture...');
      startHandsFreeMicCaptureSafe(true); // pass force=true
    }, 50);
    
    if (process.env.NODE_ENV === 'development') console.log('HF_FORCE_LISTEN', { reason });
  };

  // A) TTS → LISTENING (always) - FSM enforced completion
  const handleTTSCompletion = async (token: string, messageId?: string) => {
    // Guard: Drop if token stale
    if (token !== currentTurnToken) { 
      if (process.env.NODE_ENV === 'development') console.log('HF_TTS_COMPLETE_STALE', { token, currentTurnToken }); 
      return; 
    }
    
    // Guard: Drop if state === PAUSED
    if (flowState === 'PAUSED') {
      if (process.env.NODE_ENV === 'development') console.log('HF_TTS_COMPLETE_PAUSED', { flowState });
      return;
    }
    
    // Guard: Drop if TTS still speaking
    if (TTSManager.isSpeaking()) {
      if (process.env.NODE_ENV === 'development') console.log('HF_TTS_COMPLETE_STILL_SPEAKING');
      return;
    }
    
    // Always set state=LISTENING
    if (flowState !== 'LISTENING') {
      setFlowState('LISTENING');
    }
    
    // Call startHandsFreeMicCaptureSafe() within ≤200ms if not already recording
    if (micState !== 'recording') {
      await startHandsFreeMicCaptureSafe();
    }
  };

  // B) SIMPLIFIED Mic orchestrator integration - consolidated microphone management
  const startHandsFreeMicCaptureSafe = async (force = false) => {
    if (process.env.NODE_ENV === 'development') console.log('HF_MIC_ATTEMPT', { force, flowState, micState, ttsBusy: TTSManager.isSpeaking() });

    // Skip if TTS is speaking (avoid conflicts)
    if (TTSManager.isSpeaking() && !force) {
      console.log('🎤 Skipping mic start - TTS is speaking');
      return;
    }

    // SIMPLIFIED: Use orchestrator for all mic operations with unified state
    if (!micOrchestrator.isListening()) {
      try {
        await micOrchestrator.startHandsFree();
        setMicState('recording'); // Sync local state
        console.log('🎤 Hands-free mic started via orchestrator');
      } catch (error) {
        console.error('🎤 Failed to start hands-free mic:', error);
        setMicState('error'); // Sync error state
        toast({
          title: "Microphone Error",
          description: "Could not start microphone. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      console.log('🎤 Mic already listening');
      setMicState('recording'); // Ensure state sync
    }
  };

  // E) Grammar correction rendering (no lexical policing) - Enhanced filtering
  const allowedForeign = new Set(['café','jalapeño','résumé','crème','piñata','tortilla','sushi','tapas']);
  
  const isProtectedToken = (word: string): boolean => {
    // Check for non-ASCII characters or words in allowedForeign set
    return /[^\u0000-\u007F]/.test(word) || allowedForeign.has(word.toLowerCase());
  };
  
  // E) Enhanced filter: suppress replacements of protected tokens, keep grammar fixes
  const filterCorrection = (originalText: string, correctedText: string): string => {
    if (!correctedText || correctedText === originalText) {
      return correctedText;
    }
    
    // Tokenize both texts into words (preserve punctuation context)
    const originalWords = originalText.toLowerCase().match(/\b\w+\b/g) || [];
    const correctedWords = correctedText.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Check if any protected word is being replaced with a different word
    let hasProtectedReplacement = false;
    
    // Simple alignment check: if lengths are similar, do word-by-word comparison
    if (Math.abs(originalWords.length - correctedWords.length) <= 2) {
      for (let i = 0; i < Math.min(originalWords.length, correctedWords.length); i++) {
        const origWord = originalWords[i];
        const corrWord = correctedWords[i];
        
        // If original word is protected and gets replaced with different word, suppress
        if (isProtectedToken(origWord) && origWord !== corrWord) {
          hasProtectedReplacement = true;
          if (process.env.NODE_ENV === 'development') console.log('Protected word replacement detected:', origWord, '->', corrWord);
          break;
        }
      }
    }
    
    // If protected replacement detected, suppress the entire correction
    if (hasProtectedReplacement) {
      if (process.env.NODE_ENV === 'development') console.log('Grammar correction suppressed due to protected foreign word replacement');
      return '';
    }
    
    // Otherwise allow the correction (tense, articles, word order fixes are kept)
    return correctedText;
  };

  // C) DIAMOND-GRADE executeTeacherLoop with ConversationManager integration
  const executeTeacherLoop = async (transcript: string) => {
    if (process.env.NODE_ENV === 'development') console.log('Executing teacher loop with EXACT transcript:', transcript);

    try {
      setIsProcessingTranscript(true);

      // CRITICAL: Safety check for self-harm mentions - stop normal flow immediately
      const dangerPhrases = ['kill myself', 'suicide', 'hurt myself', 'end my life', 'want to die', 'harm myself', 'kill me'];
      if (dangerPhrases.some(phrase => transcript.toLowerCase().includes(phrase))) {
        console.warn('Safety filter triggered for self-harm content');
        const safetyResponse = "I'm really concerned about what you just said. Please reach out for help - you can call 988 for the Suicide & Crisis Lifeline, or text HOME to 741741. Is there someone close to you that you can talk to right now?";
        await addAssistantMessage(safetyResponse, 'feedback');
        return; // Stop normal conversation flow
      }

      // STEP 1: Update conversation manager with new input
      conversationManager.setTopic(transcript);
      const currentManagerTopic = conversationManager.getCurrentTopic();
      const topicDepth = conversationManager.getTopicDepth();

      // STEP 2: Check if we should use local conversation manager for natural flow
      if (currentManagerTopic && topicDepth < 7) {
        console.log(`[executeTeacherLoop] Using ConversationManager for topic: ${currentManagerTopic}, depth: ${topicDepth}`);

        // Generate intelligent response using conversation manager
        const response = conversationManager.generateTopicResponse(transcript);

        // Update conversation history
        conversationManager.addToHistory(transcript, response);
        conversationManager.incrementDepth();

        // Update local state
        setCurrentTopic(currentManagerTopic);
        setTopicTurnCount(topicDepth + 1);
        setConversationContext(conversationManager.getConversationContext());

        // Send response and speak it
        await addAssistantMessage(response, 'feedback');

        // Award XP for conversation engagement
        const xpEarned = Math.floor(Math.random() * 5) + 5; // 5-10 XP
        try {
          await awardXp(xpEarned);
        } catch (error) {
          console.error('XP award failed:', error);
        }

        return; // Skip backend call for natural conversation
      }
      
      // Call the actual evaluation backend with EXACT transcript and conversation context
      const { data, error } = await supabase.functions.invoke('evaluate-speaking', {
        body: {
          question: currentQuestion,
          answer: transcript, // exact transcript, preserve accents like "café"
          level: userLevel,
          conversationContext: conversationContext,
          // CRITICAL: Natural friend conversation prompt - ZERO teacher language
          systemInstruction: `You're chatting with a friend learning English. Be naturally curious and engaging.

ESSENTIAL RULES:
1. BANNED PHRASES: good job, well done, excellent, try to, expand, vocabulary, grammar, structure, for clarity
2. If they make grammar mistakes, correct them naturally: "I discovered ink yesterday" → "Oh you discovered it yesterday - where did you find it?"
3. Stay on their topic for 5-7 exchanges minimum
4. Ask specific follow-up questions about what they just shared
5. Be genuinely interested like a real friend would be

NATURAL CORRECTIONS:
User: "I discovered ink yesterday"
You: "Actually, you mean 'it' not 'ink' - where did you discover it?"

User: "I likes apples"
You: "Oh you like apples - what's your favorite type?"

CONVERSATION DEPTH:
Stay curious about ONE topic. If they say "apples":
- What kind do you prefer?
- Do you eat them daily?
- Where do you buy them?
- Ever been apple picking?
- Any childhood apple memories?

Current topic: ${currentManagerTopic || conversationManager.getCurrentTopic() || 'whatever they want to discuss'}`
        }
      });

      if (error) {
        console.error('Teacher evaluation error:', error);
        toast({
          title: "Connection Error",
          description: "Could not connect to the teacher service. Please check your internet connection.",
          variant: "destructive"
        });
        await addAssistantMessage("I couldn't evaluate your answer right now. Please try again.", 'feedback');
        return;
      }

      const evaluation = data;
      if (process.env.NODE_ENV === 'development') console.log('Teacher evaluation result:', evaluation);

      // Use the new conversationResponse but check for robotic phrases
      let response = evaluation.conversationResponse || '';

      // CRITICAL: Override backend response if it contains banned teacher phrases
      const bannedPhrases = [
        'good job', 'well done', 'good effort', 'good start', 'great work', 'nice work',
        'try to use', 'try saying', 'try to', 'expand your vocabulary', 'for clarity',
        'grammar', 'sentence structure', 'keep practicing', 'well said', 'excellent',
        'can you tell me more about that', 'tell me more about that', 'anything else',
        "that's interesting", 'very good', 'perfect', 'wonderful', 'amazing',
        'you did well', 'great job', 'good answer', 'correct answer'
      ];

      if (response && bannedPhrases.some(phrase => response.toLowerCase().includes(phrase))) {
        console.log('[Natural Conversation] Overriding robotic backend response:', response.substring(0, 50));

        // Generate natural conversation replacement using ConversationManager
        response = conversationManager.generateTopicResponse(transcript);

        // Update conversation manager state
        conversationManager.addToHistory(transcript, response);
        conversationManager.incrementDepth();
      }

      // Fallback to old format if conversationResponse is not available or was overridden
      if (!response) {
        // Add correction if needed (with foreign word filtering)
        if (evaluation.corrected && evaluation.corrected !== transcript) {
          const filteredCorrection = filterCorrection(transcript, evaluation.corrected);
          if (filteredCorrection.trim()) {
            response += `${filteredCorrection}\n\n`;
          }
        }

        // Add feedback
        if (evaluation.feedback) {
          response += `${evaluation.feedback}\n\n`;
        }

        // Generate contextual follow-up if none provided - MAINTAIN topic focus
        if (evaluation.followUpQuestion) {
          response += evaluation.followUpQuestion;
        } else {
          // Keep conversation going on the SAME topic - never abandon it prematurely
          const topicWord = currentTopic || transcript.toLowerCase()
            .replace(/^(i want to talk about|about|let's talk about|i like|i eat|i have|i am|i do|my)\s*/i, '')
            .trim()
            .split(/[.!?]/)[0] // Get first sentence
            .split(' ')
            .slice(0, 2) // Take first 1-2 words
            .join(' ');

          // DIAMOND-GRADE: Natural conversation engine - eliminates ALL robotic phrases
          const generateNaturalResponse = (userInput: string, topic: string, conversationHistory: string) => {
            // BANNED PHRASES - never use these robot-like responses
            const BANNED_PHRASES = [
              'great job', 'well done', 'good work', 'excellent', 'keep expanding',
              'vocabulary', 'try to use', 'add more detail', 'anything else',
              'can you tell me more', 'tell me more about that', "that's interesting",
              'good effort', 'nice work', 'perfect', 'wonderful', 'amazing'
            ];

            // Natural grammar correction that flows in conversation
            const detectAndFixGrammar = (text: string) => {
              const corrections = {
                'i likes': 'I like',
                'he go': 'he goes',
                'they is': 'they are',
                'we was': 'we were',
                'i am go': 'I am going',
                'she have': 'she has',
                'they has': 'they have',
                'i eats': 'I eat',
                'you was': 'you were',
                'it don\'t': 'it doesn\'t'
              };

              const lower = text.toLowerCase();
              for (let [error, correct] of Object.entries(corrections)) {
                if (lower.includes(error)) {
                  return {
                    hasError: true,
                    corrected: text.replace(new RegExp(error, 'gi'), correct)
                  };
                }
              }
              return { hasError: false };
            };

            // Natural grammar integration
            const grammarFix = detectAndFixGrammar(userInput);
            let grammarPrefix = '';
            if (grammarFix.hasError) {
              grammarPrefix = `Oh, you mean "${grammarFix.corrected}" - `;
            }

            // COMPREHENSIVE TOPIC-BASED CONVERSATIONS
            const topicResponses = {
              'sports cars': [
                "What's your dream sports car?",
                "Do you prefer speed or style in a sports car?",
                "Have you ever been in a really fast car?",
                "What's the most beautiful car you've ever seen?",
                "Would you rather have a classic muscle car or modern supercar?",
                "Do you like convertibles or prefer hardtops?",
                "Have you ever been to a car show or race?"
              ],
              car: [
                "What's your favorite car brand?",
                "Do you prefer sports cars or everyday cars?",
                "What color car would you want?",
                "Have you ever driven a really nice car?",
                "What's the coolest car you've seen?",
                "Do you like fast cars or comfortable cars?",
                "Any dream cars you'd love to own someday?"
              ],
              apple: [
                "What kind do you usually buy - red, green, or yellow?",
                "Do you eat them every day or just sometimes?",
                "Have you tried making apple pie or apple sauce?",
                "What's the crunchiest apple you've ever had?",
                "Do you prefer them sweet like Honeycrisp or tart like Granny Smith?",
                "Any favorite apple memories from childhood?",
                "Do you buy them at the store or ever go apple picking?"
              ],
              family: [
                "How big is your family?",
                "Do you see them often?",
                "Any special family traditions you love?",
                "Who are you closest to in your family?",
                "What do you usually do when you get together?",
                "Do you live near your family or far away?",
                "Any funny family stories you like to tell?"
              ],
              friend: [
                "How did you meet your best friend?",
                "What do you and your friends like to do together?",
                "Do you prefer having lots of friends or just a few close ones?",
                "Any friends from childhood you still talk to?",
                "What makes someone a really good friend to you?",
                "Do you and your friends have any inside jokes?",
                "Ever had a friend move away? How did you stay in touch?"
              ],
              food: [
                "What's your absolute favorite dish?",
                "Do you like to cook or prefer eating out?",
                "Any foods you absolutely can't stand?",
                "What's the most unusual food you've ever tried?",
                "Do you have a sweet tooth or prefer savory stuff?",
                "Any comfort foods that remind you of home?",
                "Ever tried cooking something completely new?"
              ],
              music: [
                "What type of music gets you in a good mood?",
                "Any favorite artists or bands?",
                "Do you play any instruments yourself?",
                "What was the last song you had stuck in your head?",
                "Ever been to any really good concerts?",
                "Do you like discovering new music or stick to favorites?",
                "Any songs that bring back special memories?"
              ],
              movie: [
                "What's your all-time favorite movie?",
                "Do you like comedies, dramas, action, or what?",
                "Any movies you could watch over and over?",
                "Do you prefer watching at home or going to theaters?",
                "What's the last really good movie you saw?",
                "Any actors or directors you really admire?",
                "Ever watched a movie that completely surprised you?"
              ],
              travel: [
                "Where's the most amazing place you've been?",
                "Do you prefer beach vacations or city adventures?",
                "Any places on your bucket list to visit someday?",
                "Do you like planning trips or being spontaneous?",
                "What's the longest trip you've ever taken?",
                "Any travel experiences that didn't go as planned?",
                "Do you prefer traveling alone or with others?"
              ],
              work: [
                "What kind of work do you do?",
                "Do you enjoy your job or is it just paying the bills?",
                "What's the best part about your workday?",
                "Any work colleagues you're friends with?",
                "Ever thought about changing careers?",
                "What would be your dream job if money wasn't an issue?",
                "Do you work better in the morning or afternoon?"
              ],
              school: [
                "What's your favorite subject to study?",
                "Do you like your teachers this year?",
                "Any subjects you find really challenging?",
                "What do you usually do during lunch or breaks?",
                "Any school activities or clubs you're part of?",
                "Do you prefer working in groups or by yourself?",
                "What are you most looking forward to learning about?"
              ],
              sport: [
                "What sports do you enjoy watching or playing?",
                "Do you have a favorite team you always root for?",
                "Ever played on any teams yourself?",
                "What's the most exciting game you've ever seen?",
                "Do you prefer individual sports or team sports?",
                "Any sports you'd love to try but haven't yet?",
                "Do you follow any particular athletes?"
              ]
            };

            // Find matching topic and generate natural response
            const topicWord = topic.toLowerCase();
            for (let [topicKey, responses] of Object.entries(topicResponses)) {
              if (topicWord.includes(topicKey)) {
                const responseIndex = Math.min(topicTurnCount, responses.length - 1);
                return grammarPrefix + responses[responseIndex];
              }
            }

            // Context-aware responses based on user input patterns
            const inputLower = userInput.toLowerCase();

            if (inputLower.includes('like') || inputLower.includes('love')) {
              const likeResponses = [
                "What is it about that that you enjoy?",
                "When did you first discover you liked that?",
                "What makes it your favorite?"
              ];
              return grammarPrefix + likeResponses[Math.floor(Math.random() * likeResponses.length)];
            }

            if (inputLower.includes('don\'t') || inputLower.includes('hate') || inputLower.includes('not like')) {
              const dislikeResponses = [
                "What is it about that you don't like?",
                "Have you always felt that way about it?",
                "Is there anything similar that you do enjoy?"
              ];
              return grammarPrefix + dislikeResponses[Math.floor(Math.random() * dislikeResponses.length)];
            }

            if (inputLower.includes('sometimes') || inputLower.includes('usually') || inputLower.includes('often')) {
              const frequencyResponses = [
                "How often would you say that happens?",
                "When do you usually do that?",
                "What makes you do it sometimes but not others?"
              ];
              return grammarPrefix + frequencyResponses[Math.floor(Math.random() * frequencyResponses.length)];
            }

            if (inputLower.includes('my') || inputLower.includes('mine')) {
              const personalResponses = [
                "What makes it special to you?",
                "How did you get into that?",
                "When did you start with that?"
              ];
              return grammarPrefix + personalResponses[Math.floor(Math.random() * personalResponses.length)];
            }

            // Natural follow-ups based on conversation depth with variety
            const conversationTurnCount = (conversationHistory.match(/User:|Assistant:/g) || []).length;

            if (conversationTurnCount < 3) {
              const startingResponses = [
                "What got you started with that?",
                "When did you first try that?",
                "How did you discover that?"
              ];
              return grammarPrefix + startingResponses[Math.floor(Math.random() * startingResponses.length)];
            } else if (conversationTurnCount < 6) {
              const deeperResponses = [
                "How long have you been into this?",
                "What keeps you interested in it?",
                "Has it changed for you over time?"
              ];
              return grammarPrefix + deeperResponses[Math.floor(Math.random() * deeperResponses.length)];
            } else {
              const expertResponses = [
                "What would you tell someone just getting started?",
                "What's the most interesting thing about it?",
                "Any advice for people who want to try it?"
              ];
              return grammarPrefix + expertResponses[Math.floor(Math.random() * expertResponses.length)];
            }
          };

          // CRITICAL: Always use natural response generation for consistency
          if (topicWord && topicTurnCount < 7) { // Natural conversation for 7 exchanges
            response = generateNaturalResponse(transcript, topicWord, conversationContext);
          } else {
            const topicTransitionResponses = [
              "That was such a great conversation! What else interests you?",
              "I really enjoyed learning about that! What should we talk about next?",
              "You know a lot about that topic! What else do you like to discuss?"
            ];
            response = topicTransitionResponses[Math.floor(Math.random() * topicTransitionResponses.length)];
          }
        }
      }

      // Update topic tracking based on AI response
      if (evaluation.currentTopic) {
        setCurrentTopic(evaluation.currentTopic);
      }

      if (evaluation.topicTurnCount !== undefined) {
        setTopicTurnCount(evaluation.topicTurnCount);
      } else {
        // Increment turn count if on same topic
        if (currentTopic && (evaluation.currentTopic === currentTopic || evaluation.shouldContinueTopic)) {
          setTopicTurnCount(prev => prev + 1);
        } else {
          setTopicTurnCount(1); // Reset for new topic
        }
      }

      // Update current question if a follow-up was provided
      if (evaluation.followUpQuestion) {
        setCurrentQuestion(evaluation.followUpQuestion);
      } else if (evaluation.topicDetected) {
        // If a topic was detected, we stay on that topic for future questions
        const topic = evaluation.currentTopic || transcript.toLowerCase().replace(/^(i want to talk about|about|let's talk about)\s*/i, '').trim();
        setCurrentQuestion(`Let's continue talking about ${topic}`);
      }

      // Award XP for successful conversation and track submissions
      incrementSpeakingSubmissions();
      try {
        if (evaluation.totalScore > 20) { // Good conversation (>50% score)
          awardXp(10, 'speaking'); // Award XP for good speaking
        } else if (evaluation.totalScore > 10) { // Basic conversation
          awardXp(5, 'speaking');
        }
      } catch (error) {
        console.warn('Failed to award XP:', error);
        // Continue without crashing the app
      }

      // D) Assistant reply → speak once → back to LISTENING
      // Add the assistant message (this will trigger TTS and return to LISTENING)
      await addAssistantMessage(response.trim(), 'feedback');
      
      // Update conversation context with trimming to prevent memory issues
      setConversationContext(prev => {
        const newContext = `${prev}\nUser: ${transcript}\nAssistant: ${response}`.trim();
        // Keep only last 10 exchanges (about 2000 chars) to prevent API token limits
        const lines = newContext.split('\n');
        const maxLines = 20; // 10 user + 10 assistant messages
        if (lines.length > maxLines) {
          return lines.slice(-maxLines).join('\n');
        }
        return newContext;
      });
      
    } catch (error) {
      console.error('Error in teacher loop:', error);
      await addAssistantMessage("Sorry, I encountered an error. Let's continue our conversation.", 'feedback');
    } finally {
      setIsProcessingTranscript(false);
    }
  };

  // Event listeners for mic state and interim captions (LISTENING only)
  useEffect(() => {
    let isMounted = true;

    // B) Listen for speech:interim events when flowState==='LISTENING' only
    const handleInterimCaption = (event: CustomEvent) => {
      if (!isMounted) return;
      if (flowState === 'LISTENING') {
        const transcript = event.detail?.transcript || '';
        setInterimCaption(transcript);
        if (process.env.NODE_ENV === 'development') console.log('Interim caption (LISTENING):', transcript);
      }
    };

    // Listen for mic state changes to clear captions
    const handleMicStateChange = (newState: 'idle' | 'recording' | 'paused' | 'error') => {
      if (!isMounted) return;
      setMicState(newState);

      // Clear interim caption when mic stops or when not in LISTENING state
      if (newState !== 'recording' || flowState !== 'LISTENING') {
        setInterimCaption('');
      }
    };

    // Add event listeners
    window.addEventListener('speech:interim', handleInterimCaption as EventListener);

    return () => {
      isMounted = false;
      window.removeEventListener('speech:interim', handleInterimCaption as EventListener);
    };
  }, [flowState]); // Re-subscribe when flowState changes
   
  // Clear interim caption when flowState leaves LISTENING
  useEffect(() => {
    if (flowState !== 'LISTENING') {
      setInterimCaption('');
    }
  }, [flowState]);

  // Stuck state detection and debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log('🔄 Flow state changed:', { flowState, isSpeaking, micState });
    
    if (flowState === 'READING' && !isSpeaking) {
      if (process.env.NODE_ENV === 'development') console.log('⚠️ In READING state but not speaking, setting fallback timer...');
      // If we're in READING but not speaking for 3 seconds, transition to LISTENING
      const timer = setTimeout(() => {
        if (flowState === 'READING' && !isSpeaking) {
          if (process.env.NODE_ENV === 'development') console.log('🚨 STUCK in READING state - forcing transition to LISTENING');
          forceToListening('stuck-reading-fallback');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flowState, isSpeaking, micState]);

  // Mascot Header Component  
  const MascotHeader = () => {
    
    // Format XP with thousands separator and memoize to avoid re-renders
    const formattedXP = useMemo(() => {
      return xp_current ? xp_current.toLocaleString() : "—";
    }, [xp_current]);
    
    return (
      <div className="hf-header mx-auto mt-3 flex flex-col items-center gap-2 pointer-events-none z-10">
        {/* Avatar - responsive sizing */}
        <div
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full ring-2 ring-white/20 shadow-lg pointer-events-none"
          role="img"
          aria-label="Tutor avatar"
        >
          <AudioErrorBoundary fallback={
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <div className="text-white text-xs">🎭</div>
            </div>
          }>
            <DIDAvatar
              className={cn(
                "w-full h-full rounded-full object-cover transition-all duration-300",
                isSpeaking && "ring-4 ring-primary/50 shadow-glow"
              )}
              hideLoadingText={true}
            />
          </AudioErrorBoundary>
        </div>

        {/* XP Chip - responsive text */}
        <div className="px-3 py-1 rounded-full text-xs sm:text-sm bg-white/10 text-white/90 backdrop-blur-sm pointer-events-none">
          XP: {formattedXP}
        </div>
      </div>
    );
  };

  // Component return with locked minimal UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Top bar with sound toggle (position: fixed or absolute for proper stacking) */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-20">
        <button
          onClick={toggleSpeakingSound}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 rounded-lg backdrop-blur-sm text-white hover:bg-white/20 transition-colors touch-manipulation"
        >
          {speakingSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Mascot Header */}
        <MascotHeader />
        
        {/* Chat messages container */}
        <div
          ref={chatContainerRef}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 min-h-[300px] sm:min-h-[400px] max-h-[400px] sm:max-h-[500px] overflow-y-auto scroll-smooth"
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={`${message.id}-${index}`}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            
            {/* Ephemeral ghost bubble */}
            {ephemeralAssistant && (
              <ChatBubble
                message={ephemeralAssistant.text}
                isUser={false}
                className="opacity-70"
              />
            )}
            
            {/* Live captions */}
            {flowState === 'LISTENING' && interimCaption && (
              <div className="text-white/60 italic text-sm sm:text-base text-center px-2">
                "{interimCaption}"
              </div>
            )}

            {/* Loading indicator for processing */}
            {isProcessingTranscript && (
              <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                AI is thinking...
              </div>
            )}
          </div>
        </div>

        {/* Enhanced microphone status indicator with proper recording state */}
        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4">
            <MicrophoneIndicator
              isListening={flowState === 'LISTENING'}
              isRecording={actuallyRecording}
              hasPermission={permissionState === 'granted'}
              error={errorMessage || undefined}
              audioLevel={micRmsLevel}
              className="justify-center"
            />

            {/* CRITICAL: Show actual recording state clearly */}
            <div className="mt-2 text-center">
              {actuallyRecording ? (
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Recording... Speak now</span>
                </div>
              ) : flowState === 'LISTENING' ? (
                <div className="flex items-center justify-center gap-2 text-blue-400">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Listening for voice...</span>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">
                  {flowState === 'IDLE' ? 'Click microphone to start' :
                   flowState === 'PROCESSING' ? 'AI is thinking...' :
                   flowState === 'READING' ? 'AI is speaking...' :
                   flowState === 'PAUSED' ? 'Paused' : 'Ready'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Primary control (always mounted, opacity for hide/reveal) */}
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <Button
            className="hf-primary w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center touch-manipulation"
            onClick={async () => {
              if (flowState === 'IDLE') {
                const text = 'Hi! I\'m your English conversation partner. What would you like to talk about today? You can say anything - like "apples", "movies", or "I want to talk about travel".';
                const messageKey = stableKeyFromText(text);
                setSpokenKeys(p => new Set([...p, messageKey]));
                setEphemeralAssistant({ key: messageKey, text });
                await playAssistantOnce(text, messageKey);

                // Start hands-free mode after first interaction
                if (permissionState === 'unknown' || permissionState === 'denied') {
                  try {
                    setErrorMessage(''); // Clear any previous errors
                    setPermissionState('requesting');

                    await micOrchestrator.startHandsFree();

                    setPermissionState('granted');
                    setMicInitialized(true);
                    console.log('Hands-free mode started successfully');
                  } catch (error) {
                    console.error('Failed to start hands-free mode:', error);

                    const errorMsg = error instanceof Error ? error.message : 'Unknown error';

                    // Enhanced error categorization for better user experience
                    if (errorMsg.includes('permission') || errorMsg.includes('denied') || errorMsg.includes('NotAllowedError')) {
                      setPermissionState('denied');
                      setErrorMessage('🎤 Click the lock icon in your browser\'s address bar and allow microphone access');
                      toast({
                        title: "🎤 Microphone Permission Required",
                        description: "Click the lock/shield icon in your browser's address bar and select 'Allow' for microphone access.",
                        variant: "destructive"
                      });
                    } else if (errorMsg.includes('NotFoundError') || errorMsg.includes('no microphone') || errorMsg.includes('No audio track')) {
                      setPermissionState('unknown');
                      setErrorMessage('🎤 No microphone found. Please connect a microphone and refresh the page.');
                      toast({
                        title: "No Microphone Detected",
                        description: "Please connect a microphone to your device and refresh the page.",
                        variant: "destructive"
                      });
                    } else if (errorMsg.includes('NotReadableError') || errorMsg.includes('being used')) {
                      setPermissionState('unknown');
                      setErrorMessage('🎤 Microphone is being used by another application. Please close other apps and try again.');
                      toast({
                        title: "Microphone In Use",
                        description: "Please close other applications using your microphone and try again.",
                        variant: "destructive"
                      });
                    } else if (errorMsg.includes('stream is not active') || errorMsg.includes('track is disabled')) {
                      setPermissionState('unknown');
                      setErrorMessage('🎤 Microphone failed to start. Please refresh the page and try again.');
                      toast({
                        title: "Microphone Startup Failed",
                        description: "The microphone could not be activated. Please refresh the page.",
                        variant: "destructive"
                      });
                    } else {
                      setPermissionState('unknown');
                      setErrorMessage(`🎤 Microphone error: ${errorMsg}`);
                      toast({
                        title: "Microphone Error",
                        description: errorMsg,
                        variant: "destructive"
                      });
                    }

                    setTimeout(() => setErrorMessage(''), 10000);
                  }
                } else if (permissionState === 'granted' && !micInitialized) {
                  // Permission granted but mic not initialized, try again
                  try {
                    await micOrchestrator.startHandsFree();
                    setMicInitialized(true);
                    console.log('Hands-free mode restarted successfully');
                  } catch (error) {
                    console.error('Failed to restart hands-free mode:', error);
                    setErrorMessage('Failed to restart microphone. Please refresh the page.');
                    setTimeout(() => setErrorMessage(''), 5000);
                  }
                }
              } else if (flowState === 'PAUSED') {
                if (pausedFrom === 'READING') {
                  setFlowState('READING');
                  setPausedFrom(null);
                } else if (pausedFrom === 'LISTENING') {
                  setFlowState('LISTENING');
                  setPausedFrom(null);
                } else if (pausedFrom === 'PROCESSING') {
                  setFlowState('PROCESSING');
                  setPausedFrom(null);
                } else {
                  // Resume from where we left off
                  const latestMessage = findLatestEligibleAssistantMessage();
                  if (latestMessage && unreadAssistantExists()) {
                    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
                    await playAssistantOnce(latestMessage.text, messageKey);
                  }
                }
              } else if (flowState === 'READING' || flowState === 'LISTENING' || flowState === 'PROCESSING') {
                // Pause current state
                setPausedFrom(flowState);
                setFlowState('PAUSED');
                
                // Stop TTS if speaking
                if (TTSManager.isSpeaking()) {
                  TTSManager.stop();
                  setIsSpeaking(false);
                  setAvatarState('idle');
                }
                
                // CRITICAL: Properly stop microphone on pause - fully release resources
                if (micState === 'recording' || flowState === 'LISTENING') {
                  micOrchestrator.shutdown(); // Fully stop and release mic
                  setMicState('idle');
                  setActuallyRecording(false);
                }
              }
            }}
          >
            {flowState === 'IDLE' ? <Play className="w-6 h-6" /> :
             flowState === 'PAUSED' ? <Play className="w-6 h-6" /> :
             <Pause className="w-6 h-6" />}
          </Button>

          {/* Overflow menu (optional) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hf-overflow text-white/60 hover:text-white hover:bg-white/10">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 backdrop-blur-sm border-white/20 text-white">
              <DropdownMenuItem
                onClick={async () => {
                  // Again - replay current message
                  const latestMessage = findLatestEligibleAssistantMessage();
                  if (latestMessage) {
                    const messageKey = stableMessageKey(latestMessage.text, latestMessage.id);
                    await playAssistantOnce(latestMessage.text, messageKey);
                  }
                }}
                className="hover:bg-white/10 focus:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Again
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={async () => {
                  // Test microphone
                  try {
                    setErrorMessage('Testing microphone...');
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    const tracks = stream.getAudioTracks();
                    if (tracks.length > 0) {
                      setErrorMessage('✅ Microphone test successful!');
                      tracks.forEach(track => track.stop());
                      setTimeout(() => setErrorMessage(''), 3000);
                    } else {
                      setErrorMessage('❌ No audio tracks found');
                      setTimeout(() => setErrorMessage(''), 5000);
                    }
                  } catch (error) {
                    const errorMsg = error instanceof Error ? error.message : 'Test failed';
                    setErrorMessage(`❌ Microphone test failed: ${errorMsg}`);
                    setTimeout(() => setErrorMessage(''), 5000);
                  }
                }}
                className="hover:bg-white/10 focus:bg-white/10"
              >
                <Mic className="w-4 h-4 mr-2" />
                Test Mic
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem 
                onClick={() => {
                  setFlowState('IDLE');
                  setMessages([]);
                  setEphemeralAssistant(null);
                  setCurrentTurnToken('');
                  if (TTSManager.isSpeaking()) {
                    TTSManager.stop();
                    setIsSpeaking(false);
                    setAvatarState('idle');
                  }
                  if (micState === 'recording') {
                    micOrchestrator.shutdown();
                  }
                }}
                className="hover:bg-white/10 focus:bg-white/10 text-red-400"
              >
                <Square className="w-4 h-4 mr-2" />
                End
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>


        {/* Error message with retry option */}
        {errorMessage && (
          <div className="text-center px-2">
            <div className="inline-block px-4 py-3 bg-red-500/20 text-red-300 rounded-lg backdrop-blur-sm text-sm sm:text-base max-w-lg mx-auto">
              <div className="mb-2">{errorMessage}</div>
              {permissionState === 'denied' && (
                <button
                  onClick={async () => {
                    setErrorMessage('');
                    setPermissionState('unknown');
                    // Retry permission request
                    try {
                      setPermissionState('requesting');
                      await micOrchestrator.startHandsFree();
                      setPermissionState('granted');
                      setMicInitialized(true);
                      console.log('Permission retry successful');
                    } catch (error) {
                      setPermissionState('denied');
                      setErrorMessage('Still unable to access microphone. Please check your browser settings.');
                      setTimeout(() => setErrorMessage(''), 5000);
                    }
                  }}
                  className="px-3 py-1 bg-red-500/40 hover:bg-red-500/60 rounded text-xs font-medium transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        )}

        {/* Permission state indicator */}
        {permissionState === 'requesting' && (
          <div className="text-center px-2">
            <div className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg backdrop-blur-sm text-sm sm:text-base max-w-md mx-auto">
              🎤 Requesting microphone access...
            </div>
          </div>
        )}
      </div>

      {/* Debug overlay */}
      <AudioDebugOverlay isVisible={showDebugOverlay} />
    </div>
  );
}
