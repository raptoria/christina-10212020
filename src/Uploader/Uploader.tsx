import React, { useCallback, useContext } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadProps } from 'antd/lib/upload/interface';
import { StoreContext } from '../store/store';

const Uploader: React.FC = () => {
  const { actions } = useContext(StoreContext);

  const getProps: () => UploadProps = useCallback(
    () => ({
      showUploadList: false,
      beforeUpload: (file: RcFile) => {
        const validFormat =
          file.type === 'image/png' || file.type === 'image/jpeg';

        if (!validFormat) {
          message.error(`${file.name} must be a png/jpg`);
        }
        return validFormat;
      },
      transformFile(file: RcFile) {
        const { name, size, type } = file;
        return new Promise(() => {
          actions.uploadDocument({
            name,
            size: Math.round(size / 1000),
            mimeType: type,
          });
        });
      },
    }),
    [actions]
  );

  return (
    <Upload {...getProps()}>
      <Button
        type="primary"
        className="upload-button"
        icon={<UploadOutlined />}
      >
        Upload
      </Button>
    </Upload>
  );
};

export default Uploader;
