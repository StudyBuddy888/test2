export default {
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Fixes file change detection issues
    },
    hmr: {
      clientPort: 5173, // Ensures WebSocket works correctly
    },
  },
};
