<?php
/**
 * BLOCK: Extended Recent Posts
 *
 */

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: Includes block type registration and related functions.
 * `wp-element`: Includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 * `wp-data`: To access posts and other data.
 * `wp-editor`: dont know
 *
 * @since 1.0.0
 */

function schutzteufel_extended_recent_posts_block_render_callback($attributes, $content){
    $recent_posts = wp_get_recent_posts( array(
        'numberposts' => 1,
        'post_status' => 'publish',
    ) );
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
    }
    $post = $recent_posts[ 0 ];
    $post_id = $post['ID'];
    return sprintf(
        '<h1>%3$s</h1> <a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
        esc_url( get_permalink( $post_id ) ),
        esc_html( get_the_title( $post_id ) ),
		$attributes['displayPostContentRadio']
    );
}

function schutzteufel_extended_recent_posts_block() {

	// Scripts.
	// enqueue so the block gets registered
	wp_enqueue_script(
		'schutzteufel-extended-recent-posts-block', // Handle.
		plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-element', 'wp-data' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ),
		true // Load script in footer.
	);

	// Styles.
	wp_register_style(
		'schutzteufel-extended-recent-posts-block-editor-style', // Handle.
		plugins_url( 'editor.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);
	wp_register_style(
		'schutzteufel-extended-recent-posts-block-frontend-style', // Handle.
		plugins_url( 'style.css', __FILE__ ), // Block editor CSS.
		array(), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);
	wp_enqueue_style(
		'schutzteufel-extended-recent-posts-block-fontawesome', // Handle.
		plugins_url( 'font-awesome.css', __FILE__ ), // Font Awesome for social media icons.
		array(),
		'4.7.0'
	); 

	// Here we actually register the block with WP using our namespacing.
	// We also specify the editor script to be used in the Gutenberg interface.
	register_block_type(
		'schutzteufel/extended-recent-posts-block',
		 array(
            'attributes' => attributes,
			'editor_style'  => 'schutzteufel-extended-recent-posts-block-editor-style',
			'render_callback' => 'schutzteufel_extended_recent_posts_block_render_callback',
			'style'         => 'schutzteufel-extended-recent-posts-block-frontend-style',
		)
	);

} // End function schutzteufel_extended_recent_posts_block().

add_action( 'init', 'schutzteufel_extended_recent_posts_block' );


const attributes = array(
	'align' => array(
		'type' => 'string',
		'enum' => array( 'left', 'center', 'right', 'wide', 'full' ),
	),
	'categories' => array(
		'type' => 'string',
	),
	'className' => array(
		'type' => 'string',
	),
	'columns' => array(
		'type'    => 'number',
		'default' => 3,
	),
	'displayFeaturedImage' => array(
		'type'    => 'boolean',
		'default' => false,
	),
	'displayPostContent' => array(
		'type'    => 'boolean',
		'default' => false,
	),
	'displayPostContentRadio' => array(
		'type'    => 'string',
		'default' => 'excerpt',
	),
	'displayPostDate'         => array(
		'type'    => 'boolean',
		'default' => false,
	),
	'excerptLength' => array(
		'type'    => 'number',
		'default' => 55,
	),
	'featuredImageAlign'      => array(
		'type' => 'string',
		'enum' => array( 'left', 'center', 'right' ),
	),
	'featuredImageSizeHeight' => array(
		'type'    => 'number',
		'default' => null,
	),
	'featuredImageSizeSlug'   => array(
		'type'    => 'string',
		'default' => 'thumbnail',
	),
	'featuredImageSizeWidth'  => array(
		'type'    => 'number',
		'default' => null,
	),
	'numberOfPosts' => array(
		'type'    => 'number',
		'default' => 5,
	),
	'order' => array(
		'type'    => 'string',
		'default' => 'desc',
	),
	'orderBy'                 => array(
		'type'    => 'string',
		'default' => 'date',
	),
	'postLayout'              => array(
		'type'    => 'string',
		'default' => 'list',
	)
);