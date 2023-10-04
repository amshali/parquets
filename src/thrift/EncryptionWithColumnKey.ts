/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface IEncryptionWithColumnKeyArgs {
    path_in_schema: Array<string>;
    key_metadata?: Buffer;
}
export class EncryptionWithColumnKey {
    public path_in_schema: Array<string>;
    public key_metadata?: Buffer;
    constructor(args: IEncryptionWithColumnKeyArgs) {
        if (args != null && args.path_in_schema != null) {
            this.path_in_schema = args.path_in_schema;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Required field[path_in_schema] is unset!");
        }
        if (args != null && args.key_metadata != null) {
            this.key_metadata = args.key_metadata;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("EncryptionWithColumnKey");
        if (this.path_in_schema != null) {
            output.writeFieldBegin("path_in_schema", thrift.Thrift.Type.LIST, 1);
            output.writeListBegin(thrift.Thrift.Type.STRING, this.path_in_schema.length);
            this.path_in_schema.forEach((value_1: string): void => {
                output.writeString(value_1);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.key_metadata != null) {
            output.writeFieldBegin("key_metadata", thrift.Thrift.Type.STRING, 2);
            output.writeBinary(this.key_metadata);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): EncryptionWithColumnKey {
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
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_2: Array<string> = new Array<string>();
                        const metadata_1: thrift.TList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_3: string = input.readString();
                            value_2.push(value_3);
                        }
                        input.readListEnd();
                        _args.path_in_schema = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: Buffer = input.readBinary();
                        _args.key_metadata = value_4;
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
        if (_args.path_in_schema !== undefined) {
            return new EncryptionWithColumnKey(_args);
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Unable to read EncryptionWithColumnKey from input");
        }
    }
}
