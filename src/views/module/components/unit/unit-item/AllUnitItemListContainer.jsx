import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS, observe } from 'mobx';
import { observer } from 'mobx-react';
import AllUnitItemList from './AllUnitItemList';
import AllUnitItemListService from '../../../services/AllUnitItemListService';
import UnitItemListService from '../../../services/UnitItemListService';

class AllUnitItemListContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    unit: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    AllUnitItemListService.init(this.props.moduleId, this.props.unit.id);
    //when the items change, we reload the available items to link
    observe(UnitItemListService, 'items', () => {
      AllUnitItemListService.load();
    });
  }

  handleLinkToUnit = (row) => {
    const observeFunc = observe(AllUnitItemListService, 'items', () => {
      UnitItemListService.load();
      observeFunc();
    });
    AllUnitItemListService.handleLinkToUnit(row);
  };

  render() {
    return (
      <AllUnitItemList
        unit={this.props.unit}
        items={toJS(AllUnitItemListService.items)}
        fetching={AllUnitItemListService.fetch.fetching}
        onLink={this.handleLinkToUnit}
      />
    );
  }
}

export default observer(AllUnitItemListContainer);
