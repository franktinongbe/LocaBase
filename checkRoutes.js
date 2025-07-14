const fs = require('fs');
const path = require('path');

function scanFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanFolder(filePath);
    } else if (filePath.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const badLines = content.split('\n').filter(line =>
        line.includes(': /') || line.includes(':/') || line.includes("router.use(':") || line.includes("app.use('/api/:")
      );

      if (badLines.length > 0) {
        console.log(`🚨 Fichier à vérifier : ${filePath}`);
        badLines.forEach(line => console.log('  👉 ', line.trim()));
        console.log('---');
      }
    }
  });
}

scanFolder('./routes');
