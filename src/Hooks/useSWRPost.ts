import { useState, Dispatch, SetStateAction } from "react";
import useSWR, { ConfigInterface, responseInterface } from "swr";

const useSWRPost = <S>(
  endpoint: RequestInfo,
  swrOpts: ConfigInterface
): [Dispatch<SetStateAction<S | undefined>>, responseInterface<any, any>] => {
  const [values, runFetch] = useState<S>();

  const swrOut = useSWR(values ? [endpoint, "POST", values] : null, {
    revalidateOnFocus: false,
    ...swrOpts,
  });

  return [runFetch, swrOut];
};

export default useSWRPost;
