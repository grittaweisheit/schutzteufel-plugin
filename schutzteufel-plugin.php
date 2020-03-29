<?php
/**
 * Plugin Name: Site Plugin for schutzteufel.de
 * Description: Site specific code changes for schutzteufel.de
 * @package ST
 */

if ( ! defined( 'ST_VERSION' ) ) {
	define( 'ST_VERSION', '1.4.1' );
}

if ( ! defined( 'ST_NAME' ) ) {
	define( 'ST_NAME', trim( dirname( plugin_basename( __FILE__ ) ), '/' ) );
}

if ( ! defined( 'ST_DIR' ) ) {
	define( 'ST_DIR', WP_PLUGIN_DIR . '/' . ST_NAME );
}

if ( ! defined( 'ST_URL' ) ) {
	define( 'ST_URL', WP_PLUGIN_URL . '/' . ST_NAME );
}
/**
 * BLOCK: Profile Block.
 */
require_once ST_DIR . '/block-types/profile/index.php';
require_once ST_DIR . '/block-types/extended-recent-posts/index.php';

?>