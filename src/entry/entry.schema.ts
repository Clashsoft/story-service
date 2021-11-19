import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsObject, IsString} from 'class-validator';
import {Document} from 'mongoose';

@Schema()
export class Entry {
  @Prop({index: 1})
  @ApiProperty()
  story: string;

  @Prop({index: 1})
  @ApiProperty()
  @IsString()
  name: string;

  @Prop({index: 1})
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Prop()
  @ApiProperty()
  @IsString()
  description: string;

  @Prop({type: Object})
  @ApiProperty()
  @IsObject()
  properties: Record<string, any>;
}

export type EntryDocument = Entry & Document;

export const EntrySchema = SchemaFactory.createForClass(Entry)
  .index({name: 'text'})
  .index({description: 'text'})
;
