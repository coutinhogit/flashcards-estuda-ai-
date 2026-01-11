const fs = require('fs');
const path = require('path');

// Load .env file
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse .env file
const lines = envContent.split('\n');
lines.forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, ...valueParts] = trimmedLine.split('=');
    const value = valueParts.join('=').trim();
    process.env[key.trim()] = value;
  }
});

// Set Angular environment variables
const supabaseUrl = process.env['NG_APP_SUPABASE_URL'] || '';
const supabaseKey = process.env['NG_APP_SUPABASE_KEY'] || '';

const targetPath = path.join(__dirname, '../src/app/environments/environment.ts');

const envConfigFile = `export const environment = {
  production: false,
  supabaseUrl: '${supabaseUrl}',
  supabaseKey: '${supabaseKey}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
console.log(`Output generated at ${targetPath}`);

