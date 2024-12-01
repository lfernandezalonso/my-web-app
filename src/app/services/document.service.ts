import { Subject } from 'rxjs';

export class DocumentService {
  documentSubject = new Subject();

  private documents = ['Libro de Vaxi', 'Libro de Luis', 'El Grafico Revista'];

  addDocument(bookTitle: string) {
    this.documents.push(bookTitle);
    this.documentSubject.next();
  }

  delDocument(bookTitle: string) {
    this.documents = this.documents.filter(x => x !== bookTitle);
    this.documentSubject.next();
  }

  getAll() {
    return [...this.documents];
  }

}
