function (context, a) {
  //attempt at creating a script to parse incremental line by line text from a readout
  // usage: f_projects{ t:#s.script.name, k1:key, v1:value }
  var
    t = a.t,
    k = a.k,
    v = a.v,
    o = #s.scripts.lib(),
    a = {},
    pm = [ /date for(\s\w+)/g, /Look for(\s\w+)/g, /project(\s\w+)/g, /developments on(\s\w+)/g, /continues on(\s\w+)/g ],
    pml = [],
    i = "",
    tx = [],
    m = [];

  a[k] = v;
  tx = t.call( a );

  for ( i=0; i<5; i++ ) {
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
