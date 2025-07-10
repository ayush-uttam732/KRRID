import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export default function UsernameInput({
  value,
  onChange,
  currentUsername = '',
  label = 'Username',
  disabled = false
}) {
  const [status, setStatus] = useState(''); // '', 'checking', 'available', 'taken', 'invalid'
  const [error, setError] = useState('');

  useEffect(() => {
    if (!value) {
      setStatus('');
      setError('');
      return;
    }
    if (!USERNAME_REGEX.test(value)) {
      setStatus('invalid');
      setError('Username must be 3-20 characters, letters, numbers, or underscores.');
      return;
    }
    setStatus('checking');
    setError('');
    const check = setTimeout(async () => {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) {
        setStatus('');
        setError('Error checking username.');
        return;
      }
      const taken = data.users.some(
        user => user.user_metadata?.username?.toLowerCase() === value.toLowerCase() && user.user_metadata?.username !== currentUsername
      );
      if (taken) {
        setStatus('taken');
        setError('Username is already taken.');
      } else {
        setStatus('available');
        setError('');
      }
    }, 500);
    return () => clearTimeout(check);
  }, [value, currentUsername]);

  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full bg-gray-800 text-white px-4 py-2 rounded border ${
          status === 'available' ? 'border-green-500' :
          status === 'taken' ? 'border-red-500' :
          status === 'invalid' ? 'border-yellow-500' :
          'border-gray-700'
        } focus:border-sky-500 focus:outline-none`}
        autoComplete="off"
        spellCheck={false}
      />
      {status === 'checking' && <div className="text-xs text-sky-400 mt-1">Checking...</div>}
      {status === 'available' && <div className="text-xs text-green-400 mt-1">Username is available!</div>}
      {status === 'taken' && <div className="text-xs text-red-400 mt-1">Username is already taken.</div>}
      {status === 'invalid' && <div className="text-xs text-yellow-400 mt-1">{error}</div>}
      {error && status !== 'invalid' && <div className="text-xs text-red-400 mt-1">{error}</div>}
    </div>
  );
} 