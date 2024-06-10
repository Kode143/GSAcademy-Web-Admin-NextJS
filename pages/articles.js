import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import ArticleForm from '@/components/AddForms/ArticleForm';
import DeleteArticles from '@/components/DeleteModals/DeleteArticles';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track expanded article index
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get('/api/articles').then(response => {
      const sortedArticles = response.data.sort((a, b) => b._id.localeCompare(a._id));
      setArticles(sortedArticles);
    });
  }, []);
  

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setModalOpen(false);
  };

  const handleReadMore = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index); // Toggle expanded index
  };

  const countWords = (text) => {
    return text.split(/\s+/).length;
  };

  const convertReactQuillToHTML = (quillText) => {
    if (typeof document !== 'undefined' && quillText) {
      const div = document.createElement('div');
      div.innerHTML = quillText;
      return div.innerHTML;
    } else {
      return '';
    }
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <button onClick={() => openModal(null)}
          className="bg-blue-500 w-32 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900"
        >Add Article</button>
        {modalOpen && (
          <ArticleForm
            _id={selectedArticle?._id}
            title={selectedArticle?.title}
            description={selectedArticle?.description}
            images={selectedArticle?.images}
            closeModal={closeModal}
          />
        )}
        <div className="mt-2 overflow-scroll" style={{ height: '535px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5 me-2">
            {articles.map((article, index) => {
              const articleHTML = convertReactQuillToHTML(article.description);
              const isExpanded = expandedIndex === index; // Check if current article is expanded

              return (
                <div key={index} className={`bg-gray-300 shadow-black shadow-md rounded-md p-2 ${isExpanded ? 'lg:col-span-3' : 'lg:col-span-1'}`}>
                  <h3 className="text-lg font-semibold mb-2 text-center">{article.title}</h3>
                  <div className="image-container">
      {article.images.map((image, imageIndex) => (
        <div
          key={imageIndex}
          style={{
            width: '100%',
            height: isExpanded ? 'auto' : '100px',
            marginBottom: '4px',
            position: 'relative',
          }}
        >
          <Image
            src={image.secure_url}
            alt={`Event ${imageIndex} Image`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes as needed
            style={{ objectFit: 'cover' }} // Directly use style prop for objectFit
            priority={imageIndex === 0} // Optional: Add priority to the first image if it's above the fold
          />
        </div>
      ))}
    </div>
                  {isExpanded ? (
                    <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
                  ) : (
                    <div className="description-container overflow-hidden" style={{ maxHeight: '60px' }}>
                      <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
                    </div>
                  )}
                  {countWords(article.description) > 20 && (
                    <button
                      onClick={() => handleReadMore(index)}
                      className="text-white hover:underline focus:outline-none bg-black p-0.5 rounded-md content"
                    >
                      {isExpanded ? 'Hide' : 'Read More...'}
                    </button>
                  )}
                  <div className="flex justify-between mt-1">
                    <button
                      onClick={() => openModal(article)}
                      className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-900"
                    >
                      Edit
                    </button>
                    <DeleteArticles articleId={article._id} articleTitle={article.title} articleImageUrl={article.images} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Articles;
