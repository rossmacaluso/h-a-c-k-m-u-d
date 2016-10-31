function (context, a) { // i:1, to:"username", confirm:true
  // script to transfer amt to user number of times
  // num = number of times to try the transaction
  // amt = amount in GC to transfer
  // example usage: t2_send{ to:"username", amt:ALL||amt:1||amt:1GC, num:1, confirm:true||empty }
  var
    o = #s.scripts.lib(),
    i = 0,
    fs_u = [],
    fs_pages = [],
    fs_cmd = [],
    c_re = /with\s(\w+):"(\w+)"/gmi,
    u_re_01 = /(\s--\s)(\w+)/gmi,
    u_re_02 = /(\w+)\s(of)\s(project)/gmi;

  if ( a == null ){
    o.log( "Usage: t2_find{ t:#s.user.script }" );
    return { ok:false, output: o.get_log() }
  }
  else {
    try {
      fs_pages = a.t.call().split("\n").slice(-1)[0].split("|").map(function( tmp ){ return tmp.trim(); }); // get top level pages to use later
      // find cmd and directory given fs target, and init call
      fs_cmd = c_re.exec( a.t.call( {} ) )[1]; // finding target command
      c_re.lastIndex = 0; // reset regex index so we can call again, and get same result
      a[fs_cmd] = fs_pages[0]; // finding projects / usernames command
      var rLines = a.t.call( a ); // project/username output lines
      for ( i = 0; i < rLines.length; i++ ) {
        // o.log( "Return Line: " + rLines[i] );
        var tmp_u_01 = u_re_01.exec( rLines[i] );
        var tmp_u_02 = u_re_02.exec( rLines[i] );
        if ( tmp_u_01 != null ){
          //o.log ( "tmp_u_01: " + tmp_u_01 );
          tmp_u_01 = tmp_u_01[2];
          fs_u.push( tmp_u_01 );//if username match push to array
        }
        if ( tmp_u_02 != null ){
          //o.log ( "tmp_u_02: " + tmp_u_02 );
          tmp_u_02 = tmp_u_02[1];
          fs_u.push( tmp_u_02 );//if username match push to array
        }
      }
      if ( fs_u.length > 0 ) {
        for ( i = 0; i < fs_u.length; i++ ) {
          o.log ( "T2 Username: " + fs_u[i] );
        }
      }
    }
    catch( error ){
      o.log ( "user.script: " + a.t.name + " F T P: " + error );
    }
  }
  return { ok: true, output: o.get_log(), uFound: "UserNames Found: " + fs_u.length }
}
