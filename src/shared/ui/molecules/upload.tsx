import { Box, css, styled, Typography } from '@mui/material';
import { ChangeEventHandler, forwardRef, HTMLProps, useMemo, useState } from 'react';

interface ButtonUploadProps extends Omit<HTMLProps<HTMLInputElement>, 'type' | 'as'> {
  initialValue?: string | File;
}

const Root = styled('label')<{ isUploaded: boolean; isErrored: boolean }>(({ theme, isErrored, isUploaded }) => {
  const base = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed ${theme.palette.primary.main};
    width: 112px;
    height: 112px;
    border-radius: 50%;
    background: none;
    overflow: hidden;
  `;

  if (isErrored) {
    return css`
      ${base};
      border: 2px solid ${theme.palette.error.main};
    `;
  }

  if (isUploaded) {
    return css`
      ${base};
      border: 2px solid ${theme.palette.primary.main};
    `;
  }

  return base;
});

const Cover = styled(Box)<{ isErrored: boolean }>`
  position: absolute;
  background: ${({ theme, isErrored }) => (isErrored ? theme.palette.error.main : theme.palette.primary.main)};
  opacity: 0.2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Content = styled(Box)<{ isErrored: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  color: ${({ theme, isErrored }) => (isErrored ? theme.palette.error.main : theme.palette.primary.main)};
`;

const Image = styled('img')`
  width: 100%;
`;

const Input = styled('input')`
  display: none;
`;

const FileName = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EllipsisWrapper = styled(Box)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 8px;
  text-align: center;
`;

export const Upload = forwardRef<HTMLInputElement, ButtonUploadProps>(
  ({ onChange, initialValue, ...restProps }, ref) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [errorFileName, setErrorFileName] = useState<string>();

    const onUploadFile: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (e.currentTarget.files) {
        const fileName = e.currentTarget.files[0].name;

        const isValidFormat = /\.(jpe?g|svg|gif|png)$/i.test(fileName);
        if (isValidFormat) {
          setErrorFileName(undefined);
          setUploadedFile(e.currentTarget.files[0]);
        } else {
          setErrorFileName(fileName);
        }
      }

      onChange?.(e);
    };

    const isFileUploaded = !!uploadedFile;
    const isErrored = !!(errorFileName && errorFileName.length > 0);

    const isFileSuccessUploaded = isFileUploaded && !isErrored;

    const imageSrc = useMemo(() => {
      if (uploadedFile) {
        return URL.createObjectURL(uploadedFile);
      }

      if (initialValue instanceof File) {
        return URL.createObjectURL(initialValue);
      }

      return initialValue;
    }, [initialValue, uploadedFile]);

    return (
      <Root isUploaded={isFileUploaded} isErrored={isErrored}>
        {!isFileSuccessUploaded && <Cover isErrored={isErrored} />}
        <Content isErrored={isErrored}>
          {imageSrc ? (
            <Image src={imageSrc} alt="" />
          ) : (
            <>
              {/*//TODO IMAGE ICON*/}
              {/*<ImageIcon />*/}
              <EllipsisWrapper>
                <FileName variant="body1">{isErrored ? errorFileName : 'Upload'}</FileName>
              </EllipsisWrapper>
            </>
          )}
        </Content>
        <Input ref={ref} onChange={onUploadFile} type="file" {...restProps} />
      </Root>
    );
  },
);
