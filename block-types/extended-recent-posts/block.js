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
		BaseControl,
        Button,
        Tooltip,
        PanelBody,
        PanelRow,
        FormToggle,
        SelectControl,
        TextControl,
        ToggleControl,
        RadioControl,
        RangeControl,
        QueryControls,
    } = components;
    var __ = i18n.__;
    var el = element.createElement;
    const {
		select, // don't ever f***ing forgett this again
        withSelect,
    } = data;
 
    const MAX_EXCERPT_LENGTH = 100
    const MIN_EXCERPT_LENGTH = 1

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
                    all_posts: select( 'core' ).getEntityRecords( 'postType', 'post' ),
                    all_categories: select('core').getEntityRecords( 'taxonomy', 'category', {'taxonomy': 'category'}),
                };
            })
            (function(props) {
                // search for posts
                if ( ! props.all_posts ) {
                    return 'Loading...';
                }
                if ( props.all_posts.length === 0 ) {
                    return 'No posts';
                }

                var attributes = props.attributes
                var alignment = props.attributes.align
                var all_posts = props.all_posts
                var all_categories = props.all_categories
				var selected_categories = []
				
                
				function changeAlign (changedAlign) {
                    props.setAttributes({ align: changedAlign })
                }
                function changeCategories (changedCategories) {
                    props.setAttributes({ categories: changedCategories })
                }
                function changeClassName (changedClassName) {
                    props.setAttributes({ className: changedClassName })
                }
                function changeColumns (changedColumns) {
                    props.setAttributes({ columns: changedColumns })
                }
                function changeDisplayFeaturedImage (changedDisplayFeaturedImage) {
                    props.setAttributes({ displayFeaturedImage: changedDisplayFeaturedImage })
                }
                function changeDisplayAuthor (changedDisplayAuthor) {
                    props.setAttributes({ displayAuthor: changedDisplayAuthor })
                }
                function changeDisplayLink (changedDisplayLink) {
                    props.setAttributes({ displayLink: changedDisplayLink })
                }
                function changeDisplayPostContent (changedDisplayPostContent) {
                    props.setAttributes({ displayPostContent: changedDisplayPostContent })
                }
                function changeDisplayPostContentRadio (changedDisplayPostContentRadio) {
                    props.setAttributes({ displayPostContentRadio: changedDisplayPostContentRadio })
                }
                function changeDisplayPostDate (changedDisplayPostDate) {
                    props.setAttributes({ displayPostDate: changedDisplayPostDate })
                }
                function changeDisplayTitle (changedDisplayTitle) {
                    props.setAttributes({ displayTitle: changedDisplayTitle })
                }
                function changeExcerptLength (changedExcerptLength) {
                    props.setAttributes({ excerptLength: changedExcerptLength })
                }
                function changeFeaturedImageAlign (changedFeaturedImageAlign) {
                    props.setAttributes({ featuredImageAlign: changedFeaturedImageAlign })
                }
                function changeFeaturedImageSizeHeight (changedFeaturedImageSizeHeight) {
                    props.setAttributes({ featuredImageSizeHeight: changedFeaturedImageSizeHeight })
                }
                function changeFeaturedImageSizeSlug (changedFeaturedImageSizeSlug) {
                    props.setAttributes({ featuredImageSizeSlug: changedFeaturedImageSizeSlug })
                }
                function changeFeaturedImageSizeWidth (changedFeaturedImageSizeWidth) {
                    props.setAttributes({ featuredImageSizeWidth: changedFeaturedImageSizeWidth })
                }
                function changeNumberOfPosts (changedNumberOfPosts) {
                    props.setAttributes({ numberOfPosts: changedNumberOfPosts })
                }
                function changeOrder (changedOrder) {
                    props.setAttributes({ order: changedOrder })
                }
                function changeOrderBy (changedOrderBy) {
                    props.setAttributes({ orderBy: changedOrderBy })
                }
                function changePostLayout (changedPostLayout) {
                    props.setAttributes({ postLayout: changedPostLayout })
                }
                function changeTitleClass (changedTitleClass) {
                    props.setAttributes({ titleClass: changedTitleClass })
                }
                function changeTitleTag (changedTitleTag) {
                    props.setAttributes({ titleTag: changedTitleTag })
                }
				function stringArrayToString(strings){
					var result = ""
					for (str of strings){
						result = result.concat(" ", str)
					}
					return result
				}
				
                var category_options = []
				function createCategoryOption (cat) {
					return {value: cat.id , label: cat.name}
				}
				if (all_categories){
                    category_options = all_categories.map(createCategoryOption)
					//category_options.push({value: -2, label: 'select all'})
					//category_options.push({value: -1, label: 'none'})
                }
                function selectCategory (input) {
					var cat = input[0] // retrieve actual value from input
					
                    var index = selected_categories.indexOf(cat)
					
					/*  this messes with the display of selected stuff
					if(cat == -1){ // deselect all categories
						selected_categories = []
						// changeCategories()
						var cat_string = selected_categories.join()
						console.log('string:')
						console.log(cat_string)
						return
					}
					if(cat == -2){ // select all categories
						selected_categories = all_categories.map(cat => cat.id)
						var cat_string = selected_categories.join()
						console.log('string:')
						console.log(cat_string)
						return
					} */
					
                    if (index == -1){ // add category
                        selected_categories.push(cat)
                    }else{ // remove if it has been selected before
                        selected_categories.splice(index, 1)
                    }
					
					var cat_string = selected_categories.join()
					console.log('string:')
					console.log(cat_string)
					changeCategories(cat_string)
                }
				
				
                return [
                    // this is displayed on top of the block when editing it
                    el(BlockControls, { key: 'controls' },
                        el(AlignmentToolbar, {
                            value: attributes.align,
                            onChange: changeAlign,
                        })
                    ),

                    // this will be displayed in the block tab on the right when editing
                    
                    el(InspectorControls, { key: 'inspector' },
                        el(PanelBody, {title: __('General')}, 
                            el(RangeControl, {
                                label: __('Number of Posts'),
                                value: attributes.numberOfPosts,
                                onChange: changeNumberOfPosts,
                                min: 1,
                                max: 100,
                            }),
                            el( SelectControl , { // should be SelectControl
                                label: __('Order By'),
                                options: [
                                    {value: 'author', label: 'author'},
                                    {value: 'date', label: 'date'},
                                    // {value: 'id'}, 
                                    // {value: 'include'},
                                    {value: 'modified', label: 'modified'},
                                    // {value: 'parent'},
                                    // {value: 'relevance'},
                                    // {value: 'slug'},
                                    // {value: 'include_slugs'},
                                    {value: 'title', label: 'title'}
                                ],
                                value: attributes.orderBy,
                                onChange: changeOrderBy,
                            }),
                            el( SelectControl , { // should be SelectControl
                                label: __('Order'),
                                options: [
                                    {value: 'asc', label: 'asc'},
                                    {value: 'desc', label: 'desc'}
                                ],
                                value: attributes.order,
                                onChange: changeOrder,
                            }),/*
                            el(SelectControl, {
                                label: __('Categories'),
                                multiple: true,
                                options: category_options,
                                value: selected_categories,
                                onChange: selectCategory,
                            }),*/
                            el(SelectControl, {
                                label: __('Categories'),
                                multiple: false,
                                options: category_options,
                                value: attributes.categories,
                                onChange: changeCategories,
                            })
                        ),
                        el(PanelBody, {title: __('Head')}, 
                            el(ToggleControl, {
                                label: __('Display Link'),
                                checked: attributes.displayLink,
                                onChange: changeDisplayLink,
                            }),
                            el(ToggleControl, {
                                label: __('Display Author'),
                                checked: attributes.displayAuthor,
                                onChange: changeDisplayAuthor,
                            }),
                            el(ToggleControl, {
                                label: __('Display Post Date'),
                                checked: attributes.displayPostDate,
                                onChange: changeDisplayPostDate,
                            }),
                        ),
                        el(PanelBody, {title: __('Title')}, 
                            el(ToggleControl, {
                                label: __('Display Title'),
                                checked: attributes.displayTitle,
                                onChange: changeDisplayTitle,
                            }),
                            attributes.displayTitle && el(TextControl, {
                                label: __('Title Tag'),
                                value: attributes.titleTag,
                                onChange: changeTitleTag,
                            }),
                            attributes.displayTitle && el(TextControl, {
                                label: __('Title Class'),
                                value: attributes.titleClass,
                                onChange: changeTitleClass,
                            }),
                        ),
                        el(PanelBody, {title: __('Post Content')},
                            el(ToggleControl, {
                                label: __('Display Post Content'),
                                checked: attributes.displayPostContent,
                                onChange: changeDisplayPostContent,
                            }),
                            attributes.displayPostContent && el(RadioControl, { 
                                label: __('Show:'),
                                selected: attributes.changeDisplayPostContentRadio,
                                options: [
                                    {value: 'excerpt', label: 'Excerpt'}, 
                                    {value: 'full_post', label: 'Full Post'},
                                ],
                                onChange: changeDisplayPostContentRadio,
                            }),
                            attributes.displayPostContent && attributes.displayPostContentRadio === 'excerpt' && el(RadioControl, {
                                label: __('Max number of words in excerpt'),
                                value: attributes.excerptLength,
                                onChange: changeExcerptLength,
                                min: MIN_EXCERPT_LENGTH,
                                max: MAX_EXCERPT_LENGTH,
                            }),
                        ),
                    ),
                    
                    // the following will be displayed as the block while editing
                    el('div', { }, 'Extended Recent Posts Block')
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