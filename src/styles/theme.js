export const colors = {
  black: '#333333',
  white: '#ffffff',
  main: '#FA8D62',
  lightBlue: '#E4FAF7',
  blue: '#C4F0E5',
  line: '#bfbfbf'
}

export const shadow = {
  shadowOffset: { height: 2, width: 0 },
  shadowColor: 'black',
  shadowOpacity: 0.4 
}

export const text = {
  lightWeight: 'lighter',
  normalWeight: 'normal',
  boldWeight: '500',
  bolderWeight: 'bold'
};

export const button = {
  default: {
    ...shadow,
    backgroundColor: colors.main,
    paddingHorizontal: 12,
    paddingVertical: 12
  }
};

export const border = {
  width: 0.5,
  color: colors.line
};

export const divider = {
  height: 0.5,
  backgroundColor: colors.line
};
