// Robust answer evaluator for all modules - Module 51 proven logic

export type EvalOptions = {
  expected: string;                 // canonical answer from content
  accepted?: string[];              // optional additional accepted variants
  requireAffirmationPolarity?: boolean; // when "Yes/No" matters
  keyLemmas?: string[];             // optional lemmas we must see (e.g., ["student"])
};

const YES = ["yes","yeah","yep","sure","of course","correct","that's right","indeed"];
const NO  = ["no","nope","nah","not really","negative"];
const FILLERS = ["uh","um","erm","hmm","well","please","teacher","sir","madam"];

export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[''ʼˈ`]/g,"'")                 // smart→straight apostrophes
    .replace(/[""]/g,'"')
    .replace(/[.,!?;:()]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

// allow minor typos: token distance ≤ 1
function lev1(a:string,b:string){
  if (a===b) return true;
  if (Math.abs(a.length-b.length)>1) return false;
  // small, fast check
  let i=0,j=0,edits=0;
  while(i<a.length && j<b.length){
    if (a[i]===b[j]) { i++; j++; continue; }
    edits++;
    if (edits>1) return false;
    if (a.length> b.length) i++;
    else if (a.length< b.length) j++;
    else { i++; j++; }
  }
  return (edits + (a.length-i) + (b.length-j)) <= 1;
}

function tokens(s:string){
  return normalize(s)
    .split(" ")
    .filter(w => w && !FILLERS.includes(w));
}

// very forgiving contraction/article/possessive handling
function relax(s:string){
  let n = normalize(s);
  n = n
    .replace(/\b(i am)\b/g,"i'm")
    .replace(/\b(you are)\b/g,"you're")
    .replace(/\b(he is)\b/g,"he's")
    .replace(/\b(she is)\b/g,"she's")
    .replace(/\b(it is)\b/g,"it's")
    .replace(/\b(we are)\b/g,"we're")
    .replace(/\b(they are)\b/g,"they're")
    .replace(/\b(have not)\b/g,"haven't")
    .replace(/\b(has not)\b/g,"hasn't")
    .replace(/\b(do not)\b/g,"don't")
    .replace(/\b(does not)\b/g,"doesn't")
    .replace(/\b(did not)\b/g,"didn't")
    .replace(/\b(will not)\b/g,"won't")
    .replace(/\b(would not)\b/g,"wouldn't")
    .replace(/\b(cannot)\b/g,"can't");
  // collapse optional determiners/possessives around nouns
  n = n.replace(/\b(my|our|your|his|her|their|the|a|an)\b/g, "");
  return n.replace(/\s+/g," ").trim();
}

function polarity(str:string){
  const n = normalize(str);
  if (YES.some(y => n.startsWith(y))) return "yes";
  if (NO.some(nw => n.startsWith(nw))) return "no";
  return "unknown";
}

export function evaluateAnswer(userInput: string, opt: EvalOptions): boolean {
  if (!userInput) return false;
  const uNorm = normalize(userInput);
  const uRelax = relax(userInput);

  console.log('[Evaluator] Input:', userInput);
  console.log('[Evaluator] Normalized:', uNorm);
  console.log('[Evaluator] Relaxed:', uRelax);
  console.log('[Evaluator] Expected:', opt.expected);

  // 1) Check polarity if requested (strict for Yes/No questions)
  if (opt.requireAffirmationPolarity) {
    const pUser = polarity(userInput);
    const pExp  = polarity(opt.expected);
    console.log('[Evaluator] Polarity check - User:', pUser, 'Expected:', pExp);
    if (pExp !== "unknown" && pUser !== pExp) {
      console.log('[Evaluator] Polarity mismatch!');
      return false;
    }
  }

  // 2) Fast exacts: expected or any accepted variant (normalized/relaxed)
  const candidates = [
    opt.expected,
    ...(opt.accepted ?? [])
  ];
  const passExact = candidates.some(c => {
    const cNorm = normalize(c);
    const cRelax = relax(c);
    return cNorm === uNorm || cRelax === uRelax;
  });
  if (passExact) {
    console.log('[Evaluator] ✅ Exact match found');
    return true;
  }

  // 3) Lemma/key-word guard (e.g., must include "students")
  if (opt.keyLemmas && opt.keyLemmas.length){
    const uTok = new Set(tokens(uRelax));
    console.log('[Evaluator] User tokens:', Array.from(uTok));
    console.log('[Evaluator] Required lemmas:', opt.keyLemmas);
    
    for (const k of opt.keyLemmas){
      // allow plural/singular & small typos
      const ok = [...uTok].some(t => {
        const base = t.endsWith("s") ? t.slice(0,-1) : t;
        return lev1(base,k) || lev1(t,k+"s");
      });
      if (!ok) {
        console.log(`[Evaluator] Missing required lemma: ${k}`);
        return false;
      }
    }
  }

  // 4) Token-level fuzzy match against expected (relaxed) - Enhanced tolerance
  const a = tokens(relax(opt.expected));
  const b = tokens(uRelax);
  console.log('[Evaluator] Expected tokens:', a);
  console.log('[Evaluator] User tokens:', b);
  
  // require high overlap with typo tolerance (80% match as per requirements)
  let matched = 0;
  for (const at of a) {
    if (b.some(bt => lev1(at, bt))) matched++;
  }
  const ratio = matched / Math.max(1,a.length);
  console.log(`[Evaluator] Token match ratio: ${matched}/${a.length} = ${ratio.toFixed(2)}`);
  
  // 80% similarity threshold as requested, more forgiving for natural variations
  const result = ratio >= 0.8;
  console.log(`[Evaluator] ${result ? '✅' : '❌'} Final result:`, result);
  return result;
}