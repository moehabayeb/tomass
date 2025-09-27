// src/components/MobileCompactIntro.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, ChevronDown, ChevronUp, Play } from "lucide-react";

interface MobileCompactIntroProps {
  title: string;
  preview: string;
  fullContent: string;
  table: any[];
  tip?: string;
  listeningExamples?: string[];
  moduleId?: number;
  level?: string;
  onGoToQuestions: () => void;
}

export default function MobileCompactIntro({
  title,
  preview,
  fullContent,
  table,
  tip,
  listeningExamples = [],
  moduleId = 0,
  level = '',
  onGoToQuestions
}: MobileCompactIntroProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Smart table title generation based on module
  const getTableTitle = (moduleId: number, level: string): string => {
    if (level === 'A1') {
      switch (moduleId) {
        case 1: return '📊 Verb To Be Table';
        case 2: return '🧩 Verb To Be Negative Table';
        case 3: return '❓ Verb To Be Question Table';
        case 4: return '💬 Verb To Be Short Answers Table';
        case 5: return '👥 Subject Pronouns Table';
        case 6: return '🏠 Possessive Adjectives Table';
        case 8: return '📍 There is / There are Table';
        case 9: return '🚫 There isn\'t / There aren\'t Table';
        case 10: return '❓ There is / There are Question Table';
        case 11: return '📰 Articles Table';
        case 19: return '❓ Simple Present Yes/No Questions Table';
        default: return '📊 Grammar Table';
      }
    }
    if (level === 'A2') {
      switch (moduleId) {
        case 51: return '📚 Past Simple Affirmative Table';
        case 52: return '📚 Past Simple Irregular Verbs Table';
        case 53: return '🚫 Past Simple Negative Table';
        case 54: return '❓ Past Simple Questions Table';
        default: return '📊 Grammar Structure Table';
      }
    }
    if (level === 'B1') {
      switch (moduleId) {
        case 101: return '⏰ Present Perfect Continuous Table';
        case 102: return '⚖️ Present Perfect vs Present Perfect Continuous';
        case 103: return '⏪ Past Perfect Affirmative Table';
        case 104: return '🚫 Past Perfect Negative Table';
        case 105: return '❓ Past Perfect Questions Table';
        case 106: return '🔄 Past Perfect Continuous Table';
        case 107: return '🔮 Future Perfect Table';
        case 108: return '⚡ Future Continuous vs Future Perfect Table';
        case 109: return '🔍 Modals of Deduction Table';
        case 110: return '🎲 Modals of Probability Table';
        case 111: return '📋 Modals of Obligation Table';
        case 112: return '🚫 Modals of Prohibition Table';
        case 113: return '💬 Reported Speech Requests & Commands Table';
        case 114: return '❓ Reported Speech Questions Table';
        case 115: return '🔄 Passive Voice Present Perfect Table';
        default: return '📊 Advanced Grammar Table';
      }
    }
    return '📊 Grammar Structure Table';
  };

  const tableTitle = getTableTitle(moduleId, level);

  return (
    <div className="space-y-4">
      {/* Compact Lesson Overview Card */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center text-lg">
            <BookOpen className="h-5 w-5 mr-2" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preview Text */}
          <div className="text-white/90 text-sm leading-relaxed">
            {isExpanded ? (
              <div className="whitespace-pre-line">{fullContent}</div>
            ) : (
              <div>{preview}</div>
            )}
          </div>

          {/* Grammar Tip */}
          {tip && (
            <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/20">
              <div className="flex items-start space-x-2">
                <div className="bg-blue-500/30 rounded-full p-1 flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Grammar Tip</h4>
                  <p className="text-white/80 text-sm">{tip}</p>
                </div>
              </div>
            </div>
          )}

          {/* Expandable Grammar Table */}
          {isExpanded && table && table.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-3 text-center">
                {tableTitle}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-white/90 text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      {/* Dynamic table headers based on first row properties */}
                      {table[0] && Object.keys(table[0]).map((key, idx) => (
                        <th key={idx} className="text-left py-2 px-1 capitalize">
                          {key === 'auxiliary' ? 'Auxiliary' :
                           key === 'verb' ? 'Verb' :
                           key === 'subject' ? 'Subject' :
                           key === 'object' ? 'Object' :
                           key === 'complement' ? 'Complement' :
                           key === 'example' ? 'Example' :
                           key === 'turkish' ? 'Turkish' :
                           key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((row, index) => (
                      <tr key={index} className="border-b border-white/10">
                        {Object.entries(row).map(([key, value], idx) => (
                          <td
                            key={idx}
                            className={`py-2 px-1 ${
                              key === 'subject' ? 'font-medium' :
                              key === 'auxiliary' ? 'text-red-300' :
                              key === 'verb' ? 'text-blue-300' :
                              key === 'turkish' ? 'text-yellow-300 italic' :
                              ''
                            }`}
                          >
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Example sentences from table if available */}
              {table.some(row => row.example) && (
                <div className="mt-4 space-y-2">
                  <h5 className="text-white/80 font-medium text-sm">Examples:</h5>
                  {table.filter(row => row.example).slice(0, 3).map((row, index) => (
                    <div key={index} className="bg-white/5 rounded p-2">
                      <p className="text-white/90 text-sm">{row.example}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Listening Examples */}
          {isExpanded && listeningExamples && listeningExamples.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-3 text-center">
                🎧 Listening Examples
              </h4>
              <div className="space-y-2">
                {listeningExamples.map((example, index) => (
                  <div key={index} className="bg-white/5 rounded p-3 border-l-2 border-blue-400/50">
                    <p className="text-white/90 text-sm">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expand/Collapse Button */}
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            size="sm"
            className="w-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show full lesson
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-4 z-10">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-lg">
          <CardContent className="p-4">
            <Button
              onClick={onGoToQuestions}
              className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold py-3 text-lg shadow-md transition-all duration-200 active:scale-[0.98]"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Go to Questions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}