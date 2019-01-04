/*
 * Create and export configuration variables
 *
 */
// Container for all environments
let environments = {};

// Staging (default) environment
environments.staging = {
  'API_URL' : 'http://localhost',
  'httpPort' : 2000,
  'httpsPort' : 2001,
  'envName' : 'staging',
  'JWT_KEY' : 'web',
};

// Testing environment
environments.testing = {
  'API_URL' : 'http://localhost',
  'httpPort' : 4000,
  'httpsPort' : 4001,
  'envName' : 'testing',
  'JWT_KEY' : 'web',
  'hashingSecret' : 'thisIsASecret',
};

// Production environment
environments.production = {
  'API_URL' : 'http://localhost',
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'JWT_KEY' : 'web',
  'hashingSecret' : 'thisIsAlsoASecret',
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
