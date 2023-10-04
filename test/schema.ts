import chai = require('chai');
import parquet = require('../src');

// tslint:disable:ter-prefer-arrow-callback

describe('ParquetSchema', function () {

  it('should assign correct defaults in a simple flat schema', function () {
    const schema = new parquet.ParquetSchema({
      name: { type: 'UTF8' },
      quantity: { type: 'INT64' },
      price: { type: 'DOUBLE' },
    });

    chai.assert.equal(schema.fieldList.length, 3);
    chai.assert(schema.fields.name);
    chai.assert(schema.fields.quantity);
    chai.assert(schema.fields.price);

    {
      const c = schema.fields.name;
      chai.assert.equal(c.name, 'name');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['name']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.quantity;
      chai.assert.equal(c.name, 'quantity');
      chai.assert.equal(c.primitiveType, 'INT64');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['quantity']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.price;
      chai.assert.equal(c.name, 'price');
      chai.assert.equal(c.primitiveType, 'DOUBLE');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['price']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

  });

  it('should assign correct defaults in a flat schema with optional fieldList', function () {
    const schema = new parquet.ParquetSchema({
      name: { type: 'UTF8' },
      quantity: { type: 'INT64', optional: true },
      price: { type: 'DOUBLE' },
    });

    chai.assert.equal(schema.fieldList.length, 3);
    chai.assert(schema.fields.name);
    chai.assert(schema.fields.quantity);
    chai.assert(schema.fields.price);

    {
      const c = schema.fields.name;
      chai.assert.equal(c.name, 'name');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['name']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.quantity;
      chai.assert.equal(c.name, 'quantity');
      chai.assert.equal(c.primitiveType, 'INT64');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['quantity']);
      chai.assert.equal(c.repetitionType, 'OPTIONAL');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 1);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.price;
      chai.assert.equal(c.name, 'price');
      chai.assert.equal(c.primitiveType, 'DOUBLE');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['price']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }
  });

  it('should assign correct defaults in a flat schema with repeated fieldList', function () {
    const schema = new parquet.ParquetSchema({
      name: { type: 'UTF8' },
      quantity: { type: 'INT64', repeated: true },
      price: { type: 'DOUBLE' },
    });

    chai.assert.equal(schema.fieldList.length, 3);
    chai.assert(schema.fields.name);
    chai.assert(schema.fields.quantity);
    chai.assert(schema.fields.price);

    {
      const c = schema.fields.name;
      chai.assert.equal(c.name, 'name');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['name']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.quantity;
      chai.assert.equal(c.name, 'quantity');
      chai.assert.equal(c.primitiveType, 'INT64');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['quantity']);
      chai.assert.equal(c.repetitionType, 'REPEATED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 1);
      chai.assert.equal(c.dLevelMax, 1);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.price;
      chai.assert.equal(c.name, 'price');
      chai.assert.equal(c.primitiveType, 'DOUBLE');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['price']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }
  });

  it('should assign correct defaults in a nested schema without repetition modifiers', function () {
    const schema = new parquet.ParquetSchema({
      name: { type: 'UTF8' },
      stock: {
        fields: {
          quantity: { type: 'INT64' },
          warehouse: { type: 'UTF8' },
        }
      },
      price: { type: 'DOUBLE' },
    });

    chai.assert.equal(schema.fieldList.length, 5);
    chai.assert(schema.fields.name);
    chai.assert(schema.fields.stock);
    chai.assert(schema.fields.stock.fields.quantity);
    chai.assert(schema.fields.stock.fields.warehouse);
    chai.assert(schema.fields.price);

    {
      const c = schema.fields.name;
      chai.assert.equal(c.name, 'name');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['name']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.stock;
      chai.assert.equal(c.name, 'stock');
      chai.assert.equal(c.primitiveType, undefined);
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['stock']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, undefined);
      chai.assert.equal(c.compression, undefined);
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, true);
      chai.assert.equal(c.fieldCount, 2);
    }

    {
      const c = schema.fields.stock.fields.quantity;
      chai.assert.equal(c.name, 'quantity');
      chai.assert.equal(c.primitiveType, 'INT64');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['stock', 'quantity']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.stock.fields.warehouse;
      chai.assert.equal(c.name, 'warehouse');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['stock', 'warehouse']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.price;
      chai.assert.equal(c.name, 'price');
      chai.assert.equal(c.primitiveType, 'DOUBLE');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['price']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }
  });

  it('should assign correct defaults in a nested schema with optional fields', function () {
    const schema = new parquet.ParquetSchema({
      name: { type: 'UTF8' },
      stock: {
        optional: true,
        fields: {
          quantity: { type: 'INT64', optional: true },
          warehouse: { type: 'UTF8' },
        }
      },
      price: { type: 'DOUBLE' },
    });

    chai.assert.equal(schema.fieldList.length, 5);
    chai.assert(schema.fields.name);
    chai.assert(schema.fields.stock);
    chai.assert(schema.fields.stock.fields.quantity);
    chai.assert(schema.fields.stock.fields.warehouse);
    chai.assert(schema.fields.price);

    {
      const c = schema.fields.name;
      chai.assert.equal(c.name, 'name');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['name']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.stock;
      chai.assert.equal(c.name, 'stock');
      chai.assert.equal(c.primitiveType, undefined);
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['stock']);
      chai.assert.equal(c.repetitionType, 'OPTIONAL');
      chai.assert.equal(c.encoding, undefined);
      chai.assert.equal(c.compression, undefined);
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 1);
      chai.assert.equal(!!c.isNested, true);
      chai.assert.equal(c.fieldCount, 2);
    }

    {
      const c = schema.fields.stock.fields.quantity;
      chai.assert.equal(c.name, 'quantity');
      chai.assert.equal(c.primitiveType, 'INT64');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['stock', 'quantity']);
      chai.assert.equal(c.repetitionType, 'OPTIONAL');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 2);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.stock.fields.warehouse;
      chai.assert.equal(c.name, 'warehouse');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['stock', 'warehouse']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 1);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.price;
      chai.assert.equal(c.name, 'price');
      chai.assert.equal(c.primitiveType, 'DOUBLE');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['price']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }
  });

  it('should assign correct defaults in a nested schema with repeated fields', function () {
    const schema = new parquet.ParquetSchema({
      name: { type: 'UTF8' },
      stock: {
        repeated: true,
        fields: {
          quantity: { type: 'INT64', optional: true },
          warehouse: { type: 'UTF8' },
        }
      },
      price: { type: 'DOUBLE' },
    });

    chai.assert.equal(schema.fieldList.length, 5);
    chai.assert(schema.fields.name);
    chai.assert(schema.fields.stock);
    chai.assert(schema.fields.stock.fields.quantity);
    chai.assert(schema.fields.stock.fields.warehouse);
    chai.assert(schema.fields.price);

    {
      const c = schema.fields.name;
      chai.assert.equal(c.name, 'name');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['name']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.stock;
      chai.assert.equal(c.name, 'stock');
      chai.assert.equal(c.primitiveType, undefined);
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['stock']);
      chai.assert.equal(c.repetitionType, 'REPEATED');
      chai.assert.equal(c.encoding, undefined);
      chai.assert.equal(c.compression, undefined);
      chai.assert.equal(c.rLevelMax, 1);
      chai.assert.equal(c.dLevelMax, 1);
      chai.assert.equal(!!c.isNested, true);
      chai.assert.equal(c.fieldCount, 2);
    }

    {
      const c = schema.fields.stock.fields.quantity;
      chai.assert.equal(c.name, 'quantity');
      chai.assert.equal(c.primitiveType, 'INT64');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['stock', 'quantity']);
      chai.assert.equal(c.repetitionType, 'OPTIONAL');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 1);
      chai.assert.equal(c.dLevelMax, 2);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.stock.fields.warehouse;
      chai.assert.equal(c.name, 'warehouse');
      chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
      chai.assert.equal(c.originalType, 'UTF8');
      chai.assert.deepEqual(c.path, ['stock', 'warehouse']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 1);
      chai.assert.equal(c.dLevelMax, 1);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }

    {
      const c = schema.fields.price;
      chai.assert.equal(c.name, 'price');
      chai.assert.equal(c.primitiveType, 'DOUBLE');
      chai.assert.equal(c.originalType, undefined);
      chai.assert.deepEqual(c.path, ['price']);
      chai.assert.equal(c.repetitionType, 'REQUIRED');
      chai.assert.equal(c.encoding, 'PLAIN');
      chai.assert.equal(c.compression, 'UNCOMPRESSED');
      chai.assert.equal(c.rLevelMax, 0);
      chai.assert.equal(c.dLevelMax, 0);
      chai.assert.equal(!!c.isNested, false);
      chai.assert.equal(c.fieldCount, undefined);
    }
  });

});
