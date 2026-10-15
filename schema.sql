create table if not exists users(osu_id bigint primary key,username text,country text,pp float,global_rank int,last_login timestamptz);
create table if not exists bpm_tests(id bigserial primary key,osu_id bigint,bpm float,keys text,created_at timestamptz default now());
create table if not exists live_scores(
  score_id bigint primary key,
  osu_id bigint not null,
  username text not null,
  country_code text,
  beatmap_id bigint not null,
  beatmapset_id bigint,
  beatmap_title text,
  beatmap_version text,
  beatmap_cover text,
  pp double precision,
  accuracy double precision,
  rank text,
  mods jsonb not null default '[]'::jsonb,
  score_date timestamptz not null
);
create index if not exists live_scores_score_date_idx on live_scores(score_date desc);
create index if not exists live_scores_country_date_idx on live_scores(country_code,score_date desc);
create index if not exists live_scores_pp_idx on live_scores(pp desc);
