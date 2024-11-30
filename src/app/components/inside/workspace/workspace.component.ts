import { AuthService } from './../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GravatarModule } from 'ngx-gravatar';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GravatarModule],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
})
export class WorkspaceComponent implements OnInit {
  boards: any[] = [];
  user = this.auth.currentUser;

  constructor(
    private dataService: DataService,
    private router: Router,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    this.boards = await this.dataService.getBoards();
  }

  async startBoard() {
    const data = await this.dataService.startBoard();

    // Load all boards because we only get back minimal data
    // Trigger needs to run first
    // Otherwise RLS would fail
    this.boards = await this.dataService.getBoards();

    if (this.boards.length > 0) {
      const newBoard = this.boards.pop();

      if (newBoard.boards) {
        this.router.navigateByUrl(`/workspace/${newBoard.boards.id}`);
      }
    }
  }

  signOut() {
    this.auth.logout();
  }
}
