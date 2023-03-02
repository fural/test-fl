const deterministicPartitionKey = require("./main");

describe("deterministicPartitionKey", () => {
  it('should return "0" if no input is provided', () => {
    expect(deterministicPartitionKey()).toBe("0");
  });

  it("should return the same partition key if it is already provided in the input", () => {
    const event = { partitionKey: "my-test-partition-key" };
    expect(deterministicPartitionKey(event)).toBe("my-test-partition-key");
  });

  it("should returns a partition key generated from the input event data", () => {
    const event = { name: "Corgi Gon", age: 2 };
    expect(deterministicPartitionKey(event)).toBeDefined();
  });

  it("should returns a partition key generated from input data even if it is not an object", () => {
    const event = "my-test-event-data";
    expect(deterministicPartitionKey(event)).toBeDefined();
  });

  it("should returns a partition key with length <= 256", () => {
    const event = { testLongData: "g".repeat(300) };
    const key = deterministicPartitionKey(event);
    expect(key.length).toBeLessThanOrEqual(256);
  });
});
