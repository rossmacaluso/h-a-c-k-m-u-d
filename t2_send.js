function (context, a) { // i:1, to:"username", confirm:true
  // script to transfer amt to user number of times
  // num = number of times to try the transaction
  // amt = amount in GC to transfer
  // example usage: t2_send{ to:"username", amt:ALL||amt:1||amt:1GC, num:1, confirm:true||empty }
  var
    o = #s.scripts.lib(),
    i_re = /all/gmi;

  if ( a == null ){
    o.log( "Usage: t2_send{ to:username, amt:ALL||amt:1||amt:1GC, num:1, confirm:true||empty }" );
    return { ok:false, output: o.get_log() }
  }
  else {
    var
      num = a.num,
      amt = a.amt,
      c = a.confirm,
      to = a.to;

    if ( !( "to" in a ) ) {
      o.log( "Please Add {to:username}" );
      return { ok:false, output: o.get_log() }
    }
    if ( i_re.test( amt ) == true ) {
      amt = #s.accts.balance();
    }
    if ( o.is_int( amt ) == true ) {
      amt = o.to_gc_str( amt );
    }
    if ( !( "confirm" in a ) ) {
      o.log( "Transfering " + amt + " To: " + to + " Number of Times: " + num );
      o.log( "add {confirm:true} To Confirm" );
      return { ok:false, output: o.get_log() }
    }
    else {
      for ( var i = 0; i < num; i++ ) {
        #s.accts.xfer_gc_to( { to:to, amount:amt } );
        if ( num.length > 5 ){
          o.can_continue_execution( 60 );
        }
      }
    }
    return { ok: true, output: o.get_log(), args: a }
  }

}
