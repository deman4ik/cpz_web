import React, { memo, useState, Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { GET_USER_INFO } from '../../../../graphql/user/queries';
import { SET_NOTIFICATION_SETTINGS } from '../../../../graphql/user/mutations';
//import { useTooltip } from '../../../../hooks/useTooltip';
import { capitalize } from '../../../../config/utils';
//import { Checkbox } from '../../../basic/Checkbox';
//import { vars } from '../../../../styles';
//import { responsive } from '../UseContainer.style';
import { extraSettings, serviceName } from './helpers';
//import { styles as _styles, responsive as _responsive } from './index.style';
import { NotificationProps } from './types';

const _NotifySettings: React.FC = () => {
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
        checkboxes: Object.keys(_notifications[key]).filter(name => name !== 'email').map(name => ({
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

  return (
    <>
      {/* {signalsHelpText}
      {robotsHelpText} */}
      <div className={_styles.container}>
        <div className={responsive.regionTitle(screenType)}>
          Notification Settings
        </div>
        <div className={_styles.surface}>
          {loading ? (
            <div className={_styles.loadingContainer}>
              <ActivityIndicator size='large' color={vars.color.accent} />
            </div>
          ) : (
            <div className={_styles.columns}>
              {notifications.map((notification, index) => (
                <Fragment key={notification.key}>
                  <div className={_styles.column}>
                    <div className={_styles.titleRow}>
                      <IconButton
                        icon={notification.icon}
                        size={24}
                        color={vars.color.accent}
                      />
                      <div className={_styles.titleText}>
                        {t(notification.title)}
                      </div>
                      {/* {renderHelpButton(notification.key)} */}
                    </div>
                    {notification.checkboxes.map(checkbox => (
                      // <Checkbox
                      //   key={`${notification.key}.${checkbox.name}`}
                      //   color={vars.color.primary}
                      //   uncheckedColor={vars.color.white}
                      //   label={t(capitalize(checkbox.name))}
                      //   labelStyle={_styles.label}
                      //   isActive={checkbox.isActive}
                      //   disabled={checkbox.disabled}
                      //   isLoading={checkbox.isLoading}
                      //   onPress={() => toggleNotification(notification.key, checkbox.name)}
                      // />
                    ))}
                  </div>
                  {index < notifications.length - 1 && (
                    <div className={_responsive.separator(screenType)} />
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const NotifySettings = memo(_NotifySettings);
