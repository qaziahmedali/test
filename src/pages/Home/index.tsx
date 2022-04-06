import React, { useEffect, useState } from "react";
import tickets from "../../ticket.json";
import { useHistory } from "react-router-dom";

export interface Ticket {
  id: number;
  title: string;
  des: string;
  status: string;
  created: string;
}

const Home = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [open, setOpen] = useState<Ticket[]>([]);
  const [complete, setComplete] = useState<Ticket[]>([]);
  const [inProgress, setInProgress] = useState<Ticket[]>([]);
  const history = useHistory();
  useEffect(() => {
    let data = localStorage.getItem("tickets");
    if (data != null) {
      setTickets(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    let openArray = [...open];
    let inProgressArray = [...inProgress];
    let completedArray = [...complete];
    tickets.map((item) => {
      if (item.status === "open") {
        openArray.push(item);
        setOpen(openArray);
      }
      if (item.status === "in-progress") {
        inProgressArray.push(item);
        setInProgress(inProgressArray);
      }
      if (item.status === "completed") {
        completedArray.push(item);
        setComplete(completedArray);
      }
    });
  }, [tickets]);
  const handleTicket = (id: number) => {
    history.push(`/ticket/${id}`);
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Tickets
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them.
          </p>
        </div>
        <div className="h-56 grid grid-cols-3 gap-4 content-around">
          <div className="flex justify-center">
            <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
              <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-600 text-white">
                Open Tickets
              </li>
              {open.map((item: Ticket, index: number) => (
                <li
                  className="hover:bg-sky-200 px-6 py-2 border-b border-gray-200 w-full cursor-pointer"
                  key={index}
                  onClick={() => handleTicket(item.id)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
              <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-600 text-white">
                In Progress Tickets
              </li>
              {inProgress.map((item: Ticket, index: number) => (
                <li
                  className="hover:bg-sky-200 px-6 py-2 border-b border-gray-200 w-full cursor-pointer"
                  key={index}
                  onClick={() => handleTicket(item.id)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
              <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-600 text-white">
                Completed Tickets
              </li>
              {complete.map((item: Ticket, index: number) => (
                <li
                  className="hover:bg-sky-200 px-6 py-2 border-b border-gray-200 w-full cursor-pointer"
                  key={index}
                  onClick={() => handleTicket(item.id)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
