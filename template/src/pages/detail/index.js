import './style';

import $ from 'zepto';
import { isWorkPlus } from 'shared/utils';

const Detail = {
  mounted() {
    this.isWorkPlus = isWorkPlus();
    if (this.isWorkPlus) {
      document.addEventListener('deviceready', () => {
        this.init();
      });
    } else {
      this.init();
    }
  },
  init() {
    
  },
};

$(function() {
  Detail.mounted();
});