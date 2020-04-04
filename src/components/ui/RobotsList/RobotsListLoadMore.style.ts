import { StyleSheet } from 'react-native';
import { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { Style } from '../../../services';
import { vars } from '../../../styles';

export const styles = StyleSheet.create({
  btn: {
    backgroundColor: vars.color.rgba.dark,
    borderColor: '#6987B9',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    width: 108,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryText: {
    color: '#6987B9',
    fontSize: 14
  },
  activityIndicator: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  }
});

export const responsive = {
  btnPosition: (isDesktopView: boolean): StyleObj => (
    Style.conditions({
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10
    }, [
      {
        if: isDesktopView,
        then: { marginTop: 18 }
      }
    ])
  ),
};
