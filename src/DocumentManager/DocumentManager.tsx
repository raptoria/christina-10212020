import { Button, Card, Form, Input } from 'antd';
import {
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useCallback, useContext, useEffect } from 'react';
import { StoreContext } from '../store/store';
import { useDebouncedCallback } from 'use-debounce';

import styles from './document.module.scss';

const DocumentManager: React.FC = () => {
  const {
    actions,
    state: {
      documents: { documentList },
    },
  } = useContext(StoreContext);

  useEffect(() => {
    actions.getDocuments();
  }, []);

  const debounced = useDebouncedCallback((value: string) => {
    actions.getDocuments({ searchString: value });
  }, 500);

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      debounced.callback(e.target.value),
    [actions]
  );

  return (
    <div className={styles.document}>
      <div className="grid-wrapper">
        <div className="column-span">
          <Input
            size="large"
            prefix={<SearchOutlined className="input-icon" />}
            placeholder="Search documents"
            className="search"
            onChange={onSearch}
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
          <h2>!!! documents</h2>
          <span>Total size: !!</span>
        </div>

        {documentList?.map((document) => (
          <Card title={document.name} bordered={false} key={document.name}>
            <div className="card-wrapper">
              <span>{document.size}</span>
              <Button type="primary" icon={<DeleteOutlined />}>
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
