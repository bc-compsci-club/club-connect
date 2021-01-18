import dayjs from 'dayjs';

// For Outlook.com and Office 365 web calendar links
export const getRandomKey = () => {
  let n = Math.floor(Math.random() * 999999999999).toString();
  return new Date().getTime().toString() + '_' + n;
};

// Create Outlook.com web calendar links for Outlook.com and Office 365
export const createMicrosoftWebLink = (link, eventData) => {
  let finalLink = link;

  console.log(eventData);

  finalLink +=
    '&startdt=' + dayjs(eventData.startDatetime).format('YYYY-MM-DDTHH:mm:ssZ');
  finalLink +=
    '&enddt=' + dayjs(eventData.endDatetime).format('YYYY-MM-DDTHH:mm:ssZ');
  finalLink += '&subject=' + encodeURIComponent(eventData.title);
  finalLink += '&location=' + encodeURIComponent(eventData.location);
  finalLink += '&body=' + encodeURIComponent(eventData.description);
  finalLink += '&allday=false';
  finalLink += '&uid=' + getRandomKey();
  finalLink += '&path=/calendar/view/Month';

  return finalLink;
};
