//attempt at creating a script to parse incremental line by line text from a readout
function (context, args) {
  var
    target = args.t,
    n = target.name.split('.')[0],
    k1 = args.k,
    v1 = args.v,
    o = #s.scripts.lib(),
    //vstr = '"' + v1 + '"',
    a = {},
    //l = #s.scripts.lib
    cc = args.cc,
    m = "";

  a[k1] = v1;
  var tx = target.call( a );
  var st = tx.toString().split( "\n" );

  //#s.chats.tell( { to:context.caller, msg: v1 } );
  if ( st.length > cc ) {
    for ( var ln = 0; ln <= cc; ln++ ){
      o.log( st[ln] + '\n' );
    }
  }
  else {
    o.log ("input string length not greater than requested resulting string, printing input string:\n\n" + tx );
  }

  return {
      o.ok(),
      output: o.get_log()
      //debug: o
  };
}
