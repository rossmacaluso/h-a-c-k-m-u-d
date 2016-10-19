function (context, args) {
  //attempt at creating a script to parse incremental line by line text from a readout
  var
    target = args.t,
    //n = target.name.split('.')[0], return script name
    k1 = args.k,
    v1 = args.v,
    o = #s.scripts.lib(),
    //vstr = '"' + v1 + '"', test to see if needed to add quotes to pass key:value
    a = {},
    cc = args.cc,
    m = "";

  a[k1] = v1;
  var tx = target.call( a );
  var st = tx.toString().split( "\n" );

  //#s.chats.tell( { to:context.caller, msg: v1 } ); hacked debugging
  if ( st.length > cc ) {
    for ( var ln = 0; ln <= cc; ln++ ){
      o.log( st[ln] );
    }
  }
  //return original string if it's already < requested len
  else {
    o.log ("return input str: " + tx );
  }

  return { ok: true, output: o.get_log(), debug: "len of str: " + st.length }
}
