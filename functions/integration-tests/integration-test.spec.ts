import axios, {AxiosError} from "axios";
import { expect } from "chai";

describe("image-dinary", () => {
  it("should respond 500 if file param not provided", async () => {
    const expected = "Missing file param.";
    const httpFunctionUri = "http://localhost:5001/demo-test/us-central1/ext-image-dinary-modifyImg/";
    try {
      const res = await axios.get(httpFunctionUri);
      expect(res.status).to.eql(200)
      expect(res.data).to.eql(expected);
    } catch (e) {
      const error = e as AxiosError
      const data = error.response?.data as any
      expect(data.status).to.eql(500)
      expect(data.message).to.eql(expected);
    }
  }).timeout(10000);
});
