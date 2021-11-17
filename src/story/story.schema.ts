import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {Document} from 'mongoose';

@Schema()
export class Story {
  @Prop()
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export type StoryDocument = Story & Document;

export const StorySchema = SchemaFactory.createForClass(Story);
