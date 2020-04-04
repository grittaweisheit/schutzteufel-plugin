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
 * `wp-block-element`: Includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-components`: for components.
 * `wp-i18n`: To internationalize the block's text.
 * `wp-data`: To access posts and other data.
 * `wp-editor`: For the editor.
 *
 * @since 1.0.0
 */

/**
 * declare attributes of extended-recent-posts-block
 */
const block_attributes = array(
	'align' => array(
		'type' => 'string',
		'enum' => array( 'left', 'center', 'right', 'wide', 'full' ),
	),
	'categories' => array(
		'type' => 'string',
		// 'default' => '',
	),
	'className' => array(
		'type' => 'string',
	),
	'columns' => array(
		'type'    => 'number',
		'default' => 3,
	),
	'displayAuthor' => array(
		'type' => 'boolean',
		'default' => false,
	),
	'displayFeaturedImage' => array(
		'type'    => 'boolean',
		'default' => false,
	),
	'displayLink' => array( //the post's title is diplayed as link
		'type' => 'boolean',
		'default' => true,
	),
	'displayTitle' => array( // the post's title is diplayed, e.g. as Heading
		'type' => 'boolean',
		'default' => false,
	),
	'displayPostContent' => array(
		'type'    => 'boolean',
		'default' => false,
	),
	'displayPostContentRadio' => array(
		'type'    => 'string',
		'enum'	  => array('excerpt', 'full_post'),
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
		'enum' => array('desc', 'asc'),
		'default' => 'desc',
	),
	'orderBy'                 => array(
		'type'    => 'string',
		'enum' => array('author', 'date', 'id', 'include', 'modified', 'parent', 'relevance', 'slug', 'include_slugs', 'title'),
		'default' => 'date',
	),
	'postLayout'              => array(
		'type'    => 'string',
		'default' => 'list',
	),
	'titleClass' => array( // add css class attached to title
		'type' => 'string',
		'default' => 'h1',
	),
	'titleTag' => array( // adjust html tag of title
		'type' => 'string',
		'default' => 'h1',
	),
);

function schutzteufel_extended_recent_posts_block_render_callback($attributes){
	// global $block_core_latest_posts_excerpt_length;

	$args = array(
		'posts_per_page'   => $attributes['numberOfPosts'],
		'post_status'      => 'publish',
		'order'            => $attributes['order'],
		'orderby'          => $attributes['orderBy'],
		'suppress_filters' => false,
	);

	// $block_core_latest_posts_excerpt_length = $attributes['excerptLength'];
	// add_filter( 'excerpt_length', 'block_core_latest_posts_get_excerpt_length', 20 );

	if ( isset( $attributes['categories'] ) ) {
		$args['category'] = $attributes['categories'];
	}

	$recent_posts = get_posts( $args );

	$list_items_markup = '';

	foreach ( $recent_posts as $post ) {
		$list_items_markup .= '<li>';

		if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
			$image_style = '';
			if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
				$image_style .= sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
			}
			if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
				$image_style .= sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
			}

			$image_classes = 'wp-block-latest-posts__featured-image';
			if ( isset( $attributes['featuredImageAlign'] ) ) {
				$image_classes .= ' align' . $attributes['featuredImageAlign'];
			}

			$list_items_markup .= sprintf(
				'<div class="%1$s">%2$s</div>',
				$image_classes,
				get_the_post_thumbnail(
					$post,
					$attributes['featuredImageSizeSlug'],
					array(
						'style' => $image_style,
					)
				)
			);
		}

		$title = get_the_title( $post );
		
		if ($attributes['displayLink']){
			if ( ! $title ) {
				$title = __( '(no title)' );
			}
			$list_items_markup .= sprintf(
				'<a href="%1$s">%2$s</a>',
				esc_url( get_permalink( $post ) ),
				$title
			);
		}
		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-latest-posts__post-date">%2$s</time>',
				esc_attr( get_the_date( 'c', $post ) ),
				esc_html( get_the_date( '', $post ) )
			);
		}
		if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
			$list_items_markup .= sprintf(
				'<p class="">%1$s</p>',
				//'<a href="%1$">',
				get_the_author( $post)
			);
		}

		if ($attributes['displayTitle']){
			$title_markup = sprintf(
				'<%1$s class="%2$s">%3$s</%1$s>',
				$attributes['titleTag'],
				$attributes['titleClass'],
				$title
			);
			$list_items_markup .= $title_markup;
		}

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
			&& isset( $attributes['displayPostContentRadio'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {
			
			$trimmed_excerpt = get_the_excerpt( $post );

			$list_items_markup .= sprintf(
				'<div class="wp-block-latest-posts__post-excerpt">%1$s',
				$trimmed_excerpt
			);

			if ( strpos( $trimmed_excerpt, ' &hellip; ' ) !== false ) {
				$list_items_markup .= sprintf(
					'<a href="%1$s">%2$s</a></div>',
					esc_url( get_permalink( $post ) ),
					__( 'Read more' )
				);
			} else {
				$list_items_markup .= sprintf(
					'</div>'
				);
			}
		}

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
			&& isset( $attributes['displayPostContentRadio'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {
			$list_items_markup .= sprintf(
				'<div class="wp-block-latest-posts__post-full-content">%1$s</div>',
				wp_kses_post( html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) ) )
			);
		}

		$list_items_markup .= "</li>\n";
	}

	//remove_filter( 'excerpt_length', 'block_core_latest_posts_get_excerpt_length', 20 );

	$class = 'wp-block-latest-posts wp-block-latest-posts__list';
	if ( isset( $attributes['align'] ) ) {
		$class .= ' align' . $attributes['align'];
	}

	if ( isset( $attributes['postLayout'] ) && 'grid' === $attributes['postLayout'] ) {
		$class .= ' is-grid';
	}

	if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
		$class .= ' columns-' . $attributes['columns'];
	}

	if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
		$class .= ' has-dates';
	}

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	return sprintf(
		'<ul class="%1$s">%2$s</ul>',
		esc_attr( $class ),
		$list_items_markup
	);
}


function schutzteufel_extended_recent_posts_block() {

	// Scripts.
	// enqueue so the block gets registered
	wp_enqueue_script(
		'schutzteufel-extended-recent-posts-block', // Handle.
		plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-element', 'wp-data' ), // Dependencies, defined above.
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
            'attributes' => block_attributes,
			'editor_style'  => 'schutzteufel-extended-recent-posts-block-editor-style',
			'render_callback' => 'schutzteufel_extended_recent_posts_block_render_callback',
			'style'         => 'schutzteufel-extended-recent-posts-block-frontend-style',
		)
	);

} // End function schutzteufel_extended_recent_posts_block().

add_action( 'init', 'schutzteufel_extended_recent_posts_block' );

