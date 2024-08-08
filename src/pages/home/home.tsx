import Form from "../../components/ui/post-form/form";
import Input from "../../components/ui/post-form/input";
import PostList from "../../components/ui/post-list/post-list";

export default function Home({posts}) {

  return (
    <>
    <Form >
      <Input />
    </Form>
    <PostList posts={posts}/>
    </>
  );
}
