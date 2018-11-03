import { Dimensions } from 'react-native';

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

const styles = {
  container,
  header
}

export default styles;
