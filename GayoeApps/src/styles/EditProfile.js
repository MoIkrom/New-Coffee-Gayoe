import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    borderRadius: 200,
    width: 150,
    height: 150,
  },
  img_bar: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    position: 'relative',
  },
  pencil_bar: {
    alignItems: 'center',
    backgroundColor: '#6A4029',
    borderRadius: 50,
    bottom: 0,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 50,
  },
  label: {
    color: 'black',
    fontWeight: '700',
    fontSize: 13,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 17,
    borderBottomColor: '#9F9F9F',
    fontFamily: 'Poppins',
    color: 'black',
    maxWidth: '100%',
    height: 50,
  },
  Text_input: {
    paddingTop: 13,
    borderBottomWidth: 1,
    fontSize: 17,
    borderBottomColor: '#9F9F9F',
    fontFamily: 'Poppins',
    color: 'black',
    maxWidth: '100%',
    height: 50,
  },
  form: {
    textAlign: 'left',
    width: '80%',
  },
  radio_bar: {
    marginTop: 10,
  },
  input_bar: {
    marginTop: 10,
    marginBottom: 20,
  },
  gender: {
    fontSize: 17,
    fontFamily: 'Poppins',
    color: 'black',
    maxWidth: '100%',
  },
  two_btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default styles;
