( function( blocks, editor, components, i18n, element, data ) {
	const {
        registerBlockType,
    } = blocks
    const {
        RichText,
        AlignmentToolbar,
        BlockControls,
        BlockAlignmentToolbar,
        InspectorControls,
    } = editor;
    const {
        Toolbar,
        Button,
        Tooltip,
        PanelBody,
        PanelRow,
        FormToggle,
        TextControl,
    } = components;
    var __ = i18n.__;
    var el = element.createElement;
    const {
        withSelect,
    } = data;
 
    registerBlockType( 'schutzteufel/extended-recent-posts-block', {
        title: 'Recent Posts',
        icon: 'businessman',
        category: 'widgets',
		 supports: {
            align: true,
            alignWide: true
        },
		
		edit:
            withSelect( function( select, props ) {
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

                    // this will be displayed in the block tab on the right when editing
                    
                    el(InspectorControls, { key: 'inspector' },
                        el(FormToggle, {
                            label: __('Display Title'),
                            checked: attributes.displayTitle,
                            onChange: function (change) {
                                props.setAttributes({ displayTitle: change })
                            }
                        }),
                    ),
                    
                    // the following will be displayed as the block while editing
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
                        //el('p', {}, posts[0].title),
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
    window.wp.blockEditor,
    window.wp.components,
    window.wp.i18n,
    window.wp.element,
    window.wp.data
) );