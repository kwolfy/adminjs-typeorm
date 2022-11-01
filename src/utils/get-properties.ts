import { EntityMetadata } from 'typeorm';
import { Property } from '../Property';
import { PropertyManyToMany } from '../PropertyManyToMany';

export function parseEntityProperties(metadata: EntityMetadata) {
  const { columns, manyToManyRelations } = metadata;

  const results = columns.reduce((memo, col, index) => {
    const property = new Property(col, index);
    return {
      ...memo,
      [property.path()]: property,
    };
  }, {});

  if (manyToManyRelations?.length) {
    let index = Object.keys(results).length;
    for (const rel of manyToManyRelations) {
      const property = new PropertyManyToMany(rel, index);
      results[property.path()] = property;
      index++;
    }
  }

  return results;
}
