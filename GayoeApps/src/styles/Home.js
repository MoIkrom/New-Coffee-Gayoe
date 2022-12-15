import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 50,
    backgroundColor: 'black',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  bg: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    zIndex: 1,
    // opacity: 0.6,
  },

  content: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  startBtn: {
    alignItems: 'center',
    backgroundColor: '#6A4029',
    padding: 22,
    borderRadius: 10,
    justifyContent: 'center',
    zIndex: 1,
    marginHorizontal: 20,
    marginBottom: 17,
  },

  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#FFBA33',
    padding: 22,
    borderRadius: 10,
    justifyContent: 'center',
    zIndex: 1,
    marginHorizontal: 20,
    marginBottom: 54,
  },

  title: {
    color: 'white',
    fontSize: 65,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 100,
    // backgroundColor: '#000000c0',
    // flex: 1,
  },

  text: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    paddingHorizontal: 66,
    flex: 1,
  },

  textStart: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  textLogin: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default styles;
