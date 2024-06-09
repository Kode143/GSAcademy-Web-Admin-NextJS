import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ArticleForm from '@/components/AddForms/ArticleForm';
import Layout from '@/components/Layout';

const EditArticle = () => {
    const [articleInfo, setArticleInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    
    useEffect(()=>{
        if(id){
            return;
        }
        axios.get('/api/articles?id=' +id).then(response =>{
            setArticleInfo(response.data);
        });
    }, [id])
  return (
    
 <Layout>
   
  {articleInfo && <ArticleForm {...articleInfo}/>}

 </Layout>
  )
}

export default EditArticle