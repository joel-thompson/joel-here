import apiPath from "../../utils/apiPath";
import { SendTextToApi } from "../SendToApi/SendTextToApi";

const StructuredOutput = () => {
  return (
    <SendTextToApi
      labelText="Send Structured Output"
      apiEndpoint={apiPath("/math-reasoning")}
    />
  );
};

export default StructuredOutput;
