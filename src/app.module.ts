import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {EntryModule} from './entry/entry.module';
import {environment} from './environment';
import {EventModule} from './event/event.module';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongo.uri),
    StoryModule,
    EventModule,
    EntryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
