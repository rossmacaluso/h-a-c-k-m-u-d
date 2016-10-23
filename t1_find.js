function (context, a) { // {}
  // attempt at creating a fullsec t1 location finder, queries fullSec entries, compares them to known trusted username.scripts
  // returns compiled list of valid locations
  var
    wl = [ "soylentbean", "weyland", "halperyon", "setec_gas", "bunnybat_hut", "suborbital_airlines", "ros13" ],
    ws = [ "pub_info", "external", "pub", "extern", "entry" ],
    c_re = /with\s(\w+)/,
    fs = [],
    i = 0,
    o = #s.scripts.lib(),
    t,
    pm = [ /date for(\s\w+)/g, /Look for(\s\w+)/g, /project(\s\w+)/g, /developments on(\s\w+)/g, /continues on(\s\w+)/g ],
    pml = [],
    fs_nl = [],
    fsName = '',
    fs_pages = [],
    fs_pass = [],
    fs_cmd = [],
    tx = [],
    m = [];

  if ( a == null ) {
    fs = #s.scripts.fullsec();
    for ( var wli = 0; wli < wl.length; wli++ ) {
      for ( var wsi = 0; wsi < ws.length; wsi++ ) {
        fsName = wl[ wli ] + '.' + ws[ wsi ];
        if ( fs.includes( fsName ) ) {
          fs_nl.push( fsName );
        }
      }
    }
    return { safeTargets:fs_nl }
  }
  if ( a != null ) {
    o.log ( "target: " + a.t );
    fs_pages = a.t.call().split("\n").slice(-1)[0].split("|").map(function(tmp){ return tmp.trim(); });
    fs_cmd = c_re.exec( a.t.call( {} ) )[1];
    o.log ( "Pages: " + fs_pages );
    o.log ( "Command: " + fs_cmd );

  }

  // else {
  //   t = a.t;
  // }


      // fs_pages = tmpFunc.call().split("\n").slice(-1)[0].split("|").trim();
      // o.log ( "Pages: " + fs_pages );

  // a[k] = v;
  // tx = t.call( a );
  //
  // for ( i = 0; i < 5; i++ ) {
  //   do {
  //     m = pm[i].exec( tx )
  //     if ( m != [] && m != null ) {
  //       m = m[1];
  //       pml.push( m );
  //       o.log ( m );
  //     }
  //   }
  //   while ( m != null );
  // }
  return { ok: true, output: o.get_log(), found: "projects found: " + pml.length, args: a  }
}
