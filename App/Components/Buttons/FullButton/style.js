import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes/'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: Metrics.section,
    backgroundColor: Colors.bloodOrange
  },
  text: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.snow
  }
})
