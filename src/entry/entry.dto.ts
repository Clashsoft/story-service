import {OmitType, PartialType} from '@nestjs/swagger';
import {Entry} from './entry.schema';

export class CreateEntryDto extends OmitType(Entry, [
  'story',
] as const) {
}

export class UpdateEntryDto extends PartialType(CreateEntryDto) {
}
