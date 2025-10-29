import React from 'react';
import { MODULES_BY_LEVEL } from '../utils/lessons/moduleData';
import {
  MODULE_161_DATA,
  MODULE_162_DATA,
  MODULE_163_DATA,
  MODULE_164_DATA,
  MODULE_165_DATA,
  MODULE_166_DATA,
  MODULE_167_DATA,
  MODULE_168_DATA
} from '../components/B2ModulesData';

export default function TestB2Modules() {
  const b2Modules = MODULES_BY_LEVEL.B2 || [];
  const newModules = b2Modules.filter(m => m.id >= 161 && m.id <= 168);

  // Apple Store Compliance: Silent operation

  const moduleDataExports = {
    MODULE_161_DATA,
    MODULE_162_DATA,
    MODULE_163_DATA,
    MODULE_164_DATA,
    MODULE_165_DATA,
    MODULE_166_DATA,
    MODULE_167_DATA,
    MODULE_168_DATA
  };

  return (
    <div style={{
      padding: '20px',
      background: '#1a1a1a',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#60a5fa' }}>🚨 EMERGENCY B2 MODULES DIAGNOSTIC</h1>
      <p>This page bypasses React Router and directly imports moduleData.ts</p>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#a78bfa' }}>📊 Step 1: MODULES_BY_LEVEL.B2</h2>
        {b2Modules.length > 0 ? (
          <div style={{ color: '#4ade80' }}>
            ✅ SUCCESS: Found {b2Modules.length} B2 modules
            {b2Modules.length !== 18 && (
              <div style={{ color: '#fbbf24', marginTop: '10px' }}>
                ⚠️ WARNING: Expected 18 modules but found {b2Modules.length}
              </div>
            )}
          </div>
        ) : (
          <div style={{ color: '#f87171' }}>
            ❌ ERROR: No B2 modules found!
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#a78bfa' }}>🎯 Step 2: Modules 161-168 Specifically</h2>
        {newModules.length > 0 ? (
          <div style={{ color: '#4ade80' }}>
            ✅ SUCCESS: Found {newModules.length} new modules (161-168)
            <div style={{ marginTop: '10px', fontSize: '14px' }}>
              Module IDs: {newModules.map(m => m.id).join(', ')}
            </div>
          </div>
        ) : (
          <div style={{ color: '#f87171' }}>
            ❌ CRITICAL: NO modules 161-168 found!
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#a78bfa' }}>📋 Step 3: ALL B2 Modules List</h2>
        <div style={{ display: 'grid', gap: '10px', marginTop: '15px' }}>
          {b2Modules.map((module) => {
            const isNew = module.id >= 161 && module.id <= 168;
            return (
              <div
                key={module.id}
                style={{
                  background: isNew ? '#065f46' : '#2a2a2a',
                  border: `1px solid ${isNew ? '#10b981' : '#444'}`,
                  borderRadius: '8px',
                  padding: '15px'
                }}
              >
                <strong style={{ color: isNew ? '#4ade80' : '#fff' }}>
                  {isNew ? '🆕 NEW: ' : ''}Module {module.id}
                </strong>
                <br />
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  Title: {module.title}
                </span>
                <br />
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                  Description: {module.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#a78bfa' }}>🔍 Step 4: B2ModulesData.ts Exports</h2>
        {Object.entries(moduleDataExports).map(([key, data]) => {
          const moduleNum = key.match(/\d+/)?.[0];
          return (
            <div
              key={key}
              style={{
                background: '#2a2a2a',
                border: '1px solid #10b981',
                borderRadius: '8px',
                padding: '15px',
                marginTop: '10px'
              }}
            >
              <strong style={{ color: '#4ade80' }}>✅ {key}</strong>
              <br />
              <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                Title: {data.title}
              </span>
              <br />
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                Q&A pairs: {data.speakingPractice?.length || 0}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#065f46', borderRadius: '8px' }}>
        <h2 style={{ color: '#4ade80', marginTop: 0 }}>✅ DIAGNOSTIC COMPLETE</h2>
        <p style={{ fontSize: '14px', color: '#d1fae5' }}>
          <strong>Conclusion:</strong> If you see SUCCESS messages above, the modules exist in the codebase.
          If the main app still doesn't show them, it's a React Router or caching issue.
        </p>
        <p style={{ fontSize: '14px', color: '#d1fae5' }}>
          Check the browser console for additional debug logs starting with "🔍 TEST PAGE -"
        </p>
      </div>
    </div>
  );
}
