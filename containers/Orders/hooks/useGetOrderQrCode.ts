import { useQuery } from "@tanstack/react-query";
import callApi from "@app/api/apiCaller";
import { KMAPP_ENDPOINT } from "@app/api";
import useHandleErrors from "@app/hooks/useHandleErrors";
import { AxiosError } from "axios";

interface GetOrderQrCodeParams {
  orderId: string;
  productId: string;
}

const useGetOrderQrCode = ({ orderId, productId }: GetOrderQrCodeParams) => {
  return useQuery({
    queryKey: ["orderQrCode", orderId, productId],
    queryFn: async () =>
      await callApi<any, GetOrderQrCodeParams>(
        `${KMAPP_ENDPOINT.order}/qr-code`,
        "get",
        undefined,
        { orderId, productId },
        { responseType: "blob", headers: { Accept: "image/png" } },
      ),
    enabled: !!orderId && !!productId,
  });
};

export default useGetOrderQrCode;
