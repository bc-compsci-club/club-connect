import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import eventEditorStyles from '../../EventEditor.module.scss';
import addImageIcon from 'assets/icons/add-image.svg';

export const PresenterImageUpload = (props) => {
  const { onChange, setPresenterImageFile } = props;

  const handleOnDrop = (acceptedFiles) => {
    // Conditions not met
    if (acceptedFiles.length === 0) {
      toast.warn(
        'The presenter image could not be uploaded. Please make sure the image is under 10MB, is a JPEG or PNG image, and that you are only uploading one image.',
        {
          position: 'top-center',
          autoClose: 10000,
        }
      );
      return;
    }

    const presenterImageFile = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      setPresenterImageFile(presenterImageFile);
      setPresenterImagePreview(reader.result);
      setPresenterImageAccepted(true);
    };

    reader.onerror = () => {
      toast.error(
        'An error occurred while uploading the presenter image. Please try again.'
      );
    };

    reader.onabort = () => {
      toast.warning('Presenter image upload aborted!');
    };

    reader.readAsDataURL(presenterImageFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    maxSize: 10000000,
    onDrop: handleOnDrop,
  });

  const [presenterImagePreview, setPresenterImagePreview] = useState(null);
  const [presenterImageAccepted, setPresenterImageAccepted] = useState(false);

  return (
    <>
      <div
        {...getRootProps({
          className: `dropzone`,
        })}
      >
        <input {...getInputProps({ onChange })} />
        <div className={`${eventEditorStyles.dropzoneWrapper}`}>
          <div className={eventEditorStyles.dropzone}>
            <div
              className={`${
                isDragActive && eventEditorStyles.directionsContainerActive
              } ${eventEditorStyles.directionsContainer} ${
                eventEditorStyles.presenterImageContainer
              }`}
            >
              {presenterImageAccepted ? (
                <img
                  className={eventEditorStyles.uploadedPresenterImage}
                  src={presenterImagePreview}
                  alt="Uploaded presenter image"
                />
              ) : (
                <img
                  className={eventEditorStyles.presenterImage}
                  src={addImageIcon}
                  alt="Add an image"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PresenterImageUpload;
