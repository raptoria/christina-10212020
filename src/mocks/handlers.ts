import { rest } from 'msw';
import { Document, Documents } from '../store/types';
import DOMPurify from 'dompurify';

let documents: Document[] = [
  { name: 'Jimmy', size: 100, mimeType: 'image/png' },
  { name: 'John', size: 120, mimeType: 'image/png' },
  { name: 'Quails', size: 130, mimeType: 'image/png' },
  { name: 'Ducks', size: 135, mimeType: 'image/png' },
];

export const handlers = [
  //get documents
  rest.get('/api/documents', (req, res, ctx) => {
    let documentList = documents;
    const searchString = req.url.searchParams.get('searchString');

    if (searchString) {
      const cleanValue = DOMPurify.sanitize(searchString);
      documentList = documentList.filter((d: Document) =>
        d.name.toLowerCase().includes(cleanValue)
      );
    }
    if (documentList) {
      return res(ctx.status(200), ctx.json({ documentList }));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: 'Could not find documents',
        })
      );
    }
  }),
  //create document
  rest.post('/api/documents', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  //delete document
  rest.delete('/api/documents', (req, res, ctx) => {
    const body = req.body as Partial<Documents>;
    const documentName = body.documentName;

    if (documentName) {
      const indexToRemove = documents.findIndex(
        (d: Document) => d.name === documentName
      );
      if (indexToRemove > -1) {
        documents.splice(indexToRemove, 1);
        return res(ctx.status(204));
      }
    }
    return res(
      ctx.status(404),
      ctx.json({
        error: 'Could not find document',
      })
    );
  }),
];
