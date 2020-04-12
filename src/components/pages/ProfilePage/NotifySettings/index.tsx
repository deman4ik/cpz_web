import React, { memo, useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { GET_USER_INFO } from '../../../../graphql/user/queries';
import { SET_NOTIFICATION_SETTINGS } from '../../../../graphql/user/mutations';
import { LoadingIndicator } from '../../../common';
//import { useTooltip } from '../../../../hooks/useTooltip';
import { capitalize } from '../../../../config/utils';
//import { Checkbox } from '../../../basic/Checkbox';
//import { vars } from '../../../../styles';
//import { responsive } from '../UseContainer.style';
import { extraSettings, serviceName } from './helpers';
//import { styles as _styles, responsive as _responsive } from './index.style';
import { NotificationProps } from './types';
import { Notify } from './Notify';
import styles from './index.module.css';

const _NotifySettings: React.FC = () => {
  // const indicatorRef = useRef(null);
  // const [elheight, setElHeight] = useState(0);
  //const { tooltipText: signalsHelpText, tooltipButton: signalsHelpButton } = useTooltip('If you turn signals notifications OFF you will not receive any messages about signals from ALL SIGNALS ROBOTS', 400);
  //const { tooltipText: robotsHelpText, tooltipButton: robotsHelpButton } = useTooltip('If you turn robots notifications OFF you will not receive any messages about trades from ALL ROBOTS', 400);

  // const renderHelpButton = (key: string) => {
  //   const helpButton = {
  //     signals: () => signalsHelpButton,
  //     trading: () => robotsHelpButton
  //   };
  //   return helpButton[key]();
  // };

  const [ notifications, setNotifications ] = useState<NotificationProps[]>([]);

  const { loading } = useQuery(GET_USER_INFO, {
    onCompleted: data => {
      const { notifications: _notifications } = data.users[0].settings;
      setNotifications(Object.keys(_notifications).map(key => ({
        key,
        checkboxes: Object.keys(_notifications[key]).map(name => ({
          name,
          isActive: _notifications[key][name],
          disabled: !data.users[0][serviceName[name]]
        })),
        ...extraSettings[key]
      })));
    }
  });
  const [ saveNotifications ] = useMutation(SET_NOTIFICATION_SETTINGS);

  const toggleNotification = (key: string, name: string) => {
    const isActive = !notifications.find(el => el.key === key).checkboxes.find(el => el.name === name).isActive;
    setNotifications(prev => prev.map(item => {
      if (item.key === key) {
        const checkboxes = item.checkboxes.map(checkbox => {
          if (checkbox.name === name) {
            return { ...checkbox, isLoading: true };
          }
          return checkbox;
        });
        return { ...item, checkboxes };
      }
      return item;
    }));
    saveNotifications({ variables: {
      [`${key}${capitalize(name)}`]: isActive
    } }).then(response => {
      if (response.data.setNotificationSettings.success) {
        setNotifications(prev => prev.map(item => {
          if (item.key === key) {
            const checkboxes = item.checkboxes.map(checkbox => {
              if (checkbox.name === name) {
                return { ...checkbox, isLoading: false, isActive };
              }
              return checkbox;
            });
            return { ...item, checkboxes };
          }
          return item;
        }));
      } else {
        console.error(response.data);
      }
    });
  };
  // useEffect(
  //   () => {
  //     console.log(indicatorRef);
  //     console.log(indicatorRef.current.offsetHeight);
  //     setElHeight(indicatorRef.current.offsetHeight);
  //   },
  //   [ indicatorRef ]
  // );
  //console.log(indicatorRef.current);
  return (
    <>
      {/* {signalsHelpText}
      {robotsHelpText} */}
      <div className={styles.container}>
        <div className={styles.regionTitle}>
          Notification Settings
        </div>
        <div className={styles.surface}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <div className={styles.columns}>
              {notifications.map((item) => (
                <Notify item={item} toggleNotification={toggleNotification} key={item.key} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const NotifySettings = memo(_NotifySettings);
