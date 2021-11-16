const BASE_URL = "https://hanghieu.nomi.vn";
export const LOGIN_URL = BASE_URL+"/authentication/login";
export const CHECK_TOKEN = BASE_URL+"/authentication/check-token";
/**
 * Address
 * */
export const GETPROVINCES_URL = BASE_URL+"/api/admin/address/get-provinces"
export const GETDICTRICTS_URL = BASE_URL+"/api/admin/address/get-dictricts"
export const GETWARDS_URL = BASE_URL+"/api/admin/address/get-wards"
/**
 * END address
 * */
/**
 * Order
 * */
export const ORDER_FINDALL = BASE_URL+"/api/admin/order"
export const ORDER_FINDBYID = BASE_URL+"/api/admin/order/findbyid"
export const ORDER_GETMETHODANDSTATUS = BASE_URL+"/api/admin/order/get-method-status"
export const ORDER_CREATE = BASE_URL+"/api/admin/order"
export const ORDER_UPDATE = BASE_URL+"/api/admin/order"
export const ORDER_DELETE = BASE_URL+"/api/admin/order"
export const ORDER_ACTION = BASE_URL+"/api/admin/order/actions";
export const ORDER_QUICKVIEW_UPDATE = BASE_URL+"/api/admin/order/quickview-update";
export const ORDER_COUNT_BY_STATUS = BASE_URL+"/api/admin/order/countbystatus";
export const ORDER_STATICTIS_PRODUCT = BASE_URL+"/api/admin/order/statictis-product";
export const CART_LIST = BASE_URL+"/api/admin/order/cart-statictis";
export const CART_DETAIL = BASE_URL+"/api/admin/order/cart-detailt";
export const ORDER_TRACKING = BASE_URL+"/api/admin/order/tracking";
export const ORDER_EXCHANGE_RATE_TRACKING = BASE_URL+"/api/admin/order/exchange-rate-tracking";
export const ORDER_STATICTIS_TRACKING = BASE_URL+"/api/admin/dashboard/statictis-tracking";
export const QR_SCAN = BASE_URL+"/api/admin/order/findallbyladingcode";
export const TRACK_RECEIVE_PRODUCT = BASE_URL+"/api/admin/order/tracking-getproduct" +
    "";
/** End Order */
/** GHN */
export const GHN_SETTING = BASE_URL+"/api/ghn/setting";
export const GHN_SHOP = BASE_URL+"/api/ghn/store";
export const GHN_ORDER = BASE_URL+"/api/ghn/order";
export const GHN_PICK_SHIFT = BASE_URL+"/api/ghn/pick-shift";
export const GHN_FEE = BASE_URL+"/api/ghn/fee";
export const GHN_SERVICE = BASE_URL+"/api/ghn/service";
export const GHN_LIST = BASE_URL+"/api/ghn/list";
export const GHN_PRINT = BASE_URL+"/api/ghn/print";
export const GHN_CANCEL = BASE_URL+"/api/ghn/cancel";
export const GHN_TRACKING = BASE_URL+"/api/ghn/tracking";
export const GHN_FINDALLBYORDERID = BASE_URL+"/api/ghn/get-list-order-byid";
/** END GHN*/
/** PARTNER */
export const PARTNER_FINDALL = BASE_URL+"/api/admin/partner";
export const PARTNER_SAVE = BASE_URL+"/api/admin/partner";
export const PARTNER_DELETE = BASE_URL+"/api/admin/partner";
/** END PARTNER*/
