-- =====================================================
-- KRRID Chess Platform - FINAL Database Setup Script
-- =====================================================

-- 1. User Profiles Table (with unique username constraint)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  bio TEXT,
  phone VARCHAR(20),
  country_code VARCHAR(5) DEFAULT '+1',
  avatar_url TEXT,
  date_of_birth DATE,
  location VARCHAR(100),
  website VARCHAR(255),
  social_links JSONB,
  preferences JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_username UNIQUE (username)
);

-- 2. User Stats Table
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  rapid_rating INTEGER DEFAULT 400,
  blitz_rating INTEGER DEFAULT 400,
  bullet_rating INTEGER DEFAULT 400,
  puzzle_rating INTEGER DEFAULT 400,
  games_played INTEGER DEFAULT 0,
  games_won INTEGER DEFAULT 0,
  games_lost INTEGER DEFAULT 0,
  games_drawn INTEGER DEFAULT 0,
  puzzles_solved INTEGER DEFAULT 0,
  puzzles_failed INTEGER DEFAULT 0,
  total_play_time INTEGER DEFAULT 0, -- in minutes
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Friends Table (username-based)
CREATE TABLE IF NOT EXISTS friends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_username VARCHAR(50) NOT NULL,
  friend_username VARCHAR(50) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_username, friend_username)
);

-- 4. Games Table
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_white UUID REFERENCES auth.users(id),
  player_black UUID REFERENCES auth.users(id),
  fen TEXT DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  pgn TEXT,
  result TEXT CHECK (result IN ('white_win', 'black_win', 'draw', 'abandoned')),
  winner_id UUID REFERENCES auth.users(id),
  loser_id UUID REFERENCES auth.users(id),
  time_control TEXT DEFAULT 'rapid' CHECK (time_control IN ('rapid', 'blitz', 'bullet')),
  game_duration INTEGER, -- in seconds
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed', 'abandoned')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_country_code ON user_profiles(country_code);
CREATE INDEX IF NOT EXISTS idx_friends_user_username ON friends(user_username);
CREATE INDEX IF NOT EXISTS idx_friends_friend_username ON friends(friend_username);
CREATE INDEX IF NOT EXISTS idx_friends_status ON friends(status);
CREATE INDEX IF NOT EXISTS idx_games_player_white ON games(player_white);
CREATE INDEX IF NOT EXISTS idx_games_player_black ON games(player_black);
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_games_time_control ON games(time_control);

-- 6. Function to update ratings when game ends
CREATE OR REPLACE FUNCTION update_ratings_after_game()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.result IS NOT NULL AND NEW.winner_id IS NOT NULL AND NEW.loser_id IS NOT NULL THEN
    CASE NEW.time_control
      WHEN 'rapid' THEN
        INSERT INTO user_stats (user_id, rapid_rating, games_won, games_played)
        VALUES (NEW.winner_id, 10, 1, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          rapid_rating = user_stats.rapid_rating + 10,
          games_won = user_stats.games_won + 1,
          games_played = user_stats.games_played + 1,
          updated_at = NOW();
        INSERT INTO user_stats (user_id, rapid_rating, games_lost, games_played)
        VALUES (NEW.loser_id, -9, 1, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          rapid_rating = user_stats.rapid_rating - 9,
          games_lost = user_stats.games_lost + 1,
          games_played = user_stats.games_played + 1,
          updated_at = NOW();
      WHEN 'blitz' THEN
        INSERT INTO user_stats (user_id, blitz_rating, games_won, games_played)
        VALUES (NEW.winner_id, 10, 1, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          blitz_rating = user_stats.blitz_rating + 10,
          games_won = user_stats.games_won + 1,
          games_played = user_stats.games_played + 1,
          updated_at = NOW();
        INSERT INTO user_stats (user_id, blitz_rating, games_lost, games_played)
        VALUES (NEW.loser_id, -9, 1, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          blitz_rating = user_stats.blitz_rating - 9,
          games_lost = user_stats.games_lost + 1,
          games_played = user_stats.games_played + 1,
          updated_at = NOW();
      WHEN 'bullet' THEN
        INSERT INTO user_stats (user_id, bullet_rating, games_won, games_played)
        VALUES (NEW.winner_id, 10, 1, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          bullet_rating = user_stats.bullet_rating + 10,
          games_won = user_stats.games_won + 1,
          games_played = user_stats.games_played + 1,
          updated_at = NOW();
        INSERT INTO user_stats (user_id, bullet_rating, games_lost, games_played)
        VALUES (NEW.loser_id, -9, 1, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          bullet_rating = user_stats.bullet_rating - 9,
          games_lost = user_stats.games_lost + 1,
          games_played = user_stats.games_played + 1,
          updated_at = NOW();
      ELSE
        INSERT INTO user_stats (user_id, rapid_rating, games_won, games_played)
        VALUES (NEW.winner_id, 10, 1, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          rapid_rating = user_stats.rapid_rating + 10,
          games_won = user_stats.games_won + 1,
          games_played = user_stats.games_played + 1,
          updated_at = NOW();
        INSERT INTO user_stats (user_id, rapid_rating, games_lost, games_played)
        VALUES (NEW.loser_id, -9, 1, 1)
        ON CONFLICT (user_id) DO UPDATE SET
          rapid_rating = user_stats.rapid_rating - 9,
          games_lost = user_stats.games_lost + 1,
          games_played = user_stats.games_played + 1,
          updated_at = NOW();
    END CASE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Function to update puzzle ratings
CREATE OR REPLACE FUNCTION update_puzzle_rating(user_uuid UUID, solved BOOLEAN)
RETURNS VOID AS $$
BEGIN
  INSERT INTO user_stats (user_id, puzzle_rating, puzzles_solved, puzzles_failed)
  VALUES (
    user_uuid, 
    CASE WHEN solved THEN 10 ELSE -9 END,
    CASE WHEN solved THEN 1 ELSE 0 END,
    CASE WHEN solved THEN 0 ELSE 1 END
  )
  ON CONFLICT (user_id) DO UPDATE SET
    puzzle_rating = user_stats.puzzle_rating + CASE WHEN solved THEN 10 ELSE -9 END,
    puzzles_solved = user_stats.puzzles_solved + CASE WHEN solved THEN 1 ELSE 0 END,
    puzzles_failed = user_stats.puzzles_failed + CASE WHEN solved THEN 0 ELSE 1 END,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- 8. Function to create default profile when user signs up
CREATE OR REPLACE FUNCTION create_default_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (user_id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  INSERT INTO user_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Triggers
DROP TRIGGER IF EXISTS update_ratings_trigger ON games;
CREATE TRIGGER update_ratings_trigger
  AFTER UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_ratings_after_game();

DROP TRIGGER IF EXISTS create_default_profile_trigger ON auth.users;
CREATE TRIGGER create_default_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_profile();

-- 10. RLS Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public profiles" ON user_profiles
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can edit their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view stats" ON user_stats
  FOR SELECT USING (true);
CREATE POLICY "Users can update their own stats" ON user_stats
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can manage friends" ON friends
  FOR ALL USING (auth.uid()::text = user_username OR auth.uid()::text = friend_username);
CREATE POLICY "Users can view games" ON games
  FOR SELECT USING (true);
CREATE POLICY "Users can manage their games" ON games
  FOR ALL USING (auth.uid() = player_white OR auth.uid() = player_black);

-- 11. Enforce unique usernames at the database level
ALTER TABLE user_profiles ADD CONSTRAINT IF NOT EXISTS unique_username UNIQUE (username);

-- =====================================================
-- END OF DATABASE SETUP
-- ===================================================== 