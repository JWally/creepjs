import fs from "fs";

// rollup-plugin-misc-task.js
export default function miscTask() {
  return {
    name: "misc-task", // Name your plugin

    // You can hook into various Rollup lifecycle events
    // such as 'buildStart', 'buildEnd', 'generateBundle', 'writeBundle', etc.
    buildStart() {
      console.log("Performing a miscellaneous task before the build starts...");
      // Add your task logic here
    },

    buildEnd() {
      const workerScript = fs.readFileSync("public/creep.js", "utf-8");
      const workerScriptBase64 = Buffer.from(workerScript).toString("base64");

      // Read the file
      fs.readFile("public/index.mjs", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const workerBlob = `const workerBlob = URL.createObjectURL(new Blob([atob('${workerScriptBase64}')], { type: 'text/javascript' }))`;


        // Replace the target string with the new one
        /*
        let updatedContent = data.replace(
          /Worker\(scriptSource\)/g,
          `Worker(${workerBlob})`
        );
        */

        let updatedContent = `
        ${workerBlob}

        /// DATA

        ${data}
        `;


        // Write the updated content back to the file
        fs.writeFile("public/index.mjs", updatedContent, "utf8", (err) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log("File updated successfully.");
        });
      });


      // Add your task logic here
    },
  };
}
