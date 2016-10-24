function (context, a) { // t:#s.username.script num: 1 | Null
  // attempt at creating a fullsec t1 location finder, queries fullSec entries, compares them to known trusted username.scripts
  // returns compiled list of valid locations
  // input username.script and the amount of locations to return
  var
    wl = [ "soylentbean", "weyland", "halperyon", "setec_gas", "bunnybat_hut", "suborbital_airlines", "ros13" ],
    ws = [ "pub_info", "external", "pub", "extern", "entry", "public" ],
    c_re = /with\s(\w+):"(\w+)"/gmi,
    p_re = /strategy\s(\w+)/,
    pm_re = /(date for|Look for|project|developments on|continues on)\s(\w+(.sh|.exe)?)/gmi,
    loc_re = /[a-z0-9_\.a-z0-9_]+/,
    num = 1,
    fs = [],
    i = 0,
    o = #s.scripts.lib(),
    t,
    k,
    fs_t = '',
    fs_nl = [],
    fsName = '',
    fs_pages = [],
    fs_pass = [],
    fs_proj = [],
    fs_cmd = [],
    fs_l = [],
    fs_p_r = [],
    fs_loc_l = [],
    fs_loc_gl = [],
    fs_p_r_s,

    tx = [],
    m = [];

  //if no arguments are passed then return safe targets from the current fullSec list
  if ( a == null ) {
    fs = #s.scripts.fullsec(); //get fullSec list
    for ( var wli = 0; wli < wl.length; wli++ ) {
      for ( var wsi = 0; wsi < ws.length; wsi++ ) {
        fsName = wl[ wli ] + '.' + ws[ wsi ]; //concat username + script
        if ( fs.includes( fsName ) ) { // compare against fs name in list
          fs_nl.push( fsName ); // if the tmp name is in the fs list then add it to the master list
        }
      }
    }
    return { usage: "t1_find{t:#s.user.script,num:1}", ST:fs_nl } // return safe targets to process later num is number of locations to return
  }

  if ( a != null ) {
    try {
      num = a.num;
      fs_pages = a.t.call().split("\n").slice(-1)[0].split("|").map(function( tmp ){ return tmp.trim(); }); // get top level pages to use later
      // find cmd and directory given fs target, and init call
      fs_cmd = c_re.exec( a.t.call( {} ) )[1]; // finding target command
      c_re.lastIndex = 0; // reset regex index so we can call again, and get same result
      fs_l = c_re.exec( a.t.call( {} ) )[2]; // finding target directory
      a[fs_cmd] = fs_pages[1]; // finding password command
      fs_pass = p_re.exec( a.t.call( a ) )[1]; // password regex output
      a[fs_cmd] = fs_pages[0]; // finding projects / usernames command
      var rLines = a.t.call( a ); // project/username output lines
      for ( i = 0; i < rLines.length; i++ ) {
        // o.log( "Return Line: " + rLines[i] );
        var tmp_p = pm_re.exec( rLines[i] );
        if ( tmp_p != [] && tmp_p != null ) {
          fs_proj.push( tmp_p[2] ); //if project match then add to a master project list
        }
      }
    }
    catch( error ){
      o.log ( "user.script: " + a.t.name + " F T P: " + error );
    }
  }

  // // // parse output ---------------------------
  // o.log ( "Pages: " + fs_pages );
  // o.log ( "Command: " + fs_cmd );
  // o.log ( "Directory: " + fs_l );
  // o.log ( "Pass: " + fs_pass );
  //o.log ( "Projects: " + fs_proj.join( "  " ) );

  get_loc( fs_proj, fs_cmd, fs_l, fs_pass, num );

  function get_loc( fs_proj, fs_cmd, fs_l, fs_pass, num ){
    try {
      k = {};
      for ( i = 0; i < fs_proj.length; i++ ) {
        k[fs_cmd] = fs_l;
        k.project = fs_proj[i];
        k.pass = fs_pass;
        k.password = fs_pass;
        k.p = fs_pass;
        fs_p_r = a.t.call( k );
        for ( var si = 0; si < fs_p_r.length; si++ ) {
          if ( typeof( fs_p_r[si] ) == "string" ){
            fs_p_r_s = fs_p_r[si].split("\n");
            for ( var ssi = 0; ssi < fs_p_r_s.length; ssi++ ) {
              if ( loc_re.test( fs_p_r_s[ssi] ) == true ) {
                fs_t = fs_p_r_s[ssi];
                if ( fs_t != "<null>" && fs_t != "<missing>" && fs_t != "<error>" && fs_t != "<empty>" && fs_t != "<nil>" && fs_t.length > 1 ) {
                  fs_loc_gl.push( fs_t );
                  if ( fs_loc_l.length < num ) {
                    fs_loc_l.push( fs_t );
                  }
                }
              }
            }
          }
        }
      }

      for ( i = 0; i < fs_loc_l.length; i++ ) {
        o.log ( "T1: " + fs_loc_l[i] );
      }

    }
    catch( error ){
      o.log ( "FTGL: " + error );
    }
  }

  return { ok: true, output: o.get_log(), pFound: "Proj Found: " + fs_proj.length, lFound: "Loc Found: " + fs_loc_gl.length, args: k  }
}
