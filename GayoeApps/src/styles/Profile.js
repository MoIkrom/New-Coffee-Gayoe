import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingTop: 40,
    paddingBottom: 10,
  },
  titleContent: {
    fontFamily: 'Poppins-ExtraBold',
    fontWeight: 'bold',
    fontSize: 34,
    color: '#000',
    marginTop: 30,
  },
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  icons: {
    position: 'relative',
    left: -20,
  },
  textInfo: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  btnEdit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A4029',
  },
  wrapperProfile: {
    width: 350,
    height: 150,
    borderRadius: 30,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#393939',
    // elevation: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentImage: {
    marginRight: 20,
  },
  btn: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    height: 60,
    marginBottom: 27,
  },
  btnSave: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 70,
    marginBottom: 27,
    backgroundColor: '#6A4029',
  },
  address: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 15,
    color: '#6A4029',
    width: 160,
    // height: 50,
    lineHeight: 30,
    borderBottomWidth: 0.5,
    width: 160,
    borderBottomColor: '#6A4029',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  contbtnedit: {
    display: 'flex',
    flexDirection: 'row',
  },
  contname: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontFamily: 'Poppins-ExtraBold',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
    width: 160,
    position: 'relative',
    top: -5,
  },
  textEmail: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 15,
    color: '#6A4029',
    width: 160,
    lineHeight: 30,
    borderBottomWidth: 0.5,
    width: 160,
    borderBottomColor: '#6A4029',
  },

  textPhone: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 15,
    color: '#6A4029',
    width: 160,
    lineHeight: 30,
    borderBottomWidth: 0.5,
    width: 160,
    borderBottomColor: '#6A4029',
  },
});

export default styles;
