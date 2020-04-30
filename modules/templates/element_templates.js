
export default [
  {
    id: 'header',
    icon: 'H1',
    bold: true,
    title: 'Page Header',
    description: 'The title of the page.',
    
    element: {
      component_id: 'text-field',
      prop_config: {
        fontsize: 'h1',
        bottom: 0,
        value: {
          connection_type: 'doc_data',
          field: 'display_name'
        },
      },
      element_data: {}
    }
  }, {
    id: 'subheader',
    icon: 'sub',
    bold: true,
    title: 'Page Subheader',
    description: 'A subheader.',
    
    element: {
      component_id: 'text-field',
      prop_config: {
        fontsize: 'small',
        bottom: 0,
        value: {
          connection_type: 'doc_data',
          field: 'id'
        },
      },
      element_data: {}
    }
  }, {
    id: 'section-title',
    icon: '1.',
    bold: true,
    title: 'Section Title',
    description: 'Describes bigger sections.',
    element: {
      component_id: 'text-field',
      prop_config: {
        fontsize: 'small',
        bottom: 0,
        value: {
          connection_type: 'element_data',
          field: 'value'
        },
      },
      element_data: {
        value: '',
      }
    }
  }, {
    id: 'subsection-title',
    icon: '1.1.',
    bold: true,
    title: 'Subsection Title',
    description: 'Segments ideas.',
    config: {
      component: 'text-field',
      fontsize: 'h3',
      bottom: 10,
    }
  }, {
    id: 'paragraph',
    icon: 'Aa',
    bold: true,
    title: 'Paragraph',
    description: 'For writing text.',
    config: {
      component: 'text-field',
      fontsize: 'regular',
      bottom: 10,
    }
  }, {
    id: 'line-break',
    icon: '___',
    bold: true,
    title: 'Line Break',
    description: 'Break it up!',
    config: {
      component: 'hr',
      bottom: 10,
    }
  }, {
    id: 'article',
    icon: 'art',
    bold: true,
    title: 'Article',
    description: 'A link to an article.',
    config: {
      component: 'article-card',
      _id: 'new',
      bottom: 10,
    }
  }, {
    id: 'image',
    icon: 'image-icon',
    bold: false,
    title: 'Image',
    description: 'Add an image!'
  }, {
    id: 'collection',
    icon: 'col',
    bold: false,
    title: 'Organization',
    description: 'A collection of documents.',

    element: {
      component_id: 'collection',
      prop_config: {
        fontsize: 'small',
        bottom: 0,
        owner: {
          connection_type: 'doc_data',
          field: 'id'
        },
      },
      local_data: {}
    }
  },
];