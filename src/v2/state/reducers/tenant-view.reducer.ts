/** @format */

import { Tenant, TenantViewAction, TenantViewActionType } from '../../types/tenant.types';

const TenantViewReducer = (state: Tenant, action: TenantViewAction): Tenant => {
  if (action.type === TenantViewActionType.UPDATE) {
    return {
      ...state,
      ...action.tenant,
    };
  }

  throw new Error('Unknown tenant action');
};

export default TenantViewReducer;
