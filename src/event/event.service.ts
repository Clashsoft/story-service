import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';
import {CreateEventDto, UpdateEventDto} from './event.dto';
import {Event, EventDocument} from './event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('event') private model: Model<Event>,
  ) {
  }

  async create(story: string, dto: CreateEventDto): Promise<EventDocument> {
    return this.model.create({
      ...dto,
      story,
    });
  }

  async findAll(query: FilterQuery<Event>): Promise<EventDocument[]> {
    return this.model.find(query).exec();
  }

  async findOne(story: string, id: string): Promise<EventDocument | null> {
    return this.model.findById(id).where(story, id).exec();
  }

  async update(story: string, id: string, dto: UpdateEventDto): Promise<EventDocument | null> {
    return this.model.findByIdAndUpdate(id, dto, {new: true}).where(story, id).exec();
  }

  async remove(story: string, id: string): Promise<EventDocument | null> {
    return this.model.findByIdAndDelete(id).where(story, id).exec();
  }
}
