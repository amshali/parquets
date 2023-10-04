import 'jest';
import { promisify } from 'util';
import { ParquetCompression } from '../src';
import chai = require('chai');
import fs = require('fs');
import parquet = require('../src');
import { Readable } from "stream";

const TEST_NUM_ROWS = 1000;
const TEST_VTIME = Date.now();

interface TestOptions {
  useDataPageV2: boolean;
  compression: ParquetCompression;
}

function mkTestSchema(opts: TestOptions) {
  return new parquet.ParquetSchema({
    name: { type: 'UTF8', compression: opts.compression },
    // quantity:   { type: 'INT64', encoding: 'RLE', typeLength: 6, optional: true, compression: opts.compression },
    // parquet-mr actually doesnt support this
    quantity: { type: 'INT64', optional: true, compression: opts.compression },
    price: { type: 'DOUBLE', compression: opts.compression },
    date: { type: 'TIMESTAMP_MICROS', compression: opts.compression },
    day: { type: 'DATE', compression: opts.compression },
    finger: { type: 'FIXED_LEN_BYTE_ARRAY', compression: opts.compression, typeLength: 5 },
    inter: { type: 'INTERVAL', compression: opts.compression },
    stock: {
      repeated: true,
      fields: {
        quantity: { type: 'INT64', repeated: true, compression: opts.compression },
        warehouse: { type: 'UTF8', compression: opts.compression },
        opts: {
          optional: true,
          fields: {
            a: { type: 'INT32', compression: opts.compression },
            b: { type: 'INT32', optional: true, compression: opts.compression }
          }
        },
        tags: {
          optional: true,
          repeated: true,
          fields: {
            name: { type: 'UTF8', compression: opts.compression },
            val: { type: 'UTF8', compression: opts.compression }
          }
        }
      }
    },
    colour: { type: 'UTF8', repeated: true, compression: opts.compression },
    meta_json: { type: 'BSON', optional: true, compression: opts.compression }
  });
}

function mkTestRows() {
  const rows: any[] = [];

  for (let i = 0; i < TEST_NUM_ROWS; i++) {
    rows.push({
      name: 'apples',
      quantity: 10,
      price: 2.6,
      day: new Date('2017-11-26'),
      date: new Date(TEST_VTIME + 1000 * i),
      finger: 'FNORD',
      inter: { months: 42, days: 23, milliseconds: 777 },
      stock: [
        { quantity: 10, warehouse: 'A' },
        { quantity: 20, warehouse: 'B', opts: { a: 1 }, tags: [{ name: 't', val: 'v' }] }
      ],
      colour: ['green', 'red']
    });

    rows.push({
      name: 'oranges',
      quantity: 20,
      price: 2.7,
      day: new Date('2017-11-26'),
      date: new Date(TEST_VTIME + 2000 * i),
      finger: 'FNORD',
      inter: { months: 42, days: 23, milliseconds: 777 },
      stock: {
        quantity: [50, 33],
        warehouse: 'X'
      },
      colour: ['orange']
    });

    rows.push({
      name: 'kiwi',
      price: 4.2,
      quantity: undefined,
      day: new Date('2017-11-26'),
      date: new Date(TEST_VTIME + 8000 * i),
      finger: 'FNORD',
      inter: { months: 42, days: 23, milliseconds: 777 },
      stock: [
        { quantity: 42, warehouse: 'f' },
        { quantity: 20, warehouse: 'x' }
      ],
      colour: ['green', 'brown'],
      meta_json: { expected_ship_date: new Date(TEST_VTIME) }
    });

    rows.push({
      name: 'banana',
      price: 3.2,
      day: new Date('2017-11-26'),
      date: new Date(TEST_VTIME + 6000 * i),
      finger: 'FNORD',
      inter: { months: 42, days: 23, milliseconds: 777 },
      colour: ['yellow'],
      meta_json: { shape: 'curved' }
    });
  }

  return rows;
}

async function writeTestData(writer: parquet.ParquetWriter<unknown>, opts: TestOptions) {
  writer.setMetadata('myuid', '420');
  writer.setMetadata('fnord', 'dronf');
  const rows = mkTestRows();
  for (const row of rows) {
    await writer.appendRow(row);
  }
  await writer.close();
}

async function writeTestFile(opts: TestOptions) {
  const schema = mkTestSchema(opts);
  const writer = await parquet.ParquetWriter.openFile(schema, 'fruits.parquet', opts);
  await writeTestData(writer, opts);
}

async function readTestFile() {
  const reader = await parquet.ParquetReader.openFile('fruits.parquet');
  await checkTestData(reader);
}

async function checkTestData(reader: parquet.ParquetReader<unknown>) {
  chai.assert.equal(reader.getRowCount(), TEST_NUM_ROWS * 4);
  chai.assert.deepEqual(reader.getMetadata(), { myuid: '420', fnord: 'dronf' });

  const schema = reader.getSchema();
  chai.assert.equal(schema.fieldList.length, 18);
  chai.assert(schema.fields.name);
  chai.assert(schema.fields.stock);
  chai.assert(schema.fields.stock.fields.quantity);
  chai.assert(schema.fields.stock.fields.warehouse);
  chai.assert(schema.fields.stock.fields.opts);
  chai.assert(schema.fields.stock.fields.opts.fields.a);
  chai.assert(schema.fields.stock.fields.opts.fields.b);
  chai.assert(schema.fields.stock.fields.tags);
  chai.assert(schema.fields.stock.fields.tags.fields.name);
  chai.assert(schema.fields.stock.fields.tags.fields.val);
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
    chai.assert.equal(c.fieldCount, 4);
  }

  {
    const c = schema.fields.stock.fields.quantity;
    chai.assert.equal(c.name, 'quantity');
    chai.assert.equal(c.primitiveType, 'INT64');
    chai.assert.equal(c.originalType, undefined);
    chai.assert.deepEqual(c.path, ['stock', 'quantity']);
    chai.assert.equal(c.repetitionType, 'REPEATED');
    chai.assert.equal(c.encoding, 'PLAIN');
    chai.assert.equal(c.compression, 'UNCOMPRESSED');
    chai.assert.equal(c.rLevelMax, 2);
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
    const c = schema.fields.stock.fields.opts;
    chai.assert.equal(c.name, 'opts');
    chai.assert.equal(c.primitiveType, undefined);
    chai.assert.equal(c.originalType, undefined);
    chai.assert.deepEqual(c.path, ['stock', 'opts']);
    chai.assert.equal(c.repetitionType, 'OPTIONAL');
    chai.assert.equal(c.encoding, undefined);
    chai.assert.equal(c.compression, undefined);
    chai.assert.equal(c.rLevelMax, 1);
    chai.assert.equal(c.dLevelMax, 2);
    chai.assert.equal(!!c.isNested, true);
    chai.assert.equal(c.fieldCount, 2);
  }

  {
    const c = schema.fields.stock.fields.opts.fields.a;
    chai.assert.equal(c.name, 'a');
    chai.assert.equal(c.primitiveType, 'INT32');
    chai.assert.equal(c.originalType, undefined);
    chai.assert.deepEqual(c.path, ['stock', 'opts', 'a']);
    chai.assert.equal(c.repetitionType, 'REQUIRED');
    chai.assert.equal(c.encoding, 'PLAIN');
    chai.assert.equal(c.compression, 'UNCOMPRESSED');
    chai.assert.equal(c.rLevelMax, 1);
    chai.assert.equal(c.dLevelMax, 2);
    chai.assert.equal(!!c.isNested, false);
    chai.assert.equal(c.fieldCount, undefined);
  }

  {
    const c = schema.fields.stock.fields.opts.fields.b;
    chai.assert.equal(c.name, 'b');
    chai.assert.equal(c.primitiveType, 'INT32');
    chai.assert.equal(c.originalType, undefined);
    chai.assert.deepEqual(c.path, ['stock', 'opts', 'b']);
    chai.assert.equal(c.repetitionType, 'OPTIONAL');
    chai.assert.equal(c.encoding, 'PLAIN');
    chai.assert.equal(c.compression, 'UNCOMPRESSED');
    chai.assert.equal(c.rLevelMax, 1);
    chai.assert.equal(c.dLevelMax, 3);
    chai.assert.equal(!!c.isNested, false);
    chai.assert.equal(c.fieldCount, undefined);
  }

  {
    const c = schema.fields.stock.fields.tags;
    chai.assert.equal(c.name, 'tags');
    chai.assert.equal(c.primitiveType, undefined);
    chai.assert.equal(c.originalType, undefined);
    chai.assert.deepEqual(c.path, ['stock', 'tags']);
    chai.assert.equal(c.repetitionType, 'REPEATED');
    chai.assert.equal(c.encoding, undefined);
    chai.assert.equal(c.compression, undefined);
    chai.assert.equal(c.rLevelMax, 2);
    chai.assert.equal(c.dLevelMax, 2);
    chai.assert.equal(!!c.isNested, true);
    chai.assert.equal(c.fieldCount, 2);
  }

  {
    const c = schema.fields.stock.fields.tags.fields.name;
    chai.assert.equal(c.name, 'name');
    chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
    chai.assert.equal(c.originalType, 'UTF8');
    chai.assert.deepEqual(c.path, ['stock', 'tags', 'name']);
    chai.assert.equal(c.repetitionType, 'REQUIRED');
    chai.assert.equal(c.encoding, 'PLAIN');
    chai.assert.equal(c.compression, 'UNCOMPRESSED');
    chai.assert.equal(c.rLevelMax, 2);
    chai.assert.equal(c.dLevelMax, 2);
    chai.assert.equal(!!c.isNested, false);
    chai.assert.equal(c.fieldCount, undefined);
  }

  {
    const c = schema.fields.stock.fields.tags.fields.val;
    chai.assert.equal(c.name, 'val');
    chai.assert.equal(c.primitiveType, 'BYTE_ARRAY');
    chai.assert.equal(c.originalType, 'UTF8');
    chai.assert.deepEqual(c.path, ['stock', 'tags', 'val']);
    chai.assert.equal(c.repetitionType, 'REQUIRED');
    chai.assert.equal(c.encoding, 'PLAIN');
    chai.assert.equal(c.compression, 'UNCOMPRESSED');
    chai.assert.equal(c.rLevelMax, 2);
    chai.assert.equal(c.dLevelMax, 2);
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

  {
    const cursor = reader.getCursor();
    for (let i = 0; i < TEST_NUM_ROWS; i++) {
      chai.assert.deepEqual(await cursor.next(), {
        name: 'apples',
        quantity: 10,
        price: 2.6,
        day: new Date('2017-11-26'),
        date: new Date(TEST_VTIME + 1000 * i),
        finger: Buffer.from('FNORD'),
        inter: { months: 42, days: 23, milliseconds: 777 },
        stock: [
          { quantity: [10], warehouse: 'A' },
          { quantity: [20], warehouse: 'B', opts: { a: 1 }, tags: [{ name: 't', val: 'v' }] }
        ],
        colour: ['green', 'red']
      });

      chai.assert.deepEqual(await cursor.next(), {
        name: 'oranges',
        quantity: 20,
        price: 2.7,
        day: new Date('2017-11-26'),
        date: new Date(TEST_VTIME + 2000 * i),
        finger: Buffer.from('FNORD'),
        inter: { months: 42, days: 23, milliseconds: 777 },
        stock: [
          { quantity: [50, 33], warehouse: 'X' }
        ],
        colour: ['orange']
      });

      chai.assert.deepEqual(await cursor.next(), {
        name: 'kiwi',
        price: 4.2,
        day: new Date('2017-11-26'),
        date: new Date(TEST_VTIME + 8000 * i),
        finger: Buffer.from('FNORD'),
        inter: { months: 42, days: 23, milliseconds: 777 },
        stock: [
          { quantity: [42], warehouse: 'f' },
          { quantity: [20], warehouse: 'x' }
        ],
        colour: ['green', 'brown'],
        meta_json: { expected_ship_date: new Date(TEST_VTIME) }
      });

      chai.assert.deepEqual(await cursor.next(), {
        name: 'banana',
        price: 3.2,
        day: new Date('2017-11-26'),
        date: new Date(TEST_VTIME + 6000 * i),
        finger: Buffer.from('FNORD'),
        inter: { months: 42, days: 23, milliseconds: 777 },
        colour: ['yellow'],
        meta_json: { shape: 'curved' }
      });
    }

    chai.assert.equal(await cursor.next(), null);
  }

  {
    const cursor = reader.getCursor(['name']);
    for (let i = 0; i < TEST_NUM_ROWS; i++) {
      chai.assert.deepEqual(await cursor.next(), { name: 'apples' });
      chai.assert.deepEqual(await cursor.next(), { name: 'oranges' });
      chai.assert.deepEqual(await cursor.next(), { name: 'kiwi' });
      chai.assert.deepEqual(await cursor.next(), { name: 'banana' });
    }

    chai.assert.equal(await cursor.next(), null);
  }

  {
    const cursor = reader.getCursor(['name', 'quantity']);
    for (let i = 0; i < TEST_NUM_ROWS; i++) {
      chai.assert.deepEqual(await cursor.next(), { name: 'apples', quantity: 10 });
      chai.assert.deepEqual(await cursor.next(), { name: 'oranges', quantity: 20 });
      chai.assert.deepEqual(await cursor.next(), { name: 'kiwi' });
      chai.assert.deepEqual(await cursor.next(), { name: 'banana' });
    }

    chai.assert.equal(await cursor.next(), null);
  }

  await reader.close();
}

// tslint:disable:ter-prefer-arrow-callback
describe('Parquet', function () {
  jest.setTimeout(90000);

  describe('with DataPageHeaderV1', function () {
    it('write a test file', function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'UNCOMPRESSED' };
      return writeTestFile(opts);
    });

    it('write a test file and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'UNCOMPRESSED' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write an empty test file and then read it back', async function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'UNCOMPRESSED' };
      const schema = mkTestSchema(opts);
      const writer = await parquet.ParquetWriter.openFile(schema, 'empty.parquet', opts);
      await writer.close();
      const reader = await parquet.ParquetReader.openFile('empty.parquet');
      expect(reader.getRowCount()).toBe(0);
    });

    it('write an empty test file with empty schema and then read it back', async function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'UNCOMPRESSED' };
      const schema = new parquet.ParquetSchema({});
      const writer = await parquet.ParquetWriter.openFile(schema, 'empty.parquet', opts);
      await writer.close();
      const reader = await parquet.ParquetReader.openFile('empty.parquet');
      expect(reader.getRowCount()).toBe(0);
    });

    it('supports reading from a buffer', function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'UNCOMPRESSED' };
      return writeTestFile(opts).then(async function () {
        const data = await promisify(fs.readFile)('fruits.parquet');
        const reader = await parquet.ParquetReader.openBuffer(data);
        await checkTestData(reader);
      });
    });

    it('write a test file with GZIP compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'GZIP' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write a test file with SNAPPY compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'SNAPPY' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write a test file with LZO compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'LZO' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write a test file with BROTLI compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'BROTLI' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write a test file with LZ4 compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: false, compression: 'LZ4' };
      return writeTestFile(opts).then(readTestFile);
    });
  });

  describe('with DataPageHeaderV2', function () {
    it('write a test file and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: true, compression: 'UNCOMPRESSED' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write an empty test file and then read it back', async function () {
      const opts: TestOptions = { useDataPageV2: true, compression: 'UNCOMPRESSED' };
      const schema = mkTestSchema(opts);
      const writer = await parquet.ParquetWriter.openFile(schema, 'empty.parquet', opts);
      await writer.close();
      const reader = await parquet.ParquetReader.openFile('empty.parquet');
      expect(reader.getRowCount()).toBe(0);
    });

    it('write an empty test file with empty schema and then read it back', async function () {
      const opts: TestOptions = { useDataPageV2: true, compression: 'UNCOMPRESSED' };
      const schema = new parquet.ParquetSchema({});
      const writer = await parquet.ParquetWriter.openFile(schema, 'empty.parquet', opts);
      await writer.close();
      const reader = await parquet.ParquetReader.openFile('empty.parquet');
      expect(reader.getRowCount()).toBe(0);
    });
    it('write a test file with GZIP compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: true, compression: 'GZIP' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write a test file with SNAPPY compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: true, compression: 'SNAPPY' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write a test file with LZO compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: true, compression: 'LZO' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write a test file with BROTLI compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: true, compression: 'BROTLI' };
      return writeTestFile(opts).then(readTestFile);
    });

    it('write a test file with LZ4 compression and then read it back', function () {
      const opts: TestOptions = { useDataPageV2: true, compression: 'LZ4' };
      return writeTestFile(opts).then(readTestFile);
    });

  });

  describe('using the Stream/Transform API', function () {
    it('write a test file', async function () {
      const opts: any = { useDataPageV2: true, compression: 'GZIP' };
      const schema = mkTestSchema(opts);
      const transform = new parquet.ParquetTransformer(schema, opts);
      transform.writer.setMetadata('myuid', '420');
      transform.writer.setMetadata('fnord', 'dronf');
      const ostream = fs.createWriteStream('fruits_stream.parquet');
      const istream = Readable.from(mkTestRows());
      istream.pipe(transform).pipe(ostream);
      await promisify(ostream.on.bind(ostream, 'finish'))();
      await readTestFile();
    });
  });

  if ('asyncIterator' in Symbol) {
    describe('using the AsyncIterable API', function () {
      it('allows iteration on a cursor using for-await-of', async function () {
        await writeTestFile({ useDataPageV2: true, compression: 'GZIP' });
        const reader = await parquet.ParquetReader.openFile<{ name: string }>('fruits.parquet');

        async function checkTestDataUsingForAwaitOf(cursor: AsyncIterable<{ name: string }>) {
          const names: Set<string> = new Set();
          let rowCount = 0;
          for await (const row of cursor) {
            names.add(row.name);
            rowCount++;
          }
          chai.assert.equal(rowCount, TEST_NUM_ROWS * names.size);
          chai.assert.deepEqual(names, new Set(['apples', 'oranges', 'kiwi', 'banana']));
        }

        // Works with reader (will return all columns)
        await checkTestDataUsingForAwaitOf(reader);

        // Works with a cursor
        const cursor = reader.getCursor(['name']);
        await checkTestDataUsingForAwaitOf(cursor);
      });
    });
  }
});
