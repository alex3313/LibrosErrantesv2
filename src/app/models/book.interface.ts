// src/app/models/book.interface.ts

export interface Book {
    cover_i?: number;
    title: string;
    author_name?: string[];
    coverUrl?: string | null; // Puede ser una URL o null si no hay portada disponible
  }
  