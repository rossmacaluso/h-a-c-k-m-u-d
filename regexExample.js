var tx = "HALPERYON SYSTEMS internal development team has announced the release date for tkxkl8nyin. Look for 0iijs82nc in your mailbox.,2060AD D130, release date for tkxal8nyin";
var pm = [ /release date for(\s\w+)/g, /Look for(\s\w+)/g, /project(\s\w+)/g  ]
// var pm1 = /release date for(\s\w+)/g;
var pml = [];
var m = [];
// var p1m = /release date for(\s\w+)/g;
// var p2m = /Look for(\s\w+)/g;
// var p3m = /project(\s\w+)/g;

// for ( i=0; i<3; i++ ) {
//   m = tx.match( pm[i] );
//   if ( m != [] ) {
//     pml.push ( m );
//   }
// }
for ( i=0; i<3; i++ ) {
  do {
    m = pm[i].exec( tx )
    if ( m != [] && m != null ) {
      m = m[1];
      pml.push ( m );
    }
  }
  while ( m != null );
}



console.log( pml )
