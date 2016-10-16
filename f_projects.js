//attempt at creating a script to parse incremental line by line text from a readout
function (context, args) {
  var
    target = args.t,
    k1 = args.k,
    v1 = args.v,
    o = #s.scripts.lib(),
    a = {},
    cc = args.cc,
    pm = [ /release date for(\s\w+)/g, /Look for(\s\w+)/g, /project(\s\w+)/g, /new developments on(\s\w+)/g, /Work continues on(\s\w+)/g ],
    pml = [],
    m = [];

  a[k1] = v1;
  var tx = target.call( a );

  for ( var i=0; i<5; i++ ) {
    do {
      m = pm[i].exec( tx )
      if ( m != [] && m != null ) {
        m = m[1];
        pml.push( m );
        o.log ( m );
      }
    }
    while ( m != null );
  }

  return { ok: true, output: o.get_log(), debug: "input str len: " + tx.length + "    " + "projects found: " + pml.length  }
}
