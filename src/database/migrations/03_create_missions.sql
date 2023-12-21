create table if not exists missions (
  id varchar(255) primary key not null,
  name varchar(255) not null,
  "backgroundImage" varchar(255) not null,
  exp int not null
);

insert into missions values (
  '48510f98-5a9c-4b00-80ba-135a2817b1a2',
  'Mirian Forest',
  'https://img.itch.zone/aW1hZ2UvMjA0NDE5OC8xMjAyNzg5Ni5qcGc=/original/%2FgGzz4.jpg',
  10,
  10
);
