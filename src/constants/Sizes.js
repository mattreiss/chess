let Sizes = {};

// functions
Sizes._rangesOf = (base) => ({
  base,
  half: base/2,
  third: base/3,
  forth: base/4,
  double: base*2,
  triple: base*3,
  quad: base*4
});

// constants
Sizes.margin = Sizes._rangesOf(8);
Sizes.font = Sizes._rangesOf(12);

export default Sizes;
