import 'jest';
import { ParquetCompression, ParquetWriterOptions } from '../src';
import fs = require('fs');
import parquet = require('../src');
import chai = require('chai');

interface TestOptions extends ParquetWriterOptions {
  useDataPageV2: boolean;
  compression: ParquetCompression;
}

function mkTpchNationSchema(opts: TestOptions) {
  return new parquet.ParquetSchema({
    nation_key: { type: 'INT32', optional: true, compression: opts.compression },
    name: { type: 'UTF8', optional: true, compression: opts.compression },
    region_key: { type: 'INT32', optional: true, compression: opts.compression },
    comment_col: { type: 'UTF8', optional: true, compression: opts.compression },
  });
}
function readTpchNationSchema(filename: string): any[] {
  const data: any[] = [];
  const csvData = fs.readFileSync(filename, 'utf8');

  const rows = csvData.split('\n');

  for (const row of rows) {
    if (!row.trim()) {
      continue;
    }
    const columns = row.trim().split('|');
    if (!columns.length) {
      continue;
    }
    data.push({
      nation_key: parseInt(columns[0]),
      name: columns[1],
      region_key: parseInt(columns[2]),
      comment_col: columns[3],
    })
  }

  return data;
}

async function writeTestData(writer: parquet.ParquetWriter<unknown>, opts: TestOptions, rows: any[]) {
  writer.setMetadata('myuid', '420');
  writer.setMetadata('fnord', 'dronf');
  for (const row of rows) {
    await writer.appendRow(row);
  }
  await writer.close();
}

async function writeTestFile(opts: TestOptions, filename: string, schema: parquet.ParquetSchema, rows: any[]) {
  const writer = await parquet.ParquetWriter.openFile(schema, filename, opts);
  await writeTestData(writer, opts, rows);
}

async function readAndWriteNation(compression: ParquetCompression) {
  const opts: TestOptions = { useDataPageV2: false, compression: compression };
  const data = readTpchNationSchema('test/parquet-testdata/tpch/nation.csv');
  const tempFile = `/tmp/parquets-tests-nation-${Date.now()}.parquet`;
  await writeTestFile(opts, tempFile, mkTpchNationSchema(opts), data);
  const reader = await parquet.ParquetReader.openFile(tempFile);
  const cursor = reader.getCursor();
  for (let i = 0; i < data.length; i++) {
    chai.assert.deepEqual(await cursor.next(), data[i]);  
  }
  chai.assert.equal(await cursor.next(), null);
  reader.close();
  fs.unlinkSync(tempFile);
}

async function readNationImpala(compression: ParquetCompression) {
  const data = readTpchNationSchema('test/parquet-testdata/tpch/nation.csv');
  const impalaFile = `test/parquet-testdata/impala/1.1.1-${compression}/nation.impala.parquet`;
  const reader = await parquet.ParquetReader.openFile(impalaFile);
  const cursor = reader.getCursor();
  for (let i = 0; i < data.length; i++) {
    chai.assert.deepEqual(await cursor.next(), data[i]);  
  }
  chai.assert.equal(await cursor.next(), null);
  reader.close();
}

describe('Parquet', function () {
  jest.setTimeout(90000);

  describe('tpch', function () {
    it('write and read nation test file uncompressed', async () => {
      await readAndWriteNation('UNCOMPRESSED');
    });
    it('write and read nation test file gzip', async () => {
      await readAndWriteNation('GZIP');
    });
    it('write and read nation test file snappy', async () => {
      await readAndWriteNation('SNAPPY');
    });
    it('reads impala nation test file uncompressed', async () => {
      await readNationImpala('UNCOMPRESSED');
    });
    it('reads impala nation test file gzip', async () => {
      await readNationImpala('GZIP');
    });
    it('reads impala nation test file snappy', async () => {
      await readNationImpala('SNAPPY');
    });
  });
});
