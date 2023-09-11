import axios from "axios";
import { expect } from "chai";

describe("image-dinary", () => {
  it("should respond with the configured greeting", async () => {
    const expected = "Hello World from image-dinary";

    const httpFunctionUri = "http://localhost:5001/demo-test/us-central1/ext-image-dinary-modifyImg/";
    const res = await axios.get(httpFunctionUri);

    return expect(res.data).to.eql(expected);
  }).timeout(10000);
});
