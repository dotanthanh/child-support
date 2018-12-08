import { Dimensions } from 'react-native';

import { text } from './theme';

export const container = {
  screenContainerMenu: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 48,
    backgroundColor: 'white'
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  screenContent: {
    width: '100%'
  }
};

export const header = {
  container: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    height: 70
  },
  centerComponent: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
};

export const subSection = {
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48
  },
  headerText: {
    fontWeight: text.boldWeight
  }
};

// current version of the library not center the icon
export const iconButton = {
  marginRight: 0
};
