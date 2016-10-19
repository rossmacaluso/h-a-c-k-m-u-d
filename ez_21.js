
function ( context, a ) {
  // ---------------------
  // EZ_21 lock
  // 10.16.2016
  // by: Ross Macaluso
  // ---------------------
  //#TODO fix loop, fix regex on unlock > proceed to next lock
  var
    f = [],
    i = 0,
    k = {},
    l = [ 'open', 'unlock', 'release' ],
    p = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ],
    c = [ "red", "blue", "cyan", "green", "lime", "orange", "purple", "yellow" ],
    o = #s.scripts.lib(),
    r = "",
    rm = [],
    er = /E\w{4}/g,
    ur = /U\w{7}/g,
    s = false,
    sl = 4,
    t = a.t,
    tm = [],
    tr = /EZ\w{3}|c\d{3}/g,
    ter = /EZ\w{3}|c\d{3}.*?(EZ\w{3}|c\d{3})/g,
    ;

    //check security level ( can comment out if need chars )
    sl = #s.scripts.get_level({ name:t.name });
    if ( sl < 4 ) {
      return {
        ok:false,
        msg:"SL < 4",
        sl:"SL: " + sl
      }
    }

  function ca ( k ) {
    r = t.call( k );
    o.log( "r: " + r );
    if ( ur.test( r ) && !er.test( r ) ) {
      s = true;
    }
    if ( er.test( r ) && !ur.test( r ) ) {
      tm = tr.exec( r );
      s = false;
    }
    return { s }
  }

  ca( k ); // inital arg call

  // do {
    // test EZ_Locks
  if ( STRING(tm).includes( "E" ) ) {
    o.log( "LOCK: " + tm );
    for ( i = 0; i < 3; i++ ) {
      k[ tm ] = l[ i ];
      ca( k );
    }
    if ( /digit/.test( r ) ) {
      for ( i = 0; i <= 10; i++ ) {
        k.digit = i;
        ca( k );
      }
    }
    if ( /prime/.test( r ) ) {
      for ( i = 0; i <= p.length; i++ ) {
        k.ez_prime = p[i];
        ca( k );
      }
    }
  }
    // if ( STRING(tm).includes( "c00" ) ) {
    //   for ( i = 0; i <= c.length; i++ ) {
    //     k[tm] = c[i];
    //     ca( k );
    //   }
    // }
  // }
  // while ( !s );

  return {
    ok: s,
    output: o.get_log(),
    args: k
  }
}
