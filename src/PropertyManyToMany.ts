import { BaseProperty, PropertyType } from 'adminjs';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { DATA_TYPES } from './utils/data-types';
import { parseEntityProperties } from './utils/get-properties';

export class PropertyManyToMany extends BaseProperty {
  public column: RelationMetadata;

  private columnPosition: number;

  constructor(column: RelationMetadata, columnPosition = 0) {
    const path = column.propertyPath;
    super({ path });
    this.column = column;
    this.columnPosition = columnPosition;
  }

  public isEditable(): boolean {
    return true;
  }

  public isId(): boolean {
    return false;
  }

  public isSortable(): boolean {
    return false;
  }

  public reference(): string | null {
    const ref = this.column;
    if (ref) return ref.inverseEntityMetadata.name;
    return null;
  }

  public referenceName(): string | null {
    return this.column.propertyName;
  }

  public subProperties(): Array<BaseProperty> {
    return Object.values(
      parseEntityProperties(this.column.inverseEntityMetadata)
    );
  }

  public availableValues(): Array<any> | null {
    return null;
  }

  public position(): number {
    return this.columnPosition || 0;
  }

  public type(): PropertyType {
    let type: PropertyType = DATA_TYPES[this.column.type as any];

    if (typeof this.column.type === 'function') {
      if (this.column.type === Number) {
        type = 'number';
      }
      if (this.column.type === String) {
        type = 'string';
      }
      if (this.column.type === Date) {
        type = 'datetime';
      }
      if (this.column.type === Boolean) {
        type = 'boolean';
      }
    }

    if (this.reference()) {
      type = 'reference';
    }

    // eslint-disable-next-line no-console
    if (!type) {
      console.warn(`Unhandled type: ${this.column.type}`);
    }

    return type;
  }

  public isArray(): boolean {
    return true;
  }
}
