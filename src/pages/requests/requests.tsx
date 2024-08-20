import { useState } from "react";

import Request from "./request";
import Outgoing from "./outgoing";
import { Request as RequestType } from "../../types/types";
import ConditionalButton from "../../components/ui/conditional-button/conditional-button";

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
