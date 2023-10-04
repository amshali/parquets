/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as Encoding from "./Encoding";
import * as Statistics from "./Statistics";
export interface IDataPageHeaderV2Args {
    num_values: number;
    num_nulls: number;
    num_rows: number;
    encoding: Encoding.Encoding;
    definition_levels_byte_length: number;
    repetition_levels_byte_length: number;
    is_compressed?: boolean;
    statistics?: Statistics.Statistics;
}
export class DataPageHeaderV2 {
    public num_values: number;
    public num_nulls: number;
    public num_rows: number;
    public encoding: Encoding.Encoding;
    public definition_levels_byte_length: number;
    public repetition_levels_byte_length: number;
    public is_compressed?: boolean = true;
    public statistics?: Statistics.Statistics;
    constructor(args: IDataPageHeaderV2Args) {
        if (args != null && args.num_values != null) {
            this.num_values = args.num_values;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Required field[num_values] is unset!");
        }
        if (args != null && args.num_nulls != null) {
            this.num_nulls = args.num_nulls;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Required field[num_nulls] is unset!");
        }
        if (args != null && args.num_rows != null) {
            this.num_rows = args.num_rows;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Required field[num_rows] is unset!");
        }
        if (args != null && args.encoding != null) {
            this.encoding = args.encoding;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Required field[encoding] is unset!");
        }
        if (args != null && args.definition_levels_byte_length != null) {
            this.definition_levels_byte_length = args.definition_levels_byte_length;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Required field[definition_levels_byte_length] is unset!");
        }
        if (args != null && args.repetition_levels_byte_length != null) {
            this.repetition_levels_byte_length = args.repetition_levels_byte_length;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Required field[repetition_levels_byte_length] is unset!");
        }
        if (args != null && args.is_compressed != null) {
            this.is_compressed = args.is_compressed;
        }
        if (args != null && args.statistics != null) {
            this.statistics = args.statistics;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("DataPageHeaderV2");
        if (this.num_values != null) {
            output.writeFieldBegin("num_values", thrift.Thrift.Type.I32, 1);
            output.writeI32(this.num_values);
            output.writeFieldEnd();
        }
        if (this.num_nulls != null) {
            output.writeFieldBegin("num_nulls", thrift.Thrift.Type.I32, 2);
            output.writeI32(this.num_nulls);
            output.writeFieldEnd();
        }
        if (this.num_rows != null) {
            output.writeFieldBegin("num_rows", thrift.Thrift.Type.I32, 3);
            output.writeI32(this.num_rows);
            output.writeFieldEnd();
        }
        if (this.encoding != null) {
            output.writeFieldBegin("encoding", thrift.Thrift.Type.I32, 4);
            output.writeI32(this.encoding);
            output.writeFieldEnd();
        }
        if (this.definition_levels_byte_length != null) {
            output.writeFieldBegin("definition_levels_byte_length", thrift.Thrift.Type.I32, 5);
            output.writeI32(this.definition_levels_byte_length);
            output.writeFieldEnd();
        }
        if (this.repetition_levels_byte_length != null) {
            output.writeFieldBegin("repetition_levels_byte_length", thrift.Thrift.Type.I32, 6);
            output.writeI32(this.repetition_levels_byte_length);
            output.writeFieldEnd();
        }
        if (this.is_compressed != null) {
            output.writeFieldBegin("is_compressed", thrift.Thrift.Type.BOOL, 7);
            output.writeBool(this.is_compressed);
            output.writeFieldEnd();
        }
        if (this.statistics != null) {
            output.writeFieldBegin("statistics", thrift.Thrift.Type.STRUCT, 8);
            this.statistics.write(output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): DataPageHeaderV2 {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_1: number = input.readI32();
                        _args.num_values = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_2: number = input.readI32();
                        _args.num_nulls = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_3: number = input.readI32();
                        _args.num_rows = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_4: Encoding.Encoding = input.readI32();
                        _args.encoding = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_5: number = input.readI32();
                        _args.definition_levels_byte_length = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_6: number = input.readI32();
                        _args.repetition_levels_byte_length = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_7: boolean = input.readBool();
                        _args.is_compressed = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_8: Statistics.Statistics = Statistics.Statistics.read(input);
                        _args.statistics = value_8;
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
        if (_args.num_values !== undefined && _args.num_nulls !== undefined && _args.num_rows !== undefined && _args.encoding !== undefined && _args.definition_levels_byte_length !== undefined && _args.repetition_levels_byte_length !== undefined) {
            return new DataPageHeaderV2(_args);
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Unable to read DataPageHeaderV2 from input");
        }
    }
}
