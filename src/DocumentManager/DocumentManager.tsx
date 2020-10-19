import { Button, Card, Form, Input } from 'antd';
import {
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useCallback, useContext, useEffect } from 'react';

import { StoreContext } from '../store/store';

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

  return (
    <div className={styles.document}>
      <div className="grid-wrapper">
        <div className="column-span">
          <Input
            size="large"
            prefix={<SearchOutlined className="inputIcon" />}
            placeholder="Search documents"
            className="search"
          />
          <Button type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>
        </div>

        <div className="column-span">
          <h3>!!! documents</h3>
          <span>Total size: !!</span>
        </div>
        <div>
          {documentList?.map((document) => (
            <Card title={document.title} bordered={false} key={document.title}>
              {document.size}
              <Button type="primary" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
