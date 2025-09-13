#!/bin/bash
# Patch script to add MCQ functionality

# Add imports after line 22
sed -i "22a\\
import MultipleChoiceCard from './MultipleChoiceCard';\\
import { buildClozeAndChoices } from '../lib/mcq';" src/components/LessonsApp.tsx

# Find line with speakingIndex state and add speakStep state after it
sed -i '/const \[speakingIndex, setSpeakingIndex\] = useState(0);/a\\
  const [speakStep, setSpeakStep] = useState<'"'"'mcq'"'"' | '"'"'speak'"'"'>('"'"'mcq'"'"');' src/components/LessonsApp.tsx

echo "Patches applied successfully"