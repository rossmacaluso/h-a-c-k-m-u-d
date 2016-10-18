// EZ_21 lock
// 10.16.2016
// by: Ross Macaluso

function (context, a) {
  var
    f = [],
    i = 0,
    k = {},
    l = [ 'open', 'unlock', 'release' ],
    o = #s.scripts.lib(),
    r = "",
    rm = [],
    rr = /L\w*/g,
    s = false,
    t = a.t,
    tm = [],
    tr = /EZ\w{3}|c\d{3}/g;

  function ca ( k ) {
    r = t.call( k );
    rm = rr.exec( r );
    o.log( "r: " + r );
    if ( r.includes ( "UNLOCKED" ) ) {
      s = true;
      return { s }
    }
    f.push( r, rm );
    return { f }
  }

  // check security level ( can comment out if need chars )
  // if(#s.scripts.get_level({name:t.name}) < 4) {
  //   return{ok:false, msg:"Security Below FullSec"};
  // }
  ca( k ); // inital arg call

  do {
    r = f[0];
    rm = f[1];
    tm = tr.exec( r );
    // o.log( "tm: " + tm );

    // test EZ_21
    // if ( STRING(tm).includes( "E" ) )
    if ( tm == "EZ_21" ) {
      for ( i = 0; i < 3; i++ ) {
        k[ tm ] = l[ i ];
        ca( k );
        //o.log( "rm: " + rm );
        if ( s == true ){
          break;
        }
      }
    }
    // break for now on other lock types
    else {
      s = true;
      // o.log ( "F: " + tm );
      break;
    }
    // if ( tm === "EZ_35" ) {
    //   break;
    // }
    // if ( tm === "EZ_40" ) {
    //   break;
    // }
    // if ( tm === "c001" ) {
    //   break;
    // }
    // if ( tm === "c002" ) {
    //   break;
    // }
    // if ( tm === "c003" ) {
    //   break;
    // }
  }
  while ( !s );
  return {
    ok: s,
    output: o.get_log(),
    args: k
  }
}
