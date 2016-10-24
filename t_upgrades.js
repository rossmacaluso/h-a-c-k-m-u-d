function (context, a) { // {}
  // attempt at creating a fullsec t1 location finder, queries fullSec entries, compares them to known trusted username.scripts
  // returns compiled list of valid locations
  var
    su = #s.sys.upgrades;

  o.log( "System Upgrades: " + su )


  return { ok: true, output: o.get_log(), args: a  }

}
