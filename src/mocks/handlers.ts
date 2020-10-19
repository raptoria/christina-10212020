import { rest } from 'msw';
import { Document } from '../store/types';

let documents: Document[] = [{ title: 'test', size: '100kb' }];

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
