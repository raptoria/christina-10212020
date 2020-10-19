import { Button, Form, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import React, { useCallback, useContext } from 'react';

import { StoreContext } from '../store/store';

import styles from './document.module.scss';

const DocumentManager: React.FC = () => {
  const { actions } = useContext(StoreContext);

  return <div className={styles.document}>Document Manager</div>;
};

export default DocumentManager;
