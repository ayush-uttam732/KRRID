import { supabase } from './supabaseClient';

export interface GameResult {
  gameId: string;
  winner: 'white' | 'black' | 'draw';
  reason: 'checkmate' | 'stalemate' | 'draw' | 'resignation' | 'timeout';
  winnerId?: string;
  loserId?: string;
  timeControl?: 'rapid' | 'blitz' | 'bullet';
}

export async function updateGameResult(result: GameResult) {
  try {
    // Update the game with result
    const { error: gameError } = await supabase
      .from('games')
      .update({
        result: result.winner === 'draw' ? 'draw' : `${result.winner}_win`,
        winner_id: result.winnerId,
        loser_id: result.loserId,
        status: 'completed'
      })
      .eq('id', result.gameId);

    if (gameError) {
      console.error('Error updating game result:', gameError);
      return false;
    }

    // If there's a winner and loser, update their ratings
    if (result.winnerId && result.loserId) {
      const timeControl = result.timeControl || 'rapid';
      const ratingField = `${timeControl}_rating`;
      
      // Update winner stats (+10 rating, +1 games_won)
      const { error: winnerError } = await supabase
        .from('user_stats')
        .upsert({
          user_id: result.winnerId,
          [ratingField]: 10,
          games_won: 1,
          games_played: 1
        }, {
          onConflict: 'user_id',
          ignoreDuplicates: false
        });

      if (winnerError) {
        console.error('Error updating winner stats:', winnerError);
      }

      // Update loser stats (-9 rating, +1 games_lost)
      const { error: loserError } = await supabase
        .from('user_stats')
        .upsert({
          user_id: result.loserId,
          [ratingField]: -9,
          games_lost: 1,
          games_played: 1
        }, {
          onConflict: 'user_id',
          ignoreDuplicates: false
        });

      if (loserError) {
        console.error('Error updating loser stats:', loserError);
      }
    }

    return true;
  } catch (error) {
    console.error('Error in updateGameResult:', error);
    return false;
  }
}

export async function updatePuzzleRating(userId: string, solved: boolean) {
  try {
    const { error } = await supabase
      .rpc('update_puzzle_rating', {
        user_uuid: userId,
        solved: solved
      });

    if (error) {
      console.error('Error updating puzzle rating:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updatePuzzleRating:', error);
    return false;
  }
}

export async function getGameById(gameId: string) {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', gameId)
    .single();

  if (error) {
    console.error('Error fetching game:', error);
    return null;
  }

  return data;
}

export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code === 'PGRST116') {
    // No stats found, create default stats
    const { data: newStats } = await supabase
      .from('user_stats')
      .insert([{ 
        user_id: userId, 
        rapid_rating: 400, 
        blitz_rating: 400,
        bullet_rating: 400,
        puzzle_rating: 400,
        games_played: 0,
        games_won: 0,
        games_lost: 0,
        games_drawn: 0,
        puzzles_solved: 0,
        puzzles_failed: 0
      }])
      .select()
      .single();

    return newStats;
  }

  if (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }

  return data;
} 