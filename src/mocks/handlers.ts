import { rest } from 'msw';
import { Document, Documents } from '../store/types';

let documents: Document[] = [
  { name: 'Jimmy', size: '100kb', mimeType: 'image/png' },
  { name: 'John', size: '120kb', mimeType: 'image/png' },
  { name: 'Quails', size: '130kb', mimeType: 'image/png' },
  { name: 'Ducks', size: '135kb', mimeType: 'image/png' },
];

export const handlers = [
  //get documents
  rest.get('/api/documents', (req, res, ctx) => {
    const searchString = req.url.searchParams.get('searchString');
    let documentList = documents;

    if (searchString) {
      documentList = documentList.filter((d: Document) =>
        d.name.toLowerCase().includes(searchString)
      );
    }

    return res(ctx.status(200), ctx.json({ documentList }));
  }),
  //create new document
  rest.post('/api/documents', (req, res, ctx) => {
    // handle request and push into list of documents
    //use indexedDB?
    return res(ctx.status(200));
  }),
];
/* 
  return res(
    ctx.status(403),
    ctx.json({
      error: 'Not authorized',
    }),
  )
} */
