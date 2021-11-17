import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {StoryController} from './story.controller';
import {StorySchema} from './story.schema';
import {StoryService} from './story.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'story', schema: StorySchema}]),
  ],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {
}
