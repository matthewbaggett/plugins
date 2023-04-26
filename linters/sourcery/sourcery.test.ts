import path from "path";
import { linterCheckTest } from "tests";
import { TrunkDriver } from "tests/driver";
import { TEST_DATA } from "tests/utils";

// // You must login in order to use sourcery
const preCheck = (driver: TrunkDriver) => {
  driver.moveFile(path.join(TEST_DATA, "_plugin.yaml"), path.join(TEST_DATA, "plugin.yaml"));

  const trunkYamlPath = ".trunk/trunk.yaml";
  const currentContents = driver.readFile(trunkYamlPath);
  const lintRegex = /\nlint:/;
  const newContents = currentContents.replace(
    lintRegex,
    `
  - id: plugin-overrides
    local: .
lint:`
  );
  driver.writeFile(trunkYamlPath, newContents);
};

linterCheckTest({ linterName: "sourcery", preCheck });