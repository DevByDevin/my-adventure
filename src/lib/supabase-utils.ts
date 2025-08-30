import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// Authentication utilities
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async (): Promise<User | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// Database utilities
export const fetchData = async (table: string, query?: any) => {
  let supabaseQuery = supabase.from(table).select('*');

  if (query) {
    Object.keys(query).forEach((key) => {
      supabaseQuery = supabaseQuery.eq(key, query[key]);
    });
  }

  const { data, error } = await supabaseQuery;
  return { data, error };
};

export const insertData = async (table: string, data: any) => {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  return { data: result, error };
};

export const updateData = async (table: string, id: string, data: any) => {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select();
  return { data: result, error };
};

export const deleteData = async (table: string, id: string) => {
  const { error } = await supabase.from(table).delete().eq('id', id);
  return { error };
};
