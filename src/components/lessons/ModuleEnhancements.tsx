import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ModuleEnhancementProps {
  moduleNumber: number;
  content: string;
}

/**
 * ModuleEnhancements component provides special UI treatments for specific B2 modules
 * that have unique characteristics requiring visual enhancements.
 *
 * Supported modules:
 * - 154: Inversion for Emphasis - Highlights inverted structure
 * - 155: Ellipsis and Substitution - Underlines substitution words
 * - 156: Nominalisation - Shows verb→noun transformation table
 * - 157: Advanced Linking Words - Emphasizes connectors
 */
export const ModuleEnhancements: React.FC<ModuleEnhancementProps> = ({ moduleNumber, content }) => {
  switch (moduleNumber) {
    case 154:
      return <InversionHighlight content={content} />;
    case 155:
      return <SubstitutionHighlight content={content} />;
    case 156:
      return <NominalisationTable content={content} />;
    case 157:
      return <LinkingWordsHighlight content={content} />;
    default:
      return <span>{content}</span>;
  }
};

/**
 * Module 154: Inversion for Emphasis
 * Highlights the inverted structure in sentences like "Never have I...", "Rarely do they..."
 */
const InversionHighlight: React.FC<{ content: string }> = ({ content }) => {
  const inversionPatterns = [
    'Never', 'Rarely', 'Seldom', 'Hardly', 'Scarcely',
    'Only after', 'Not until', 'No sooner', 'Under no circumstances'
  ];

  // Find if content starts with an inversion pattern
  const startsWithInversion = inversionPatterns.some(pattern =>
    content.trim().startsWith(pattern)
  );

  if (!startsWithInversion) {
    return <span>{content}</span>;
  }

  // Find the pattern and highlight it
  const pattern = inversionPatterns.find(p => content.trim().startsWith(p)) || '';
  const parts = content.split(new RegExp(`(${pattern})`));

  return (
    <span>
      {parts.map((part, index) =>
        part === pattern ? (
          <strong key={index} className="text-blue-600 font-bold underline decoration-2">
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

/**
 * Module 155: Ellipsis and Substitution
 * Underlines substitution words: so, neither, do/does/did, one/ones
 */
const SubstitutionHighlight: React.FC<{ content: string }> = ({ content }) => {
  const substitutionWords = ['\\bso\\b', '\\bneither\\b', '\\bdo\\b', '\\bdoes\\b', '\\bdid\\b', '\\bone\\b', '\\bones\\b'];
  const pattern = new RegExp(`(${substitutionWords.join('|')})`, 'gi');

  const parts = content.split(pattern);

  return (
    <span>
      {parts.map((part, index) => {
        const isSubstitution = substitutionWords.some(word =>
          new RegExp(word, 'i').test(part)
        );

        return isSubstitution ? (
          <span key={index} className="underline decoration-2 decoration-green-500 font-medium">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

/**
 * Module 156: Nominalisation
 * Displays verb→noun transformation table for common nominalisations
 */
const NominalisationTable: React.FC<{ content: string }> = ({ content }) => {
  // Common verb→noun transformations
  const transformations = [
    { verb: 'decide', noun: 'decision' },
    { verb: 'explain', noun: 'explanation' },
    { verb: 'investigate', noun: 'investigation' },
    { verb: 'react', noun: 'reaction' },
    { verb: 'recommend', noun: 'recommendation' },
    { verb: 'cancel', noun: 'cancellation' },
    { verb: 'analyze', noun: 'analysis' },
    { verb: 'negotiate', noun: 'negotiation' },
    { verb: 'improve', noun: 'improvement' },
    { verb: 'present', noun: 'presentation' },
    { verb: 'behave', noun: 'behaviour' },
    { verb: 'propose', noun: 'proposal' },
    { verb: 'conclude', noun: 'conclusion' },
    { verb: 'justify', noun: 'justification' },
    { verb: 'suggest', noun: 'suggestion' },
    { verb: 'assess', noun: 'assessment' },
    { verb: 'implement', noun: 'implementation' },
    { verb: 'interpret', noun: 'interpretation' },
    { verb: 'apply', noun: 'application' },
    { verb: 'evaluate', noun: 'evaluation' },
    { verb: 'modify', noun: 'modification' },
    { verb: 'organize', noun: 'organisation' }
  ];

  // Check if content contains nominalised forms
  const containsNominalisation = transformations.some(({ noun }) =>
    content.toLowerCase().includes(noun.toLowerCase())
  );

  if (!containsNominalisation) {
    return <span>{content}</span>;
  }

  // Highlight the nominalised word in the content
  let highlightedContent = content;
  transformations.forEach(({ noun }) => {
    const regex = new RegExp(`\\b(${noun})\\b`, 'gi');
    highlightedContent = highlightedContent.replace(
      regex,
      '<span class="bg-purple-100 px-1 py-0.5 rounded font-semibold text-purple-700">$1</span>'
    );
  });

  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: highlightedContent }} />
      <Card className="mt-3 bg-purple-50 border-purple-200">
        <CardContent className="pt-4">
          <h4 className="text-sm font-semibold mb-2 text-purple-800">📝 Common Transformations</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {transformations.slice(0, 6).map(({ verb, noun }) => (
              <div key={verb} className="flex justify-between bg-white p-1.5 rounded border border-purple-100">
                <span className="text-gray-600">{verb}</span>
                <span className="text-purple-700 font-medium">→ {noun}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Module 157: Advanced Linking Words
 * Emphasizes linking words: nonetheless, furthermore, nevertheless, even so
 */
const LinkingWordsHighlight: React.FC<{ content: string }> = ({ content }) => {
  const linkingWords = [
    'nonetheless', 'furthermore', 'nevertheless', 'even so',
    'as a result', 'moreover', 'however', 'therefore',
    'consequently', 'in addition', 'on the other hand'
  ];

  const pattern = new RegExp(`\\b(${linkingWords.join('|')})\\b`, 'gi');
  const parts = content.split(pattern);

  return (
    <span>
      {parts.map((part, index) => {
        const isLinkingWord = linkingWords.some(word =>
          word.toLowerCase() === part.toLowerCase()
        );

        return isLinkingWord ? (
          <span
            key={index}
            className="bg-amber-100 px-1.5 py-0.5 rounded font-semibold text-amber-800 border border-amber-300"
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

export default ModuleEnhancements;
