import React, { useState } from 'react';
import { View } from 'react-native';

import { SearchInput } from '../SearchInput';
import { ScreenTypeProps } from '../../../services/Screen';
import { responsive } from '../../pages/SignalsSearchPage/index.style';

interface Props {
  setSignalsSearchValue: (text: string) => void;
  screenType: ScreenTypeProps;
  screenWidth: number;
  displayType: string;
}

export const SearchToolbar: React.FC<Props> = ({ setSignalsSearchValue, screenType, screenWidth, displayType }) => {
  const [ value, setValue ] = useState('');
  const maxTablet = screenType.maxTablet();

  const onSignalsSearch = text => {
    setSignalsSearchValue(text);
    setValue(text);
  };

  //(56 - 333 - 16): 56 - menu, 333 - input, 16 - left paddig
  //next 16 - right padding
  //const searchWidth = screenWidth < 530 ? screenWidth < 405 ? 173 : 233 : 333;
  //const searchWidth = screenWidth < 530 ? 233 : 333;
  const searchWidth = screenWidth < 520 ? 0 : 333;
  return (
    <View style={responsive.rowContainer(screenWidth)}>
      <SearchInput
        value={value}
        onChange={onSignalsSearch}
        screenWidth={screenWidth}
        placeholder={`Search ${displayType}...`} />
      { maxTablet && <View style={{ width: (screenWidth - 56 - searchWidth - 16) / 2 - 16 }} /> }
    </View>
  );
};
