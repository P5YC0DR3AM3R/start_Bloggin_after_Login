module.exports = {
    format_date: (date) => {
        if (!date) {
            return '';
        }

        const formattedDate = new Date(date);
        if (isNaN(formattedDate)) {
            return '';
        }

        return formattedDate.toLocaleDateString('en-US');
    },
  truncate: (str, len) => {
      if (str.length > len && str.length > 0) {
          let new_str = str + " ";
          new_str = str.substr(0, len);
          new_str = str.substr(0, new_str.lastIndexOf(" "));
          new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
          return new_str + '...';
      }
      return str;
  },
  stripTags: (input) => {
      return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  editIcon: (storyUser, loggedUser, storyId, floating = true) => {
      if (storyUser === loggedUser) {
          if (floating) {
              return `<a href="/posts/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
          } else {
              return `<a href="/posts/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
          }
      } else {
          return '';
      }
  }
};
