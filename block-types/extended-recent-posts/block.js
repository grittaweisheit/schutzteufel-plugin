( function( blocks, editor, components, i18n, element, data ) {
    var __ = i18n.__;
	var el = element.createElement,
        registerBlockType = blocks.registerBlockType,
        withSelect = data.withSelect,
    	RichText = editor.RichText,
     	BlockControls = editor.BlockControls,
     	AlignmentToolbar = editor.AlignmentToolbar,
     	InspectorControls = editor.InspectorControls,
     	TextControl = components.TextControl;
 
    registerBlockType( 'schutzteufel/extended-recent-posts-block', {
        title: 'Recent Posts',
        icon: 'businessman',
        category: 'widgets',
		 supports: {
            align: true,
            alignWide: true
        },
		
		edit:
            withSelect( function( select ) {
                return {
                    posts: select( 'core' ).getEntityRecords( 'postType', 'post' ),
                };
            })
            (function(props) {

                // search for posts
                if ( ! props.posts ) {
                    return 'Loading...';
                }
                if ( props.posts.length === 0 ) {
                    return 'No posts';
                }

                var attributes = props.attributes
                var alignment = props.attributes.align
                var posts = props.posts

                function onChangeAlignment (newAlignment) {
                    props.setAttributes({ alignment: newAlignment })
                }

                return [
                        // this is displayed on top of the block when editing it
                        el(BlockControls, { key: 'controls' },
                        el(AlignmentToolbar, {
                            value: alignment,
                            onChange: onChangeAlignment
                        })
                    ),

                    // this will displayed in the block tab on the right when editing
                    el(InspectorControls, { key: 'inspector' },
                        el(TextControl, {
                            label: __('Content1'),
                            value: attributes.content1,
                            onChange: function (newContent1) {
                                props.setAttributes({ content1: newContent1 })
                            }
                        }),
                    ),

                    // this will be displayed as the block while editing
                    el('div', { },
                        el(RichText, {
                            tagName: 'h1',
                            placeholder: __('Write Content2 for RichText'),
                            keepPlaceholderOnFocus: true,
                            value: attributes.content2,
                            onChange: function(newContent2){
                                props.setAttributes({content2: newContent2})
                            }
                        }),
                        el('a', {href: posts[0].link}, posts[0].title.rendered)
                    )
                ]
            },),
		save: function(props){
			// here could be a fallback html return value
			return null
		}
    } );
}(
    window.wp.blocks,
    window.wp.editor,
    window.wp.components,
    window.wp.i18n,
    window.wp.element,
    window.wp.data
) );