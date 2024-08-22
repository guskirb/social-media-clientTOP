import { useState } from "react";

import Request from "./request";
import Outgoing from "./outgoing";
import { Request as RequestType } from "../../types/types";
import ConditionalButton from "../../components/ui/conditional-button/conditional-button";
import { BookDashed } from "lucide-react";

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

  return (
    <>
      <ConditionalButton
        showing={showing}
        setShowing={setShowing}
        conditions={["requests", "outgoing"]}
      />
      <div className="flex flex-col gap-4">
        {showing === "requests" ? (
          <>
            {requests.requests.length > 0 ? (
              requests.requests.map((request) => (
                <Request key={request.id} request={request} />
              ))
            ) : (
              <div className="opacity-70 dark:text-white w-full p-10 flex flex-col gap-3 justify-center items-center">
                <BookDashed size={60} strokeWidth={1.5} />
                <p className="font-medium">You have no requests.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {requests.outgoingRequests.length > 1 ? (
              requests.outgoingRequests.map((request) => (
                <Outgoing key={request.id} request={request} />
              ))
            ) : (
              <div className="opacity-70 dark:text-white w-full p-10 flex flex-col gap-3 justify-center items-center">
                <BookDashed size={60} strokeWidth={1.5} />
                <p className="font-medium">You have no outgoing requests.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
