import { rest } from 'msw';
import { Document, Documents } from '../store/types';
import DOMPurify from 'dompurify';

const documents: Document[] = [
  { name: 'Banana.png', size: 100, mimeType: 'image/png' },
  { name: 'Clove.jpg', size: 120, mimeType: 'image/png' },
  { name: 'Quails.png', size: 130, mimeType: 'image/png' },
  { name: 'banana2.png', size: 130, mimeType: 'image/png' },
  { name: 'Ducks.png', size: 1000, mimeType: 'image/png' },
];

export const handlers = [
  /**
   * retrieves all documents. If a query param is sent
   * it will return the list of filtered documents
   * @api {GET} /api/documents?searchString=str
   * @apiParam searchString
   * @param req the request object
   * @param res the response object
   * @param ctx the context
   * @return the response object containing documentList OR an error message
   */
  rest.get('/api/documents', (req, res, ctx) => {
    let documentList = documents;
    const searchString = req.url.searchParams.get('searchString');

    if (searchString) {
      const cleanValue = DOMPurify.sanitize(decodeURIComponent(searchString));
      documentList = documentList.filter((d: Document) =>
        d.name.toLowerCase().includes(cleanValue.toLowerCase())
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
  /**
   * creates a document
   * @api {POST} /api/documents
   * @param req the request object
   * @param res the response object
   * @param ctx the context
   * @return responds that a document has successfully been created OR an error message
   */
  rest.post('/api/documents', (req, res, ctx) => {
    const body = req.body as Document;
    if (body) {
      const cleanName = DOMPurify.sanitize(decodeURIComponent(body.name));
      const cleanMimeType = DOMPurify.sanitize(
        decodeURIComponent(body.mimeType)
      );
      const cleanSize = DOMPurify.sanitize(
        decodeURIComponent(body.size.toString())
      );
      documents.push({
        size: Number(cleanSize),
        mimeType: cleanMimeType,
        name: cleanName,
      });
      //perform some kind of virus scan here, if we were really saving image data
      return res(ctx.status(201));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: 'Could not create document',
        })
      );
    }
  }),
  /**
   * delete a document
   * @api {DELETE} /api/documents
   * @param req the request object
   * @param res the response object
   * @param ctx the context
   * @return responds with a no content success message OR an error message
   */
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
