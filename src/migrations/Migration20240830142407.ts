import { Migration } from '@mikro-orm/migrations';

export class Migration20240830142407 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "user" alter column "offset" type int using ("offset"::int);');
    this.addSql('alter table "user" alter column "offset" drop default;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "user" alter column "offset" type int4 using ("offset"::int4);');
    this.addSql('create sequence if not exists "user_offset_seq";');
    this.addSql('select setval(\'user_offset_seq\', (select max("offset") from "user"));');
    this.addSql('alter table "user" alter column "offset" set default nextval(\'user_offset_seq\');');
  }

}
