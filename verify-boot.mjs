// Verify the refactored dsh-mcp-manager bundle loads in a fresh web-profile boot.
// Starts runProfile on port 3099, checks the mcpInventory gateway and the
// client module factory, prints results, shuts down.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const profileBoot = require('C:/Users/15354/.dsh/profiles/node_modules/@deepseek-ai/dsh/lib/profile-boot-DG5t9aNs.js');
const runProfile = profileBoot.o;

const env = new Map(Object.entries(process.env));
env.set('DSH_HOME', 'C:/Users/15354/.dsh');

const booted = await runProfile({
  profile: 'web',
  patchFiles: [],
  args: ['--port', '3099'],
  environment: env,
  binName: 'dsh',
  cwd: process.cwd(),
});
const ctx = booted.ctx ?? booted;
const shutdown = typeof booted.shutdown === 'function' ? booted.shutdown : () => {};

const results = {};

try {
  // 1. mcpInventory service present?
  const svc = ctx.mcpInventory;
  results.servicePresent = typeof svc === 'object' && svc !== null;
  if (!svc) throw new Error('mcpInventory service not registered');

  // 2. list returns entries
  const snapshot = await svc.list();
  results.listOk = snapshot !== null && typeof snapshot === 'object' && Array.isArray(snapshot.entries);
  results.entryCount = results.listOk ? snapshot.entries.length : 'n/a';
  results.entryIds = results.listOk ? snapshot.entries.map(e => e.id) : [];
  results.entryEnabled = results.listOk ? snapshot.entries.map(e => ({ id: e.id, enabled: e.enabled })) : [];

  // 2b. setEnabled round-trip on the first real entry (restore afterwards)
  const first = results.listOk ? snapshot.entries.find(e => e.id.startsWith('mcp-')) : null;
  if (first) {
    const origEnabled = first.enabled !== false;
    const target = !origEnabled;
    const disabled = await svc.setEnabled({ id: first.id, enabled: target });
    results.setEnabledOk = disabled?.ok === true && disabled.enabled === target;
    results.setEnabledEntries = disabled?.entries?.map(e => ({ id: e.id, enabled: e.enabled }));
    const restored = await svc.setEnabled({ id: first.id, enabled: origEnabled });
    results.setEnabledRestored = restored?.ok === true && restored.enabled === origEnabled;
    const after = await svc.list();
    const backToNormal = after.entries.find(e => e.id === first.id);
    results.setEnabledFileRestored = backToNormal?.enabled === origEnabled;
  } else {
    results.setEnabledSkipped = 'no mcp entries';
  }

  // 3. client module factory loads and exports apply (browser module: mock window
  //    __ModuleLoader__.load to actually run the factory and capture exports)
  let clientExports = null;
  globalThis.window = {
    __ModuleLoader__: {
      load: (spec) => {
        results.clientSpec = { id: spec.id, factory: typeof spec.factory === 'function' };
        if (typeof spec.factory === 'function') {
          const factoryResult = spec.factory((id) => {
            // minimal require shim: the factory only needs react/jsx-runtime and
            // @deepseek-ai/dsh-client-ui-primitives at module top level
            if (id === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null, Fragment: 'fragment' };
            if (id === 'react') return { useState: () => [null, () => {}], useEffect: () => {}, useRef: () => ({ current: null }), useId: () => 'id', useMemo: () => null };
            if (id === '@deepseek-ai/dsh-client-ui-primitives') return { IconChevronDownOutline14: 'icon' };
            throw new Error(`unexpected require: ${id}`);
          });
          clientExports = factoryResult;
        }
      }
    }
  };
  const clientMod = require('C:/Users/15354/.dsh/profiles/web/node_modules/@wanghailong0419/dsh-mcp-manager/lib/client.js');
  results.clientExports = {
    hasApply: typeof clientExports?.apply === 'function',
    hasInject: Array.isArray(clientExports?.inject),
    ns: clientExports?.NS,
  };
} catch (err) {
  results.error = String(err?.stack || err);
} finally {
  try { await shutdown(); } catch { /* ignore */ }
}

console.log('=== MCP VERIFY RESULT ===');
console.log(JSON.stringify(results, null, 2));
setTimeout(() => process.exit(results.error ? 1 : 0), 300);
