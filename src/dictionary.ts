import { CursorBuffer, ParquetCodecOptions } from './codec';
import { PrimitiveType } from './declare';
import { Encoding, PageHeader } from './thrift';
import * as Util from './util';

export abstract class Dictionary {
  public static createDictionary(type: PrimitiveType, dictPage: DictionaryPage,
      opts?: ParquetCodecOptions): Dictionary {
    switch (type) {
      case 'BOOLEAN':
        throw new Error(`unsupported type: ${type}`);
      case 'INT32':
        return new PlainNumberDictionary(dictPage, 'INT32');
      case 'INT64':
        return new PlainNumberDictionary(dictPage, 'INT64');
      case 'INT96':
        return new PlainNumberDictionary(dictPage, 'INT96');
      case 'FLOAT':
        return new PlainNumberDictionary(dictPage, 'FLOAT');
      case 'DOUBLE':
        return new PlainNumberDictionary(dictPage, 'DOUBLE');
      case 'BYTE_ARRAY':
        return new PlainBinaryDictionary(dictPage);
      case 'FIXED_LEN_BYTE_ARRAY':
        return new PlainBinaryDictionary(dictPage, opts.typeLength);
      default:
        throw new Error(`unsupported type: ${type}`);
    }
  }

  public encoding: Encoding;
  constructor(encoding: Encoding) {
    this.encoding = encoding;
  }

  public abstract getMaxId(): number;

  protected decodeToBinary(id: number): Buffer {
    throw new Error("Unsupported operation");
  }
  public decodeToNumber(id: number): number {
    throw new Error("Unsupported operation");
  }

  public decodeValues(type: PrimitiveType, values: any[]): any[] {
    let actualValues: any[] = [];
    switch (type) {
      case 'BOOLEAN':
        throw new Error(`unsupported type: ${type}`);
      case 'INT32':
      case 'INT64':
      case 'INT96':
      case 'FLOAT':
      case 'DOUBLE':
        values.forEach((v: any, i: number) => {
          actualValues[i] = this.decodeToNumber(v);
        })
        break;
      case 'BYTE_ARRAY':
      case 'FIXED_LEN_BYTE_ARRAY':
        values.forEach((v: any, i: number) => {
          actualValues[i] = this.decodeToBinary(v);
        })
        break;
      default:
        throw new Error(`unsupported type: ${type}`);
    }
    return actualValues;
  }  
}

abstract class PlainValuesDictionary extends Dictionary {
  protected dictionaryPage: DictionaryPage;
  constructor(dictionaryPage: DictionaryPage) {
    super(dictionaryPage.header.dictionary_page_header.encoding);
    if (this.encoding != Encoding.PLAIN_DICTIONARY
      && this.encoding != Encoding.PLAIN) {
      throw new Error(`Dictionary data encoding type not supported: ${this.encoding}`);
    }
    this.dictionaryPage = dictionaryPage;
  }
}

class PlainBinaryDictionary extends PlainValuesDictionary {
  private binaryDictionaryContent: Buffer[] = null;
  constructor(dictionaryPage: DictionaryPage, length?: number) {
    super(dictionaryPage);
    const numItems = dictionaryPage.header.dictionary_page_header.num_values;
    const cursor: CursorBuffer = {
      buffer: this.dictionaryPage.bytes,
      offset: 0,
      size: this.dictionaryPage.bytes.length
    };
    if (!length) {
      this.binaryDictionaryContent = Util.decodeValues('BYTE_ARRAY', 'PLAIN', cursor,
        numItems, {

        });
    } else {
      if (length < 1) {
        throw new Error(`Invalid byte array length: ${length}`);
      }
      this.binaryDictionaryContent = Util.decodeValues('FIXED_LEN_BYTE_ARRAY', 'PLAIN', cursor,
        numItems, {
        typeLength: length
      });
    }
  }
  public decodeToBinary(id: number): Buffer {
    if (id < 0 || id > this.getMaxId()) {
      throw new Error(`Invalid index into dictionary: ${id}`);
    }
    return this.binaryDictionaryContent[id];
  }
  public getMaxId(): number {
    return this.binaryDictionaryContent.length - 1;
  }
  public toString(): string {
    let b = "{\n";
    for (let i = 0; i < this.binaryDictionaryContent.length; i++) {
      b += `  ${i} => ${this.binaryDictionaryContent[i]}\n`;
    }
    b += "}\n";
    return b;
  }
}

class PlainNumberDictionary extends PlainValuesDictionary {
  private numberDictionaryContent: number[] = null;
  constructor(dictionaryPage: DictionaryPage, numberType: PrimitiveType) {
    super(dictionaryPage);
    const numItems = dictionaryPage.header.dictionary_page_header.num_values;
    const cursor: CursorBuffer = {
      buffer: this.dictionaryPage.bytes,
      offset: 0,
      size: this.dictionaryPage.bytes.length
    };
    this.numberDictionaryContent = Util.decodeValues(numberType, 'PLAIN', cursor, numItems, {});
  }
  public decodeToNumber(id: number): number {
    if (id < 0 || id > this.getMaxId()) {
      throw new Error(`Invalid index into dictionary: ${id}`);
    }
    return this.numberDictionaryContent[id];
  }
  public getMaxId(): number {
    return this.numberDictionaryContent.length - 1;
  }
  public toString(): string {
    let b = "{\n";
    for (let i = 0; i < this.numberDictionaryContent.length; i++) {
      b += `  ${i} => ${this.numberDictionaryContent[i]}\n`;
    }
    b += "}\n";
    return b;
  }
}

export class DictionaryPage {
  public header: PageHeader;
  public bytes: Buffer;
  constructor(header: PageHeader, bytes: Buffer) {
    this.header = header;
    this.bytes = bytes;
  }
}