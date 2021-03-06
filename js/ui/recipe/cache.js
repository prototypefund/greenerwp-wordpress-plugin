const { __, _x, _n, _nx } = wp.i18n;

/**
 * Returns the test token or null.
 */
async function get_token( token ) {
  const opts = {
    credentials: 'omit',
  };
  var response = await fetch( '/', opts );
  var text = await response.text();
  var match = text.match( /<!-- greenerwp caching check [\d.]+ [\d]+ -->/ );
  if ( match === null ) {
    return null;
  } else {
    return match[0];
  }
}

/**
 * Checks for an active site cache.
 *
 * Implements a very simple test: It compares the generated '<!-- GreenerWP
 * caching check <time> -->' comments for equality on two consecutive requests.
 */
class Cache {
  constructor() {
    this.visible = true;
    this.id = 'cache';
    this.name = __( 'Use site caching', 'greenerwp' );
    this.description =  __( 'Without caching, your web server will have to generate your pages on every load, which costs time and energy.', 'greenerwp' );
    this.failedMessage = __( 'There seems to be no caching active for your site.', 'greenerwp' );
    this.passedMessage = __( 'Caching seems to be active for your site.', 'greenerwp' );
    this.errorMessage = __( 'Could not check for caching.', 'greenerwp' );
    this.steps = [
      {
        type: 'recipe',
        id: 'install_wp_super_cache',
        args: {
          recipe: 'wp_super_cache',
        },
      },
    ];
  };

  async evaluate() {
    var token = await get_token();
    if ( token === null ) {
      return { status: 'error' };
    }
    await new Promise( resolve => setTimeout( resolve, 1 ) );
    var newToken = await get_token();
    if ( token !== newToken ) {
      return { status: 'failed' };
    }
    return {
      status: 'passed',
    };
  }
}

export default Cache;
