import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty, getSchemaPath} from '@nestjs/swagger';
import {IsArray, IsDateString, IsMongoId, IsNotEmpty, IsString} from 'class-validator';
import {Document} from 'mongoose';

export class Reference {
  @Prop()
  @ApiProperty()
  @IsString()
  type: string;

  @Prop()
  @ApiProperty()
  @IsMongoId()
  id: string;

  @Prop()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

@Schema()
export class Event {
  @Prop({index: 1})
  @ApiProperty()
  story: string;

  @Prop({index: 1})
  @ApiProperty()
  @IsDateString()
  timestamp: Date;

  @Prop()
  @ApiProperty({isArray: true, items: {oneOf: [{type: 'string'}, {$ref: getSchemaPath(Reference)}]}})
  @IsArray()
  description: (string | Reference)[];
}

export type EventDocument = Event & Document;

export const EventSchema = SchemaFactory.createForClass(Event)
  .index({'description.id': 1})
;
