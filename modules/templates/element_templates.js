
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
        fontsize: {
          connection_type: 'static_data',
          field: 'fontsize'
        },
        bottom: {
          connection_type: 'static_data',
          field: 'bottom'
        },
        value: {
          connection_type: 'doc_data',
          field: 'display_name'
        },
      },
      static_data: {
        fontsize: 'h1',
        bottom: 0,
      },
      local_data: {}
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
        fontsize: {
          connection_type: 'static_data',
          field: 'fontsize'
        },
        bottom: {
          connection_type: 'static_data',
          field: 'bottom'
        },
        value: {
          connection_type: 'doc_data',
          field: 'id'
        },
      },
      static_data: {
        fontsize: 'small',
        bottom: 0,
      },
      local_data: {}
    }
  }, {
    id: 'section-title',
    icon: '1.',
    bold: true,
    title: 'Section Title',
    description: 'Describes bigger sections.',
    config: {
      component: 'text-field',
      fontsize: 'h2',
      bottom: 10,
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
    title: 'Collection',
    description: 'A collection of documents.'
  },
];