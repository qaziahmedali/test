import React, { FC, useEffect, useState } from "react";
import tickets from "../../ticket.json";
import { useParams, useHistory } from "react-router-dom";
import UpdateTicket from "./UpdateTicket";

interface Props {}
interface Ticket {
  id: number;
  title: string;
  des: string;
  status: string;
  created: string;
}

interface TicketParams {
  id: number;
}

const Ticket: FC<Props> = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { id }: any = useParams();
  const history = useHistory();
  const [data, setData] = useState<Ticket[]>([]);

  useEffect(() => {
    let data = localStorage.getItem("tickets");
    if (data != null) {
      const tickets = JSON.parse(data);
      const filterTicket = tickets.filter((item: Ticket) => item.id == id);
      setData(filterTicket);
    }
  }, [tickets]);
  const goBack = () => {
    history.goBack();
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-2"
          type="button"
          onClick={goBack}
        >
          Back
        </button>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tickets Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data?.[0]?.title}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data?.[0]?.status}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Created At
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data?.[0]?.created}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data?.[0]?.des}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Action</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Update
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      {showModal && (
        <UpdateTicket
          setShowModal={setShowModal}
          id={id}
          defaultStatus={data?.[0]?.status}
        />
      )}
    </section>
  );
};

export default Ticket as React.FC;
