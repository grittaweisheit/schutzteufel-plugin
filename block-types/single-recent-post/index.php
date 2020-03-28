<?php
function schutzteufel_single_recent_post_block() {

 
    // automatically load dependencies and version
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
 
    wp_register_script(
        'gutenberg-single-recent-post',
        plugins_url( 'build/block.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );
 
    register_block_type( 
        'schutzteufels/example-01-basic-esnext', 
        array('editor_script' => 'gutenberg-single-recent-post',)
    );
 
}

add_action( 'init', 'gutenberg_examples_01_register_block' );


    /*     
    // Scripts.
    wp_register_script(
        'schutzteufel-single-recent-post-block-script', // Handle.
        plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ), // Dependencies, defined above.
        filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ),
        true // Load script in footer.
    );

    // Styles.
    wp_register_style(
        'schutzteufel-single-recent-post-block-editor-style', // Handle.
        plugins_url( 'editor.css', __FILE__ ), // Block editor CSS.
        array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );
    wp_register_style(
        'schutzteufel-single-recent-post-block-frontend-style', // Handle.
        plugins_url( 'style.css', __FILE__ ), // Block editor CSS.
        array(), // Dependency to include the CSS after it.
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    } // End function organic_profile_block().

	// Register the block with WP using our namespacing
	// We also specify the scripts and styles to be used in the Gutenberg interface
	register_block_type( 'single-recent-post/block', array(
		'editor_script' => 'schutzteufel-single-recent-post-block-script',
		'editor_style' => 'schutzteufel-single-recent-post-block-editor-style',
		'style' => 'schutzteufel-single-recent-post-block-frontend-style',
    ) );
    
    add_action( 'init', 'schutzteufel_single_recent_post_block' );
 */

?>