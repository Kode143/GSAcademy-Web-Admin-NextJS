import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import { UploadIcon } from '../Icons';

let ReactQuill;
if (typeof window !== 'undefined') {
  ReactQuill = require('react-quill');
  require('react-quill/dist/quill.snow.css'); // Import Quill styles
}

const ArticleForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  images: existingImages,
  publisher: existingPublisher,
  closeModal,
}) => {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [images, setImages] = useState(existingImages || []);
  const [publisher, setPublisher] = useState(existingPublisher || ''); 
  const [publishedDate, setPublishedDate] = useState(new Date());
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTitle(existingTitle || '');
    setDescription(existingDescription || '');
    setImages(existingImages || []);
    setPublisher(existingPublisher || '');
  }, [existingTitle, existingDescription, existingImages, existingPublisher]);

  const uploadImage = async (e) => {
    e.preventDefault();
    const file = e.target?.files[0];
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.append('file', file);
      try {
        const res = await axios.post('/api/upload', data);
        if (res.data && Array.isArray(res.data.uploads) && res.data.uploads.length > 0) {
          const uploadedImage = res.data.uploads[0];
          const { secure_url, public_id } = uploadedImage;
          setImages([...images, { secure_url, public_id }]);
        } else {
          console.error('secure_url property is missing or undefined in the response:', res.data);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const createArticle = async (ev) => {
    ev.preventDefault();
    const formattedImages = images.map(image => ({
      secure_url: image.secure_url,
      public_id: image.public_id
    }));
    const data = { title, images: formattedImages, description,  publisher,
    publishedDate, };
    if (_id) {
      await axios.put('/api/articles', { ...data, _id });
    } else {
      await axios.post('/api/articles', data);
    }
    closeModal();
    router.reload();
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleFirstLetter = (e) => {
    setTitle(capitalizeFirstLetter(e.target.value));
  };

  const HandlePublisher = (e) => {
    setPublisher(capitalizeFirstLetter(e.target.value))
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <form onSubmit={createArticle} className="bg-gray-200 item shadow-md p-4 w-full md:w-96 rounded-xl sm:w-80">
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-white p-2 h-10 w-10 font-bold rounded-lg hover:text-black bg-red-600"
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="flex flex-col">
          <label>Article Title</label>
          <input
            type="text"
            placeholder="Title here..."
            value={title}
            onChange={handleFirstLetter}
            className="ps-3 "
            required
          />

<label>Publisher</label>
          <input
            type="text"
            placeholder="Publisher name..."
            value={publisher}
            onChange={HandlePublisher}
            className="ps-3 "
            required
          />

          <label>Image</label>
          <div className="mb-2 flex flex-wrap gap-1">
            {!!images?.length && images.map((image, index) => (
              <div key={index} className="relative w-20 h-20 flex justify-center items-center bg-gray-400 rounded-lg hover:bg-gray-700 mr-2 mb-2">
                <img src={image.secure_url} alt={`Image ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white h-6 rounded-full hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            {isUploading && (
              <div className="h-24 p-1 flex items-center rounded-lg">
                <Spinner />
              </div>
            )}
            <label className="w-20 h-20 cursor-pointer flex justify-center items-center bg-gray-400 rounded-lg hover:bg-gray-700">
              <UploadIcon />
              <input type="file" accept="image/*" className="hidden" onChange={uploadImage} />
            </label>
          </div>
          <label>Text Body</label>
          {ReactQuill ? (
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                ],
              }}
              formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'list', 'bullet', 'link', 'image']}
              theme="snow"
              className="resize-y h-52 mt-1 ps-3 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md mb-2"
              required
            />
          ) : (
            <textarea
              placeholder="Text Body here..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="resize-y h-52 mt-1 ps-3 pt-2 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md mb-2"
              required
            />
          )}
          <button
            type="submit"
            className="mt-16 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
