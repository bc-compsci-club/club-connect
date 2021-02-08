import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { Button } from 'components/common';
import { windowSupported } from 'utils/checkSupport';
import eventEditorStyles from '../../EventEditor.module.scss';
import addImageIcon from 'assets/icons/add-image.svg';

export const BannerUpload = (props) => {
  const { onChange, setBannerFile } = props;

  const handleOnDrop = (acceptedFiles) => {
    // Conditions not met
    if (acceptedFiles.length === 0) {
      toast.warn(
        'Your banner could not be uploaded. Please make sure your image is under 10MB, is a JPEG or PNG image, and that you are only uploading one image.',
        {
          position: 'top-center',
          autoClose: 10000,
        }
      );
      return;
    }

    const bannerFile = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      setBannerFile(bannerFile);
      setBannerPreview(reader.result);
      setBannerAccepted(true);
    };

    reader.onerror = () => {
      toast.error(
        'An error occurred while uploading your banner. Please try again.'
      );
    };

    reader.onabort = () => {
      toast.warning('Banner upload aborted!');
    };

    reader.readAsDataURL(bannerFile);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    maxSize: 10000000,
    onDrop: handleOnDrop,
  });

  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerAccepted, setBannerAccepted] = useState(false);

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps({ onChange })} />
        <div className={eventEditorStyles.dropzoneWrapper}>
          <div className={eventEditorStyles.dropzone}>
            {bannerAccepted ? (
              <img
                className={eventEditorStyles.uploadedBanner}
                src={bannerPreview}
                alt="Uploaded event banner"
              />
            ) : (
              <div
                className={`${
                  isDragActive && eventEditorStyles.directionsContainerActive
                } ${eventEditorStyles.directionsContainer}`}
              >
                <div className={eventEditorStyles.directions}>
                  <img src={addImageIcon} alt="Add an image" />

                  <p>
                    <strong>
                      {isDragActive
                        ? // Drag is active
                          'Drop your image here!'
                        : // Drag is not active
                        windowSupported() && window.innerWidth <= 700
                        ? 'Tap here to add an image.'
                        : 'Click or drag an image here to upload it.'}
                    </strong>
                  </p>

                  <p>JPEG or PNG, up to 10 MB.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {bannerAccepted && (
        <Button
          classNamePassed={eventEditorStyles.bannerButton}
          type="button"
          onClick={open}
        >
          Change Banner
        </Button>
      )}
    </>
  );
};

export default BannerUpload;
