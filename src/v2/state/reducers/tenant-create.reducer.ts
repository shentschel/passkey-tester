/** @format */
import {
  TenantCreateAction,
  TenantCreateActionType,
  TenantCreateState,
  TenantWebauthnState,
} from '../../types/tenant.types';

const TenantCreateReducer = (state: TenantCreateState, action: TenantCreateAction): TenantCreateState => {
  switch (action.type) {
    case TenantCreateActionType.SHOW:
      return {
        ...state,
        show: true,
      };
    case TenantCreateActionType.HIDE:
      return {
        ...state,
        show: false,
      };
    case TenantCreateActionType.UPDATE:
      if (action.tenant === undefined) {
        throw new Error('tenant cannot be undefined');
      }

      return {
        ...state,
        ...action.tenant,
      };
    case TenantCreateActionType.UPDATE_PASSKEY: {
      if (action.webauthn === undefined) {
        throw new Error('passkey form cannot be undefined');
      }

      return {
        ...state,
        passkey: {
          ...state.passkey,
          ...action.webauthn,
        },
      };
    }
    case TenantCreateActionType.UPDATE_MFA: {
      if (action.webauthn === undefined) {
        throw new Error('mfa form cannot be undefined');
      }

      return {
        ...state,
        mfa: {
          ...state.passkey,
          ...action.webauthn,
        },
      };
    }
    default:
      throw new Error('Unknown action');
  }
};

export default TenantCreateReducer;
