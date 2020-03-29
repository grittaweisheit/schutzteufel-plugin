(function (blocks, editor, components, i18n, element) {
    var __ = i18n.__
    var el = element.createElement
    var registerBlockType = blocks.registerBlockType
    var RichText = editor.RichText
    var BlockControls = editor.BlockControls
    var AlignmentToolbar = editor.AlignmentToolbar
    var MediaUpload = editor.MediaUpload
    var InspectorControls = editor.InspectorControls
    var PanelBody = components.PanelBody
    var TextControl = components.TextControl

    registerBlockType('schutzteufel/extended-recent-posts-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
        title: __('Recent Posts'), // The title of our block.
        description: __('A custom block for displaying recent posts.'), // The description of our block.
        icon: 'megaphone', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
        category: 'widget', // The category of the block.
        supports: {
            align: true,
            alignWide: true
        },
        attributes: { // Necessary for saving block content.
            alignment: {
                type: 'string',
                default: 'left'
            },
            content1: {
                type: 'string',
                default: 'Hello World'
            },
            content2: {
                type: 'string',
                default: 'Hello World 2'
            }
        },

        // this is what you see and what happens while editing your website/page/post
        edit: function(props) {
            var attributes = props.attributes
            var alignment = props.attributes.alignment

            function onChangeAlignment (newAlignment) {
                props.setAttributes({ alignment: newAlignment })
            }

            return [
                el(BlockControls, { key: 'controls' },
                    el(AlignmentToolbar, {
                        value: alignment,
                        onChange: onChangeAlignment
                    })
                ),

                el(InspectorControls, { key: 'inspector' },
                    el(TextControl, {
                        label: __('Content1'),
                        value: attributes.content1,
                        onChange: function (newContent1) {
                            props.setAttributes({ content1: newContent1 })
                        }
                    }),
                ),

                el('div', { className: props.className },
                    el(RichText, {
                        tagName: 'h1',
                        placeholder: __('Write Content2 for RichText'),
                        keepPlaceholderOnFocus: true,
                        value: attributes.content2,
                        onChange: function(newContent2){
                            props.setAttributes({content2: newContent2})
                        }
                    })
                )
            ]
        },

        // this is what will actually appear on your website
        save: function (props) {
            var attributes = props.attributes
            var alignment = props.attributes.alignment

            return (
                el('div', {style: { textAlign: alignment }},
                    el(RichText.Content, {
                        className: 'schutzteufel-profile-bio',
                        tagName: 'h1',
                        value: attributes.content1
                    }),
                    el('p', {}, attributes.content2)
                )
            )
        }
    })
})

/* import { registerBlockType } from '@wordpress/blocks';
import { 
    RichText,
    AlignmentToolbar,
    BlockControls, 
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
 
registerBlockType( 'schutzteufel/single-recent-post', {
    title: 'Most recent post',
    icon: 'megaphone',
    category: 'widget',
    attributes: {
        category,
    },

    edit: withSelect((select) => {
        return {
            posts: select('core').getEntityRecords('postType', 'post'),
        } ;
    }) (({posts, className}) => {
        if ( ! posts ) {
            return 'Loading...';
        }
 
        if ( posts && posts.length === 0 ) {
            return 'No posts';
        }
 
        const post = posts[ 0 ];
 
        return <a className={ className } href={ post.link }>
            { post.title.rendered }
        </a>;
    }),
    
 */

    /* attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },
        alignment: {
            type: 'string',
            default: 'none',
        },
    },
    example: {
        attributes: {
            content: 'Hello World',            
            alignment: 'right',
        },
    }, 

    edit: ( props ) => {
        const { 
            attributes: { 
                content, 
                alignment, 
            }, 
            setAttributes, 
            className ,
        } = props;

        const onChangeContent = ( newContent ) => {
            props.setAttributes( { content: newContent } );
        }; 
        const onChangeAlignment = ( newAlignment ) => {
            props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
        };
        
        return (
            <div>
                {
                    <BlockControls>
                        <AlignmentToolbar
                            value={ alignment }
                            onChange={ onChangeAlignment }
                        />
                    </BlockControls>
                }
                <RichText
                    className={ className }
                    style={ { textAlign: alignment } }
                    tagName="p"
                    onChange={ onChangeContent }
                    value={ content }
                />
            </div>
        );
    },

    save: ( props ) => {
        return (
            <RichText.Content
                className={ `schutzteufel-single-recent-post-${ props.attributes.alignment }` }
                tagName="p"
                value={ props.attributes.content }
            />
        );    
    }, */
