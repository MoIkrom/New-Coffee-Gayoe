import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 100,
    marginBottom: 150,
  },

  createBtn: {
    alignItems: 'center',
    backgroundColor: '#6A4029',
    padding: 22,
    borderRadius: 10,
    justifyContent: 'center',
    zIndex: 1,
    marginHorizontal: 20,
    marginBottom: 17,
    marginTop: 40,
  },

  textCreate: {
    color: 'white',
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
  iconPwd: {
    color: '#fff',
    fontSize: 20,
  },
  inputPwd: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    paddingBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: `#9F9F9F`,
    borderWidth: 0,
    fontFamily: 'Poppins',
    fontSize: 14,
    height: 40,
    margin: 12,
    outlineWidth: 4,
    padding: 10,
    width: `90%`,
    color: 'white',
  },

  input1: {
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
    marginBottom: 90,
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

export default styles;
