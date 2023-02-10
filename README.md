# code-editor
- Uses Typescript, React, Redux Thunk, Esbuild API, Monaco Text Editor API
- Bundles and Compiles code given in the live text editor and displays in the console in inspect element, Any changes in the dom will show up in the window
- Can create as many editors on the pag as you want. all editors have access to eachothers code
- There is also a text editor feature with the code.
- Because the Monaco Text Editor API is out of date we need to run --legacy-peer-deps when installing the packages.

Run this code to install packages
npm install --legacy-peer-deps

then run in local host as you normally would
