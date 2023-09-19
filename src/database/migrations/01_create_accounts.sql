create table if not exists accounts (
  id varchar(255) primary key not null,
  username varchar(255) not null,
  email varchar(255) unique not null,
  password varchar(255) not null
);
