import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {environment} from './environment';
import {EventModule} from './event/event.module';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongo.uri),
    StoryModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
