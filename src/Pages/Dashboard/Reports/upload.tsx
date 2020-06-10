import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import Label from "Components/Label";
import useSWRPost from "Hooks/useSWRPost";
import toast from "Utils/toast";

import { ReactComponent as DustbinSvg } from "Assets/dustbin.svg";
import { ReactComponent as UploadSvg } from "Assets/upload.svg";
import { ReactComponent as Spinner } from "Assets/three-dots.svg";

import styles from "./reports.module.css";
import Button from "Components/Button";
import Text from "Components/Text";

type UpForm = {
  title: string;
  report: FileList;
};

export const Upload: React.FC = () => {
  const [file, setFile] = useState<File>();

  const { handleSubmit, register, errors, reset } = useForm<UpForm>();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const [runUpload, { isValidating }] = useSWRPost<FormData>("/api/upload", {
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success(data.message);
      reset();
      mutate("/api/reports");
    },
    onError: (err) => {
      toast.error("Some error occurred");
      console.error(err);
    },
  });

  useEffect(() => {
    (Object.keys(errors) as Array<keyof UpForm>).forEach((key) => {
      if (errors[key]?.message) toast.error(errors[key]?.message);
    });
  }, [errors]);

  const onSubmit = (values: UpForm) => {
    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("report", values.report[0]);

    runUpload(fd);

    // fetch("/api/upload", {
    //   method: "POST",
    //   body: fd,
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     mutate('/api/reports')
    //     reset();
    //   });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Text
        title="Report Title"
        name="title"
        placeholder="Regular Checkup Report"
        inpRef={register({
          required: "Title is required",
        })}
        haveError={!!errors.title}
      />
      <Label title="Upload Report">
        <div {...getRootProps()} className={styles.dropzoneWrapper}>
          <input
            {...getInputProps()}
            name="report"
            className={styles.dropzone}
            ref={register({
              required: "File is required",
            })}
          />
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
      <Button type="submit" style={{ margin: "2em 0" }} disabled={isValidating}>
        {isValidating ? <Spinner style={{ height: "1em" }} /> : <>Submit</>}
      </Button>
    </form>
  );
};

export default Upload;
