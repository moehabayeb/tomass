/**
 * Module Audit Script
 *
 * Run this script to audit all modules for quality and completeness.
 * Usage: Add this import to your app temporarily and check console.
 */

import { auditAllModules, printAuditReport, getModulesNeedingUpdates, ModuleData } from '../utils/moduleValidator';

// This function should match how your LessonsApp.tsx gets module data
// You'll need to import all MODULE_*_DATA constants or have a getter function
export function getModuleDataById(moduleId: number): ModuleData | null {
  // This is a placeholder - you'll need to implement this based on your actual module data structure
  // In LessonsApp.tsx, you have MODULE_1_DATA, MODULE_2_DATA, etc.
  // This function should return the appropriate module data

  console.warn('getModuleDataById not fully implemented - requires module data imports');
  return null;
}

/**
 * Run comprehensive audit on all modules
 */
export function runFullAudit() {
  console.log('🔍 Starting comprehensive module audit...\n');

  // Audit A1 modules (1-50)
  console.log('📚 Auditing A1 Modules (1-50)...');
  const a1Report = auditAllModules(getModuleDataById, { start: 1, end: 50 });
  printAuditReport(a1Report, false);

  // Audit A2 modules (51-100)
  console.log('📚 Auditing A2 Modules (51-100)...');
  const a2Report = auditAllModules(getModuleDataById, { start: 51, end: 100 });
  printAuditReport(a2Report, false);

  // Audit B1 modules (101-150)
  console.log('📚 Auditing B1 Modules (101-150)...');
  const b1Report = auditAllModules(getModuleDataById, { start: 101, end: 150 });
  printAuditReport(b1Report, false);

  // Get modules that need updates
  const a1NeedsUpdate = getModulesNeedingUpdates(a1Report);
  const a2NeedsUpdate = getModulesNeedingUpdates(a2Report);
  const b1NeedsUpdate = getModulesNeedingUpdates(b1Report);

  console.log('\n📝 MODULES REQUIRING CONTENT UPDATES:\n');
  if (a1NeedsUpdate.length > 0) {
    console.log(`A1 Level: ${a1NeedsUpdate.join(', ')}`);
  }
  if (a2NeedsUpdate.length > 0) {
    console.log(`A2 Level: ${a2NeedsUpdate.join(', ')}`);
  }
  if (b1NeedsUpdate.length > 0) {
    console.log(`B1 Level: ${b1NeedsUpdate.join(', ')}`);
  }

  const totalNeedingUpdate = a1NeedsUpdate.length + a2NeedsUpdate.length + b1NeedsUpdate.length;
  console.log(`\n📊 Total modules needing updates: ${totalNeedingUpdate} / 150`);
  console.log(`✅ Production-ready modules: ${150 - totalNeedingUpdate} / 150\n`);

  return {
    a1: { report: a1Report, needsUpdate: a1NeedsUpdate },
    a2: { report: a2Report, needsUpdate: a2NeedsUpdate },
    b1: { report: b1Report, needsUpdate: b1NeedsUpdate },
    totalNeedingUpdate
  };
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).auditModules = runFullAudit;
  console.log('💡 Module audit function available. Run: window.auditModules()');
}
