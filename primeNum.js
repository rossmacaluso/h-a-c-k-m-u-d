function ( context, a ) {
  //sourced from open source prime number javascript
    var
      pAmt = a.amt,
      o = #s.scripts.lib(),
      primes = [],
      primeList = [],
      limit = 0,
      i = 0,
      j = 0;

    for( i = 2; i < pAmt; i++ ) {
        primes[i] = true;
    }

    limit = Math.sqrt(pAmt);

    for( i = 2; i < limit; i++ ) {
        if( primes[i] === true ) {
            for( j = i * i; j < pAmt; j += i ) {
                primes[j] = false;
            }
        }
    }
    for( i = 2; i < pAmt; i++ ) {
        if( primes[i] === true ) {
            primeList.push( i );
        }
    }
    return { primeList }
}
