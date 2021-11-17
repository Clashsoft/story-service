import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';
import {CreateStoryDto, UpdateStoryDto} from './story.dto';
import {Story, StoryDocument} from './story.schema';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel('story') private model: Model<Story>,
  ) {
  }

  async create(dto: CreateStoryDto): Promise<StoryDocument> {
    return this.model.create(dto);
  }

  async findAll(query: FilterQuery<Story>): Promise<StoryDocument[]> {
    return this.model.find(query).exec();
  }

  async findOne(id: string): Promise<StoryDocument | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, dto: UpdateStoryDto): Promise<StoryDocument | null> {
    return this.model.findByIdAndUpdate(id, dto, {new: true}).exec();
  }

  async remove(id: string): Promise<StoryDocument | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
