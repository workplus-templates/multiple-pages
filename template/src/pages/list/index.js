import './style';

import $ from 'zepto';
import McxDialog from 'mcx-dialog-mobile';
import { isWorkPlus } from 'shared/utils';

const List = {
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
    console.log('Page init');
  },
};

$(function() {
  List.mounted();
});