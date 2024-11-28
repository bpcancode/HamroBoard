import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export const BOARDS_TABLE = 'boards';
export const USER_BOARDS_TABLE = 'user_boards';
export const LISTS_TABLE = 'lists';
export const CARDS_TABLE = 'cards';
export const USERS_TABLE = 'users';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async startBoard() {
    return await this.supabase.from(BOARDS_TABLE).insert({});
  }

  async getBoards() {
    const boards = await this.supabase.from(USER_BOARDS_TABLE).select(`
    boards:board_id ( title, id )
  `);
    return boards.data || [];
  }
}
