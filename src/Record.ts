import { BaseRecord } from 'adminjs';
import { GetOptions } from 'adminjs/src/utils/flat';

export class TypeOrmRecord extends BaseRecord {
  get(propertyPath?: string, options?: GetOptions): any {
    const value = super.get(propertyPath, options);

    console.log('get value', value);
    return value;
  }
}
