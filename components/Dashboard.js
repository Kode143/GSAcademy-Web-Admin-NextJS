import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleIcon2, EyeIcon, GalleryIcon, ImageIcon, KidsIcon, MessageInbox } from './Icons';
import UserGraph from './UserGraph';
import Calendar from './Calender';
import Link from 'next/link';



const Dashboard = ({contactFormData}) => {
    const [images, setImages] = useState([]);
    const [articles, setArticles] = useState([]);
    const [pageViews, setPageViews] = useState(0);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('/api/images');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

      useEffect(() => { 
    axios.get('/api/articles').then(response => {
      const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setArticles(sortedEvents);
    });
  }, []);

//   const fetchPageViews = async () => {
//     try {
//         const response = await axios.get('/api/page-views');
//         setPageViews(response.data.views);
//     } catch (error) {
//         console.error('Error fetching page views:', error);
//     }
// };
const unreadCount = contactFormData.filter((msg) => !msg.read).length;


    return (
        <div className='mt-1'>
            <div className=' p-2 flex justify-around' >
                
            <Link href={'/gallery'} className='bg-slate-200 p-2  w-52 rounded-md text-center flex hover:bg-slate-400'>
                <div className=' '>
                <GalleryIcon />
                </div>
                <div className='flex flex-col'>
                <div className='ms-3 mt-2'>
                Total Images 
                </div>
                <div className='font-bold text-2xl'>
                {images.length}
                </div>  
                </div>
              </Link> 

                <Link href={'/articles'} className='bg-slate-200 h-20 w-52  flex p-2 rounded-md text-center hover:bg-slate-400'>
                    <div className='bg-yellow-400 p-2 rounded-md'>
                        <ArticleIcon2 />
                    </div>

                    <div className='ms-3 mt-2'>
                    <div>
                    Total Articles
                    </div>
                    <div className='font-bold text-2xl'>
                    {articles.length}
                    </div>
                    </div>
                
                </Link>

                <div className='bg-slate-200 h-20 w-56  flex p-2 rounded-md text-center hover:bg-slate-400'>
                    <div className='bg-green-500 p-2 rounded-md'>
                        <EyeIcon />
                    </div>

                    <div className='ms-3 mt-2'>
                    <div>
                    Total Page Views
                    </div>
                    <div className='font-bold text-2xl'>
                    {pageViews}
                    </div>
                    </div>
                
                </div>  

                 <div className='bg-slate-200 h-20 w-64  flex p-2 rounded-md text-center hover:bg-slate-400 '>
                    <div className='bg-sky-500 p-2 rounded-md'>
                        <KidsIcon />
                    </div>

                    <div className='ms-3 mt-2'>
                    <div>
                    Admission Request
                    </div>
                    <div className='font-bold text-2xl'>
                   0
                    </div>
                    </div>
                
                </div>        
              </div>

              <div>
              <div className='flex justify-between ms-1 p-2  bg-gray-300  shadow-md'>
                <Link href={'/message'} className='flex gap-1 p-1 font-semibold text-base hover:bg-slate-400 rounded-md'>
                   <h2> Recent Messages</h2> 
                    <div className="relative">
          <MessageInbox className='w-6 h-6' />
          {unreadCount > 0 && (
            <span className="absolute  right-0 left-5 bottom-5 bg-green-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
              {unreadCount}
            </span>
          )}
        </div>
           </Link>

              <p className='me-4 font-bold'>Total Admin : 2</p>
                 </div>
            
              </div>

              <div className='flex flex-row gap-6 mt-3'>
                <div className='w-4/6 h-full'>
                <UserGraph />
                </div>
                
                <div className= 'w-2/6 border-2 border-slate-500 shadow-2xl h-full p-2'>
                <h1 className='text-center  bg-lime-500 p-2 rounded-md mb-2'>🔥विक्रम सम्वत् पात्रो🔥</h1>
                 <Calendar className=' m-5 ' />
                 </div>

               
              </div>

            
          
        </div>
    );
};

export default Dashboard;





