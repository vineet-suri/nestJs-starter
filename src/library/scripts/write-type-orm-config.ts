import { configService } from '../config/config.service';
import * as fs from 'fs';

/**
 * Script to generate ormconfig file based on environment parameters
 */
const arr = [configService.getTypeOrmConfig(), configService.getTypeOrmSeedConfig()];
const TAB_SIZE = 2;

fs.writeFileSync('ormconfig.json', JSON.stringify(arr, null, TAB_SIZE), null);
