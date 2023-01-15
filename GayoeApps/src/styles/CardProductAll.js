import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  card: {
    marginTop: 50,
    position: 'relative',
    backgroundColor: 'white',
    width: 150,
    height: 220,
    shadowColor: '#3939391A',
    elevation: 1,
    borderRadius: 30,
    // marginHorizontal: 20,
  },
  imageCard: {
    width: 100,
    height: 100,
    borderRadius: 20,
    // shadowOpacity: 10
  },
  containerImage: {
    position: 'relative',
    left: 25,
    top: -25,
  },
  containerTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
  },
  cardTitle: {
    // fontFamily: "Poppins-Bold",
    fontWeight: 'bold',
    fontSize: 21,
    color: 'black',
    textAlign: 'center',
    width: '80%',
    lineHeight: 22.29,
  },
  cardPrice: {
    // fontFamily: "Poppins-Bold",
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6A4029',
  },
});

export default styles;
