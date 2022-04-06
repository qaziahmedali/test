import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

interface UpdateTicketProps {
  setShowModal: any;
  id: string;
  defaultStatus: string;
}
interface Ticket {
  id: number;
  title: string;
  des: string;
  status: string;
  created: string;
}

const UpdateTicket: React.FC<UpdateTicketProps> = (
  props: UpdateTicketProps
) => {
  const { setShowModal, id, defaultStatus } = props;
  console.log("id", props);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    let data = localStorage.getItem("tickets");
    if (data != null) {
      let ticket = JSON.parse(data);
      const updateTicket = ticket.map((item: Ticket) => {
        if (item.id === parseInt(id)) {
          return { ...item, status: status };
        }

        return item;
      });

      console.log("newArra", updateTicket);

      localStorage.setItem("tickets", JSON.stringify(updateTicket));
      setLoading(false);
      history.push("/");
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <form
              className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
              action="#"
            >
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Update Status
              </h3>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Change Status
                </label>
                <div className="flex justify-center">
                  <div className="mb-3 l:w-96 md:w-96 xl:w-96">
                    <select
                      className="form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      onChange={(e) => setStatus(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option
                        value="open"
                        selected={defaultStatus == "open" ? true : false}
                      >
                        Open
                      </option>
                      <option
                        value="in-progress"
                        selected={defaultStatus == "in-progress" ? true : false}
                      >
                        In-Progress
                      </option>
                      <option
                        value="completed"
                        selected={defaultStatus == "completed" ? true : false}
                      >
                        Completed
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit}
                disabled={loading ? true : false}
              >
                {loading
                  ? (
                      <svg
                        role="status"
                        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2"
                        />
                      </svg>
                    ) + "Loading.."
                  : "Update"}
              </button>
              {/* <button
                disabled
                type="button"
                class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                
                Loading...
              </button> */}
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UpdateTicket;
