import {PartialType} from '@nestjs/swagger';
import {Story} from './story.schema';

export class CreateStoryDto extends Story {
}

export class UpdateStoryDto extends PartialType(CreateStoryDto) {
}
