import { Alert, Button, Card, Form, Input, Spin } from 'antd';
import {
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { StoreContext } from '../store/store';
import { useDebouncedCallback } from 'use-debounce';
import DOMPurify from 'dompurify';
import { Document } from '../store/types';

import styles from './document.module.scss';

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
    const cleanValue = DOMPurify.sanitize(value);
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

  const memoizedDimensions = useMemo(
    () => ({
      quantity: documentList?.length,
      size: documentList?.reduce((acc, d: Document) => acc + d.size, 0),
    }),
    [documentList]
  );

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
          <Button
            type="primary"
            className="upload-button"
            icon={<UploadOutlined />}
          >
            Upload
          </Button>
        </div>

        <div className="column-span">
          <h2>{memoizedDimensions.quantity} documents</h2>
          <h3>Total size: {memoizedDimensions.size}kb</h3>
        </div>
        {loading ? <Spin className="loading-indicator" /> : null}
        {documentList?.map((document) => (
          <Card title={document.name} bordered={false} key={document.name}>
            <div className="card-wrapper">
              <span>{document.size} kb</span>
              <Button
                type="primary"
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
