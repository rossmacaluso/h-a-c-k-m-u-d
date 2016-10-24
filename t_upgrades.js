function (context, a) { // i:1, to:"username", confirm:true
  // attempt at creating a fullsec t1 location finder, queries fullSec entries, compares them to known trusted username.scripts
  // returns compiled list of valid locations
  // i = index can be a number, list or ALL|all and will transfer the requested upgrades to specified user
  var
    o = #s.scripts.lib(),
    upg_i = a.i,
    upgr_to = a.to,
    c = a.confirm,
    i_re = /all/gmi,
    upgrade = "",
    result = "",
    loaded = true,
    k = {},
    su = #s.sys.upgrades();

  o.log( "System Upgrades: " + su.length );
  o.log( "indexList Length: " + upg_i.length );

  if ( i_re.test( upg_i ) == true ) {
    if ( upgr_to != undefined ) {
      o.log( "Transfering All Upgrades! To: " + upgr_to );
      if ( !( "confirm" in a ) ) {
        o.log( "add {confirm:true} To Confirm" );
      }
      else {
        if ( a.confirm == true ) {
          upgrade = #s.sys.upgrades( { info:upg_i } );
          loaded = upgrade["loaded"];
          #s.sys.upgrades( { unload:upg_i } );
          k.i = upg_i;
          k.to = upgr_to;
          #s.sys.xfer_upgrade_to( k );
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

  else if ( upg_i.length >= 1 ) {
    if ( upgr_to != undefined ) {
      for ( var ai = 0; ai < upg_i.length; ai++ ) {
        upgrade = #s.sys.upgrades( { info:upg_i[ai] } );
        o.log( "Transfering Upgrade: " + upgrade["name"] + " To: " + upgr_to );
      }
      if ( !( "confirm" in a ) ) {
        o.log( "add {confirm:true} To Confirm" );
      }
      else {
        if ( a.confirm == true ) {
          for ( var bi = 0; bi < upg_i.length; bi++ ) {
            upgrade = #s.sys.upgrades( { info:upg_i[bi] } );
            loaded = upgrade["loaded"];
            if ( loaded == true ) {
              #s.sys.upgrades( { unload:upg_i[bi] } );
            }
          }
          k.i = upg_i;
          k.to = upgr_to;
          #s.sys.xfer_upgrade_to( k );
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

  else if ( typeof(upg_i) == "number" ) {
    if ( upgr_to != undefined ) {
      upgrade = #s.sys.upgrades( { info:upg_i } );
      o.log( "Transfering Upgrade: " + upgrade["name"] + " To: " + upgr_to );
      if ( !( "confirm" in a ) ) {
        o.log( "add {confirm:true} To Confirm" );
      }
      else {
        if ( a.confirm == true ) {
          loaded = upgrade["loaded"];
          o.log( "Loaded: " + loaded );
          if ( loaded == true ) {
            #s.sys.upgrades( { unload:upg_i } );
          }
          k.i = upg_i;
          k.to = upgr_to;
          #s.sys.xfer_upgrade_to( k );
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
