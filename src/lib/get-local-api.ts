import { getPayload } from "payload";
import configPromise from "@payload-config";

/**
 * @description Get local Payload API instance
 * @warning Be careful when using. Check docs(api) for more info
 */
export const getLocalApi = async () => {
  return getPayload({ config: configPromise });
};
