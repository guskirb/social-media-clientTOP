import Form from "../../components/ui/form/form";
import Input from "../../components/ui/form/input";

export default function Login() {
  return (
    <Form>
      <Input placeholder={"Username"}/>
      <Input placeholder={"Password"}/>
    </Form>
  )
}
