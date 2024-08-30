import { Entity, MikroORM, PrimaryKey, Property } from '@mikro-orm/postgresql';

@Entity()
class User {

  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({
    columnType: 'serial'
  })
  offset!: number

}

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init({
    dbName: 'test',
    entities: [User],
    debug: ['query', 'query-params'],
    allowGlobalContext: true, // only for testing
  });
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close(true);
});

test('migration', async () => {
  const isMigrationNeeded = await orm.migrator.checkMigrationNeeded()
  if (isMigrationNeeded) {
    console.log('Creating migration!')
    await orm.migrator.createMigration()
  }
});
