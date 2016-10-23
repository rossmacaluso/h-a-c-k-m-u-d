
function ( context, a ) {
  // ---------------------
  // T1 lock Unlock
  // 10.16.2016
  // by: Ross Macaluso
  // ---------------------
  //#TODO slim the code down: chars: 1646 with security check
  var
    cd = /color_digit/,
    cT = /c\d{2}3\wtr\w{5}/,
    cT_s = "",
    f = [],
    i = 0,
    ir = 0,
    k = {},
    l = [ 'open', 'unlock', 'release' ],
    p = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ],
    c = [ "red", "blue", "cyan", "green", "lime", "orange", "purple", "yellow" ],
    o = #s.scripts.lib(),
    r = "",
    rm = [],
    dr = /De\w{4}/g,
    ur = /UNLOCKED/g,
    er = /ERROR/g,
    s = false,
    sl = 4,
    t = a.t,
    rLines = [],
    tm = [],
    tr = /EZ_\d{2}|c\d{3}/g;

    // check security level ( can comment out if need chars )
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
    rLines = r.split( "\n" );
    for ( ir = 0; ir < rLines.length; ir++ ) {
      o.log( "Return Line: " + rLines[ir] );
      if ( ur.test( rLines[ir] ) ) {
        o.log( "SUCCESS: " + tm );
        s = true;
        ur.lastIndex = 0;
      }
      if ( dr.test( rLines[ir] ) ) {
        tm = tr.exec( rLines[ir] );
        o.log( "FAILED: " + tm );
        s = false;
        tr.lastIndex = 0;
      }
      if ( er.test( rLines[ir] ) ) {
        s = false;
        er.lastIndex = 0;
      }
    }
  }

  ca( k ); // inital arg call

  do {
    // test EZ_## Locks
    if ( STRING(tm).includes( "E" ) ) {
      for ( i = 0; i < l.length; i++ ) {
        k[ tm ] = l[ i ];
        ca( k );
        if ( s || /digit/.test( r ) || /prime/.test( r ) == true )  {
          break;
        }
      }
      if ( /digit/.test( r ) ) {
        for ( i = 0; i < 10; i++ ) {
          k.digit = i ;
          ca( k );
          if ( s || dr.test( r ) == true )  {
            break;
          }
        }
      }
      if ( /prime/.test( r ) ) {
        for ( i = 0; i < p.length; i++ ) {
          k.ez_prime = p[ i ];
          ca( k );
          if ( s || dr.test( r ) == true )  {
            break;
          }
        }
      }
    }
    // test c00# Locks
    if ( STRING(tm).includes( "c00" ) ) {
      // define c00 lock specific vars
      var cC_s = tm + "_complement";
      var cC = new RegExp( cC_s );
      // -----------------------------
      for ( i = 0; i < c.length; i++ ) {
        k[tm] = c[i];
        ca( k );
        if ( s || cd.test( r ) || cC.test( r ) || cT.test( r )  == true )  {
          break;
        }
      }
      if ( cd.test( r ) ) {
        for ( i = 0; i < c.length; i++ ) {
          k.color_digit = i;
          ca( k );
          if ( s || dr.test( r ) == true )  {
            break;
          }
        }
      }
      if ( cC.test( r ) ) {
        for ( i = 0; i < c.length; i++ ) {
          k[ cC_s ] = c[ i ];
          ca( k );
          if ( s || dr.test( r ) == true )  {
            break;
          }
        }
      }
      if ( cT.test( r ) ) {
        cT_s = cT.exec( r );
        for ( i = 0; i < c.length; i++ ) {
          k[ cT_s ] = c[ i ];
          ca( k );
          if ( s || dr.test( r ) || cT.test( r )  == true )  {
            break;
          }
        }
      }
    }


  }
  while ( !s );

  return {
    ok: s,
    output: o.get_log(),
    args: k
  }
}
