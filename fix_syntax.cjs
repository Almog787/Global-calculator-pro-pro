const fs = require('fs');
let code = fs.readFileSync('src/contexts/i18n.tsx', 'utf8');

// I will just replace all instances of unescaped quotes within the fr strings.
// Specifically:
code = code.replace(/l'Addition/g, "l\\'Addition");
code = code.replace(/l'addition/g, "l\\'addition");
code = code.replace(/d'Âge/g, "d\\'Âge");
code = code.replace(/aujourd'hui/g, "aujourd\\'hui");

fs.writeFileSync('src/contexts/i18n.tsx', code);
