import React from 'react';
import { observer } from 'mobx-react';
import AllUnitItemListService from '../../../services/AllUnitItemListService';
import AllUnitItemListFilter from './AllUnitItemListFilter';

const AllUnitItemListFilterContainer = () => (
  <AllUnitItemListFilter
    onSearch={AllUnitItemListService.load}
    onChange={AllUnitItemListService.form.setValue}
    values={AllUnitItemListService.form.getValues()}
    fetching={AllUnitItemListService.fetch.fetching}
  />
);

export default observer(AllUnitItemListFilterContainer);
