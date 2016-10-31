function (context, a) { // i:1, to:"username", confirm:true
  // script to transfer upgrades by index or all to a username
  // i = index can be an integer, list or ALL|all and will transfer the requested upgrades to specified user
  // example usage: t_upgrades{ to:"username", i:ALL||i:1||i:[1,2], confirm:true||empty }
  var
    o = #s.scripts.lib(),
    upgr_i = a.i,
    upgr_to = a.to,
    c = a.confirm,
    i_re = /all/gmi,
    upgrade = "",
    result = "",
    loaded = true,
    k = {},
    su = #s.sys.upgrades();

  o.log( "System Upgrades: " + su.length );
  //o.log( "indexList Length: " + upgr_i.length );

  if ( !( "to" in a ) ) {
    o.log( "Please Add {to:username}" );
    return { ok:false, output: o.get_log() }
  }
  if ( !( "confirm" in a ) ) {
    o.log( "add {confirm:true} To Confirm" );
  }

  if ( a == null ){
    o.log( "Usage: t_upgrades{ to:username, i:ALL||i:1||i:[1,2], confirm:true||empty }" );
    return { ok:false, output: o.get_log() }
  }
  else {
    xfer_upgr ( upgr_to, upgr_i, c );
  }

  function xfer_upgr ( upgr_to, upgr_i, c ) {
    upgrade = #s.sys.upgrades( { info:upgr_i } );
    if ( i_re.test( upgr_i ) == true ) {
      o.log( "Transfering All Upgrades" + " To: " + upgr_to );
    }
    else if ( upgr_i.length > 1 ) {
      for ( var i = 0; i < upgr_i.length; i++ ) {
        upgrade = #s.sys.upgrades( { info:upgr_i[i] } );
        o.log( "Transfering Upgrade: " + upgrade["name"] + " To: " + upgr_to );
      }
    }
    else {
      o.log( "Transfering Upgrade: " + upgrade["name"] + " To: " + upgr_to );
    }
    if ( c ) {
      loaded = upgrade["loaded"];
      o.log( "Loaded: " + loaded );
      if ( loaded == true ) {
        #s.sys.upgrades( { unload:upgr_i } );
      }
      k.i = upgr_i;
      k.to = upgr_to;
      #s.sys.xfer_upgrade_to( k );
    }
    else {
      o.log( "confirm != true")
    }
  }

  return { ok: true, output: o.get_log(), args: a }
}
