import { DocumentModel } from 'src/document/document.model';
import { ArticleModel } from '../article/article.model';

export interface ChapterModel extends DocumentModel {
  name: string;
  text: string;
  articles: ArticleModel[];
  value: number;
}
