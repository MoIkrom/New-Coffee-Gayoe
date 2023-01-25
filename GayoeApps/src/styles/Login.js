import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
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

  title: {
    color: 'white',
    fontSize: 65,
    fontWeight: 'bold',
    alignItems: 'center',
    paddingTop: 100,
    marginBottom: 180,
    marginLeft: 20,
  },

  forgot: {
    color: 'white',
    marginVertical: 10,
    marginLeft: 20,
  },

  createBtn: {
    alignItems: 'center',
    backgroundColor: '#FFBA33',
    padding: 22,
    borderRadius: 10,
    justifyContent: 'center',
    zIndex: 1,
    marginHorizontal: 20,
    marginBottom: 17,
    marginTop: 40,
  },

  textCreate: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },

  googleContainer: {
    flexDirection: 'row',
  },

  googleBtn: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    justifyContent: 'center',
    zIndex: 1,
    marginHorizontal: 20,
    marginBottom: 17,
  },

  textGoogle: {
    color: 'black',
    fontSize: 17,
    paddingLeft: 12,
  },

  btnLoading: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    // padding: 20,
    // borderRadius: 10,
    justifyContent: 'center',
    // marginHorizontal: 31,
    // marginTop: 25,
    // fontSize: 17,
  },

  wrapperPwd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  // iconPwd: {
  //   color: '#fff',
  //   fontSize: 20,
  // },
  iconPwd: {
    color: '#fff',
    fontSize: 20,
    width: 30,
    height: 20,
    position: 'relative',
    left: -10,
  },

  inputPwd: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    paddingBottom: 10,
  },
  inputs: {
    flex: 1,
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    borderBottomWidth: 2,
    borderColor: `#ffffff`,
    borderWidth: 0,
    height: 40,
    marginRight: 21,
    marginLeft: 21,
    marginTop: 10,
    outlineWidth: 4,
    padding: 5,
    color: 'white',
    marginBottom: 10,
  },
});

export default style;
