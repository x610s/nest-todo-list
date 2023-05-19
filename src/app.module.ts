import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
@Module({
  /*  imports: [TypeOrmModule.forRoot(dataSourceOptions), TodoModule], */
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo-db',
      autoLoadEntities: true,
      //    entities: [__dirname + 'dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
