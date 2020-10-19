import { rest } from 'msw';
import { Document } from '../store/types';

let documents: Document[] = [
  { name: 'test', size: '100kb', mimeType: 'image/png' },
  { name: 'test2', size: '120kb', mimeType: 'image/png' },
  { name: 'test3', size: '130kb', mimeType: 'image/png' },
  { name: 'test4', size: '135kb', mimeType: 'image/png' },
];

export const handlers = [
  //get documents
  rest.get('/api/documents', (req, res, ctx) => {
    const searchString = req.url.searchParams.get('searchString');
    return res(ctx.status(200), ctx.json({ documentList: documents }));
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
