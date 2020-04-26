
// This script gives us this.$widget

// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('widget', {



    get_widget(query) {
      let field = 'id';
      let value = query.id;
      // TODO: make a global functions module that does stuff like this. 
      return this.all_widgets.filter( function(widget) {
        return (widget[field] == value);
      });
    },

    all_widgets: [{
      id: 'header',
      icon: 'H1',
      bold: true,
      title: 'Page Header',
      description: 'The title of the page.',
      config: {
        component: 'text-field',
        fontsize: 'h1',
        bottom: 0,
      }
    }, {
      id: 'subheader',
      icon: 'sub',
      bold: true,
      title: 'Page Subheader',
      description: 'A subheader.',
      config: {
        component: 'text-field',
        fontsize: 'small',
        bottom: 10,
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
  ],

  })
}
