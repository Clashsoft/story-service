import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {Document} from 'mongoose';

@Schema()
export class Story {
  @Prop()
  @ApiProperty()
  name: string;
}

export type StoryDocument = Story & Document;

export const StorySchema = SchemaFactory.createForClass(Story);
