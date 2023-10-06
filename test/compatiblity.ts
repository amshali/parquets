import 'jest';
import parquet = require('../src');

async function reads(filePath:string) {
  const reader = await parquet.ParquetReader.openFile(filePath);
  const cursor = reader.getCursor();
  while (true) {
    const data = await cursor.next()
    if (!data) {
      break;
    }
    console.log(data);
  }
  reader.close();
}

describe('Parquet', function () {
  jest.setTimeout(600 * 1000);

  describe('tpch', function () {
    it('reads test/parquet-testdata/alltypes_plain.parquet', async () => {
      await reads('test/parquet-testdata/alltypes_plain.parquet');
    });
  });
});
