import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// Ensure that the modal is accessible to screen readers
Modal.setAppElement('#root');

const API_BASE_URL = "http://localhost:4000/api/v1/adminRoute/createNotice";
const API_EDIT = "http://localhost:4000/api/v1/adminRoute/updateNotice/";
const API_DELETE = "http://localhost:4000/api/v1/adminRoute/deleteNotice/";
const API_GET_DATA = "http://localhost:4000/api/v1/adminRoute/getAllNotice";

const TeacherNotice = () => {
  const [notice, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', image: null });
  const [editingNotice, setEditingNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  // const handleNoticeSubmit = () => {
  //   // Create a new notice
  //   const formData = new FormData();
  //   formData.append("title", newNotice.title);
  //   formData.append("content", newNotice.content);
  //   formData.append("image", newNotice.image);



  //   axios
  //     .post(API_BASE_URL, formData, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       console.log("Data--->", response.data);
  //       setNotices([...notice, response.data]);
  //       setShouldFetchData(true)
  //     })
  //     .catch((error) => {
  //       console.error('Error creating notice:', error);
  //     });

  //   setNewNotice({ title: '', content: '', image: null });
  //   setIsModalOpen(false);
  // };

  const handleEditNotice = (index) => {
    setEditingNotice(index);
    setIsModalOpen(true);
  
    // Populate newNotice with the data of the notice you are editing
    setNewNotice({
      title: notice[index].title,
      content: notice[index].content,
      image: notice[index].image, // Include the existing image
    });
  };
  

  // const handleNoticeSubmit = () => {
  //   const formData = new FormData();
  //   formData.append("title", newNotice.title);
  //   formData.append("content", newNotice.content);
  //   formData.append("image", newNotice.image);
  
  //   if (editingNotice !== null) {
  //     // Handle saving changes for an existing notice
  //     axios
  //       .put(API_EDIT + notice[editingNotice]._id, newNotice, {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         // Handle success and make any necessary updates
  //       })
  //       .catch((error) => {
  //         console.error('Error updating notice:', error);
  //       });
  //   } else {
  //     // Handle adding a new notice
  //     axios
  //       .post(API_BASE_URL, formData, {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         // Handle success and make any necessary updates
  //       })
  //       .catch((error) => {
  //         console.error('Error creating notice:', error);
  //       });
  //   }
  
  //   // Reset the state and close the modal
  //   setNewNotice({ title: '', content: '', image: null });
  //   setIsModalOpen(false);
  // };
  
 
  const handleNoticeSubmit = () => {
    const formData = new FormData();
    formData.append("title", newNotice.title);
    formData.append("content", newNotice.content);
  
    if (newNotice.image) {
      formData.append("image", newNotice.image);
    } else if (editingNotice !== null && notice[editingNotice].image) {
      // Use the existing image URL when editing if no new image is provided
      formData.append("image", notice[editingNotice].image);
    }
  
    if (editingNotice !== null) {
      // Handle saving changes for an existing notice
      axios
        .put(API_EDIT + notice[editingNotice]._id, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle success and make any necessary updates
          setShouldFetchData(true)
        })
        .catch((error) => {
          console.error('Error updating notice:', error);
        });
    } else {
      // Handle adding a new notice
      axios
        .post(API_BASE_URL, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle success and make any necessary updates
          setShouldFetchData(true)
        })
        .catch((error) => {
          console.error('Error creating notice:', error);
        });
    }
  
    // Reset the state and close the modal
    setNewNotice({ title: '', content: '', image: null });
    setIsModalOpen(false);
  };
  
 
 

  const handleDeleteNotice = (index) => {
    const noticeId = notice[index]._id; // Replace with the actual property name for the notice ID
    axios
      .delete(API_DELETE + noticeId, {
        withCredentials: true,
      })
      .then(() => {
        const updatedNotices = [...notice];
        updatedNotices.splice(index, 1);
        setNotices(updatedNotices);
      })
      .catch((error) => {
        console.error('Error deleting notice:', error);
      });
  };

  useEffect(() => {
    // GET Request to fetch existing notices
    axios.get(API_GET_DATA,{
      withCredentials: true,
    })
      .then((response) => {
        console.log('yes', response.data)
        const { allNotice } = response.data
        console.log("getData--->", allNotice);
        setNotices(allNotice);
      })
      .catch((error) => {
        console.error('Error fetching notices:', error);
      });
  }, [shouldFetchData]);



  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Notice Board</h1>

      {/* Create Notice Button */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          setEditingNotice(null);
        }}
        className="bg-blue-500 text-white px-4 py-2 mb-2 rounded hover:bg-blue-600"
      >
        Create Notice
      </button>

      {/* Modal for Creating/Editing Notice */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setEditingNotice(null);
        }}
        className="w-96 bg-white p-6 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          {editingNotice !== null ? 'Edit Notice' : 'Create Notice'}
        </h2>
        <form className="space-y-4 py-2" onSubmit={handleNoticeSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded"
            value={newNotice.title}
            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="w-full p-2 border border-gray-300 rounded"
            value={newNotice.content}
            onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
          />
         
<input
  type="file"
  onChange={(e) => setNewNotice({ ...newNotice, image: e.target.files[0] })}
/>

          <button
            type="button"
            onClick={handleNoticeSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600"
          >
            {editingNotice !== null ? 'Save Changes' : 'Add Notice'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              setEditingNotice(null);
            }}
            className="bg-blue-500 text-white px-5 py-2 ml-2 rounded hover:bg-blue-600"
          >
            Cancel
          </button>
        </form>
      </Modal>

      {/* Display Notices */}
      <ul>
        <div className='overflow-scroll h-[200px]'>
        {notice.map((notice, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{notice.title}</h2>
            <p className="text-gray-600">{notice.content}</p>
            {notice.file && (
              <a
                href={notice.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Image
              </a>
            )}
            <div className="mt-4">
              <button
                onClick={() => handleEditNotice(index)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNotice(index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        </div>
      </ul>
    </div>
  );
};

export default TeacherNotice;