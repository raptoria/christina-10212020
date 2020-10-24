import React, { useCallback, useContext } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadProps } from 'antd/lib/upload/interface';
import { StoreContext } from '../store/store';
import DOMPurify from 'dompurify';

const Uploader: React.FC = () => {
  const { actions } = useContext(StoreContext);

  const getProps: () => UploadProps = useCallback(
    () => ({
      customRequest: ({ file }) => {
        const { name, size, type } = file;
        actions.uploadDocument({
          name: encodeURIComponent(DOMPurify.sanitize(name)),
          mimeType: encodeURIComponent(DOMPurify.sanitize(type)),
          size: Math.round(size / 1000),
        });
      },
      showUploadList: false,
      beforeUpload: (file: RcFile) => {
        const sizeInMB = Math.round(file.size / 1000000);
        const validFormat =
          (file.type === 'image/png' || file.type === 'image/jpeg') &&
          sizeInMB <= 10;

        if (!validFormat) {
          message.error(`${file.name} must be a png/jpg and smaller than 10MB`);
        }
        return validFormat;
      },
    }),
    [actions]
  );

  return (
    <Upload {...getProps()}>
      <Button
        type="primary"
        className="upload-button"
        data-testid="uploadButton"
        icon={<UploadOutlined />}
      >
        Upload
      </Button>
    </Upload>
  );
};

export default Uploader;
