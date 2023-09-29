create table if not exists characters (
  id varchar(255) primary key not null,
  name varchar(255) not null,
  level int not null,
  hp int not null,
  vitality int not null,
  strength int not null,
  dexterity int not null,
  intelligence int not null,

  "accountId" varchar(255) references accounts(id)
);
