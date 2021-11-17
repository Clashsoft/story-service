import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {CreateStoryDto, UpdateStoryDto} from './story.dto';
import {Story} from './story.schema';
import {StoryService} from './story.service';

@Controller('stories')
@ApiTags('Stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {
  }

  @Post()
  @ApiCreatedResponse({type: Story})
  async create(@Body() dto: CreateStoryDto): Promise<Story> {
    return this.storyService.create(dto);
  }

  @Get(':id')
  @ApiOkResponse({type: Story})
  async findOne(@Param('id') id: string): Promise<Story | null> {
    return this.storyService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({type: Story})
  async update(@Param('id') id: string, @Body() dto: UpdateStoryDto): Promise<Story | null> {
    return this.storyService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({type: Story})
  async remove(@Param('id') id: string): Promise<Story | null> {
    return this.storyService.remove(id);
  }
}
