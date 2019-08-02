/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.2
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as BsonType from "./BsonType";
import * as DateType from "./DateType";
import * as DecimalType from "./DecimalType";
import * as EnumType from "./EnumType";
import * as IntType from "./IntType";
import * as JsonType from "./JsonType";
import * as ListType from "./ListType";
import * as MapType from "./MapType";
import * as NullType from "./NullType";
import * as StringType from "./StringType";
import * as TimestampType from "./TimestampType";
import * as TimeType from "./TimeType";
import * as UUIDType from "./UUIDType";
export interface ILogicalTypeArgs {
  STRING?: StringType.StringType;
  MAP?: MapType.MapType;
  LIST?: ListType.ListType;
  ENUM?: EnumType.EnumType;
  DECIMAL?: DecimalType.DecimalType;
  DATE?: DateType.DateType;
  TIME?: TimeType.TimeType;
  TIMESTAMP?: TimestampType.TimestampType;
  INTEGER?: IntType.IntType;
  UNKNOWN?: NullType.NullType;
  JSON?: JsonType.JsonType;
  BSON?: BsonType.BsonType;
  UUID?: UUIDType.UUIDType;
}
export class LogicalType {
  public STRING?: StringType.StringType;
  public MAP?: MapType.MapType;
  public LIST?: ListType.ListType;
  public ENUM?: EnumType.EnumType;
  public DECIMAL?: DecimalType.DecimalType;
  public DATE?: DateType.DateType;
  public TIME?: TimeType.TimeType;
  public TIMESTAMP?: TimestampType.TimestampType;
  public INTEGER?: IntType.IntType;
  public UNKNOWN?: NullType.NullType;
  public JSON?: JsonType.JsonType;
  public BSON?: BsonType.BsonType;
  public UUID?: UUIDType.UUIDType;
  constructor(args?: ILogicalTypeArgs) {
    let _fieldsSet: number = 0;
    if (args != null) {
      if (args.STRING != null) {
        _fieldsSet++;
        this.STRING = args.STRING;
      }
      if (args.MAP != null) {
        _fieldsSet++;
        this.MAP = args.MAP;
      }
      if (args.LIST != null) {
        _fieldsSet++;
        this.LIST = args.LIST;
      }
      if (args.ENUM != null) {
        _fieldsSet++;
        this.ENUM = args.ENUM;
      }
      if (args.DECIMAL != null) {
        _fieldsSet++;
        this.DECIMAL = args.DECIMAL;
      }
      if (args.DATE != null) {
        _fieldsSet++;
        this.DATE = args.DATE;
      }
      if (args.TIME != null) {
        _fieldsSet++;
        this.TIME = args.TIME;
      }
      if (args.TIMESTAMP != null) {
        _fieldsSet++;
        this.TIMESTAMP = args.TIMESTAMP;
      }
      if (args.INTEGER != null) {
        _fieldsSet++;
        this.INTEGER = args.INTEGER;
      }
      if (args.UNKNOWN != null) {
        _fieldsSet++;
        this.UNKNOWN = args.UNKNOWN;
      }
      if (args.JSON != null) {
        _fieldsSet++;
        this.JSON = args.JSON;
      }
      if (args.BSON != null) {
        _fieldsSet++;
        this.BSON = args.BSON;
      }
      if (args.UUID != null) {
        _fieldsSet++;
        this.UUID = args.UUID;
      }
      if (_fieldsSet > 1) {
        throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.INVALID_DATA, "Cannot read a TUnion with more than one set value!");
      }
      else if (_fieldsSet < 1) {
        throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.INVALID_DATA, "Cannot read a TUnion with no set value!");
      }
    }
  }
  public static fromSTRING(STRING: StringType.StringType): LogicalType {
    return new LogicalType({ STRING });
  }
  public static fromMAP(MAP: MapType.MapType): LogicalType {
    return new LogicalType({ MAP });
  }
  public static fromLIST(LIST: ListType.ListType): LogicalType {
    return new LogicalType({ LIST });
  }
  public static fromENUM(ENUM: EnumType.EnumType): LogicalType {
    return new LogicalType({ ENUM });
  }
  public static fromDECIMAL(DECIMAL: DecimalType.DecimalType): LogicalType {
    return new LogicalType({ DECIMAL });
  }
  public static fromDATE(DATE: DateType.DateType): LogicalType {
    return new LogicalType({ DATE });
  }
  public static fromTIME(TIME: TimeType.TimeType): LogicalType {
    return new LogicalType({ TIME });
  }
  public static fromTIMESTAMP(TIMESTAMP: TimestampType.TimestampType): LogicalType {
    return new LogicalType({ TIMESTAMP });
  }
  public static fromINTEGER(INTEGER: IntType.IntType): LogicalType {
    return new LogicalType({ INTEGER });
  }
  public static fromUNKNOWN(UNKNOWN: NullType.NullType): LogicalType {
    return new LogicalType({ UNKNOWN });
  }
  public static fromJSON(JSON: JsonType.JsonType): LogicalType {
    return new LogicalType({ JSON });
  }
  public static fromBSON(BSON: BsonType.BsonType): LogicalType {
    return new LogicalType({ BSON });
  }
  public static fromUUID(UUID: UUIDType.UUIDType): LogicalType {
    return new LogicalType({ UUID });
  }
  public write(output: thrift.TProtocol): void {
    output.writeStructBegin("LogicalType");
    if (this.STRING != null) {
      output.writeFieldBegin("STRING", thrift.Thrift.Type.STRUCT, 1);
      this.STRING.write(output);
      output.writeFieldEnd();
    }
    if (this.MAP != null) {
      output.writeFieldBegin("MAP", thrift.Thrift.Type.STRUCT, 2);
      this.MAP.write(output);
      output.writeFieldEnd();
    }
    if (this.LIST != null) {
      output.writeFieldBegin("LIST", thrift.Thrift.Type.STRUCT, 3);
      this.LIST.write(output);
      output.writeFieldEnd();
    }
    if (this.ENUM != null) {
      output.writeFieldBegin("ENUM", thrift.Thrift.Type.STRUCT, 4);
      this.ENUM.write(output);
      output.writeFieldEnd();
    }
    if (this.DECIMAL != null) {
      output.writeFieldBegin("DECIMAL", thrift.Thrift.Type.STRUCT, 5);
      this.DECIMAL.write(output);
      output.writeFieldEnd();
    }
    if (this.DATE != null) {
      output.writeFieldBegin("DATE", thrift.Thrift.Type.STRUCT, 6);
      this.DATE.write(output);
      output.writeFieldEnd();
    }
    if (this.TIME != null) {
      output.writeFieldBegin("TIME", thrift.Thrift.Type.STRUCT, 7);
      this.TIME.write(output);
      output.writeFieldEnd();
    }
    if (this.TIMESTAMP != null) {
      output.writeFieldBegin("TIMESTAMP", thrift.Thrift.Type.STRUCT, 8);
      this.TIMESTAMP.write(output);
      output.writeFieldEnd();
    }
    if (this.INTEGER != null) {
      output.writeFieldBegin("INTEGER", thrift.Thrift.Type.STRUCT, 10);
      this.INTEGER.write(output);
      output.writeFieldEnd();
    }
    if (this.UNKNOWN != null) {
      output.writeFieldBegin("UNKNOWN", thrift.Thrift.Type.STRUCT, 11);
      this.UNKNOWN.write(output);
      output.writeFieldEnd();
    }
    if (this.JSON != null) {
      output.writeFieldBegin("JSON", thrift.Thrift.Type.STRUCT, 12);
      this.JSON.write(output);
      output.writeFieldEnd();
    }
    if (this.BSON != null) {
      output.writeFieldBegin("BSON", thrift.Thrift.Type.STRUCT, 13);
      this.BSON.write(output);
      output.writeFieldEnd();
    }
    if (this.UUID != null) {
      output.writeFieldBegin("UUID", thrift.Thrift.Type.STRUCT, 14);
      this.UUID.write(output);
      output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  }
  public static read(input: thrift.TProtocol): LogicalType {
    let _fieldsSet: number = 0;
    let _returnValue: LogicalType | null = null;
    input.readStructBegin();
    while (true) {
      const ret: thrift.TField = input.readFieldBegin();
      const fieldType: thrift.Thrift.Type = ret.ftype;
      const fieldId: number = ret.fid;
      if (fieldType === thrift.Thrift.Type.STOP) {
        break;
      }
      switch (fieldId) {
        case 1:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_1: StringType.StringType = StringType.StringType.read(input);
            _returnValue = LogicalType.fromSTRING(value_1);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 2:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_2: MapType.MapType = MapType.MapType.read(input);
            _returnValue = LogicalType.fromMAP(value_2);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 3:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_3: ListType.ListType = ListType.ListType.read(input);
            _returnValue = LogicalType.fromLIST(value_3);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 4:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_4: EnumType.EnumType = EnumType.EnumType.read(input);
            _returnValue = LogicalType.fromENUM(value_4);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 5:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_5: DecimalType.DecimalType = DecimalType.DecimalType.read(input);
            _returnValue = LogicalType.fromDECIMAL(value_5);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 6:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_6: DateType.DateType = DateType.DateType.read(input);
            _returnValue = LogicalType.fromDATE(value_6);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 7:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_7: TimeType.TimeType = TimeType.TimeType.read(input);
            _returnValue = LogicalType.fromTIME(value_7);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 8:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_8: TimestampType.TimestampType = TimestampType.TimestampType.read(input);
            _returnValue = LogicalType.fromTIMESTAMP(value_8);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 10:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_9: IntType.IntType = IntType.IntType.read(input);
            _returnValue = LogicalType.fromINTEGER(value_9);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 11:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_10: NullType.NullType = NullType.NullType.read(input);
            _returnValue = LogicalType.fromUNKNOWN(value_10);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 12:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_11: JsonType.JsonType = JsonType.JsonType.read(input);
            _returnValue = LogicalType.fromJSON(value_11);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 13:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_12: BsonType.BsonType = BsonType.BsonType.read(input);
            _returnValue = LogicalType.fromBSON(value_12);
          }
          else {
            input.skip(fieldType);
          }
          break;
        case 14:
          if (fieldType === thrift.Thrift.Type.STRUCT) {
            _fieldsSet++;
            const value_13: UUIDType.UUIDType = UUIDType.UUIDType.read(input);
            _returnValue = LogicalType.fromUUID(value_13);
          }
          else {
            input.skip(fieldType);
          }
          break;
        default: {
          input.skip(fieldType);
        }
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    if (_fieldsSet > 1) {
      throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.INVALID_DATA, "Cannot read a TUnion with more than one set value!");
    }
    else if (_fieldsSet < 1) {
      throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.INVALID_DATA, "Cannot read a TUnion with no set value!");
    }
    if (_returnValue !== null) {
      return _returnValue;
    }
    else {
      throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Unable to read data for TUnion");
    }
  }
}
