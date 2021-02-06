import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Button } from 'components/common';
import { ensureUserIsAuthenticated, getUserData } from 'utils/auth';
import { toastErrorCenter, toastSuccessCenter } from 'utils/generalUtils';
import commonStyles from 'styles/commonStyles.module.scss';
import announcementStyles from 'styles/pages/announcements/AnnouncementPage.module.scss';
import { API_ROOT, SITE_TITLE_BASE } from 'pages/_app';

dayjs.extend(relativeTime);

const AnnouncementPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = props;

  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [announcementData, setAnnouncementData] = useState();

  useEffect(async () => {
    if (!(await ensureUserIsAuthenticated(router, dispatch))) {
      return;
    }

    let res;
    try {
      res = await axios.get(`${API_ROOT}/announcements/${id}`, {
        withCredentials: true,
      });
    } catch (err) {
      toast.error(
        'Unable to load the announcement. Please try refreshing the page.',
        {
          position: 'top-center',
        }
      );
      return;
    }

    setPageTitle(res.data.title);
    setAnnouncementData(res.data);
    setPageLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>
          {pageTitle} | {SITE_TITLE_BASE}
        </title>
      </Head>

      {pageLoaded ? (
        <div className={`${commonStyles.container} ${commonStyles.text}`}>
          <article>
            <h1 className={commonStyles.centerElement}>
              {announcementData.title}
            </h1>

            <h2 className={announcementStyles.headline}>
              {announcementData.headline}
            </h2>

            {/* Posted/Last updated X time ago on Month Day, Year at XX:XX AM/PM */}
            {/* Example: Posted/Last updated 1 hour ago on January 1, 2021 at 12:00 PM */}
            <section>
              {announcementData.createdAt !== announcementData.updatedAt && (
                <h3
                  className={announcementStyles.announcementDateTime}
                >{`Last updated ${dayjs(
                  announcementData.updatedAt
                ).fromNow()} on ${dayjs(announcementData.updatedAt).format(
                  'MMMM D, YYYY [at] h:mm A'
                )}`}</h3>
              )}

              <h3
                className={announcementStyles.announcementDateTime}
              >{`Posted ${dayjs(
                announcementData.createdAt
              ).fromNow()} on ${dayjs(announcementData.createdAt).format(
                'MMMM D, YYYY [at] h:mm A'
              )}`}</h3>
            </section>

            <hr className={announcementStyles.hr} />

            <ReactMarkdown skipHtml={true}>
              {announcementData.body}
            </ReactMarkdown>
          </article>

          {getUserData().role === 'Admin' && (
            <section>
              <Button
                classNamePassed={announcementStyles.actionButton}
                href={`/announcements/edit?id=${announcementData.id}`}
                asLink
              >
                Edit Announcement
              </Button>
              <Button
                classNamePassed={announcementStyles.actionButton}
                style={{ backgroundColor: '#ff4d4d' }}
                onClick={async () => {
                  const confirmDeleteAnnouncement = confirm(
                    'Are you sure you want to delete this announcement?'
                  );

                  if (confirmDeleteAnnouncement) {
                    try {
                      await axios.delete(`${API_ROOT}/announcements/${id}`, {
                        withCredentials: true,
                      });
                    } catch (err) {
                      toastErrorCenter(
                        'An error occurred while deleting the announcement.'
                      );
                      console.error(err);
                      return;
                    }

                    toastSuccessCenter(
                      'The announcement has been successfully deleted.'
                    );
                    router.push('/announcements');
                  }
                }}
              >
                Delete Announcement
              </Button>
            </section>
          )}
        </div>
      ) : (
        <div className={commonStyles.container}>
          <div className={announcementStyles.titleLoading}>
            <Skeleton width={'80%'} height={'3rem'} />
            <Skeleton width={'65%'} height={'3rem'} />
          </div>

          <div>
            <Skeleton width={'95%'} />
            <Skeleton width={'80%'} />
            <Skeleton width={'90%'} />
          </div>

          <div>
            <Skeleton width={'50%'} height={'1rem'} />
          </div>

          <hr className={announcementStyles.hrLoading} />

          <div>
            <Skeleton width={'100%'} />
            <Skeleton width={'95%'} />
            <Skeleton width={'95%'} />
            <Skeleton width={'100%'} />
            <Skeleton width={'90%'} />
            <Skeleton width={'95%'} />
            <Skeleton width={'100%'} />
            <Skeleton width={'95%'} />
            <Skeleton width={'100%'} />
            <Skeleton width={'70%'} />
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      id: context.params.id[0],
    },
  };
};

export default AnnouncementPage;
