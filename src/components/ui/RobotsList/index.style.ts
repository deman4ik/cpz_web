import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 4,
    minHeight: 300,
    paddingTop: 10,
  },
  containerCart: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  cardTitleLogoContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#333B59'
  },
  cardTitleLogo: {
    width: 24,
    height: 24
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitleText: {
    textAlign: 'left',
    marginLeft: 8,
    fontSize: 20,
    color: '#fff'
  },
  colTitle: {
    flex: 0.15,
    color: '#6987B9',
    fontSize: 14,
    paddingLeft: 12,
  },
  colTitleVolume: {
    flex: 0.08,
    color: '#6987B9',
    fontSize: 14,
    paddingLeft: 8,
  },
  colTitlePerformance: {
    flex: 0.15,
    color: '#6987B9',
    fontSize: 14,
    paddingLeft: 8,
  },
  colTitleStatistics: {
    flex: 0.17,
    color: '#6987B9',
    fontSize: 14,
  },
  colTitleStatus: {
    flex: 0.12,
    color: '#6987B9',
    fontSize: 14,
  },
  primaryText: {
    color: '#fff',
    fontSize: 16
  },
  secondaryText: {
    color: '#6987B9',
    fontSize: 14
  },
});
