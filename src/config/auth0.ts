// config settings
const NAMESPACE = 'AUTH0';
const EMPTY_ENV = [null, undefined, ''];

// default config
const CONFIG = {
  client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || '',
};

// warn for empty environment values
for (const [k, v] of Object.entries(CONFIG)) {
  if (EMPTY_ENV.includes(v)) {
    console.warn('[VH]', `(${NAMESPACE})`, `MISSING ENV - ${k.toUpperCase()}`);
  }
}

export { CONFIG };
