const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '..', 'public', 'translations');
const ruDir = path.join(translationsDir, 'ru');
const ukDir = path.join(translationsDir, 'uk');

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const txt = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    console.error('Failed to read/parse', filePath, e.message);
    return null;
  }
}

function writeJson(filePath, obj) {
  const txt = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(filePath, txt, 'utf8');
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function mergeRuIntoUk(ruObj, ukObj) {
  // mutate ukObj by adding missing keys from ruObj with empty string placeholders
  if (ruObj && typeof ruObj === 'object' && !Array.isArray(ruObj)) {
    if (!ukObj || typeof ukObj !== 'object' || Array.isArray(ukObj)) {
      ukObj = {};
    }
    Object.keys(ruObj).forEach((key) => {
      const ruVal = ruObj[key];
      const ukVal = ukObj[key];
      if (ruVal && typeof ruVal === 'object' && !Array.isArray(ruVal)) {
        ukObj[key] = mergeRuIntoUk(ruVal, ukVal || {});
      } else {
        if (ukVal === undefined) {
          ukObj[key] = '';
        } else {
          ukObj[key] = ukVal;
        }
      }
    });
  }
  return ukObj;
}

function sync() {
  ensureDir(ukDir);
  const files = fs.readdirSync(ruDir).filter(f => f.endsWith('.json'));
  files.forEach((file) => {
    const ruPath = path.join(ruDir, file);
    const ukPath = path.join(ukDir, file);
    const ruJson = readJson(ruPath);
    if (!ruJson) return;
    const ukJson = readJson(ukPath) || {};
    const merged = mergeRuIntoUk(ruJson, ukJson);
    writeJson(ukPath, merged);
    console.log('Synced', file);
  });
  console.log('Done. Missing keys added to `uk` files as empty strings.');
}

if (require.main === module) {
  sync();
}
