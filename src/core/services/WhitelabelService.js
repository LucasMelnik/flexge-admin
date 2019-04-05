import axios from 'axios';
import { extendObservable, action } from 'mobx';
import FlexgeLogo from '../images/flexge-logo.png';

class WhitelabelService {

  constructor() {
    extendObservable(this, {
      isFetching: true,
      config: {
        logoUrl: null,
        primaryColor: '#607d8b',
        secondaryColor: '#cfd8dc',
        lightColor: '#ededed',
      },
    });
  }

  load = action(() => {
    axios.get(`${process.env.REACT_APP_API_URL.substring(0, process.env.REACT_APP_API_URL.length - 4)}/public/whitelabel-config`)
      .then(action(({ data }) => {
        this.config.logoUrl = `${process.env.REACT_APP_FILES_URL}/${data.logoUrl}`;
        this.config.primaryColor = data.primaryColor;
        this.config.secondaryColor = data.secondaryColor;
        this.config.lightColor = data.lightColor;

        window.document.title = data.title || '';

        if (data.favIconUrl) {
          const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = `${process.env.REACT_APP_FILES_URL}/${data.favIconUrl}`;
          document.getElementsByTagName('head')[0].appendChild(link);
        }

        this.isFetching = false;
      }))
      .catch(action(() => {
        this.config.logoUrl = FlexgeLogo;
        this.config.primaryColor = '#009688';
        this.config.secondaryColor = '#0bb5a0';
        this.config.lightColor = 'rgba(15, 177, 162, .8)';

        window.document.title = 'Flexge';

        this.isFetching = false;
      }));
  });
}

export default WhitelabelService;
