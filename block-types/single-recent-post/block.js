import { registerBlockType } from '@wordpress/blocks';
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
});