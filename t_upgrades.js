function (context, a) { // i:1, to:"username", confirm:true
  // attempt at creating a fullsec t1 location finder, queries fullSec entries, compares them to known trusted username.scripts
  // returns compiled list of valid locations
  // i = index can be a number, list or ALL|all and will transfer the requested upgrades to specified user
  var
    o = #s.scripts.lib(),
    i = a.i,
    to = a.to,
    c = a.confirm,
    i_re = /all/gmi,
    upgrade = "",
    result = "",
    loaded = true,
    su = #s.sys.upgrades();

  o.log( "System Upgrades: " + su.length );
  //o.log( "indexList Length: " + typeof(i) );

  if ( i_re.test( i ) == true ) {
    if ( to != undefined ) {
      o.log( "Transfering All Upgrades! To: " + to );
      for ( var sui = 0; sui < su.length; sui++ ) {
        upgrade = #s.sys.upgrades( { info:sui } );
      }
      if ( !( "confirm" in a ) ) {
        o.log( "add {confirm:true} To Confirm" );
      }
      else {
        if ( a.confirm == true ) {
          loaded = upgrade["loaded"];
          o.log( "Loaded: " + loaded );
          if ( loaded == true ){
            #s.sys.upgrades( { unload:sui } );
          }
          result = #s.sys.xfer_upgrades_to( { i:sui, to:to } );
          if ( "Failure" in result ){
            o.log( "Can't Transfer Upgrade: " + result );
          }
        }
        else {
          o.log( "confirm != true")
        }
      }
    }
    else {
      o.log( "Please Add {to:username}" );
    }
  }

  else if ( i.length > 1 ) {
    if ( to != undefined ) {
      for ( var ui = 0; ui < i.length; ui++ ) {
        upgrade = #s.sys.upgrades( { info:ui } );
        o.log( "Transfering Upgrade: " + upgrade["name"] + " To: " + to );
        if ( !( "confirm" in a ) ) {
          o.log( "add {confirm:true} To Confirm" );
        }
        else {
          if ( a.confirm == true ) {
            loaded = upgrade["loaded"];
            if ( loaded == true ) {
              #s.sys.upgrades( { unload:ui } );
            }
            result = #s.sys.xfer_upgrades_to( { i:ui, to:to } );
            if ( "Failure" in result ){
              o.log( "Can't Transfer Upgrade: " + result );
            }
          }
          else {
            o.log( "confirm != true")
          }
        }
      }
    }
    else {
      o.log( "Please Add {to:username}" );
    }
  }

  else if ( typeof(i) == "number" ) {
    if ( to != undefined ) {
      upgrade = #s.sys.upgrades( { info:i } );
      o.log( "Transfering Upgrade: " + upgrade["name"] + " To: " + to );
      if ( !( "confirm" in a ) ) {
        o.log( "add {confirm:true} To Confirm" );
      }
      else {
        if ( a.confirm == true ) {
          loaded = upgrade["loaded"];
          o.log( "Loaded: " + loaded );
          if ( loaded == true ) {
            #s.sys.upgrades( { unload:i } );
          }
          result = #s.sys.xfer_upgrades_to( { i:i, to:to } );
          if ( "Failure" in result ){
            o.log( "Can't Transfer Upgrade: " + result );
          }
        }
        else {
          o.log( "confirm != true")
        }
      }
    }
    else {
      o.log( "Please Add {to:username}" );
    }
  }

  return { ok: true, output: o.get_log(), args: a  }
}
