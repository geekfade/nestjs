import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';

const YAML_COMMON_CONFIG_FILENAME = 'config.yaml';

const filePath = join(__dirname, '../config', YAML_COMMON_CONFIG_FILENAME);
const envPath = join(
  __dirname,
  '../config',
  `config.${process.env.NODE_ENV || 'development'}.yaml`,
);

const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

/**
 * Loads and returns the configuration from a YAML file.
 * @returns The configuration object.
 */
export default () => {
  return _.merge(commonConfig, envConfig);
};
