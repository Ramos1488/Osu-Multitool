create table users(osu_id bigint primary key,username text,country text,pp float,global_rank int,last_login timestamptz);
create table bpm_tests(id bigserial primary key,osu_id bigint,bpm float,keys text,created_at timestamptz default now());
