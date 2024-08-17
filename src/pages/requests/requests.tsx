import { useEffect, useState } from "react";

import { cn } from "../../utils/cn";
import Request from "./request";
import Outgoing from "./outgoing";
import { Request as RequestType } from "../../types/types";

export default function Requests({
  requests,
}: {
  requests: {
    success: boolean;
    requests: Array<RequestType>;
    outgoingRequests: Array<RequestType>;
  };
}) {
  const [showing, setShowing] = useState("requests");

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  return (
    <>
      <div className="w-full flex gap-1 bg-white p-1 rounded-xl">
        <div
          onClick={() => setShowing("requests")}
          className={cn(
            "w-full font-medium p-3 flex justify-center cursor-pointer rounded-xl transition-all opacity-50",
            showing === "requests" && "bg-gray-100 opacity-100"
          )}
        >
          Requests
        </div>
        <div
          onClick={() => setShowing("outgoing")}
          className={cn(
            "w-full font-medium p-3 flex justify-center cursor-pointer rounded-xl transition-all opacity-50",
            showing === "outgoing" && "bg-gray-100 opacity-100"
          )}
        >
          Sent Requests
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {showing === "requests" ? (
          <>
            {requests.requests.map((request) => (
              <Request key={request.id} request={request} />
            ))}
          </>
        ) : (
          <>
            {requests.outgoingRequests.map((request) => (
              <Outgoing key={request.id} request={request} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
