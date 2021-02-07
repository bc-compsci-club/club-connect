import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import queryString from 'query-string';
import { Controller, useForm } from 'react-hook-form';
import cloneDeep from 'lodash.clonedeep';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';

import {
  BannerUpload,
  PresenterImageUpload,
} from 'components/common/EventEditor/components';
import Button from 'components/common/Button';
import { windowSupported } from 'utils/checkSupport';
import { toastErrorCenter } from 'utils/generalUtils';
import eventEditorStyles from './EventEditor.module.scss';
import formStyles from 'styles/shared/Form.module.scss';
import commonStyles from 'styles/commonStyles.module.scss';
import { API_ROOT } from 'pages/_app';

const EventEditor = (props) => {
  const { formType, submitFunction, submitting } = props;

  const router = useRouter();
  const { register, handleSubmit, control, watch, reset } = useForm();
  const useCustomInternalName = watch('useCustomInternalName');

  const [bannerFile, setBannerFile] = useState(null);
  const [presenterImageFile, setPresenterImageFile] = useState(null);
  const [editorReady, setEditorReady] = useState(formType !== 'edit');

  useEffect(async () => {
    if (formType === 'edit') {
      // Get event ID from query string
      const parsedQueryString = queryString.parse(location.search);
      if (!parsedQueryString.id) {
        toastErrorCenter('No event ID was specified for editing.');
        await router.push('/events');
        return;
      }

      const eventId = parsedQueryString.id;

      // Get the event data to edit
      let res;
      try {
        res = await axios.get(`${API_ROOT}/events/${eventId}`);
      } catch (err) {
        toastErrorCenter('An error occurred while getting the event data.');
        await router.push(`/events/${eventId}`);
        return;
      }

      // Load event data into the form
      reset(res.data);
      setEditorReady(true);
    }
  }, []);

  // Prepare form data to be submitted
  const prepareFormData = (submittedData) => {
    const eventData = cloneDeep(submittedData);

    // Set empty string values and undefined to null
    for (const [key, value] of Object.entries(eventData)) {
      if (value === '' || value === undefined) {
        eventData[key] = null;
      }
    }

    // Convert datetimes to ISO strings
    if (eventData.startDateTime) {
      eventData.startDateTime = new Date(eventData.startDateTime).toISOString();
    }

    if (eventData.endDateTime) {
      eventData.endDateTime = new Date(eventData.endDateTime).toISOString();
    }

    // Prepare FormData by serializing form data to JSON and appending files if they exist
    // Remove files from form data before serializing
    delete eventData.banner;
    delete eventData.presenterImage;

    const formData = new FormData();
    formData.append('formDataJson', JSON.stringify(eventData));
    if (bannerFile) {
      formData.append('bannerFile', bannerFile);
    }
    if (presenterImageFile) {
      formData.append('presenterImageFile', presenterImageFile);
    }

    // Submit the form
    submitFunction(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(prepareFormData)}>
        <div className={formStyles.labeledInput}>
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            disabled={!editorReady || submitting}
            placeholder={!editorReady ? 'Loading...' : ''}
            ref={register}
            required
          />
        </div>

        {(formType === 'create' || formType === 'edit') && (
          <div className={eventEditorStyles.presenterInputs}>
            <div className={formStyles.labeledInput}>
              <label htmlFor="presenter">Presenter</label>
              <input
                type="text"
                id="presenter"
                name="presenter"
                disabled={!editorReady || submitting}
                ref={register}
              />
            </div>
            <div className={formStyles.labeledInput}>
              <label
                className={eventEditorStyles.presenterImageLabel}
                htmlFor="presenterImage"
              >
                {windowSupported() && window.innerWidth <= 700
                  ? 'Presenter Image'
                  : 'Image'}
              </label>
              <Controller
                name="presenterImage"
                control={control}
                render={({ onChange }) => (
                  <PresenterImageUpload
                    onChange={onChange}
                    setPresenterImageFile={setPresenterImageFile}
                  />
                )}
              />
            </div>
          </div>
        )}

        <div className={formStyles.labeledInput}>
          <label htmlFor="banner">
            Banner (Will be resized to a 16:9 aspect ratio)
            {formType === 'request' && '*'}
          </label>
          <Controller
            name="banner"
            control={control}
            render={({ onChange }) => (
              <BannerUpload onChange={onChange} setBannerFile={setBannerFile} />
            )}
          />
        </div>

        <MuiPickersUtilsProvider utils={DayJsUtils}>
          <div className={formStyles.twoColumn}>
            <div className={formStyles.labeledInput}>
              <label htmlFor="startDateTime">
                Start Date and Time{formType === 'request' && '*'}
              </label>
              <Controller
                control={control}
                name="startDateTime"
                id="startDateTime"
                as={
                  <DateTimePicker
                    defaultValue={null}
                    variant="dialog"
                    format="MM/DD/YYYY, h:mm A"
                    TextFieldComponent={(props) => <input {...props} />}
                    readOnly={!editorReady || submitting}
                    required={formType === 'request'}
                    emptyLabel
                    showTodayButton
                  />
                }
              />
            </div>

            <div className={formStyles.labeledInput}>
              <label htmlFor="endDateTime">
                End Date and Time{formType === 'request' && '*'}
              </label>
              <Controller
                control={control}
                name="endDateTime"
                id="endDateTime"
                as={
                  <DateTimePicker
                    variant="dialog"
                    format="MM/DD/YYYY, h:mm A"
                    TextFieldComponent={(props) => <input {...props} />}
                    readOnly={!editorReady || submitting}
                    required={formType === 'request'}
                    emptyLabel
                    showTodayButton
                  />
                }
              />
            </div>
          </div>
        </MuiPickersUtilsProvider>

        <div className={formStyles.labeledInput}>
          <label htmlFor="eventLocation">
            Location (Either Online or a building's address and room number)
            {formType === 'request' && '*'}
          </label>
          <input
            type="text"
            id="eventLocation"
            name="eventLocation"
            disabled={!editorReady || submitting}
            required={formType === 'request'}
            ref={register}
          />
        </div>

        <div className={formStyles.labeledInput}>
          <label htmlFor="externalLink">
            External Link (This can be a direct Zoom/Google Meet link)
            {formType === 'request' && '*'}
          </label>
          <input
            type="text"
            id="externalLink"
            name="externalLink"
            disabled={!editorReady || submitting}
            required={formType === 'request'}
            ref={register}
          />
        </div>

        <div className={formStyles.labeledInput}>
          <label htmlFor="externalLinkButtonText">
            External Link Button Text (The green button on the event page)
            {formType === 'request' && '*'}
          </label>
          <input
            type="text"
            id="externalLinkButtonText"
            name="externalLinkButtonText"
            disabled={!editorReady || submitting}
            required={formType === 'request'}
            ref={register}
          />
        </div>

        <div className={formStyles.labeledInput}>
          <label htmlFor="shortDescription">
            Short Event Description (Under 250 characters)
            {formType === 'request' && '*'}
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            disabled={!editorReady || submitting}
            required={formType === 'request'}
            ref={register}
          />
        </div>

        <div className={formStyles.labeledInput}>
          <label htmlFor="longDescription">
            Long Description{formType === 'request' && '*'}
          </label>
          <textarea
            rows="10"
            id="longDescription"
            name="longDescription"
            disabled={!editorReady || submitting}
            required={formType === 'request'}
            ref={register}
          />
        </div>

        <div
          className={`${formStyles.customInternalName} ${formStyles.checkbox} ${formStyles.checkboxCentered}`}
        >
          <input
            type="checkbox"
            name="useCustomInternalName"
            id="useCustomInternalName"
            disabled={!editorReady || submitting}
            ref={register}
          />
          <label htmlFor="useCustomInternalName">
            Use Custom Internal Name
          </label>
        </div>

        {useCustomInternalName && (
          <div className={`${formStyles.labeledInput}`}>
            <label htmlFor="internalName">
              Internal Name (must-be-lowercase-kebab-case-like-this)*
            </label>
            <input
              type="text"
              id="internalName"
              name="internalName"
              pattern="^([a-z][a-z0-9]*)(-[a-z0-9]+)*$"
              disabled={!editorReady || submitting}
              required={useCustomInternalName}
              ref={register}
            />
          </div>
        )}

        {formType === 'create' && (
          <Button
            classNamePassed={`${formStyles.formButton} ${commonStyles.actionButton}`}
            type="submit"
            disabled={!editorReady || submitting}
          >
            {submitting ? 'Creating Event...' : 'Create Event'}
          </Button>
        )}

        {formType === 'request' && (
          <Button
            classNamePassed={`${formStyles.formButton} ${commonStyles.actionButton}`}
            type="submit"
            disabled={!editorReady || submitting}
          >
            {submitting ? 'Submitting Request...' : 'Submit Request'}
          </Button>
        )}

        {formType === 'edit' && (
          <Button
            classNamePassed={`${formStyles.formButton} ${commonStyles.actionButton}`}
            type="submit"
            disabled={!editorReady || submitting}
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </form>
    </>
  );
};

export default EventEditor;
