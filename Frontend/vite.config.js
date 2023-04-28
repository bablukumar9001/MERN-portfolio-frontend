import { defineConfig } from 'vite'
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


export default defineConfig({
  server: {
    proxy: {
      "/clientdata": {
        target: "https://bablu-kumar-7272.onrender.com",
        secure: false,
      },
      "/login": {
        target: "https://bablu-kumar-7272.onrender.com",
        secure: false,
      }
    },
  },
  plugins: [react()],
});