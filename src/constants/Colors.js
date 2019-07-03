let Colors = {};

// functions
Colors.rgba = (r,g,b,a) => 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
Colors.rgb = (r,g,b) => Colors.rgba(r,g,b, 1);
Colors.grey = (v) => Colors.rgb(v,v,v);
Colors.greya = (v,a) => Colors.rgba(v,v,v,a);

// constants
Colors.primary = Colors.rgb(80, 132, 232);
Colors.secondary = Colors.rgb(220, 172, 122);
Colors.success = Colors.rgb(12, 212, 22);
Colors.danger = Colors.rgb(220, 12, 12);
Colors.active = Colors.rgb(45, 52, 222);
Colors.light = Colors.rgb(242, 242, 252);
Colors.dark = Colors.rgb(10, 22, 22);

// variables
Colors.text = Colors.light;
Colors.background = Colors.dark;

export default Colors;
