/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.2
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface IJsonTypeArgs {
}
export class JsonType {
  constructor() {
  }
  public write(output: thrift.TProtocol): void {
    output.writeStructBegin("JsonType");
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  }
  public static read(input: thrift.TProtocol): JsonType {
    input.readStructBegin();
    while (true) {
      const ret: thrift.TField = input.readFieldBegin();
      const fieldType: thrift.Thrift.Type = ret.ftype;
      const fieldId: number = ret.fid;
      if (fieldType === thrift.Thrift.Type.STOP) {
        break;
      }
      switch (fieldId) {
        default: {
          input.skip(fieldType);
        }
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    return new JsonType();
  }
}
