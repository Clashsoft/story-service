import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiQuery, ApiTags} from '@nestjs/swagger';
import {FilterQuery} from 'mongoose';
import {CreateEventDto, UpdateEventDto} from './event.dto';
import {Event, Reference} from './event.schema';
import {EventService} from './event.service';

@Controller('stories/:story/events')
@ApiTags('Events')
@ApiExtraModels(Reference)
export class EventController {
  constructor(private readonly eventService: EventService) {
  }

  @Post()
  @ApiCreatedResponse({type: Event})
  async create(@Param('story') story: string, @Body() dto: CreateEventDto): Promise<Event> {
    return this.eventService.create(story, dto);
  }

  @Get('')
  @ApiOkResponse({type: [Event]})
  @ApiQuery({name: 'reference', description: 'Reference ID to filter by'})
  async findAll(
    @Param('story') story: string,
    @Query('reference') reference?: string,
  ): Promise<Event[]> {
    const filter: FilterQuery<Event> = {story};
    reference && (filter['description.id'] = reference);
    return this.eventService.findAll(filter);
  }

  @Get(':id')
  @ApiOkResponse({type: Event})
  async findOne(@Param('story') story: string, @Param('id') id: string): Promise<Event | null> {
    return this.eventService.findOne(story, id);
  }

  @Patch(':id')
  @ApiOkResponse({type: Event})
  async update(@Param('story') story: string, @Param('id') id: string, @Body() dto: UpdateEventDto): Promise<Event | null> {
    return this.eventService.update(story, id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({type: Event})
  async remove(@Param('story') story: string, @Param('id') id: string): Promise<Event | null> {
    return this.eventService.remove(story, id);
  }
}
