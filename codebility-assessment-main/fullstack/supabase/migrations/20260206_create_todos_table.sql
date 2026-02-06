-- Create todos table
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  completed boolean default false not null,
  created_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.todos enable row level security;

-- Create policies
create policy "Users can view their own todos"
  on public.todos
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own todos"
  on public.todos
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own todos"
  on public.todos
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own todos"
  on public.todos
  for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists todos_user_id_idx on public.todos(user_id);
