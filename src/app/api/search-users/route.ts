import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azphpzwalortrhrzqfou.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cGhwendhbG9ydHJocnpxZm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyOTA0MjksImV4cCI6MjA2Mjg2NjQyOX0.ifa77hwBseuo9OUtsNuN78RXMeDx3cmx_fEUBIWXA0g';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ users: [] });
    }

    // Search auth.users for username or name
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Filter users by username or name (case-insensitive)
    const filtered = (data?.users || []).filter(user => {
      const username = user.user_metadata?.username?.toLowerCase() || '';
      const name = user.user_metadata?.name?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      return (
        username.includes(query.toLowerCase()) ||
        name.includes(query.toLowerCase()) ||
        email.includes(query.toLowerCase())
      );
    });

    // Return only unique usernames
    const uniqueUsernames = new Set();
    const users = filtered
      .filter(user => {
        const username = user.user_metadata?.username;
        if (!username || uniqueUsernames.has(username)) return false;
        uniqueUsernames.add(username);
        return true;
      })
      .map(user => ({
        id: user.id,
        email: user.email,
        user_metadata: {
          username: user.user_metadata?.username,
          name: user.user_metadata?.name || '',
          country_code: user.user_metadata?.country_code || '+1',
          phone: user.user_metadata?.phone || '',
          avatar_url: user.user_metadata?.avatar_url || ''
        },
        created_at: user.created_at
      }));

    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ error: 'Failed to search users' }, { status: 500 });
  }
} 