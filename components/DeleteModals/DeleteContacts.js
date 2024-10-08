import React, { useState } from 'react';
import axios from 'axios';
import RingLoader from '../RingLoader'; // Assuming you have a loader component
import { useRouter } from 'next/router';

export default function DeleteContacts({ contactId, firstName, lastName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const deleteContact = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/contact/${contactId}`);
      setLoading(false);
      closeModal();
      router.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.error('Error deleting contact:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-red-600 text-center text-white px-4 py-2 cursor-pointer flex gap-1 hover:bg-red-800"
      >
        Delete
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded shadow-md p-4 w-full md:w-96">
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold">
                Do you really want to delete&nbsp;&quot;{firstName} {lastName}&quot;?
              </h5>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>

            <div className="mt-4 flex gap-4 justify-center">
              {!loading && (
                <>
                  <button
                    onClick={closeModal}
                    className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-md mr-2"
                  >
                    No
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800"
                    onClick={deleteContact}
                  >
                    Yes
                  </button>
                </>
              )}
              {loading && <RingLoader />} {/* Render RingLoader if in loading state */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
