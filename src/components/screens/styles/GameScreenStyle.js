import { Colors, Sizes } from '../../../constants';

let Styles = {};

Styles.container = {
  flex: 1,
  backgroundColor: Colors.background,
  alignItems: 'center',
  justifyContent: 'center',
};

Styles.text = {
  color: Colors.text,
  fontSize: Sizes.font.base,
  margin: Sizes.margin.double
}

export default Styles;
