import {Dimensions, Platform} from 'react-native'

let Sizes = {};

let { width, height } = Dimensions.get('window');

// functions
Sizes._rangesOf = (base) => ({
  base,
  half: base/2,
  third: base/3,
  forth: base/4,
  base1: base*1.1,
  base2: base*1.2,
  base3: base*1.3,
  base4: base*1.4,
  base5: base*1.5,
  base6: base*1.6,
  base7: base*1.7,
  base8: base*1.8,
  base9: base*1.9,
  double: base*2,
  triple: base*3,
  quad: base*4,
});

// constants
Sizes.margin = Sizes._rangesOf(8);
Sizes.padding = Sizes._rangesOf(8);
Sizes.font = Sizes._rangesOf(14);
Sizes.icons = Sizes._rangesOf(28);

Sizes.screenWidth = width;
Sizes.screenHeight = height;

export default Sizes;
