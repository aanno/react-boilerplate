// ATTENTION (tp): Do not convert this file to TypeScript!

const exec = require('child_process').exec;
exec('npm -v', function (err, stdout, stderr) {
  if (err) throw err;
  const version = parseFloat(stdout);
  if (version < 3) {
    // TODO (tp):
    // throw new Error('[ERROR: React Boilerplate] You need npm version @>=3');
    // process.exit(1);
    console.log('[ERROR: React Boilerplate] You need npm version @>=3, got version ' + version);
  }
});
