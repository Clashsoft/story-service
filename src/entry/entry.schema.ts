import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsObject, IsOptional, IsString, IsUrl} from 'class-validator';
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
  @ApiPropertyOptional({type: 'url'})
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

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
