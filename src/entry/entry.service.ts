import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';
import {CreateEntryDto, UpdateEntryDto} from './entry.dto';
import {Entry, EntryDocument} from './entry.schema';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel('entry') private model: Model<Entry>,
  ) {
  }

  async create(story: string, dto: CreateEntryDto): Promise<EntryDocument> {
    return this.model.create({
      ...dto,
      story,
    });
  }

  async findAll(query: FilterQuery<Entry>): Promise<EntryDocument[]> {
    return this.model.find(query).sort('name').exec();
  }

  async findTypes(query: FilterQuery<Entry>): Promise<string[]> {
    return this.model.find(query).distinct('type').exec();
  }

  async findOne(story: string, id: string): Promise<EntryDocument | null> {
    return this.model.findById(id).where(story, id).exec();
  }

  async update(story: string, id: string, dto: UpdateEntryDto): Promise<EntryDocument | null> {
    return this.model.findByIdAndUpdate(id, dto, {new: true}).where(story, id).exec();
  }

  async remove(story: string, id: string): Promise<EntryDocument | null> {
    return this.model.findByIdAndDelete(id).where(story, id).exec();
  }
}
