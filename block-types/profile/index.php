<?php
/**
 * BLOCK: Profile
 *
 */

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: Includes block type registration and related functions.
 * `wp-element`: Includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function schutzteufel_profile_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	// Scripts.
	wp_enqueue_script(
		'schutzteufel-profile-block-script', // Handle.
		plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ),
		true // Load script in footer.
	);

	// Styles.
	wp_register_style(
		'schutzteufel-profile-block-editor-style', // Handle.
		plugins_url( 'editor.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);
	wp_register_style(
		'schutzteufel-profile-block-frontend-style', // Handle.
		plugins_url( 'style.css', __FILE__ ), // Block editor CSS.
		array(), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);
	wp_enqueue_style(
		'schutzteufel-profile-block-fontawesome', // Handle.
		plugins_url( 'font-awesome.css', __FILE__ ), // Font Awesome for social media icons.
		array(),
		'4.7.0'
	);

	// Here we actually register the block with WP, again using our namespacing.
	// We also specify the editor script to be used in the Gutenberg interface.
	register_block_type(
		'profile/block',
		array(
			'editor_script' => 'schutzteufel-profile-block-script',
			'editor_style'  => 'schutzteufel-profile-block-editor-style',
			'style'         => 'schutzteufel-profile-block-frontend-style',
		)
	);

} // End function schutzteufel_profile_block().

// Hook: Editor assets.
add_action( 'init', 'schutzteufel_profile_block' );