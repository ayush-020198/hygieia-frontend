import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Label from "Components/Label";

import { ReactComponent as DustbinSvg } from "Assets/dustbin.svg";
import { ReactComponent as UploadSvg } from "Assets/upload.svg";

import styles from "./reports.module.css";
import Button from "Components/Button";
import Text from "Components/Text";

export const Upload: React.FC = () => {
  const [file, setFile] = useState<File>();
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });
  return (
    <form className={styles.form}>
      <Text title="Report Title" name="title" placeholder="Regular Checkup Report" />
      <Label title="Upload Report">
        <div {...getRootProps()} className={styles.dropzoneWrapper}>
          <input {...getInputProps()} name="report" className={styles.dropzone} />
          {isDragActive ? (
            <>
              <UploadSvg className={styles.uploadSvg} />
              <p className={styles.dropzoneP}>Drop the files</p>
            </>
          ) : (
            <>
              <UploadSvg className={styles.uploadSvg} />
              <p className={styles.dropzoneP}>Drag & drop files or click.</p>
            </>
          )}
        </div>

        {file && (
          <div className={styles.addedFile}>
            <span>{file.name.length > 17 ? file.name.substring(0, 17) + "..." : file.name}</span>
            <Button
              type="button"
              style={{ background: "transparent" }}
              onClick={(e) => {
                e.preventDefault();
                setFile(undefined);
              }}
            >
              <DustbinSvg />
            </Button>
          </div>
        )}
      </Label>
      <Button type="submit" style={{ margin: "2em 0" }}>
        Submit
      </Button>
    </form>
  );
};

export default Upload;
