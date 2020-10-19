import { Button, Form, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
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
    actions.getDocuments({ searchString: 'something' });
  }, []);

  return (
    <div className={styles.document}>
      Document Manager {JSON.stringify(documentList)}
    </div>
  );
};

export default DocumentManager;
