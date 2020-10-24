import { Alert, Button, Card, Form, Input, Spin } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { StoreContext } from '../store/store';
import { useDebouncedCallback } from 'use-debounce';
import DOMPurify from 'dompurify';
import { Document, sizeUnit } from '../store/types';

import styles from './document.module.scss';
import Uploader from '../Uploader/Uploader';

const DocumentManager: React.FC = () => {
  const {
    actions,
    state: {
      documents: { documentList, error, loading },
    },
  } = useContext(StoreContext);

  useEffect(() => {
    actions.getDocuments();
  }, []);

  const debounced = useDebouncedCallback((value: string) => {
    const cleanValue = encodeURIComponent(DOMPurify.sanitize(value));
    actions.getDocuments({ searchString: cleanValue });
  }, 500);

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      debounced.callback(e.target.value),
    [actions]
  );

  const onDelete = useCallback(
    (documentName: string) => {
      actions.deleteDocument({ documentName });
    },
    [actions]
  );

  const formatSize = useCallback(
    (size: number) => {
      let finalSize = size;
      let unit = sizeUnit.kb;

      if (size >= 1000) {
        finalSize = size / 1000;
        unit = sizeUnit.mb;
      }
      return finalSize + unit;
    },
    [actions]
  );

  const memoizedDimensions = useMemo(() => {
    const size: number =
      documentList?.reduce((acc, d: Document) => acc + d.size, 0) || 0;

    return {
      quantity: documentList?.length,
      size: formatSize(size),
    };
  }, [documentList]);

  return (
    <div className={styles.document}>
      {error ? (
        <Alert type="error" showIcon={true} message={error} closeText="Ok" />
      ) : null}
      <div className="grid-wrapper">
        <div className="column-span">
          <Input
            size="large"
            prefix={<SearchOutlined className="input-icon" />}
            placeholder="Search documents"
            className="search"
            onChange={onSearch}
            allowClear={true}
          />
          <Uploader />
        </div>

        <div className="column-span">
          <h2>{memoizedDimensions.quantity} documents</h2>
          <h3>Total size: {memoizedDimensions.size}</h3>
        </div>
        {loading ? <Spin className="loading-indicator" /> : null}
        {documentList?.map((document, idx) => (
          <Card
            title={<span title={document.name}>{document.name}</span>}
            bordered={false}
            key={document.name + idx}
          >
            <div className="card-wrapper">
              <span>{formatSize(document.size)} </span>
              <Button
                type="primary"
                data-testid={`deleteButton-${document.name}`}
                onClick={(e) => onDelete(document.name)}
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentManager;
