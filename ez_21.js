
function ( context, a ) {
  // ---------------------
  // EZ_21 lock
  // 10.16.2016
  // by: Ross Macaluso
  // ---------------------
  var
    f = [],
    i = 0,
    k = {},
    l = [ 'open', 'unlock', 'release' ],
    o = #s.scripts.lib(),
    r = "",
    rm = [],
    er = /E\w{4}/g,
    ur = /U\w{7}/g,
    s = false,
    t = a.t,
    tm = [],
    tr = /EZ\w{3}|c\d{3}/g;

  function ca ( k ) {
    r = t.call( k );
    o.log( "r: " + r );
    if ( ur.test( r ) && !er.test( r ) ) {
      s = true;
      return { s }
    }
    if ( er.test( r ) ) {
      tm = tr.exec( r );
      s = false;
      return { s }
    }
  }

  // check security level ( can comment out if need chars )
  // if(#s.scripts.get_level({name:t.name}) < 4) {
  //   return{ok:false, msg:"Security Below FullSec"};
  // }

  ca( k ); // inital arg call

  do {
    // test EZ_Locks
    if ( STRING(tm).includes( "E" ) ) {
      o.log( "Trying Lock: " + tm );
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
    }
    // break for now on other lock types
    else {
      // o.log( "F: " + tm );
      s = true;
      break;
    }
    // if ( STRING(tm).includes( "c00" ) ) { }
  }
  while ( !s );

  return {
    ok: s,
    output: o.get_log(),
    args: k
  }
}
