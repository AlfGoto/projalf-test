import { Projalf } from "projalf"
const project = new Projalf({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  devDeps: ["projalf@0.0.16"],
  name: "projalf-test",
  projenrcTs: true,

  deps: ["hono", "aws-lambda"],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
})
project.synth()