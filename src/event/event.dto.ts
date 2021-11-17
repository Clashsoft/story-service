import {OmitType, PartialType} from '@nestjs/swagger';
import {Event} from './event.schema';

export class CreateEventDto extends OmitType(Event, [
  'story',
] as const) {
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
}
