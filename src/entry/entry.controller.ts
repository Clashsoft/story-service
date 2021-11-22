import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {FilterQuery} from 'mongoose';
import {CreateEntryDto, UpdateEntryDto} from './entry.dto';
import {Entry} from './entry.schema';
import {EntryService} from './entry.service';

@Controller('stories/:story/entries')
@ApiTags('Entries')
export class EntryController {
  constructor(private readonly entryService: EntryService) {
  }

  @Post()
  @ApiCreatedResponse({type: Entry})
  async create(@Param('story') story: string, @Body() dto: CreateEntryDto): Promise<Entry> {
    return this.entryService.create(story, dto);
  }

  @Get('')
  @ApiOkResponse({type: [Entry]})
  @ApiQuery({
    name: 'search',
    description: 'Search name or description',
  })
  async findAll(
    @Param('story') story: string,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ): Promise<Entry[]> {
    const query: FilterQuery<Entry> = {story};
    if (search) {
      query.$text = {$search: search};
    }
    if (type) {
      query.type = type;
    }
    return this.entryService.findAll(query);
  }

  @Get('types')
  @ApiOkResponse({type: [String]})
  async findTypes(
    @Param('story') story: string,
  ): Promise<string[]> {
    return this.entryService.findTypes({story});
  }

  @Get(':id')
  @ApiOkResponse({type: Entry})
  async findOne(@Param('story') story: string, @Param('id') id: string): Promise<Entry | null> {
    return this.entryService.findOne(story, id);
  }

  @Patch(':id')
  @ApiOkResponse({type: Entry})
  async update(@Param('story') story: string, @Param('id') id: string, @Body() dto: UpdateEntryDto): Promise<Entry | null> {
    return this.entryService.update(story, id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({type: Entry})
  async remove(@Param('story') story: string, @Param('id') id: string): Promise<Entry | null> {
    return this.entryService.remove(story, id);
  }
}
