import { typeORMConfig } from '../config/typeorm.config';
import fs = require('fs');

fs.writeFileSync('ormconfig.json', JSON.stringify(typeORMConfig, null, 2));