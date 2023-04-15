import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import utilStyles from "../../styles/utils.module.css";
import Layout from "../../components/layout";
import {
  PostData,
  PostMetaData,
  getAllPostIds,
  getPostData,
} from "../../lib/posts";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Date from "../../components/date";

interface Params extends ParsedUrlQuery {
  id: PostMetaData["id"];
}

interface PostProps {
  postData: PostData;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps, Params> = async (
  context
) => {
  const { id } = context.params!;
  const postData = await getPostData(id);

  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
