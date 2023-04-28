import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




// export default defineConfig({
//   server: {
//     proxy: {
//       "/clientdata": {
//         target: "http://localhost:7000",
//         secure: false,
//       },
//       "/login": {
//         target: "http://localhost:7000",
//         secure: false,
//       }
//     },
//   },
//   plugins: [react()],
// });


// export default defineConfig({
//   server: {

//     proxy: {

//       "/clientdata": {
//         target: "https://bablu-kumar-7272.onrender.com",
//         changeOrigin: true,
//         secure: false,


//       },
//       "/login": {
//         target: "https://bablu-kumar-7272.onrender.com",
//         changeOrigin: true,
//         secure: false,

//       }
//     },
//   },
//   plugins: [react()],

// });


export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    server: {

      proxy: {

        "/clientdata": {
          target: parseInt(process.env.VITE_BASE_URL),
          changeOrigin: true,
          secure: false,


        },
        "/login": {
          target: parseInt(process.env.VITE_BASE_URL),
          changeOrigin: true,
          secure: false,

        }
      },
    },
    plugins: [react()],

  });

}
console.log(parseInt(process.env.VITE_BASE_URL))




